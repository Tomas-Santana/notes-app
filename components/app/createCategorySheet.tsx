import { AppStyles } from "@/constants/AppStyles";
import { View } from "react-native";
import ActionSheet from "react-native-actions-sheet";
import CreateCategoryForm from "../appForms/createCategoryForm";
import AnimatedBG from "./animatedbg";

export function CreateCategorySheet() {
  return (
    <ActionSheet
      gestureEnabled
      containerStyle={{
        backgroundColor: AppStyles.colors.background.lighter,
        position: "relative",
      }}
    >
      <AnimatedBG
        gradientHeight={200}
        viewStyles={{
          position: "absolute",
          top: -16,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
        }}
      ></AnimatedBG>
      <View className="p-8 pt-0"
              style={{ backgroundColor: AppStyles.colors.background.lighterTransparent }}
      >
        <CreateCategoryForm />
      </View>
    </ActionSheet>
  );
}
