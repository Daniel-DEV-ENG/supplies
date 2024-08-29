import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import _ from '@lodash';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import {
	useCreateCompanyMutation,
	useDeleteCompanyMutation,
	useUpdateCompanyMutation
} from '../CompaniesApi';
import { ShowSuccessToast } from 'app/shared-components/showSuccessToast';
import { ShowErrorToast } from 'app/shared-components/ShowErrorToast';

/**
 * The product header.
 */
function ProductHeader() {
	const routeParams = useParams();
	const { Id } = routeParams;
	const [saveProduct] = useUpdateCompanyMutation();
	const [createProduct]=useCreateCompanyMutation()
	const [removeProduct] = useDeleteCompanyMutation();
	const methods = useFormContext();
	const { formState, watch, getValues } = methods;
	const { isValid, dirtyFields } = formState;
	const theme = useTheme();
	const navigate = useNavigate();
	const { name, image } = watch();

	function handleSaveProduct() {
		const {image,name,city_id,size,manager}=getValues()
		const formData = new FormData()
		if(image.file)
			formData.append('image',image.file)
		formData.append('name',name)
		formData.append('_method','PUT')
		formData.append('city_id',city_id)
		formData.append('size',size)
		formData.append('manager[name]',manager.name)
		formData.append('manager[contact]',manager.contact)
		formData.append('manager[password]',manager.password)
		try{
			saveProduct({id:Id,formData:formData});
ShowSuccessToast('تم تعديل بنجاح')
navigate(`/apps/companies`);
		} catch(error)
		{
ShowErrorToast(error)
		}
	}

	function handleCreateProduct() {
		
		const {image,name,city_id,size,manager}=getValues()
		const formData = new FormData()
		formData.append('image',image.file)
		formData.append('name',name)
		formData.append('city_id',city_id)
		formData.append('size',size)
		formData.append('manager[name]',manager.name)
		formData.append('manager[contact]',manager.contact)
		formData.append('manager[password]',manager.password)
		createProduct(formData)
			.unwrap()
			.then(() => {
				navigate(`/apps/companies`);
			})
			.catch((error)=>{
				ShowErrorToast(error)
			})
	}

	function handleRemoveProduct() {
		removeProduct(Id);
		navigate('/apps/companies');
	}

	return (
		<div className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-24 sm:py-32 px-24 md:px-32">
			<div className="flex flex-col items-start space-y-8 sm:space-y-0 w-full sm:max-w-full min-w-0">
				<motion.div
					initial={{ x: 20, opacity: 0 }}
					animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
				>
					<Typography
						className="flex items-center sm:mb-12"
						component={Link}
						role="button"
						to="/apps/companies"
						color="inherit"
					>
						<FuseSvgIcon size={20}>
							{theme.direction === 'ltr'
								? 'heroicons-outline:arrow-sm-left'
								: 'heroicons-outline:arrow-sm-right'}
						</FuseSvgIcon>
						<span className="flex mx-4 font-medium">الشركة</span>
					</Typography>
				</motion.div>

				<div className="flex items-center max-w-full">
					<motion.div
						className="hidden sm:flex"
						initial={{ scale: 0 }}
						animate={{ scale: 1, transition: { delay: 0.3 } }}
					>
						{image ? (
							<img
								className="w-32 sm:w-48 rounded"
								src={import.meta.env.VITE_APP_Image + image}
								alt={name}
							/>
						) : (
							<img
								className="w-32 sm:w-48 rounded"
								src="assets/images/apps/ecommerce/product-image-placeholder.png"
								alt={name}
							/>
						)}
					</motion.div>
					<motion.div
						className="flex flex-col min-w-0 mx-8 sm:mx-16"
						initial={{ x: -20 }}
						animate={{ x: 0, transition: { delay: 0.3 } }}
					>
						<Typography className="text-16 sm:text-20 truncate font-semibold">
							{name || 'إضافة شركة جديدة'}
						</Typography>
						<Typography
							variant="caption"
							className="font-medium"
						>
							تفاصيل الشركة
						</Typography>
					</motion.div>
				</div>
			</div>
			<motion.div
				className="flex flex-1 w-full"
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
			>
				{Id !== 'new' ? (
					<>
						<Button
							className="whitespace-nowrap mx-4"
							variant="contained"
							color="secondary"
							onClick={handleRemoveProduct}
							startIcon={<FuseSvgIcon className="hidden sm:flex">heroicons-outline:trash</FuseSvgIcon>}
						>
							حذف
						</Button>
						<Button
							className="whitespace-nowrap mx-4"
							variant="contained"
							color="secondary"
							disabled={_.isEmpty(dirtyFields) || !isValid}
							onClick={handleSaveProduct}
						>
							حفظ
						</Button>
					</>
				) : (
					<Button
						className="whitespace-nowrap mx-4"
						variant="contained"
						color="secondary"
						disabled={_.isEmpty(dirtyFields) || !isValid}
						onClick={handleCreateProduct}
					>
						إضافة
					</Button>
				)}
			</motion.div>
		</div>
	);
}

export default ProductHeader;
