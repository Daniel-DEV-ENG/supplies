/* eslint-disable react/no-unstable-nested-components */
import { useMemo } from 'react';
import DataTable from 'app/shared-components/data-table/DataTable';
import { ListItemIcon, MenuItem, Paper } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import FuseLoading from '@fuse/core/FuseLoading';
import { useDeleteECommerceOrdersMutation, useGetECommerceOrdersQuery } from '../ECommerceApi';
import OrdersStatus from '../order/OrdersStatus';

function CancelledOrdersTable({status}) {
	const { data: orders, isLoading } = useGetECommerceOrdersQuery(status);
	console.log("🚀 ~ OrdersTable ~ orders:", orders)
	const [removeOrders] = useDeleteECommerceOrdersMutation();
	const columns = useMemo(
		() => [
			{
				accessorKey: 'reference',
				header: 'رقم الطلب',
				size: 64,
				Cell: ({ row }) => (
					<Typography
						component={Link}
						to={`/apps/orders/${row.original.id}`}
						className="underline"
						color="secondary"
						role="button"
					>
						{row.original.number}
					</Typography>
				)
			},
			{
				accessorKey: 'customer',

				id: 'customer',
				accessorFn: (row) => `${row.customer.name}`,
				header: 'اسم الزبون'
			},
			{
				accessorKey: 'order_date',
				header: 'التاريخ'
			},
			{
				accessorKey: 'status',
				header: 'معاد طلبه',
				size: 64,
				Cell: ({ row }) => (
					<Typography
					>
						{row.original.explanation ? 'سبب الغاء'+row.original.explanation:'طلب جديد' }
					</Typography>
				)
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
				initialState={{
					density: 'spacious',
					showColumnFilters: false,
					showGlobalFilter: true,
					columnPinning: {
						left: ['mrt-row-expand', 'mrt-row-select'],
						right: ['mrt-row-actions']
					},
					pagination: {
						pageIndex: 0,
						pageSize: 20
					}
				}}
				data={orders.data}
				columns={columns}
				isAction={true}

				renderRowActionMenuItems={({ closeMenu, row, table }) => [
					<MenuItem
						key={0}
						onClick={() => {
							removeOrders([row.original.id]);
							closeMenu();
							table.resetRowSelection();
						}}
					>
						<ListItemIcon>
							<FuseSvgIcon>heroicons-outline:trash</FuseSvgIcon>
						</ListItemIcon>
						Delete
					</MenuItem>
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
								removeOrders(selectedRows.map((row) => row.original.id));
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

export default CancelledOrdersTable;
