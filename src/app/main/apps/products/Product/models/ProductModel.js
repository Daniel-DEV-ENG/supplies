import _ from '@lodash';
/**
 * The product model.
 */
const ProductModel = (data) =>
	_.defaults(data || {}, {
	
		name: '',
		images: [],

	});
export default ProductModel;
