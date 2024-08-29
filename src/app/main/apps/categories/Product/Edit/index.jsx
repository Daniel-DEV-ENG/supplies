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
import { useUpdateCategoryMutation } from '../../CategoriesApi';
import UploadImage from 'app/shared-components/uploadImage';
import { Box } from '@mui/material';
import { ShowSuccessToast } from 'app/shared-components/showSuccessToast';
import { ShowErrorToast } from 'app/shared-components/ShowErrorToast';

// Define Zod schema
const schema = z.object({
  name: z.string().nonempty({ message: 'اسم المدينة مطلوب' }),
});

export default function EditCategory({open,setOpen,selectedData}) {
  console.log("🚀 ~ EditCity ~ selectedData:", selectedData)
  
  const [EditCategory] = useUpdateCategoryMutation();
 
  const handleClose = () => {
    setOpen(false);
  };
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {name:selectedData?.name},
    resolver: zodResolver(schema),
  });
  const { control, handleSubmit, watch,setValue,getValues, reset } = methods;
  const { errors } = methods.formState;
  const form = watch();

    const HandleSaveCategory = (data) => {
        setValue('id', selectedData?.id);
        const { image, name, id } = getValues();
        const formData = new FormData();

        // Conditionally append the image only if it exists and has a file
        if (image?.file) {
            formData.append('image', image.file);
        }

        formData.append('name', name);
        formData.append('_method', 'PUT');

        try {
            EditCategory({ formData: formData, id: id });
            handleClose();
            reset();
            ShowSuccessToast('تم التعديل بنجاح');
        } catch (error) {
            ShowErrorToast(error);
        }
    };


    return (
    <>
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
        <DialogTitle>تعديل المدينة</DialogTitle>
        <DialogContent>
          <FormProvider {...methods}>
          <Box sx={{ display:'flex', width:'100%',alignItems:'center',justifyContent:'center'}}>
            <UploadImage EditImage={selectedData.image}  />
            </Box>
			<Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-16 mt-16"                 
                  required
                  label="اسم المدينة"
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
