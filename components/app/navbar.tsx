import { User, ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react-native";
import { Text } from "../ui/text";
import { Avatar } from "../ui/avatar";
import { Icon } from "../ui/icon";
import { Pressable, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { Link } from "expo-router";
import { SortFunctions, sortDisplay } from "@/hooks/app/useSortNotes";
import { SortSheet } from "./sortSheet";
import { useRef } from "react";
import { ActionSheetRef } from "react-native-actions-sheet";
import { Button, ButtonText } from "../ui/button";
import { useAtom } from "jotai";
import { userAtom } from "@/utils/atoms/userAtom";

interface NavbarProps {
  sortFunctions: SortFunctions;
}

const sortIcons = {
  asc: ArrowUp,
  desc: ArrowDown,
};

export function Navbar({ sortFunctions: sortNotes }: NavbarProps) {
  const sheetRef = useRef<ActionSheetRef>(null);
  const [ currentUser ] = useAtom(userAtom)
  return (
    <View className="w-full p-4 pt-2 justify-end items-center flex-row gap-4">
      <TouchableOpacity
        onPress={() => sheetRef.current?.show()}
      >
        <Icon
          as={ArrowUpDown}
          className="w-6 h-6"
        />

        
      </TouchableOpacity>

      <View>
        <Link href={`/profile/${currentUser?._id}/settings`}>
          <Avatar
            size="md"
            className="border-2 border-bitpurple-600 bg-bitpurple-200"
          >
            <Icon as={User} className="text-bitpurple-600 w-6 h-6" />
          </Avatar>
        </Link>
      </View>

      <SortSheet sortFunctions={sortNotes} sheetRef={sheetRef}></SortSheet>
    </View>
  );
}
