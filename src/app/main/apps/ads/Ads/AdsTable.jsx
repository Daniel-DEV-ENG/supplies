/* eslint-disable react/no-unstable-nested-components */
import { useMemo, useState } from 'react';
import DataTable from 'app/shared-components/data-table/DataTable';
import FuseLoading from '@fuse/core/FuseLoading';
import { IconButton, Paper, Switch, Tooltip, Typography } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Button from '@mui/material/Button';
import { useDeleteAdsMutation, useGetAdsQuery, useUpdateCategoryMutation } from '../AdsApi';
import EditCategoryDialog from '../Ad/Edit';

function ProductsTable() {
	const { data: products, isLoading } = useGetAdsQuery();
	console.log("🚀 ~ ProductsTable ~ products:", products)
	const [removeProducts] = useDeleteAdsMutation();
	const [EditCategory] = useUpdateCategoryMutation();
	const [open,setOpen]=useState(false)
	const [selectedData,SetSelectedData]= useState()

	const handleStatusChange = async (id, newStatus) => {
		
		
		const formData = new FormData

		formData.append('is_active',newStatus)
		formData.append('_method','PUT')
		
		EditCategory({formData:formData,id:id})

	
	};

	const columns = useMemo(
		() => [
			{
				accessorFn: (row) => row.featuredImageId,
				id: 'featuredImageId',
				header: '',
				enableColumnFilter: false,
				enableColumnDragging: false,
				size: 64,
				enableSorting: false,
				Cell: ({ row }) => (
					<div className="flex items-center justify-center">
						{row.original?.image ? (
							<img
								className="w-full max-h-40 max-w-40 block rounded"
								src={import.meta.env.VITE_APP_Image + row.original.image}
								alt={row.original.name}
							/>
						) : (
							<img
								className="w-full max-h-40 max-w-40 block rounded"
								src="assets/images/apps/ecommerce/product-image-placeholder.png"
								alt={row.original.name}
							/>
						)}
					</div>
				)
			},
			{
			
				id:'comapny',
				accessorKey: 'company',
				header: 'اسم الشركة',
				Cell: ({ row }) => <Typography>{row.original.company.name}</Typography>
			},
			{
			
				id: 'created_at',
				header: 'تاريخ الاضافة',
				Cell: ({ row }) => <Typography>{row.original.created_at}</Typography>
			},
			{
				enableColumnFilter: false,
				id: 'status',
				header: 'حالة الاعلان',
				Cell: ({ row }) => (
					<Switch
						checked={row.original.is_active}
						onChange={(event) => handleStatusChange(row.original.id, event.target.checked ? 1 : 0)}
						color="success"
					/>
				)
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
				data={products?.data}
				columns={columns}
				renderRowActionMenuItems={({ closeMenu, row, table }) => [
					<>
						<IconButton
							onClick={() => {
								removeProducts([row.original.id]);
								closeMenu();
								table.resetRowSelection();
							}}
						>
							<Tooltip title="حذف">
								<FuseSvgIcon>heroicons-outline:trash</FuseSvgIcon>
							</Tooltip>
						</IconButton>
						<IconButton
							onClick={() => {
								setOpen(true);
								SetSelectedData(row.original);
								closeMenu();
							}}
						>
							<Tooltip title="تعديل">
								<FuseSvgIcon>heroicons-outline:pencil</FuseSvgIcon>
							</Tooltip>
						</IconButton>
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
			{open && <EditCategoryDialog 
			open={open} setOpen={setOpen} selectedData={selectedData} />}
		</Paper>
	);
}

export default ProductsTable;
