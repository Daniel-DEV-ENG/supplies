import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import UploadImage from 'app/shared-components/uploadImage';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Box } from '@mui/material';
import { useCreateCategoryMutation } from '../../CategoriesApi';
import { ShowSuccessToast } from 'app/shared-components/showSuccessToast';
import { ShowErrorToast } from 'app/shared-components/ShowErrorToast';

// Define Zod schema
const schema = z.object({
name: z.string().nonempty({ message: 'اسم التصنيف مطلوب ' }),
});

export default function CategoryDialog() {
  const [open, setOpen] = React.useState(false);
  const [createCategorey] = useCreateCategoryMutation();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const { control, handleSubmit,getValues, watch, reset } = methods;
  const { errors } = methods.formState;
  const form = watch(); 

  const HandleSaveCategory = (data) => {
    const {image,name}=getValues()
 const formData = new FormData
 if(image){
  formData.append('image',image.file)

 }
 formData.append('name',name)
 try{
  createCategorey(formData)
    setOpen(false);
     handleClose();
     reset();
 ShowSuccessToast('تم اضافة تصنيف ')
    }
 catch(error){
ShowErrorToast(error)
 }
  };

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        size="medium"
        onClick={handleClickOpen}
      >
        <FuseSvgIcon size={20}>heroicons-outline:plus</FuseSvgIcon>
        <span className="mx-4 sm:mx-8">إضافة</span>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
		fullWidth='true'
        maxWidth='xs'
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit(HandleSaveCategory),
        }}
      >
        <DialogTitle>تصنيف</DialogTitle>
        <DialogContent>
          <FormProvider {...methods}>
			<Box sx={{ display:'flex', width:'100%',alignItems:'center',justifyContent:'center'}}>
            <UploadImage  />
            </Box>
			<Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-16"
                  
                  required
                  label="عنوان التصنيف"
                  autoFocus
                  id="name"
                  variant="outlined"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors?.name?.message}
                />
              )}
            />
          </FormProvider>
        </DialogContent>
        <DialogActions sx={{ display:'flex', width:'100%',alignItems:'center',justifyContent:'center'}}>
          <Button onClick={handleClose}>إلغاء</Button>
          <Button type="submit">حفظ</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
