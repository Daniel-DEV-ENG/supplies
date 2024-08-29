import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { memo } from 'react';

const Root = styled('div')(({ theme }) => ({
	'& table ': {
		'& th:first-of-type, & td:first-of-type': {
			paddingLeft: `${0}!important`
		},
		'& th:last-child, & td:last-child': {
			paddingRight: `${0}!important`
		}
	},
	'& .divider': {
		width: 1,
		backgroundColor: theme.palette.divider,
		height: 144
	},
	'& .seller': {
		backgroundColor: theme.palette.primary.dark,
		color: theme.palette.getContrastText(theme.palette.primary.dark),
		marginRight: -88,
		paddingRight: 66,
		width: 480,
		'& .divider': {
			backgroundColor: theme.palette.getContrastText(theme.palette.primary.dark),
			opacity: 0.5
		}
	}
}));

/**
 * The invoice tab.
 */
function InvoiceTab(props) {
	const { order } = props;
	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2
	});
	return (
		<Root className="grow shrink-0 p-0">
			{order && (
				<Card className="w-xl mx-auto shadow-0">
					<CardContent className="p-88 print:p-0">
						<Typography
							color="text.secondary"
							className="mb-32"
						>
							{order.data.order_date}
						</Typography>

						<div className="flex justify-between">
							<div>
								<table className="mb-16">
									<tbody>
										<tr>
											<td className="pb-4">
												<Typography
													className="font-light"
													variant="h6"
													color="text.secondary"
												>
													الفاتورة
												</Typography>
											</td>
											<td className="pb-4 px-8">
												<Typography
													className="font-light"
													variant="h6"
													color="inherit"
												>
													{order.data.number}
												</Typography>
											</td>
										</tr>
									</tbody>
								</table>

								<Typography color="text.secondary">
									{`${order.data.customer.name} `}
								</Typography>

								{order.data.customer.location && (
									<Typography color="text.secondary">
										{order.data.customer.location}
									</Typography>
								)}
								{order.data.customer.contact && (
									<Typography color="text.secondary">{order.data.customer.contact}</Typography>
								)}
							</div>

							<div className="seller flex items-center p-16">
								<img
									className="w-80"
									src="assets/images/logo/logo.svg"
									alt="logo"
								/>

								<div className="divider mx-8 h-96" />

								<div className="px-8">
									<Typography color="inherit">FUSE INC.</Typography>

									<Typography color="inherit">2810 Country Club Road Cranford, NJ 07016</Typography>
									<Typography color="inherit">+66 123 455 87</Typography>
									<Typography color="inherit">hello@fuseinc.com</Typography>
									<Typography color="inherit">www.fuseinc.com</Typography>
								</div>
							</div>
						</div>

						<div className="mt-64">
							<Table className="simple">
								<TableHead>
									<TableRow>
										<TableCell>المنتج</TableCell>
										<TableCell align="right">السعر</TableCell>
										<TableCell align="right">الكمية</TableCell>
										<TableCell align="right">الكلي</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{order?.data.products?.map((product) => (
										<TableRow key={product.id}>
											<TableCell>
												<Typography variant="subtitle1">{product.name}</Typography>
											</TableCell>
											<TableCell align="right">
												{product.price && formatter.format(+product.price)}
											</TableCell>
											<TableCell align="right">{product.quantity}</TableCell>
											<TableCell align="right">
												{product.price &&
													product.quantity &&
													formatter.format(+product.price * product.quantity)}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>

			
						</div>

						<div className="mt-96">
							<Typography
								className="mb-24 print:mb-12"
								variant="body1"
							>
								يرجى الدفع خلال 15 يومًا. شكرًا 
							</Typography>

						</div>
					</CardContent>
				</Card>
			)}
		</Root>
	);
}

export default memo(InvoiceTab);
