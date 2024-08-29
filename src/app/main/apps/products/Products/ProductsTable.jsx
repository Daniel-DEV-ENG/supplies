/* eslint-disable react/no-unstable-nested-components */
import { useEffect, useMemo, useState } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
import { ListItemIcon, MenuItem, Paper, Typography } from '@mui/material';
import _ from '@lodash';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useDeleteProductMutation, useGetProductsQuery } from '../ProductsApi';
import DataTable from 'app/shared-components/server-side-render/datagrid';

function ProductsTable() {
	const [removeProducts] = useDeleteProductMutation();
	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 10,
	});
	const navigate = useNavigate();

	// Fetch products data with pagination
	const { data: products, isLoading, error } = useGetProductsQuery({
		page: pagination.pageIndex + 1,  // Convert to 1-based index if your API uses 1-based indexing
		limit: pagination.pageSize,
	});

	// Columns for the DataTable
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
						{row.original?.images?.length > 0 ? (
							<img
								className="w-full max-h-40 max-w-40 block rounded"
								src={import.meta.env.VITE_APP_Image + row.original.images[0].image}
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
				),
			},
			{
				accessorKey: 'name',
				id: 'name',
				header: 'اسم المنتج',
				Cell: ({ row }) => <Typography>{row.original.name}</Typography>,
			},
			{
				accessorKey: 'company',
				id: 'company',
				header: 'اسم الشركة',
				Cell: ({ row }) => <Typography>{row.original.company}</Typography>,
			},
			{
				accessorKey: 'price',
				id: 'price',
				header: 'السعر',
				Cell: ({ row }) => <Typography>{row.original.price}</Typography>,
			},
			{
				accessorKey: 'unit_type',
				id: 'unit_type',
				header: 'واحدة الوزن',
				Cell: ({ row }) => <Typography>{row.original.unit_type}</Typography>,
			},
		],
		[]
	);

	if (isLoading) {
		return <FuseLoading />;
	}

	if (error || !products) {
		return <div>Error loading products...</div>;
	}

	return (
		<Paper
			className="flex flex-col flex-auto shadow-3 rounded-t-16 overflow-hidden rounded-b-0 w-full h-full"
			elevation={0}
		>
			<DataTable
				data={products?.data.products}  // Adjust if your API structure is different
				columns={columns}
				pagination={pagination}
				setPagination={setPagination}
				renderRowActionMenuItems={({ closeMenu, row, table }) => [
					<MenuItem
						key={0}
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
					</MenuItem>,
					<MenuItem
						key={1}
						onClick={() => {
							navigate(`/apps/products/${row.original.id}`);
							closeMenu();
						}}
					>
						<ListItemIcon>
							<FuseSvgIcon>heroicons-outline:pencil</FuseSvgIcon>
						</ListItemIcon>
						تعديل
					</MenuItem>,
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
		</Paper>
	);
}

export default ProductsTable;
