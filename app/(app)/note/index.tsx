import { View } from "react-native";
import { Navbar } from "@/components/app/navbar";
import { SimpleFab } from "@/components/app/simpleFab";
import { useQuery } from "@tanstack/react-query";
import NoteController from "@/api/controllers/NoteController";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ScrollView, RefreshControl } from "react-native";
import { NotePreview } from "@/components/app/notePreview";
import { CategoryScroll } from "@/components/app/categoryScroll";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import { useCategoryFilter } from "@/hooks/app/useCategoryFilter";
import { useSortNotes } from "@/hooks/app/useSortNotes";
import { ActivityIndicator } from "react-native";
import { useState } from "react";

export default function Notes() {
  const myNotes = useQuery({
    queryKey: ["myNotes"],
    queryFn: NoteController.myNotes,
  });

  const { selectedCategory, setSelectedCategory, filteredNotes, categories } = useCategoryFilter(myNotes);
  const { sortFunctions, sortedNotes} = useSortNotes(filteredNotes ?? []);  
  const [refreshing, setRefreshing] = useState(false);


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
          {/* refreshcontrol */}
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              console.log("refreshing");
              setTimeout(() => {
                setRefreshing(false);
              }, 1000);
            }}
          />
          <Animated.View
            layout={LinearTransition}
            entering={FadeIn}
            exiting={FadeOut}
            className="flex-1 flex-col gap-4 py-4"
          >
            {sortedNotes && sortedNotes.map((note) => <NotePreview note={note} key={note._id} />)}
            {/* loading */}
            {myNotes.isLoading && (
              <View className="flex-1 flex-col items-center justify-center">
                <ActivityIndicator size="large" color="#fff" />
              </View>
            )}
          </Animated.View>
        </ScrollView>
      </GestureHandlerRootView>

      <SimpleFab href={{ pathname: "/note/[id]", params: { id: "new" } }} />
    </View>
  );
}
