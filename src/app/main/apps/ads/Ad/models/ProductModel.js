import _ from '@lodash';
/**
 * The product model.
 */
const CategoriesModel = (data) =>
	_.defaults(data || {}, {
		id: '',
		name: '',
		image: ''
	});
export default CategoriesModel;
