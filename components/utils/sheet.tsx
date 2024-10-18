import { registerSheet } from "react-native-actions-sheet";
import { CreateCategorySheet } from "@/components/app/createCategorySheet";
import { updateUserSheet } from "../app/updateUserSheet";

registerSheet("createCategory", CreateCategorySheet);
registerSheet("updateUser", updateUserSheet)

declare module "react-native-actions-sheet" {
    interface Sheets {
        "createCategory": typeof CreateCategorySheet;
        "updateUser": typeof updateUserSheet;
    }
}