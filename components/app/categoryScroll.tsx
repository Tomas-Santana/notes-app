import type { Category } from "@/types/Category";
import { ScrollView, View } from "react-native";
import { CategoryChip } from "./categoryChip";
import { Link } from "expo-router";
import { Shapes } from "lucide-react-native";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { AppStyles } from "@/constants/AppStyles";

interface CategoryScrollProps {
    categories: Category[];
    selectedCategory: string;
    onSelectCategory: (categoryId: string) => void;
    setColor: (color: {color: string, textColor: string}) => void;
}

export const CategoryScroll: React.FC<CategoryScrollProps> = ({ categories, selectedCategory, onSelectCategory, setColor }) => {
    return (
        <ScrollView className="w-full border-red-500" horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex flex-row gap-4 w-full px-4">
                {categories.map((category, i) => (
                    <CategoryChip
                        key={category._id}
                        category={category}
                        selected={category._id === selectedCategory}
                        onSelectCategory={
                            () => {
                                onSelectCategory(category._id);
                                setColor(AppStyles.colors.sythColors[i % AppStyles.colors.sythColors.length]);
                            }

                        }
                        color={AppStyles.colors.sythColors[i % AppStyles.colors.sythColors.length]}
                    />
                ))}
                <View style={{padding: 2}}>

                <Link href="/note/categories" asChild>
                    <Button action="primary" className="p-2 w-10 border border-white">
                        <Icon as={Shapes} className="text-primary-600" />
                    </Button>
                </Link>
                </View>
                    
            </View>
        </ScrollView>
    );
};