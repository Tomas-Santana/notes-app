import { registerSheet } from "react-native-actions-sheet";
import { CreateCategorySheet } from "@/components/app/createCategorySheet";

registerSheet("createCategory", CreateCategorySheet);

declare module "react-native-actions-sheet" {
    interface Sheets {
        "createCategory": typeof CreateCategorySheet;
    }
}