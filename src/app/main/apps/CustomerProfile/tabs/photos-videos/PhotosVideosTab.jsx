import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import FuseLoading from '@fuse/core/FuseLoading';
import { useGetArchivedOrderQuery } from '../../ProfileApi';

/**
 * The about tab.
 */
function ArchiveOrder({SalesManId}) {
	
	const { data: payments, isLoading } = useGetArchivedOrderQuery(SalesManId);
	console.log("🚀 ~ AboutTab ~ payments:", payments?.data)

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
<div className="table-responsive">
			<table className="simple">
				<thead>
					<tr>
						<th>
							<Typography className="font-semibold text-right">معروف</Typography>
						</th>
						<th>
							<Typography className="font-semibold text-right">عدد المنتجات</Typography>
						</th>
						<th>
							<Typography className="font-semibold text-right">كلفة الكلية</Typography>
						</th>
					
					</tr>
				</thead>
				<tbody>
					{payments?.data.map((product) => (
						<tr key={product.id}>
							<td className="text-right">
							<span className="truncate">{product.number}</span>

							</td>

							<td className="text-right">
								<span className="truncate">{product.products_number}</span>
							</td>
							<td className="text-right">
								<span className="truncate">{product.total_price}</span>
							</td>
						
						</tr>
					))}
				</tbody>
			</table>
		</div>
		</motion.div>
	);
}

export default ArchiveOrder;
