import { AppStyles } from "@/constants/AppStyles";
import { Rating } from "@kolking/react-native-rating";
import { Image, View } from "react-native";


const exclamationFilled = require("@/assets/images/exclamation.png");

interface NoteImportanceProps {
    importance: number;
    onChange?: (rating: number) => void;
    disabled?: boolean;
    size?: number;
}

export function NoteImportance(
    { importance, onChange, disabled, size }: NoteImportanceProps

) {
    return (
        <Rating
        disabled={disabled}
        size={size}
        baseColor="#303030"
        fillColor={AppStyles.colors.bitpurple.DEFAULT}
        spacing={0}
        touchColor={AppStyles.colors.bitpurple[100]}
        rating={importance}
        baseSymbol={exclamationFilled}
        fillSymbol={exclamationFilled}
        onChange={onChange}
      />
    )
}

export function NoteImportanceDisplay({ importance, size }: NoteImportanceProps) {
    return (
        <View className="flex flex-row gap-1">
            {Array.from({ length: importance }, (_, index) => (
                <Image
                    key={index}
                    source={exclamationFilled}
                    style={{ tintColor: AppStyles.colors["hot-pink"].DEFAULT, width: size, height: size }}
                />
            ))}
        </View>
    )
}