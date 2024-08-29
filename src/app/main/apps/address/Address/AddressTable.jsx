/* eslint-disable react/no-unstable-nested-components */
import { useMemo, useState } from 'react';
import DataTable from 'app/shared-components/data-table/DataTable';
import { IconButton, Paper, Tooltip, Typography } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import EditCity from '../product/Edit';
import { useDeleteAddressMutation } from '../CitiesApi';

function ProductsTable({ address }) {
	console.log("🚀 ~ ProductsTable ~ address:", address)
	const [removeProducts] = useDeleteAddressMutation();
	const navigation = useNavigate();
	const [open,setOpen]= useState()
const [selectedData,SetSelectedData]= useState()

	const columns = useMemo(
		() => [
			{
				id: 'name',
				header: 'اسم المنطقة',
				Cell: ({ row }) => <Typography>{row.original.name}</Typography>
			},
			{
				id: 'count',
				header: 'عدد الزبائن',
				Cell: ({ row }) => <Typography>{row.original.customers_count}</Typography>
			}
		],
		[]
	);

	return (
		<Paper
			className="flex flex-col flex-auto shadow-3 rounded-t-16 overflow-hidden rounded-b-0 w-full h-full"
			elevation={0}
		>
			<DataTable
				data={address?.addresses}
				columns={columns}
				renderRowActionMenuItems={({ closeMenu, row, table }) => [
					<IconButton
						key="delete"
						onClick={() => {
							removeProducts([row.original.id]);
							closeMenu();
							table.resetRowSelection();
						}}
					>
						<Tooltip title="حذف">
							<FuseSvgIcon>heroicons-outline:trash</FuseSvgIcon>
						</Tooltip>
					</IconButton>,
					<IconButton
						key="edit"
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
