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
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import {  useUpdateAddressMutation } from '../../CitiesApi';

// Define Zod schema
const schema = z.object({
  name: z.string().nonempty({ message: 'اسم المدينة مطلوب' }),
});

export default function EditCity({open,setOpen,selectedData}) {
  console.log("🚀 ~ EditCity ~ selectedData:", selectedData)
  
  const [saveCity] = useUpdateAddressMutation();
 
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
    console.log("🚀 ~ HandleSaveCategory ~ data:", data)
    setValue('id',selectedData?.id) 
    console.log("🚀 ~ HandleSaveCategory ~ data:", data)
    saveCity(getValues())
    handleClose();
    reset(); // Reset the form after saving the category
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
