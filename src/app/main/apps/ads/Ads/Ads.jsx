import GlobalStyles from '@mui/material/GlobalStyles';
import ProductsHeader from './AdsHeader';
import ProductsTable from './AdsTable';

/**
 * The products page.
 */
function Categories() {
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
				<ProductsHeader />
				<ProductsTable />
			</div>
		</>
	);
}

export default Categories;
