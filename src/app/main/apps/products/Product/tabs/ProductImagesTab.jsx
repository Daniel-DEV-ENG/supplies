import { orange } from '@mui/material/colors';
import { lighten, styled } from '@mui/material/styles';
import clsx from 'clsx';
import { Controller, useFormContext } from 'react-hook-form';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Box from '@mui/material/Box';
import { useDeleteImageMutation } from '../../ProductsApi';
import { ShowSuccessToast } from 'app/shared-components/showSuccessToast';
import { ShowErrorToast } from 'app/shared-components/ShowErrorToast';

const Root = styled('div')(({ theme }) => ({
  '& .productImageFeaturedStar': {
    position: 'absolute',
    top: 0,
    right: 0,
    color: orange[400],
    opacity: 0,
  },
  '& .productImageUpload': {
    transitionProperty: 'box-shadow',
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
  },
  '& .productImageItem': {
    transitionProperty: 'box-shadow',
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
    '&:hover': {
      '& .productImageFeaturedStar': {
        opacity: 0.8,
      },
    },
    '&.featured': {
      pointerEvents: 'none',
      boxShadow: theme.shadows[3],
      '& .productImageFeaturedStar': {
        opacity: 1,
      },
      '&:hover .productImageFeaturedStar': {
        opacity: 1,
      },
    },
  },
}));

const readImageFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve({
    
        file,
        url: reader.result,
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

function ProductImagesTab() {
  const methods = useFormContext();
  const { control, setValue, watch } = methods;
  const [removeImage]=useDeleteImageMutation()
  const images = watch('images');

  const handleImageUpload = async (e, onChange) => {
    const file = e.target.files[0];
    if (!file) return;

    const newImage = await readImageFile(file);

    // Add the image to the form data and update the images state
    const formData = new FormData();
    formData.append('images', newImage.file);

    onChange([newImage, ...images]);

    // Clear the file input value to allow re-uploading the same file
    e.target.value = '';
  };

  const handleRemoveImage=(id)=>{
    try{
      removeImage(id)
ShowSuccessToast('تم حذف الصورة من المنتج')
    }catch(error){
ShowErrorToast(error)
    }
  }
  return (
    <Root>
      <div className="flex justify-center sm:justify-start flex-wrap -mx-16">
        <Controller
          name="images"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Box
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === 'light'
                    ? lighten(theme.palette.background.default, 0.4)
                    : lighten(theme.palette.background.default, 0.02),
              }}
              component="label"
              htmlFor="button-file"
              className="productImageUpload flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg"
            >
              <input
                accept="image/*"
                className="hidden"
                id="button-file"
                type="file"
                onChange={(e) => handleImageUpload(e, onChange)}
              />
              <FuseSvgIcon size={32} color="action">
                heroicons-outline:upload
              </FuseSvgIcon>
            </Box>
          )}
        />
        <Controller
          name="featuredImageId"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <>
              {images?.map((media) => (
                <div
                  onClick={() => onChange(handleRemoveImage(media.id))}
                  onKeyDown={() => onChange(media.id)}
                  role="button"
                  tabIndex={0}
                  className={clsx(
                    'productImageItem flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer outline-none shadow hover:shadow-lg',
                    media.id === value && 'featured'
                  )}
                  key={media.id}
                >
                  <FuseSvgIcon className="productImageFeaturedStar">
                    heroicons-solid:trash
                  </FuseSvgIcon>
                  <img className="max-w-none w-auto h-full" src={media.image ? import.meta.env.VITE_APP_Image+media.image : media.url} alt="product" />
                </div>
              ))}
            </>
          )}
        />
      </div>
    </Root>
  );
}

export default ProductImagesTab;
