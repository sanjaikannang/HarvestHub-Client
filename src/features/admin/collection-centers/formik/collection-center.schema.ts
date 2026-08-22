import * as Yup from 'yup';

export const collectionCenterValidationSchema = Yup.object({
    districtId: Yup.string().required('District is required'),
    name: Yup.string().required('Name is required').trim(),
    address: Yup.object({
        line1: Yup.string().required('Address line is required').trim(),
        city: Yup.string().required('City is required').trim(),
        state: Yup.string().required('State is required').trim(),
        pincode: Yup.string().required('Pincode is required').trim(),
    }),
    contactPhone: Yup.string().required('Contact phone is required').trim(),
    capacityKg: Yup.number().min(0, 'Capacity cannot be negative').optional(),
});
