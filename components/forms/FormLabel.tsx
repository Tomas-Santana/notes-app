import { Text } from "../ui/text";

interface FormLabelProps {
    label: string;
}

export function FormLabel(
    {
        label
    }: FormLabelProps
) {
    return (
        <Text className="block text-sm font-medium text-secondary">
            {label}
        </Text>
    )
}