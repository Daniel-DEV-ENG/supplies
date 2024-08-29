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
import { Box, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch } from '@mui/material';
import { useCreateCategoryMutation } from '../../AdsApi';
import { useGetCompanyQuery } from '../../../company/CompaniesApi';
import { ShowSuccessToast } from 'app/shared-components/showSuccessToast';
import { ShowErrorToast } from 'app/shared-components/ShowErrorToast';

// Define Zod schema
export default function CategoryDialog() {
  const [open, setOpen] = React.useState(false);
  const [createCategorey] = useCreateCategoryMutation();
  const { data: companies, isLoading } = useGetCompanyQuery();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      is_active:1
    },
  });
  const { control, handleSubmit,getValues, watch, reset } = methods;
  const { errors } = methods.formState;
  const form = watch(); 


  const HandleSaveCategory = (data) => {
    const {image,company_id,is_active}=getValues()
 const formData = new FormData
 if(image){
  formData.append('image',image.file)

 }
 formData.append('company_id',company_id)
 formData.append('is_active',is_active)
 try{
  createCategorey(formData)
    setOpen(false);
     handleClose();
     reset(); // Reset the form after saving the category
  ShowSuccessToast('تم اضافة اعلان ')
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
        <DialogTitle>اعلان</DialogTitle>
        <DialogContent>
          <FormProvider {...methods}>
			<Box sx={{ display:'flex', width:'100%',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
            <UploadImage  />
            <Controller
  name="is_active"
  control={control}
  render={({ field }) => (
    <FormControl
      
      className="mt-8 mb-16"
      required
      error={!!errors.is_active}
    >
      <FormControlLabel
        control={
          <Switch
            {...field}
            checked={field.value === 1}
            onChange={(event) => field.onChange(event.target.checked ? 1 : 0)}
            color="success"
          />
        }
        label="حالة الاعلان"
      />
    </FormControl>
  )}
/>
            </Box>

            <Controller
    name="company_id"
    control={control}
    render={({ field }) => (
      <FormControl
        fullWidth
        className="mt-8 mb-16"
        required
        error={!!errors.city_id}
      >
        <InputLabel id="type">الشركة</InputLabel>
        <Select
          {...field}
          labelId="type"
          id="type"
          value={ field.value }
          label="الشركة"
          autoFocus
        >
          {companies?.data.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>

      </FormControl>
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
