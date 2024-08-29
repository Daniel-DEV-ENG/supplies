import GlobalStyles from '@mui/material/GlobalStyles';
import CompaniesHeader from './CompaniesHeader';
import CompaniesTable from './CompaniesTable';

/**
 * The products page.
 */
function Companies() {
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
				<CompaniesHeader />
				<CompaniesTable />
			</div>
		</>
	);
}

export default Companies;
