import { Plus, Trash2 } from "lucide-react";
import InputField from "./Input";

interface ImageUrlListFieldProps {
    images: string[];
    onChange: (images: string[]) => void;
    error?: string;
    touched?: boolean;
    label?: string;
    required?: boolean;
    addButtonLabel?: string;
}

// Stand-in for real Cloudinary upload — the server has a CloudinaryService
// with a signed-upload helper, but no controller exposes it yet, so users
// paste image URLs directly for now (see database/products.md /
// database/inspections.md — both just declare these as `array of string`,
// Cloudinary URLs by convention).
const ImageUrlListField = ({
    images,
    onChange,
    error,
    touched,
    label = "Image URLs",
    required = true,
    addButtonLabel = "Add Image URL",
}: ImageUrlListFieldProps) => {
    const updateAt = (index: number, value: string) => {
        const next = [...images];
        next[index] = value;
        onChange(next);
    };

    const removeAt = (index: number) => {
        onChange(images.filter((_, i) => i !== index));
    };

    const hasError = touched && error;

    return (
        <div>
            <label className="block text-sm font-medium text-textTertiary mb-2">
                {label} {required && <span className="text-red-600">*</span>}
            </label>
            <div className="space-y-2">
                {images.map((url, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <InputField
                            id={`images.${index}`} name={`images.${index}`}
                            placeholder="https://res.cloudinary.com/..."
                            value={url}
                            onChange={(e) => updateAt(index, e.target.value)}
                            className="flex-1"
                        />
                        <button
                            type="button"
                            title="Remove image"
                            onClick={() => removeAt(index)}
                            disabled={required && images.length === 1}
                            className="p-2 hover:bg-bgSecondary text-red-600 hover:text-red-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                ))}
            </div>
            {hasError && <p className="text-xs text-red-600 mt-1">{error}</p>}
            <button
                type="button"
                onClick={() => onChange([...images, ""])}
                className="flex items-center gap-1.5 text-sm font-medium text-primary hover:underline cursor-pointer mt-2"
            >
                <Plus className="h-4 w-4" /> {addButtonLabel}
            </button>
        </div>
    );
};

export default ImageUrlListField;
