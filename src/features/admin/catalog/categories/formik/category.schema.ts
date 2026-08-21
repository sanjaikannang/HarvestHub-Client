import * as Yup from 'yup';
import { PerishabilityTier, UnitOfMeasure } from '../../../../../utils/enum';

const localeTextSchema = Yup.object({
    en: Yup.string().required('English name is required').trim(),
    ta: Yup.string().required('Tamil name is required').trim(),
});

export const categoryValidationSchema = Yup.object({
    name: localeTextSchema,
    perishabilityTier: Yup.string().oneOf(Object.values(PerishabilityTier)).required('Perishability tier is required'),
    defaultUnitOfMeasure: Yup.string().oneOf(Object.values(UnitOfMeasure)).required('Default unit of measure is required'),
    subcategories: Yup.array()
        .of(
            Yup.object({
                key: Yup.string()
                    .required('Key is required')
                    .trim()
                    .matches(/^[a-z0-9_-]+$/, 'Lowercase letters, numbers, - or _ only'),
                name: localeTextSchema,
            })
        )
        .min(1, 'Add at least one subcategory')
        .test('unique-keys', 'Subcategory keys must be unique', (subcategories) => {
            if (!subcategories) return true;
            const keys = subcategories.map((s) => s?.key);
            return new Set(keys).size === keys.length;
        }),
});
