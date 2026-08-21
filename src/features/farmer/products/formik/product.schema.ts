import * as Yup from 'yup';
import { CollectionMethod, UnitOfMeasure } from '../../../../utils/enum';

// biddingEndTime is intentionally absent — the server always computes it as
// biddingStartTime + 30 minutes.
export const productValidationSchema = Yup.object({
    categoryId: Yup.string().required('Category is required'),
    subcategoryKey: Yup.string().required('Subcategory is required'),
    name: Yup.string().required('Product name is required').trim(),
    description: Yup.string().required('Description is required').trim(),
    images: Yup.array().of(Yup.string().url('Must be a valid URL').required()).min(1, 'Add at least one image URL'),
    estimatedQuantity: Yup.number().typeError('Enter a number').positive('Must be greater than 0').required('Estimated quantity is required'),
    unitOfMeasure: Yup.string().oneOf(Object.values(UnitOfMeasure)).required('Unit of measure is required'),
    startingPrice: Yup.number().typeError('Enter a number').positive('Must be greater than 0').required('Starting price is required'),
    biddingDate: Yup.string().required('Bidding date is required'),
    biddingTime: Yup.string().required('Bidding start time is required'),
    collectionMethod: Yup.string().oneOf(Object.values(CollectionMethod)).required('Collection method is required'),
});
