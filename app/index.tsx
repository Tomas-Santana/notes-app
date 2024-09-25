import { View, Text } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { 
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorText,
} from "@/components/ui/form-control";
import { useForm, Controller } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

const formSchema = z.object({
  name: z.string().email("debe ser email"),
});


export default function Screen() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    }
  });

  useEffect(() => {
    console.log(form.formState.errors);
  }, [form.formState.errors]);

  const onSubmit = (data: z.infer<typeof formSchema>) => alert(JSON.stringify(data));
  return (
    <View className="flex-1 justify-center items-center gap-2">
      <FormControl>
        <FormControlLabel>
          <FormControlLabelText>Name</FormControlLabelText>
        </FormControlLabel>
        <Controller
          
          control={form.control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input className="">
              <InputField
                className="w-24"
                placeholder="Name"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            </Input>
          )}
        />
          {form.formState.errors.name && (<FormControlErrorText>{form.formState.errors.name.message}</FormControlErrorText>)}
      </FormControl>
      <Button onPress={form.handleSubmit(onSubmit)}>
        <ButtonText>Submit</ButtonText>
      </Button>
    </View>
  );
}