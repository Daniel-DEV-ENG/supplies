import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { lighten } from '@mui/material/styles';
import Box from '@mui/material/Box';
import FuseLoading from '@fuse/core/FuseLoading';
import ActivityItem from './ActivityItem';
import PostItem from './PostItem';
import { useGetProfileDataQuery } from '../../ProfileApi';
import { ReactBingmaps } from 'react-bingmaps';

/**
 * The timeline tab.
 */
function TimelineTab(props) {
	const { SalesManId }=props
	
	const { data: timeline, isLoading } = useGetProfileDataQuery(SalesManId);
	console.log("🚀 ~ TimelineTab ~ timeline:", timeline)
	
	if (isLoading) {
		return <FuseLoading />;
	}

	const container = {
		show: {
			transition: {
				staggerChildren: 0.04
			}
		}
	};
	const item = {
		hidden: { opacity: 0, y: 40 },
		show: { opacity: 1, y: 0 }
	};
	


	return (
		<motion.div
			variants={container}
			initial="hidden"
			animate="show"
			className="w-full"
		>
			<div style={{ height: 500 ,width:'100%' }}>
			<ReactBingmaps
				bingmapKey="Al7JYQOwHtTN6dPvmuohYVVUnQV616aNg_dZ3dwpTt9a3PSdC8Sxp1DiP6Y6L3CD"
				center={[timeline?.data.latitude,timeline?.data.longitude]} // Seattle Coordinates
				zoom={20}
				style={{ width: '100%', height: '500px' }}
				pushPins = {
					[
					  {
						"location":[timeline?.data?.latitude,timeline?.data.longitude], "option":{ color: 'red' }
					  }
					]
				  }
				
				  
				
				/>
				</div>
		</motion.div>
	);
}

export default TimelineTab;
