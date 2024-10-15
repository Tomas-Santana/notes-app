import { View } from "react-native";
import { Navbar } from "@/components/app/navbar";
import { SimpleFab } from "@/components/app/simpleFab";
import { useQuery } from "@tanstack/react-query";
import NoteController from "@/api/controllers/NoteController";
import { useEffect } from "react";
import { NotePreview } from "@/components/app/notePreview";
import { FlatList, Text } from "react-native";

export default function Notes() {
  const myNotes = useQuery({
    queryKey: ["myNotes"],
    queryFn: NoteController.myNotes,
  });

  useEffect(() => {
    console.log(myNotes.data);
  }, [myNotes.data]);

  return (
    <View className="h-screen">
      <Navbar />
      <View className="flex-1 p-4">
        <FlatList
          data={myNotes.data?.notes}
          keyExtractor={(item) => item._id.toString()}
          className="flex-1 rounded-lg"
          renderItem={({ item }) => (
            <NotePreview note={item} />
          )}
        />
      </View>
      <SimpleFab
        href={{ pathname: "/note/[id]", params: { id: "new" } }}
      />
    </View>
  );
}
