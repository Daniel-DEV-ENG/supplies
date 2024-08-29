import { Box, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import ProductImagesTab from './ProductImagesTab';
import { useGetECommerceProductsQuery } from '../../../cities/CitiesApi';
import UploadImage from 'app/shared-components/uploadImage';

/**
 * The basic info tab.
 */
function BasicInfoTab({data}) {
	const methods = useFormContext();
	const { data: city, isLoading:isLoading } = useGetECommerceProductsQuery();
	console.log("🚀 ~ BasicInfoTab ~ city:", city)
	const { control, formState } = methods;
	const { errors } = formState;
	return (
		<div>
			<Grid
				container
				spacing={3}
			>
				<Grid
					item
					xs={6}
				>
					<Typography textAlign="center" variant='h4' >معلومات الشركة</Typography>
					<UploadImage />
					<Controller
						name="name"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								className="mt-8 mb-16"
								required
								label="الاسم"
								autoFocus
								id="name"
								variant="outlined"
								fullWidth
								error={!!errors.name}
								helperText={errors?.name?.message}
							/>
						)}
					/>
  <Controller
    name="city_id"
    control={control}
    render={({ field }) => (
      <FormControl
        fullWidth
        className="mt-8 mb-16"
        required
        error={!!errors.city_id}
      >
        <InputLabel id="type">المدينة</InputLabel>
        <Select
          {...field}
          labelId="type"
          id="type"
          value={ field.value ? field.value :data.city_id }
          label="المدينة"
          autoFocus
        >
          {city?.data.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>

      </FormControl>
    )}
  />
					<Controller
						name="size"
						control={control}
						render={({ field }) => (
							<FormControl
								fullWidth
								className="mt-8 mb-16"
								required
								error={!!errors.name}
							>
								<InputLabel id="type">الحجم</InputLabel>
								<Select
									{...field}
									labelId="type"
									id="type"
									value={typeof field.value === 'string' ? field.value : ''}
									label="type"
									autoFocus
								>
									<MenuItem value="small">صغيرة</MenuItem>
									<MenuItem value="medium">متوسطة</MenuItem>
									<MenuItem value="large">كبيرة</MenuItem>
								</Select>
							</FormControl>
						)}
					/>
				</Grid>
				<Grid
				item
				xs={6}
				>
				<Typography textAlign="center" variant='h4' className="mt-8 mb-16">معلومات المدير</Typography>
<Box sx={{display:'flex',justifyContent:'center', alignItems:'center', flexDirection:'column'}} height='100%'>
				<Controller
						name="manager.name"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								className=" mb-16"
								sx={{marginTop:'70px'}}
								required
								label="اسم المدير"
								autoFocus
								id="name"
								variant="outlined"
								fullWidth
								error={!!errors.name}
								helperText={errors?.name?.message}
							/>
						)}
					/>
					<Controller
						name="manager.contact"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								className="mt-8 mb-16"
								required
								label="البريد الكتروني"
								autoFocus
								id="name"
								variant="outlined"
								fullWidth
								error={!!errors.contact}
								helperText={errors?.contact?.message}
							/>
						)}
					/>
					<Controller
						name="manager.password"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								className="mt-8 mb-16"
								required
								label="كلمة المرور"
								autoFocus
								id="name"
								variant="outlined"
								fullWidth
								error={!!errors.password}
								helperText={errors?.password?.message}
							/>
						)}
					/>
					</Box>
				</Grid>
			</Grid>
		</div>
	);
}

export default BasicInfoTab;
