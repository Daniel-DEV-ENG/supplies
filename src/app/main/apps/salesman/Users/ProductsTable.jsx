/* eslint-disable react/no-unstable-nested-components */
import { useMemo, useState } from 'react';
import DataTable from 'app/shared-components/data-table/DataTable';
import FuseLoading from '@fuse/core/FuseLoading';
import { ListItemIcon, MenuItem, Paper, Typography } from '@mui/material';
import _ from '@lodash';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import Button from '@mui/material/Button';
import { useDeleteSalesManMutation, useGetSalesMenQuery } from '../UsersApi';

function ProductsTable() {
	const { data: products, isLoading } = useGetSalesMenQuery();
	const [removeProducts] = useDeleteSalesManMutation();
	const navigation = useNavigate()
	const columns = useMemo(
		() => [
			{
				accessorKey: 'name',
				id: 'name',
				header: 'اسم المندوب',
				Cell: ({ row }) => (
			
				<Typography component={Link} to={`/apps/profile/${row.original.id}`}>{row.original.name}</Typography>
				
				)
			},
			{
				accessorKey: 'contact',
				id: 'contact',
				header: 'تواصل',
				Cell: ({ row }) => <Typography>{row.original.contact}</Typography>
			}
			,
			{
				accessorKey: 'created_at',
				id: 'created_at',
				header: 'تاريخ الاضافة',
				Cell: ({ row }) => <Typography>{row.original.created_at}</Typography>
			},
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
						</MenuItem>
						<MenuItem
							key={1}
							onClick={() => {
								navigation(`/apps/salesmen/${row.original.id}`);
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
		</Paper>
	);
}

export default ProductsTable;
