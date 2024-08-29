import GlobalStyles from '@mui/material/GlobalStyles';
import ProductsHeader from './CitiesHeader';
import ProductsTable from './CitiesTable';

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
