import Animated, { LinearTransition } from "react-native-reanimated";
import z from "zod";
import { CreateCategoryRequestSchema } from "@/types/api/CreateCategory";
import { FormTextInput, UnstyledFormTextInput } from "../forms/FormTextInput";
import { Button, ButtonText } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CategoryController from "@/api/controllers/CategoryController";
import myToast from "../toast";
import { TextInput } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native";
import { SheetManager } from "react-native-actions-sheet";

export default function CreateCategoryForm() {
  const form = useForm<z.infer<typeof CreateCategoryRequestSchema>>({
    resolver: zodResolver(CreateCategoryRequestSchema),
    defaultValues: {
      name: "",
    },
  });
  const queryClient = useQueryClient();
  const createCategoryMutation = useMutation({
    mutationFn: CategoryController.createCategory,
    onError: (error, _, context) => {
      myToast(false, error.message);

      queryClient.setQueryData(["categories"], context?.previousCategories);
    },
    onSuccess: () => {
      myToast(true, "Categoría creada");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onMutate: () => {
      queryClient.cancelQueries({ queryKey: ["categories"] });
      const previousCategories = queryClient.getQueryData<
      {
        categories: { _id: string; name: string }[];
      } | null
      >(["categories"]);
      queryClient.setQueryData(["categories"], {
        categories: [
          ...(previousCategories?.categories ?? []),
          { _id: "temp", name: form.getValues().name },
        ],
      });

      return { previousCategories };
    },
  });

  const onSubmit = (data: z.infer<typeof CreateCategoryRequestSchema>) => {
    SheetManager.hide("createCategory");
    createCategoryMutation.mutate(data);
  };

  return (
    <Animated.View
      className="w-full p-4 flex flex-col gap-4"
      layout={LinearTransition}
    >
      <UnstyledFormTextInput
        name="name"
        control={form.control}
        label="Nueva categoría"
        placeholder="Nombre..."
        error={form.formState.errors.name}
        size="xl"
        className="border-none text-4xl text-white"
        fieldClassName="border-none"
        autofocus
      />
      <Animated.View layout={LinearTransition}>
        <Button onPress={form.handleSubmit(onSubmit)}>
          {createCategoryMutation.isPending ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <ButtonText>Crear categoría</ButtonText>
          )}
        </Button>
      </Animated.View>
    </Animated.View>
  );
}
