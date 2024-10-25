import type { Category } from "@/types/Category";
import { ScrollView, View } from "react-native";
import { CategoryChip } from "./categoryChip";
import { Link } from "expo-router";
import { Shapes } from "lucide-react-native";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

interface CategoryScrollProps {
    categories: Category[];
    selectedCategory: string;
    onSelectCategory: (categoryId: string) => void;
}

export const CategoryScroll: React.FC<CategoryScrollProps> = ({ categories, selectedCategory, onSelectCategory }) => {
    return (
        <ScrollView className="w-full border-red-500" horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex flex-row gap-4 w-full px-4">
                {categories.map((category) => (
                    <CategoryChip
                        key={category._id}
                        category={category}
                        selected={category._id === selectedCategory}
                        onSelectCategory={onSelectCategory}
                    />
                ))}

                <Link href="/note/categories" asChild>
                    <Button action="primary" className="p-2 w-10 border border-white">
                        <Icon as={Shapes} className="text-primary-600" />
                    </Button>
                </Link>
                    
            </View>
        </ScrollView>
    );
};