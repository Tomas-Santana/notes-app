import type { Category } from "@/types/Category";
import { ScrollView, View } from "react-native";
import { CategoryChip } from "./CategoryChip";

interface CategoryScrollProps {
    categories: Category[];
    selectedCategory: string;
    onSelectCategory: (categoryId: string) => void;
}

export const CategoryScroll: React.FC<CategoryScrollProps> = ({ categories, selectedCategory, onSelectCategory }) => {
    return (
        <ScrollView className="w-full border-red-500" horizontal style={{paddingLeft: 16}}>
            <View className="flex flex-row gap-4 w-full">
                {categories.map((category) => (
                    <CategoryChip
                        key={category._id}
                        category={category}
                        selected={category._id === selectedCategory}
                        onSelectCategory={onSelectCategory}
                    />
                ))}
            </View>
        </ScrollView>
    );
};