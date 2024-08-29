import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GoogleMap from 'google-map-react';
import { useState } from 'react';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useParams } from 'react-router-dom';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import { useGetECommerceOrderQuery } from '../../ECommerceApi';
import OrdersStatus from '../OrdersStatus';

const mapKey = import.meta.env.VITE_MAP_KEY;

/**
 * The marker.
 */
function Marker(props) {
	const { text, lat, lng } = props;
	return (
		<Tooltip
			title={
				<div>
					{text}
					<br />
					{lat}, {lng}
				</div>
			}
			placement="top"
		>
			<FuseSvgIcon className="text-red">heroicons-outline:location-marker</FuseSvgIcon>
		</Tooltip>
	);
}

/**
 * The order details tab.
 */
function OrderDetailsTab() {
	const routeParams = useParams();
	const { orderId } = routeParams;
	const { data: order, isError } = useGetECommerceOrderQuery(orderId, {
		skip: !orderId
	});
	const [map, setMap] = useState('shipping');

	if (!isError && !order) {
		return null;
	}

	return (
		<div>
			<div className="pb-48">
				<div className="pb-16 flex items-center">
					<FuseSvgIcon color="action">heroicons-outline:user-circle</FuseSvgIcon>
					<Typography
						className="h2 mx-12 font-medium"
						color="text.secondary"
					>
						الزبون
					</Typography>
				</div>

				<div className="mb-24">
					<div className="table-responsive mb-48">
						<table className="simple">
							<thead>
								<tr>
									<th>
										<Typography className="font-semibold text-right">اسم الزبون</Typography>
									</th>
									<th>
										<Typography className="font-semibold text-right">التواصل</Typography>
									</th>
									<th>
										<Typography className="font-semibold text-right">الموقع</Typography>
									</th>
							
								
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>
										<div className="flex items-center">
											<Avatar src={order.data.customer.name} />
											<Typography className="truncate mx-8">
												{`${order.data.customer.name} `}
											</Typography>
										</div>
									</td>
									<td>
										<Typography className="truncate">{order.data.customer.contact}</Typography>
									</td>
									<td>
										<span className="truncate">{order.data.customer.location}</span>
									</td>
								
								</tr>
							</tbody>
						</table>
					</div>

				</div>
			</div>
			<div className="pb-48">
				<div className="pb-16 flex items-center">
					<FuseSvgIcon color="action">heroicons-outline:user-circle</FuseSvgIcon>
					<Typography
						className="h2 mx-12 font-medium"
						color="text.secondary"
					>
						المندوب
					</Typography>
				</div>

				<div className="mb-24">
					<div className="table-responsive mb-48">
						<table className="simple">
							<thead>
								<tr>
									<th>
										<Typography className="font-semibold text-right">اسم المندوب</Typography>
									</th>
									<th>
										<Typography className="font-semibold text-right">التواصل</Typography>
									</th>
								
							
								
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>
										<div className="flex items-center">
											<Avatar src={order.data?.customer?.name} />
											<Typography className="truncate mx-8">
												{`${order.data?.salesman?.name ? order.data?.salesman?.name: 'لا يوجد مندوب ' } `}
											</Typography>
										</div>
									</td>
									<td>
										<Typography className="truncate text-right">{order.data?.salesman?.contact}</Typography>
									</td>
								
								
								</tr>
							</tbody>
						</table>
					</div>

				</div>
			</div>

			<div className="pb-48">
				<div className="pb-16 flex items-center">
					<FuseSvgIcon color="action">heroicons-outline:clock</FuseSvgIcon>
					<Typography
						className="h2 mx-12 font-medium"
						color="text.secondary"
					>
						حالة الطلب
					</Typography>
					<Typography
						className="h2 mx-12 font-medium"
						color="text.secondary"
					>
						{order.data.status}
					</Typography>
				</div>
				<div className="pb-16 flex items-center">
					<FuseSvgIcon color="action">heroicons-outline:clock</FuseSvgIcon>
					<Typography
						className="h2 mx-12 font-medium"
						color="text.secondary"
					>
						تاريخ الطلب
					</Typography>
					<Typography
						className="h2 mx-12 font-medium"
						color="text.secondary"
					>
						{order.data.order_date}
					</Typography>
				</div>

	
			</div>




		</div>
	);
}

export default OrderDetailsTab;
