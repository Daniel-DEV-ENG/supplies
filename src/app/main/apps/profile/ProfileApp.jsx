import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Box from '@mui/material/Box';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useParams } from 'react-router';
import { useGetSalesManQuery } from '../salesman/UsersApi';
import TimelineTab from './tabs/timeline/TimelineTab';

const Root = styled(FusePageSimple)(({ theme }) => ({
	'& .FusePageSimple-header': {
		backgroundColor: theme.palette.background.paper,
		borderBottomWidth: 1,
		borderStyle: 'solid',
		borderColor: theme.palette.divider,
		'& > .container': {
			maxWidth: '100%'
		}
	},
	'& .FusePageSimple-content': {
		overflowY: 'scroll', // هنا تم تفعيل التمرير العمودي
	},
}));

/**
 * The profile page.
 */
function ProfileApp() {
	const [selectedTab, setSelectedTab] = useState(0);
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const { id } = useParams();
	console.log("🚀 ~ ProfileApp ~ id:", id);
	const { data, isLoading } = useGetSalesManQuery(id);
	console.log("🚀 ~ ProfileApp ~ data:", data);

	function handleTabChange(event, value) {
		setSelectedTab(value);
	}

	return (
		<Root
			header={
				<div className="flex flex-col w-full" style={{ overflowY: 'scroll' }}>
					<img
						className="h-50 lg:h-50 object-cover w-full"
						src="assets/images/logo/cover.jpg"
						alt="Profile Cover"
					/>

					<div className="flex flex-col flex-0 lg:flex-row items-center max-w-5xl w-full mx-auto px-32 lg:h-72">
						<div className="-mt-96 lg:-mt-88 rounded-full">
							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: 1, transition: { delay: 0.1 } }}
							>
								<Avatar
									sx={{ borderColor: 'background.paper' }}
									className="w-128 h-128 border-4"
									src="assets/images/logo/profile.png"
									alt="User avatar"
								/>
							</motion.div>
						</div>

						<div className="flex flex-col items-center lg:items-start mt-16 lg:mt-0 lg:ml-32">
							<Typography className="text-lg font-bold leading-none">{data?.data?.name}</Typography>
							<Typography color="text.secondary">{data?.data?.contact}</Typography>
						</div>

						<div className="hidden lg:flex h-32 mx-32 border-l-2" />

						<div className="flex items-center mt-24 lg:mt-0 space-x-24">
							<div className="flex flex-col items-center">
								<Typography className="font-bold">{data?.data?.company.name}</Typography>
								<Typography
									className="text-sm font-medium"
									color="text.secondary"
								>
									{data?.data?.company.city.name}
								</Typography>
							</div>
				
						</div>

						<div className="flex flex-1 justify-end my-16 lg:my-0">
							<Tabs
								value={selectedTab}
								onChange={handleTabChange}
								indicatorColor="primary"
								textColor="inherit"
								variant="scrollable"
								scrollButtons={false}
								className="-mx-4 min-h-40"
								classes={{ indicator: 'flex justify-center bg-transparent w-full h-full' }}
								TabIndicatorProps={{
									children: (
										<Box
											sx={{ bgcolor: 'text.disabled' }}
											className="w-full  rounded-full opacity-20"
										/>
									)
								}}
							>
								<Tab
									className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 "
									disableRipple
									label="مراقبة الرحلات"
								/>
								
							</Tabs>
						</div>
					</div>
				</div>
			}
			
			scroll={isMobile ? 'normal' : 'page'}
			content={
				<div className="flex flex-auto justify-center w-full max-w-5xl mx-auto p-24 sm:p-32">
					{selectedTab === 0 && <TimelineTab SalesManId={id} />}
				</div>
			}
		/>
	);
}

export default ProfileApp;
