import { AppStyles } from "@/constants/AppStyles";
import { View } from "react-native";
import ActionSheet from "react-native-actions-sheet";
import UpdateUserForm from "../appForms/updateUserForm";

export function updateUserSheet() {
  return (
    <ActionSheet
      gestureEnabled
      containerStyle={{ backgroundColor: AppStyles.colors.background.lighter }}
    >
      <UpdateUserForm />
    </ActionSheet>
  )
}