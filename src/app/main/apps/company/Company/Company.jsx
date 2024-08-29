import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import _ from '@lodash';
import { FormProvider, useForm } from 'react-hook-form';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ProductModel from './models/ProductModel';
import ProductHeader from './ComapnyHeader';
import BasicInfoTab from './tabs/BasicInfoTab';
import { useGetCompanyByIdQuery } from '../CompaniesApi';
/**
 * Form Validation Schema
 */
const schema = z.object({
	name: z.string().nonempty('يجب ادخال الاسم'),
	
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
	} = useGetCompanyByIdQuery(Id, {
		skip: !Id || Id === 'new'
	});
		console.log("🚀 ~ Product ~ product:", product)
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});
	const { reset, watch } = methods;
	const form = watch();
	useEffect(() => {
		if (Id === 'new') {
			reset(ProductModel({}));
		}
	}, [Id, reset]);
	useEffect(() => {
		if (product?.data) {
			reset({ ...product.data });
		}
	}, [product, reset]);

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
					لا يوجد شركة
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/companies/"
					color="inherit"
				>
					العودة الى صفحة الشركات
				</Button>
			</motion.div>
		);
	}

	/**
	 * Wait while product data is loading and form is setted
	 */
	

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				header={<ProductHeader />}
				content={
					<div className="p-16 m-16">
						<BasicInfoTab data={product?.data} />
					</div>
				}
				scroll={isMobile ? 'normal' : 'content'}
			/>
		</FormProvider>
	);
}

export default Product;
