import { ArrowLeft, Save, Heart, Shapes } from "lucide-react-native";
import { Icon } from "../ui/icon";
import { ActivityIndicator, View } from "react-native";
import { useRouter } from "expo-router";
import { Button } from "../ui/button";
import myToast from "../toast";
import { UpdateNoteRequest } from "@/types/api/CreateOrUpdateNote";
import { Note } from "@/types/Note";
import { AppStyles } from "@/constants/AppStyles";
import { Text } from "../ui/text";
import { toast } from "sonner-native";


interface NavbarProps {
  canSave?: boolean;
  onSave: (update?: UpdateNoteRequest) => Promise<void>;
  pending?: boolean;
  setNote: (note: Note) => void;
  note?: Note;
}

export function Navbar(props: NavbarProps) {
  const router = useRouter();

  const save = async (
    update?: UpdateNoteRequest
  ) => {
    if (!props.canSave) {
      myToast(false, "Revisa los campos y vuelve a intentarlo");
      return;
    }

    await props.onSave(update);
  };

  return (
    <View className="w-full p-4 pt-0 flex flex-row justify-between">
      <View>
        <Button
          variant="link"
          size="lg"
          className=""
          onPress={() =>{
            if (props.note?._id === "new" || !props.note?._id){
              props.setNote({
                _id: "",
                title: "",
                content: "",
                html: "",
                isFavorite: false,
                createdAt: new Date(),
                updatedAt: new Date(),
                userId: "",
                importance: 0,
              })
            }

            router.back();
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
          onPress={async () => {
            const isFavorite = props.note?.isFavorite;
            console.log(isFavorite, "isFavorite"); 
            props.canSave && props.note?.isFavorite !== undefined && props.note._id !== "new" && props.note._id && save({
              _id: props.note?._id,
              isFavorite: !isFavorite,
            });
            props.note && props.setNote({
              ...props.note,
              isFavorite: !isFavorite,
            });
          }}
          disabled={props.pending}
        >
          
          <Heart
            className="w-8 h-8"
            stroke={props.note?.isFavorite ? AppStyles.colors["hot-pink"].DEFAULT : "#fff"}
            fill={props.note?.isFavorite ? AppStyles.colors["hot-pink"].DEFAULT : "transparent"}
          ></Heart>
        </Button>

        <Button
          variant="link"
          size="lg"
          className="w-10"
          onPress={() => {
            if (props.note?._id === "new" || !props.note?._id) {
              toast("Guarda la nota antes de agregar categorías");
              return;
            }
            router.push(`/note/${props.note?._id}/categories`)
          
          }}
        >
          <Icon as={Shapes} className={`w-8 h-8
              ${!props.note?._id || props.note?._id === "new" ? "opacity-40" : ""}
            `}/>
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

// simple navbar with just a back button
export function SimpleNavbar() {
  const router = useRouter();

  return (
    <View className="w-full p-4 pt-0 flex flex-row justify-start">
      <View>
        <Button
          variant="link"
          size="lg"
          className=""
          onPress={router.back}
        >
          <Icon as={ArrowLeft} className="text-white w-8 h-8" />
        </Button>
      </View>
    </View>
  );
}
