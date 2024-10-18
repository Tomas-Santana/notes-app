import Animated, { LinearTransition } from "react-native-reanimated";
import z from "zod";
import { UserUpdateSchema } from "@/types/api/UserRequest";
import { FormTextInput, UnstyledFormTextInput } from "../forms/FormTextInput";
import { Button, ButtonText } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SheetManager } from "react-native-actions-sheet";
import { Heading } from "../ui/heading";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UserController from "@/api/controllers/UserController";
import { useAtom } from "jotai";
import { userAtom } from "@/utils/atoms/userAtom";
import myToast from "../toast";

export default function UpdateUserForm() {
  const [currentUser, setCurrentUser] = useAtom(userAtom);
  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof UserUpdateSchema>>({
    resolver: zodResolver(UserUpdateSchema),
    defaultValues: {
      firstName: currentUser?.firstName || "",
      lastName: currentUser?.lastName || "", 
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: UserController.UpdateUser,
    onSuccess: (data) => {
      setCurrentUser((prevUser) => {
        if (!prevUser) {
          console.log("increible");
          return null;
        }
        return {
          ...prevUser,
          //@ts-ignore
          firstName: data.firstName ?? prevUser?.firstName ,
          //@ts-ignore
          lastName: data.lastName ?? prevUser?.lastName
        };
      });
      queryClient.invalidateQueries({ queryKey: ['user', currentUser?._id]});
      SheetManager.hide("updateUser");
      console.log("User updated successfully");
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const onSubmit = (data: z.infer<typeof UserUpdateSchema>) => {
    if (currentUser?._id)
      updateUserMutation.mutate({ _id: currentUser._id, ...data });
  };

  return (
    <Animated.View
      className="w-full p-4 flex flex-col gap-4"
      layout={LinearTransition}
    >
      <Heading size="2xl" className="text-white">
        Actualizar datos
      </Heading>
      <UnstyledFormTextInput
        name="firstName"
        control={form.control}
        label="Nombre"
        placeholder="Mario"
        error={form.formState.errors.firstName}
        size="lg"
        className="border-none text-2xl text-white"
        fieldClassName="border-none"
        autofocus
      />
      <UnstyledFormTextInput
        name="lastName"
        control={form.control}
        label="Apellido"
        placeholder="Ramirez"
        error={form.formState.errors.lastName}
        size="lg"
        className="border-none text-2xl text-white"
        fieldClassName="border-none"
      />

      <Animated.View layout={LinearTransition}>
        <Button onPress={form.handleSubmit(onSubmit)} className="h-16">
          <ButtonText className="text-lg">Actualizar datos</ButtonText>
        </Button>
      </Animated.View>
    </Animated.View>
  );
}
