import { AppStyles } from "@/constants/AppStyles";
import {
  SortFunctions,
  SortType,
  UseSortNotesReturn,
  sortDisplay,
  sortOrderDisplay,
} from "@/hooks/app/useSortNotes";
import { View } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import {
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
} from "../ui/radio";
import { CircleIcon } from "lucide-react-native";
import { Button, ButtonText } from "../ui/button";
import { Heading } from "../ui/heading";
import { Text } from "../ui/text";
import { Divider } from "../ui/divider";
import { AnimatedBGButton } from "../new/gradientButton";

interface SortSheetProps {
  sortFunctions: SortFunctions;
  sheetRef: React.RefObject<ActionSheetRef>;
}

export function SortSheet({ sortFunctions: sortNotes, sheetRef }: SortSheetProps) {

  return (
    <ActionSheet
      ref={sheetRef}
      gestureEnabled
      containerStyle={{ backgroundColor: AppStyles.colors.background.lighter }}
    >
      <View className="p-8 pt-0 w-full">
        <View className="p-4 flex flex-col gap-4 justfy-start items-start w-full">

          <Heading size="2xl">Ordenar notas</Heading>

          <RadioGroup
            value={sortNotes.sortType}
            onChange={(value: SortType) => sortNotes.setSortType(value)}
          >
            {Object.entries(sortDisplay).map(([key, value]) => (
              <Radio key={key} value={key} size="lg">
                <RadioIndicator>
                  <RadioIcon as={CircleIcon} />
                </RadioIndicator>
                <RadioLabel>{value}</RadioLabel>
              </Radio>
            ))}

            </RadioGroup>

            {/* View divider */}

            <Divider className="bg-white my-0.5"></Divider>

            <RadioGroup
              value={sortNotes.sortOrder}
              onChange={(value: "asc" | "desc") => sortNotes.setSortOrder(value)}
            >
              {Object.entries(sortOrderDisplay).map(([key, value]) => (
                <Radio key={key} value={key} size="lg">
                  <RadioIndicator>
                    <RadioIcon as={CircleIcon} />
                  </RadioIndicator>
                  <RadioLabel>{value}</RadioLabel>
                </Radio>
              ))}
            </RadioGroup>

            <Button action="primary"
              onPress={() => {
                sheetRef.current?.hide();
              }}
              className=""
              style={{ width: "100%" }}
            >
              <ButtonText>
                Listo
              </ButtonText>
            </Button>
        </View>
      </View>
    </ActionSheet>
  );
}
