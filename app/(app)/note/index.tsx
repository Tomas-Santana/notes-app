import { TextInput, View } from "react-native";
import { Navbar } from "@/components/app/navbar";
import { SimpleFab } from "@/components/app/simpleFab";
import { useQuery } from "@tanstack/react-query";
import NoteController from "@/api/controllers/NoteController";
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
import { useRef, useState } from "react";
import { EmptyNotesSplash } from "@/components/app/emptyNotesSplash";
import { Input, InputIcon, InputSlot, InputField } from "@/components/ui/input";
import { SearchIcon } from "lucide-react-native";
import { SearchNotes } from "@/components/app/noteSearch";
import { TouchableOpacity } from "react-native";
import { Text } from "@/components/ui/text";
import { TextInputProps } from "react-native";


export default function Notes() {
  const myNotes = useQuery({
    queryKey: ["myNotes"],
    queryFn: NoteController.myNotes,
  });

  const { selectedCategory, setSelectedCategory, filteredNotes, categories } =
    useCategoryFilter(myNotes);
  const { sortFunctions, sortedNotes } = useSortNotes(filteredNotes ?? []);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  
  return (
    <View className="flex-1 relative">
      {!searchOpen && (
        <Animated.View
          layout={LinearTransition}
          entering={FadeIn}
          exiting={FadeOut}
        >
          <Navbar sortFunctions={sortFunctions} />
          <CategoryScroll
            categories={categories ?? []}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </Animated.View>
      )}
      <Animated.View
        className={"p-4 flex flex-row gap-4 items-center"}
        layout={LinearTransition}
        entering={FadeIn}
        exiting={FadeOut}
      >
        <Animated.View
          className="flex-1 mt-4"
          layout={LinearTransition}
          entering={FadeIn}
          exiting={FadeOut}
        >
          <Input size="lg">
            <InputSlot className="pl-3">
              <InputIcon as={SearchIcon} />
            </InputSlot>
            <InputField
              value={searchQuery}
              placeholder="Busca en tus notas..."
              onFocus={() => setSearchOpen(true)}
              onChangeText={(text) => setSearchQuery(text)}
              ref={searchInputRef}
            />
          </Input>
        </Animated.View>
        {searchOpen && (
          <Animated.View
            layout={LinearTransition}
            entering={FadeIn}
            exiting={FadeOut}
            className="mt-4"
          >
            <TouchableOpacity
              onPress={() => {
                setSearchOpen(false);
                setSearchQuery("");
                // @ts-ignore
                searchInputRef.current?.blur();
              }}
            >
              <Text className="text-white text-lg">Cancelar</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </Animated.View>

      {!searchOpen && (
        <Animated.View
          layout={LinearTransition}
          entering={FadeIn}
          exiting={FadeOut}
          className={"flex-1"}
        >
          <ScrollView className="flex-1 p-4 ">
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                myNotes.refetch().then(() => setRefreshing(false));
              }}
            />
            <Animated.View
              layout={LinearTransition}
              entering={FadeIn}
              exiting={FadeOut}
              className="flex-1 flex-col gap-4"
            >
              {sortedNotes && sortedNotes.length === 0 && !myNotes.isLoading ? (
                <View className="mt-40">
                  <EmptyNotesSplash />
                </View>
              ) : (
                sortedNotes.map((note) => (
                  <NotePreview note={note} key={note._id} />
                ))
              )}

              {myNotes.isLoading && (
                <View className="flex-1 flex-col items-center justify-center">
                  <ActivityIndicator size="large" color="#fff" />
                </View>
              )}
            </Animated.View>
          </ScrollView>
        </Animated.View>
      )}

      {searchOpen && <SearchNotes searchQuery={searchQuery} />}

      <SimpleFab href={{ pathname: "/note/[id]", params: { id: "new" } }} />
    </View>
  );
}
