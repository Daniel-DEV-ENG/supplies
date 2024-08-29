/* eslint-disable react/no-unstable-nested-components */
import { useMemo, useState } from 'react';
import DataTable from 'app/shared-components/data-table/DataTable';
import FuseLoading from '@fuse/core/FuseLoading';
import { Box, ListItemIcon, MenuItem, Paper, Typography } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useDeleteECommerceProductsMutation, useGetECommerceProductsQuery } from '../CitiesApi';
import EditCity from '../Product/Edit';

function ProductsTable() {
	const { data: products, isLoading } = useGetECommerceProductsQuery();
const [open,setOpen]= useState()
const [selectedData,SetSelectedData]= useState()

	const [removeProducts] = useDeleteECommerceProductsMutation();
	const navigation = useNavigate();
 const cities = products?.data
	const columns = useMemo(
		() => [
			{
				accessorKey: 'name',
				header: 'اسم المدينة',
				Cell: ({ row }) => (
					<Typography
						to={`/apps/cities/${row.original.id}/address`}
						role="button"
					>
						{row.original.name}
					</Typography>
				)
			},
			{
				accessorKey: 'count_address',
				header: 'عدد المناطق',
				Cell: ({ row }) => <Typography>{row.original.addresses_count}</Typography>
			},
			{
				accessorKey: 'address',
				header: 'المناطق',
				Cell: ({ row }) => (
					 <Box sx={{display:'flex',width:'100%', flexDirection:'row',gap:'5px'}}>
						{row.original.addresses.length>0 ? (row.original.addresses.map((address, index) => (
							<Typography
								display="flex"
								flexDirection="column"
								key={index}
							>
								{address.name}
							</Typography>
						))):<Typography color='error'>لا يوجد مناطق ضمن المدينة</Typography>}
					</Box>
				)
			},
			{
				accessorKey: 'count_customer',
				enableColumnFilter: false,
				header: 'عدد الزبائن الكلي ',
				Cell: ({ row }) => <Typography>{row.original.customers_count}</Typography>
			}
		],
		[]
	);

	if (isLoading) {
		return <FuseLoading />;
	}

	return (
		<Paper
			className="flex flex-col flex-auto shadow-3 rounded-t-16 overflow-hidden rounded-b-0 w-full h-full"
			elevation={0}
		>
			<DataTable
				data={cities}
				columns={columns}
				renderRowActionMenuItems={({ closeMenu, row, table }) => [
					<>
						<MenuItem
							key={0}
							onClick={() => {
								navigation(`/apps/cities/${row.original.id}/address`);
								closeMenu();
							}}
						>
							<ListItemIcon>
								<FuseSvgIcon>heroicons-outline:location-marker</FuseSvgIcon>
							</ListItemIcon>
							عرض المناطق
						</MenuItem>
						<MenuItem
							key={1}
							onClick={() => {
								removeProducts([row.original.id]);
								closeMenu();
								table.resetRowSelection();
							}}
						>
							<ListItemIcon>
								<FuseSvgIcon>heroicons-outline:trash</FuseSvgIcon>
							</ListItemIcon>
							حذف
						</MenuItem>
						<MenuItem
							key={2}
							onClick={() => {
								setOpen(true);
								SetSelectedData(row.original);
								closeMenu();
							}}
						>
							<ListItemIcon>
								<FuseSvgIcon>heroicons-outline:pencil</FuseSvgIcon>
							</ListItemIcon>
							تعديل
						</MenuItem>
					</>
				]}
				renderTopToolbarCustomActions={({ table }) => {
					const { rowSelection } = table.getState();

					if (Object.keys(rowSelection).length === 0) {
						return null;
					}

					return (
						<Button
							variant="contained"
							size="small"
							onClick={() => {
								const selectedRows = table.getSelectedRowModel().rows;
								removeProducts(selectedRows.map((row) => row.original.id));
								table.resetRowSelection();
							}}
							className="flex shrink min-w-40 ltr:mr-8 rtl:ml-8"
							color="secondary"
						>
							<FuseSvgIcon size={16}>heroicons-outline:trash</FuseSvgIcon>
							<span className="hidden sm:flex mx-8">Delete selected items</span>
						</Button>
					);
				}}
			/>
			{open && <EditCity 
			open={open} setOpen={setOpen} selectedData={selectedData} />}
		</Paper>
	);
}

export default ProductsTable;
