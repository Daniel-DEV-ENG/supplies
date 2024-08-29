import React, { useMemo, useState } from 'react';
import DataTable from 'app/shared-components/data-table/DataTable';
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ListItemIcon, MenuItem, Paper, TextField } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import FuseLoading from '@fuse/core/FuseLoading';
import { useDeleteECommerceOrdersMutation, useGetECommerceOrdersQuery } from '../ECommerceApi';
import { ShowSuccessToast } from 'app/shared-components/showSuccessToast';
import { ShowErrorToast } from 'app/shared-components/ShowErrorToast';

function ArchivedOrdersTable({ status }) {
    const { data: orders, isLoading } = useGetECommerceOrdersQuery(status);
    console.log("🚀 ~ ArchivedOrdersTable ~ orders:", orders?.data.slice(0, 100))
    const [removeOrders] = useDeleteECommerceOrdersMutation();
    const [reason, setReason] = useState('');
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    const handleSend = async () => {
        if (selectedOrderId) {
            console.log("🚀 ~ handleSend ~ id:", selectedOrderId);
            console.log('Reason for cancellation:', reason);
            
            try {
                // Attempt to delete the order
                await removeOrders({ id: selectedOrderId, reason, _method: 'DELETE' }).unwrap();
                ShowSuccessToast('تم الغاء المنتج');
            } catch (error) {
            console.log("🚀 ~ handleSend ~ error:", error)
				ShowErrorToast(error);
            } finally {
                setDialogOpen(false);
            }
        }
    };

    const openCancelDialog = (id) => {
        setSelectedOrderId(id);
        setDialogOpen(true);
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: 'reference',
                header: 'رقم الطلب',
                size: 64,
                Cell: ({ row }) => (
                    <Typography
             
                    >
                        {row.original.number}
                    </Typography>
                )
            },
            {
                accessorKey: 'customer',
                id: 'customer',
                accessorFn: (row) => `${row?.customer?.name}`,
                header: 'اسم الزبون'
            },
            {
                accessorKey: 'products',

                id: 'products',
                accessorFn: (row) => `${row?.products_number}`,
                header: 'عدد المنتجات'
            },
            {
                accessorKey: 'total',

                id: 'total',
                accessorFn: (row) => `${row.total_price}`,
                header: 'الكلفة الكلية',
                size: 64
            },
        
        ],
        []
    );

    if (isLoading) {
        return <FuseLoading />;
    }

    return (
        <>
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
                    data={orders?.data}
                    columns={columns}
                    isAction={true}
                    renderRowActionMenuItems={({ closeMenu, row, table }) => [
                        <MenuItem
                            key={0}
                            onClick={() => openCancelDialog(row.original.id)}
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
                                onClick={async () => {
                                    const selectedRows = table.getSelectedRowModel().rows.map((row) => row.original.id);
                                    
                                    try {
                                        // Attempt to delete selected orders
                                        await removeOrders({ id: selectedRows }).unwrap();
                                        alert('Selected orders deleted successfully!');
                                    } catch (error) {
                                        alert(`Failed to delete selected orders: ${error?.data?.message || 'An error occurred'}`);
                                    } finally {
                                        table.resetRowSelection();
                                    }
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

            <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle id="alert-dialog-title">هل تريد الغاء الطلب؟</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" sx={{ margin: '30px' }}>
                        الرجاء ادخال سبب الغاء الطلب
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="reason"
                        label="سبب الالغاء"
                        type="text"
                        fullWidth
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)} color="primary">
                        تراجع
                    </Button>
                    <Button onClick={handleSend} color="primary">
                        ارسال
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ArchivedOrdersTable;
