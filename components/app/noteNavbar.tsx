import { ArrowLeft, Save } from "lucide-react-native";
import { Icon } from "../ui/icon";
import { ActivityIndicator, View } from "react-native";
import { useRouter } from "expo-router";
import { Button } from "../ui/button";
import myToast from "../toast";

interface NavbarProps {
  canSave?: boolean;
  onSave: () => Promise<void>;
  pending?: boolean;
}

export function Navbar(props: NavbarProps) {
  const router = useRouter();

  const save = async () => {
    if (!props.canSave) {
      myToast(false, "Revisa los campos y vuelve a intentarlo");
      return;
    }

    await props.onSave();
  };

  return (
    <View className="w-full p-4 pt-0 flex flex-row justify-between">
      <View>
        <Button
          variant="link"
          size="lg"
          className=""
          onPress={async () =>{
            props.canSave && await save() 
            router.back()
          }}
        >
          <Icon as={ArrowLeft} className="text-white w-8 h-8" />
        </Button>
      </View>

      <View className="flex flex-row gap-4">
        <Button
          variant="link"
          size="lg"
          className=""
          onPress={async () => await save()}
          disabled={props.pending || !props.canSave}
        >
          {props.pending ? (
            <ActivityIndicator size={"small"} color={"#fff"} />
          ) : (
            <Icon
              as={Save}
              className={`w-8 h-8 ${!props.canSave ? "opacity-40" : ""}`}
            />
          )}
        </Button>
      </View>
    </View>
  );
}
