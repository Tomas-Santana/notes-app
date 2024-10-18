import { AppStyles } from "@/constants/AppStyles";
import { View } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { Button, ButtonText } from "../ui/button";
import { Heading } from "../ui/heading";
import { Text } from "../ui/text";
import UserController from "@/api/controllers/UserController";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import myToast from "../toast";
import { useAtomValue } from "jotai";
import { userAtom } from "@/utils/atoms/userAtom";
import { useRef } from "react";
import { ActivityIndicator } from "react-native";

export function DeleteUserSheet() {
  const currentUser = useAtomValue(userAtom);
  const queryClient = useQueryClient();
  const sheetRef = useRef<ActionSheetRef>(null);

  const deleteUserMutation = useMutation({
    mutationFn: UserController.DeleteUser,
    onSuccess: () => {
      myToast(true, "Usuario eliminado con exito!");
      queryClient.invalidateQueries({ queryKey: ["user", currentUser?._id] });
      queryClient.clear();
      router.push("/");
    },
    onError: (error) => {
      console.error("Error al eliminar el usuario: ", error.message);
    },
  });

  return (
    <ActionSheet
      gestureEnabled
      containerStyle={{ backgroundColor: AppStyles.colors.background.lighter }}
      ref={sheetRef}
    >
      <View className="p-8 pt-0 w-full">
        <View className="p-4 flex flex-col gap-4 justfy-start items-start w-full">
          <Heading size="2xl" className="text-red-500">
            Eliminar tu cuenta
          </Heading>
          <Text className="text-white">
            ¿Estas seguro que deseas eliminar tu cuenta? Esta acción es
            irreversible. Esto eliminará todos tus datos y no podrás
            recuperarlos.
          </Text>

          <Button
            onPress={() => {
              if (currentUser?._id) {
                deleteUserMutation.mutate({ _id: currentUser._id });
              } else {
                myToast(false, "Error al eliminar la cuenta");
              }

              sheetRef.current?.hide();
            }}
            className="w-full bg-red-500  data-[active=true]:bg-red-700"
          >
            {deleteUserMutation.isPending ? (
              <ActivityIndicator color="white" size={"small"} />
            ) : (
              <ButtonText className="text-white">Eliminar cuenta</ButtonText>
            )}
          </Button>

          <Button
            onPress={() => {
              sheetRef.current?.hide();
            }}
            action="primary"
            variant="outline"
            className="w-full border border-white"
          >
            <ButtonText className="text-white">Cancelar</ButtonText>
          </Button>
        </View>
      </View>
    </ActionSheet>
  );
}
