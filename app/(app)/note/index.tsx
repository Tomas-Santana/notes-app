import { View } from "react-native";
import { Navbar } from "@/components/app/navbar";
import { SimpleFab } from "@/components/app/simpleFab";
import { useQuery } from "@tanstack/react-query";
import NoteController from "@/api/controllers/NoteController";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ScrollView } from "react-native";
import { NotePreview } from "@/components/app/notePreview";
import { CategoryScroll } from "@/components/app/categoryScroll";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import { Note } from "@/types/Note";
import { useCategoryFilter } from "@/hooks/app/useCategoryFilter";
import { useSortNotes } from "@/hooks/app/useSortNotes";

export default function Notes() {
  const myNotes = useQuery({
    queryKey: ["myNotes"],
    queryFn: NoteController.myNotes,
  });

  const { selectedCategory, setSelectedCategory, filteredNotes, categories } = useCategoryFilter(myNotes);
  const { sortFunctions, sortedNotes} = useSortNotes(filteredNotes ?? []);  


  return (
    <View className="flex-1 relative">
      <View>
        <Navbar
          sortFunctions={sortFunctions}
        />
        <CategoryScroll
          categories={categories ?? []}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </View>
      <GestureHandlerRootView className="flex-1">

        <ScrollView className="flex-1 p-4">
          <Animated.View
            layout={LinearTransition}
            entering={FadeIn}
            exiting={FadeOut}
            className="flex-1 flex-col gap-4 py-4"
          >
            {sortedNotes && sortedNotes.map((note) => <NotePreview note={note} key={note._id} />)}
          </Animated.View>
        </ScrollView>
      </GestureHandlerRootView>

      <SimpleFab href={{ pathname: "/note/[id]", params: { id: "new" } }} />
    </View>
  );
}
