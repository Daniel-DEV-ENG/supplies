import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import _ from '@lodash';
import { FormProvider, useForm } from 'react-hook-form';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ProductModel from './models/ProductModel';
import ProductHeader from './ProductHeader';
import BasicInfoTab from './tabs/BasicInfoTab';
import { useGetProductQuery } from '../ProductsApi';
/**
 * Form Validation Schema
 */
const schema = z.object({
	name: z.string().nonempty('You must enter a product name').min(3, 'The product name must be at least 3 characters')
});

/**
 * The product page.
 */
function Product() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { Id } = routeParams;
	const {
		data: product,
		isLoading,
		isError
	} = useGetProductQuery(Id, {
		skip: !Id || Id === 'new'
	});
	const [tabValue, setTabValue] = useState(0);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});
	const { reset, watch,setValue,getValues } = methods;
	console.log("🚀 ~ Product ~ getValues:", getValues())
	const form = watch();
	useEffect(() => {
		if (Id === 'new') {
			reset(ProductModel({}));
		}
	}, [Id, reset]);
	useEffect(() => {
		if (product?.data) {
			reset({ ...product?.data });
			setValue('category_id',product?.data.category.id)
		}
	}, [product, reset,setValue]);

	if (isLoading) {
		return <FuseLoading />;
	}

	/**
	 * Show Message if the requested products is not exists
	 */
	if (isError && Id !== 'new') {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-col flex-1 items-center justify-center h-full"
			>
				<Typography
					color="text.secondary"
					variant="h5"
				>
					لايوجد منتج 
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/users/"
					color="inherit"
				>
					العودة الى صفحة المنتجات
				</Button>
			</motion.div>
		);
	}


	return (
		<FormProvider {...methods}>
			<FusePageCarded
				header={<ProductHeader />}
				content={
					<div className="p-16 sm:p-24 max-w-3xl">
						<div className={tabValue !== 0 ? 'hidden' : ''}>
							<BasicInfoTab data={product?.data.category}/>
						</div>
					</div>
				}
				scroll={isMobile ? 'normal' : 'content'}
			/>
		</FormProvider>
	);
}

export default Product;
