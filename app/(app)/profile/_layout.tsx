import { SafeAreaView } from "@/components/utils/SafeAreaView";
import {  Redirect, Slot } from "expo-router";
import { useAtomValue } from "jotai";
import { userAtom } from "@/utils/atoms/userAtom";
import { Bg } from "@/components/new/Bg";

export default function Profile() {
  const user = useAtomValue(userAtom);

  if (!user) {
    return <Redirect href="/" />;
  }
  return (
    <SafeAreaView className="flex-1 items-center-justify-center bg-eerie">
      <Slot></Slot>
      <Bg />
    </SafeAreaView>
  );
}