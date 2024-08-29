import { motion } from 'framer-motion';
import AddressDialog from '../product/Add';

/**
 * The products header.
 */

function AddressHeader({address}) {
	return (
		<div className="flex space-y-12 sm:space-y-0 flex-1 w-full items-center justify-between py-8 sm:py-16 px-16 md:px-24">
			<div className="flex flex-1 items-center justify-end space-x-8">
				<motion.div
					className="flex flex-grow-0"
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
				>
					<AddressDialog address={address} />
				</motion.div>
			</div>
		</div>
	);
}

export default AddressHeader;
