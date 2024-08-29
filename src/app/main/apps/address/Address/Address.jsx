import GlobalStyles from '@mui/material/GlobalStyles';
import ProductsTable from './AddressTable';
import AddressHeader from './AddressHeader';

/**
 * The products page.
 */
function Categories({ address }) {
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
				<AddressHeader address={address}/>
				<ProductsTable address={address} />
			</div>
		</>
	);
}

export default Categories;
