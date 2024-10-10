import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Text } from "@/components/ui/text";

type NoteParams = {
    id: string;
}

export default function Note() {
    const params = useLocalSearchParams<NoteParams>();

    return (
        <View className="p-4">
            <Text>
                {params.id}
            </Text>
        </View>
    )
}