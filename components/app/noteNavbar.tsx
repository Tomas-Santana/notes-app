import { ArrowLeft, Save } from "lucide-react-native";
import { Icon } from "../ui/icon";
import { ActivityIndicator, View } from "react-native";
import { useRouter } from "expo-router";
import { Button } from "../ui/button";

interface NavbarProps {
  canSave?: boolean;
  onSave?: () => Promise<void>;
  pending?: boolean;
}

export function Navbar(
    props: NavbarProps
) {
  const router = useRouter();
  return (
    <View className="w-full p-4 pt-0 flex flex-row justify-between">
      <View>
        <Button
          variant="link"
          size="lg"
          className=""
          onPress={() => router.back()}
        >
          <Icon as={ArrowLeft} className="text-white w-8 h-8" />
        </Button>
      </View>

      <View className="flex flex-row gap-4">


        {props.canSave && (
        <Button
          variant="link"
          size="lg"
          className=""
          onPress={async () => props.onSave && await props.onSave()}
          disabled={props.pending}
        >
          <Icon as={Save} className="text-white w-8 h-8" />
        </Button>
        )}
      </View>
    </View>
  );
}
