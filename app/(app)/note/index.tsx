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
import { EmptyNotesSplash } from "@/components/app/emptyNotesSplash";

export default function Notes() {
  const myNotes = useQuery({
    queryKey: ["myNotes"],
    queryFn: NoteController.myNotes,
  });

  const { selectedCategory, setSelectedCategory, filteredNotes, categories } =
    useCategoryFilter(myNotes);
  const { sortFunctions, sortedNotes } = useSortNotes(filteredNotes ?? []);

  return (
    <View className="flex-1 relative">
      <View>
        <Navbar sortFunctions={sortFunctions} />
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
            refreshing={myNotes.isFetching || myNotes.isPending}
            onRefresh={() => {
              myNotes.refetch();
            }}
          />
          <Animated.View
            layout={LinearTransition}
            entering={FadeIn}
            exiting={FadeOut}
            className="flex-1 flex-col gap-4 py-4"
          >
            {sortedNotes && sortedNotes.length > 0 && !myNotes.isLoading ? (
              sortedNotes.map((note) => (
                <NotePreview note={note} key={note._id} />
              ))
            ) : (
              <View className="mt-40">
                <EmptyNotesSplash />
              </View>
            )}

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
