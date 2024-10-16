import { Category } from "@/types/Category";
import { View } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
interface CategoryChipProps {
  selected: boolean;
  onSelectCategory: (categoryId: string) => void;
  category: Category;
}

export function CategoryChip({
  selected,
  onSelectCategory,
  category,
}: CategoryChipProps) {
  return (
    <Button
      onPress={() => onSelectCategory(category._id)}
      className={`px-4 py-2`}
      action="primary"
      variant={selected ? "solid" : "outline"}
    >
      <ButtonText>{category.name}</ButtonText>
    </Button>
  );
}
