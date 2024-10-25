import { AppStyles } from "@/constants/AppStyles";
import { Rating } from "@kolking/react-native-rating";
import { Image, View } from "react-native";
import Animated, {useAnimatedStyle, withTiming} from "react-native-reanimated";


const exclamationFilled = require("@/assets/images/exclamation.png");

interface NoteImportanceProps {
    importance: number;
    onChange?: (rating: number) => void;
    disabled?: boolean;
    size?: number;
    color?: string;
}

export function NoteImportance(
    { importance, onChange, disabled, size }: NoteImportanceProps

) {
    return (
        <Rating
        disabled={disabled}
        size={size}
        baseColor="#303030"
        fillColor={AppStyles.colors["hot-pink"].DEFAULT}
        spacing={0}
        touchColor={AppStyles.colors["hot-pink"][300]}
        rating={importance}
        baseSymbol={exclamationFilled}
        fillSymbol={exclamationFilled}
        onChange={onChange}
      />
    )
}

export function NoteImportanceDisplay({ importance, size, color }: NoteImportanceProps) {
    const imageStyle = useAnimatedStyle(() => {
        return {
            tintColor: withTiming(color ?? AppStyles.colors["hot-pink"].DEFAULT),
            width: size,
            height: size
        }
    }, [color, size]);

    return (
        <View className="flex flex-row gap-1">
            {Array.from({ length: importance }, (_, index) => (
                <Animated.Image
                    key={index}
                    source={exclamationFilled}
                    style={[imageStyle]}
                />
            ))}
        </View>
    )
}