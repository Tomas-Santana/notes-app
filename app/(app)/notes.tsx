import { Text, View } from "react-native";
import { userAtom } from "@/utils/atoms/userAtom";
import { useAtomValue } from "jotai";

export default function Notes() {
  const user = useAtomValue(userAtom);
  return (
    <View className="" style={{"padding": 100}}>
      <Text className="text-white">
        {user ? `Welcome, ${user.firstName}` : "Notes Page"}
      </Text>
    </View>
  );
}
