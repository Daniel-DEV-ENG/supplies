import { Tab, Tabs } from '@mui/material';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useState } from 'react';
import OrdersTable from './OrdersTable';

/**
 * The orders header.
 */
function OrdersHeader({setSelectedTab}) {
	const [tabValue, setTabValue] = useState(0);
	function handleTabChange(event, value) {
		setTabValue(value);
		setSelectedTab(value);
	}

	return (
		<div className="flex space-y-12 sm:space-y-0 flex-1 w-full items-center justify-between py-8 sm:py-16 px-16 md:px-24">
			<motion.span
				initial={{ x: -20 }}
				animate={{
					x: 0,
					transition: { delay: 0.2 }
				}}
			>
				<Typography className="flex text-24 md:text-32 font-extrabold tracking-tight">الطلبات</Typography>
			</motion.span>
			<Tabs
						value={tabValue}
						onChange={handleTabChange}
						indicatorColor="secondary"
						textColor="secondary"
						variant="scrollable"
						scrollButtons="auto"
						classes={{ root: 'w-full h-64 border-b-1' }}
						
					>
						<Tab
							className="h-64"
							label="قيد المعالجة"
						/>
						<Tab
							className="h-64"
							label="المقبولة"
						/>
						<Tab
							className="h-64"
							label="الملغاة"
						/>
						<Tab
							className="h-64"
							label="المؤرشفة"
						/>
					</Tabs>
				
				
				
		</div>
	);
}

export default OrdersHeader;
