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
        <Text className="block text-xl font-medium text-white">
            {label}
        </Text>
    )
}