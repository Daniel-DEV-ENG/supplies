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
import { useUpdateCategoryMutation } from '../../AdsApi';
import UploadImage from 'app/shared-components/uploadImage';
import { Box, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch } from '@mui/material';
import { useGetCompanyQuery } from '../../../company/CompaniesApi';

// Define Zod schema
const schema = z.object({
  name: z.string().nonempty({ message: 'اسم المدينة مطلوب' }),
});

export default function EditCategory({open,setOpen,selectedData}) {

  
  const [EditCategory] = useUpdateCategoryMutation();
  const { data: companies, isLoading } = useGetCompanyQuery();
 
  const handleClose = () => {
    setOpen(false);
  };
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {company_id:selectedData?.company.id,is_active:selectedData?.is_active},
    resolver: zodResolver(schema),
  });
  const { control, handleSubmit, watch,setValue,getValues, reset } = methods;
  const { errors } = methods.formState;
  const form = watch(); 

  const HandleSaveCategory = () => {
    setValue('id',selectedData?.id)
    const {image,is_active,company_id,id}=getValues()
    console.log("🚀 ~ HandleSaveCategory ~ getValues():", getValues())
    const formData = new FormData
    // hello Dani don't write code like this when saving categories to 
    formData.append('company_id',company_id)
    formData.append('_method','PUT')
    
    EditCategory({formData:formData,id:id})
        handleClose();
        reset();
 
 
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
        <DialogTitle>تعديل الاعلان</DialogTitle>
        <DialogContent>
          <FormProvider {...methods}>
			<Box sx={{ display:'flex', width:'100%',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
            <UploadImage  EditImage={selectedData.image}/>
   
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
          <Button onClick={HandleSaveCategory}>حفظ</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
