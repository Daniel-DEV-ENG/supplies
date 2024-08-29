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
import {  useDeleteTripsMutation,  useGetTripsQuery } from '../TripsApi';

function ProductsTable() {
	const { data: products, isLoading } = useGetTripsQuery();
	const [removeProducts] = useDeleteTripsMutation();
	const navigation = useNavigate()
	const columns = useMemo(
		() => [
			{
			
				accessorKey: 'name',
				header: 'الوجهة',
				Cell: ({ row }) => (
			
				<Typography component={Link} to={`/apps/trip/${row.original.id}`} >{row.original.address.name}</Typography>
				
				)
			},
		
			{
				accessorKey: 'Salesman',
				id: 'Salesman',
				header: 'المندوب',
				Cell: ({ row }) => <Typography>{row.original.salesman.name}</Typography>
			},
			{
				accessorKey: 'created_at',
				id: 'created_at',
				header: 'التاريخ',
				Cell: ({ row }) => <Typography>{row.original.date}</Typography>
			},
			{
				accessorKey: 'order_number',
				id: 'order_number',
				header: 'عدد الطلبات',
				Cell: ({ row }) => <Typography>{row.original.orders_number}</Typography>
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
								navigation(`/apps/trips/${row.original.id}`);
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
