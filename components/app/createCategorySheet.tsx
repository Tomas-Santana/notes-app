import { AppStyles } from "@/constants/AppStyles";
import { View } from "react-native";
import ActionSheet from "react-native-actions-sheet";
import CreateCategoryForm from "../appForms/createCategoryForm";

export function CreateCategorySheet() {
  return (
    <ActionSheet
      gestureEnabled
      containerStyle={{ backgroundColor: AppStyles.colors.background.lighter }}
    >
      <View className="p-8 pt-0">
        <CreateCategoryForm />
      </View>
    </ActionSheet>
  );
}
