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
      <FlatList
        data={myNotes.data?.notes}
        keyExtractor={(item) => item._id.toString()}
        className="p-4 flex-1"
        renderItem={({ item }) => (
          <NotePreview note={item} />
        )}
      />
      <SimpleFab
        href={{ pathname: "/note/[id]", params: { id: "new" } }}
      />
    </View>
  );
}
