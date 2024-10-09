import { toast } from "sonner-native";

const myToast = (succes: boolean, message: string) => {
  if (succes) {
    return toast.success(message, { duration: 3000 });
  }

  return toast.error(message, { duration: 3000 });
};

export default myToast;
