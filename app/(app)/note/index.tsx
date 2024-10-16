import { View } from "react-native";
import { Navbar } from "@/components/app/navbar";
import { SimpleFab } from "@/components/app/simpleFab";
import { useQuery } from "@tanstack/react-query";
import NoteController from "@/api/controllers/NoteController";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect } from "react";
import { NotePreview } from "@/components/app/notePreview";
import { FlatList, Text, ScrollView } from "react-native";

export default function Notes() {
  const myNotes = useQuery({
    queryKey: ["myNotes"],
    queryFn: NoteController.myNotes,
  });
  return (
    <View className="flex-1">
      <Navbar />

      <View className="flex-1 p-4">
        <GestureHandlerRootView className="flex-1">
          <FlatList
            data={myNotes.data?.notes}
            keyExtractor={(item) => item._id.toString()}
            contentContainerStyle={{ paddingVertical: 20 }}
            className="flex-1 rounded-lg"
            renderItem={({ item }) => <NotePreview note={item} />}
            ListEmptyComponent={
              <Text>
                No hay notas disponibles, pulsa el boton para empezar a crear
              </Text>
            }
          />
        </GestureHandlerRootView>
      </View>

      <SimpleFab href={{ pathname: "/note/[id]", params: { id: "new" } }} />
    </View>
  );
}
