import { ArrowLeft, Save, Heart, Shapes } from "lucide-react-native";
import { Icon } from "../ui/icon";
import { ActivityIndicator, View } from "react-native";
import { useRouter } from "expo-router";
import { Button } from "../ui/button";
import myToast from "../toast";
import { UpdateNoteRequest } from "@/types/api/CreateOrUpdateNote";
import { Note } from "@/types/Note";
import { AppStyles } from "@/constants/AppStyles";


interface NavbarProps {
  canSave?: boolean;
  onSave: (update?: UpdateNoteRequest) => Promise<void>;
  pending?: boolean;
  setNote: (note: Note) => void;
  note?: Note;
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
          className="w-10"
          onPress={() => {
            props.note && props.setNote({
              ...props.note,
              isFavorite: !props.note.isFavorite,
            });
          }}
          disabled={props.pending}
        >
          {/* <Icon
            as={Heart}
            className={`w-8 h-8`}
            stroke={props.note?.isFavorite ? AppStyles.colors.bitpurple.DEFAULT : "#fff"}
            fill={"#fff"}
          /> */}
          <Heart
            className="w-8 h-8"
            stroke={props.note?.isFavorite ? AppStyles.colors.bitpurple.DEFAULT : "#fff"}
            fill={props.note?.isFavorite ? AppStyles.colors.bitpurple.DEFAULT : undefined}
          ></Heart>
        </Button>

        <Button
          variant="link"
          size="lg"
          className="w-10"
          onPress={() => router.push(`/note/${props.note?._id}/categories`)}
        >
          <Icon as={Shapes} className="w-8 h-8"/>
        </Button>

        <Button
          variant="link"
          size="lg"
          className=" w-10"
          onPress={async () => await save()}
          disabled={props.pending || !props.canSave}
        >
          {props.pending ? (
            <View className="w-8 h-8 grid place-content-center">

              <ActivityIndicator size={"small"} color={"#fff"} />
            </View>
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
