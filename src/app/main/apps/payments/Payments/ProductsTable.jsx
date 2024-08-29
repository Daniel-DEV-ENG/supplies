/* eslint-disable react/no-unstable-nested-components */
import { useMemo, useState } from 'react';
import DataTable from 'app/shared-components/data-table/DataTable';
import FuseLoading from '@fuse/core/FuseLoading';
import { ListItemIcon, MenuItem, Paper, Stack, Typography } from '@mui/material';
import _ from '@lodash';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import Button from '@mui/material/Button';
import {  useGetPaymentsQuery } from '../PaymentsApi';

function ProductsTable() {
	const { data: products, isLoading } = useGetPaymentsQuery();
	console.log("🚀 ~ ProductsTable ~ products:", products)
	const navigation = useNavigate()
 
	const columns = useMemo(
		() => [
			{
				id: 'name',
				accessorKey: 'name',
				header: 'اسم الزبون',
				Cell: ({ row }) => <Typography>{row.original.customer.name}</Typography>
			},
			{
				id: 'contact',
				accessorKey: 'contact',
				header: 'تواصل',
				Cell: ({ row }) => <Typography>{row.original.customer.contact}</Typography>
			}
			,
			{
				id: 'city',
				accessorKey: 'city',
				header: 'الموقع',
				Cell: ({ row }) => <Typography>{row.original.customer.location}</Typography>
			},
			{
				id: 'amount',
				accessorKey: 'amount',
				header: 'كلفة الكلية',
				Cell: ({ row }) => <Typography>{row.original.amount}</Typography>
			},
			{
				id: 'date',
				accessorKey: 'date',
				header: 'التاريخ',
				Cell: ({ row }) => <Typography>{row.original.date}</Typography>
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
				isAction={true}
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
								navigation(`/apps/users/${row.original.id}`);
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
