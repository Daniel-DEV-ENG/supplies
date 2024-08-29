import { Avatar, Box, Checkbox, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import { useGetECommerceOrdersQuery } from '../../../e-commerce/ECommerceApi';
import { useGetSalesMenQuery } from '../../../salesman/UsersApi';

/**
 * The basic info tab.
 */
function BasicInfoTab({edit}) {
	const methods = useFormContext();
	const { control, formState } = methods;
	const { data: orders, isLoading } = useGetECommerceOrdersQuery('pending');
	const { data: salesman, isLoading:isloadingData } = useGetSalesMenQuery();
	const { errors } = formState;
	return (
		<div>
		<Controller
    name="salesman_id"
    control={control}
    render={({ field }) => (
      <FormControl
        fullWidth
        className="mt-8 mb-16"
        required
        error={!!errors.city_id}
      >
        <InputLabel id="type">المندوب</InputLabel>
        <Select
          {...field}
          labelId="type"
          id="type"
          value={ field.value }
          label="المندوب"
          autoFocus
        >
          {salesman?.data.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>

      </FormControl>
    )}
  />

			<Controller
				name="date"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						id="description"
						type="date"
						variant="outlined"
						fullWidth
					/>
				)}
			/>

			     <Box>
				
				 {edit ? (
null
) : (
  // Content to render when `edit` is false
  <>
   <Stack direction="row" alignItems="center" spacing={3} sx={{ mb: 2 }}>
              <Box>
                  <Typography sx={{ fontWeight: '500', fontSize: '16px', textAlign: 'center' }}>
                    الرقم
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: '500', fontSize: '16px', textAlign: 'center' }}>
                    الزبون
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: '500', fontSize: '16px', textAlign: 'center' }}>
                    رقم التواصل
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: '500', fontSize: '16px', textAlign: 'center' }}>
                    السعر الكلي
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: '500', fontSize: '16px', textAlign: 'center' }}>
                    التاريخ
                  </Typography>
                </Box>
              </Stack>
    {orders?.data?.length > 0 ? (
      orders.data.map((category, i) => (
        <Controller
          key={i}
          name={`orders[${i}]`}
          control={control}
          render={({ field }) => (
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={10}
              sx={{ mb: 2 }}
            >
              <Stack direction="row" alignItems="center" spacing={3} sx={{ mb: 2 }}>
              <Box>
                  <Typography sx={{ fontWeight: '500', fontSize: '16px', textAlign: 'center' }}>
                    {category?.number}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: '500', fontSize: '16px', textAlign: 'center' }}>
                    {category?.customer.name}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: '500', fontSize: '16px', textAlign: 'center' }}>
                    {category?.customer.contact}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: '500', fontSize: '16px', textAlign: 'center' }}>
                    {category?.total_price}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: '500', fontSize: '16px', textAlign: 'center' }}>
                    {category?.order_date}
                  </Typography>
                </Box>
              </Stack>
              <Checkbox
                {...field}
                checked={Boolean(field.value)}
                onChange={e => field.onChange(e.target.checked ? category.id : '')}
              />
            </Stack>
          )}
        />
      ))
    ) : (
      <Typography>No orders available</Typography>
    )}
  </>
)}

          
        </Box>
		</div>
	);
}

export default BasicInfoTab;
