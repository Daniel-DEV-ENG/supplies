import GlobalStyles from '@mui/material/GlobalStyles';
import OrdersHeader from './OrdersHeader';
import OrdersTable from './OrdersTable';
import { useState } from 'react';
import CancelledOrdersTable from './CancelledOrderTabel';
import AcceptadeOrdersTable from './AcceptadeOrderTabel';
import ArchivedOrdersTable from './ArchivedOrderTabel';

/**
 * The orders page.
 */
function Orders() {
	const [selectedTab,setSelectedTab]=useState(0)
	return (
		<>
			<GlobalStyles
				styles={() => ({
					'#root': {
						maxHeight: '100vh'
					}
				})}
			/>
			<div className="w-full h-full container flex flex-col">
				<OrdersHeader setSelectedTab={setSelectedTab} />
			
					
							{selectedTab === 0 && 	<OrdersTable status='pending' />}
							{selectedTab === 1 &&	<AcceptadeOrdersTable status='accepted'/>}
							{selectedTab === 2 && 	<CancelledOrdersTable status='cancelled' />}
							{selectedTab === 3 && 	<ArchivedOrdersTable status='archived' />}
			
				
			
			</div>
		</>
	);
}

export default Orders;
