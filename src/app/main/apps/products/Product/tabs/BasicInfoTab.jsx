import { FormControl, InputAdornment, InputLabel, MenuItem, Select } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import ProductImagesTab from './ProductImagesTab';
import { useGetCategoriesQuery } from '../../../categories/CategoriesApi';

/**
 * The basic info tab.
 */
function BasicInfoTab({data}) {
	const methods = useFormContext();
	const { control, formState } = methods;
	const { data: category, isLoading } = useGetCategoriesQuery();
	const { errors } = formState;
	
	return (
		<div>
			<ProductImagesTab />
			<Controller
				name="name"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						required
						label="اسم المنتج"
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
    name="category_id"
    control={control}
    render={({ field }) => (
      <FormControl
        fullWidth
        className="mt-8 mb-16"
        required
        error={!!errors.city_id}
      >
        <InputLabel id="type">التصنيف</InputLabel>
        <Select
          {...field}
          labelId="type"
          id="type"
          value={ field.value ? field.value : data.id }
          label="التصنيف"
          autoFocus
        >
          {category?.data.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>

      </FormControl>
    )}
  />

			<Controller
				name="price"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						label="السعر"
						id="priceTaxExcl"
						InputProps={{
							startAdornment: <InputAdornment position="end">ل.س</InputAdornment>
						}}
						type="number"
						variant="outlined"
						autoFocus
						fullWidth
					/>
				)}
			/>

			<Controller
				name="unit_type"
				control={control}
				render={({ field }) => (
					<FormControl
						fullWidth
						className="mt-8 mb-16"
						required
						error={!!errors.name}
					>
						<InputLabel id="type">الواحدة</InputLabel>
						<Select
							{...field}
							labelId="type"
							id="type"
							value={typeof field.value === 'string' ? field.value : ''}
							label="type"
							autoFocus
						>
							<MenuItem value="kg">كيلو غرام</MenuItem>
							<MenuItem value="piece">قطعة</MenuItem>
						</Select>
					</FormControl>
				)}
			/>
		</div>
	);
}

export default BasicInfoTab;
