import { registerSheet } from "react-native-actions-sheet";
import { CreateCategorySheet } from "@/components/app/createCategorySheet";
import { updateUserSheet } from "../app/updateUserSheet";
import { DeleteUserSheet } from "../app/deleteUserSheet";

registerSheet("createCategory", CreateCategorySheet);
registerSheet("updateUser", updateUserSheet)
registerSheet("deleteUser", DeleteUserSheet)

declare module "react-native-actions-sheet" {
    interface Sheets {
        "createCategory": typeof CreateCategorySheet;
        "updateUser": typeof updateUserSheet;
        "deleteUser": typeof DeleteUserSheet;
    }
}