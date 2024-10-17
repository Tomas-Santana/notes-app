import { useState } from "react";
import { VerifyCodeForm } from "./verifyCodeForm";
import { SetPasswordForm } from "./setPasswordForm";
import Animated from "react-native-reanimated";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Text } from "../../ui/text";  
import { PasswordResetRequest, PasswordResetRequestSchema } from "@/types/api/PasswordReset";
import { z } from "zod";



type TabNumber = 0 | 1 | 2;

export default function ChangePasswordForm() {
    const form = useForm<PasswordResetRequest>({
        resolver: zodResolver(PasswordResetRequestSchema),
        defaultValues: {
            code: "",
            password: "",
        }
    });

    const [tab, setTab] = useState<TabNumber>(0);
    const tabs = [
        <VerifyCodeForm setTab={setTab} fullForm={form} />,
        <SetPasswordForm setTab={setTab} fullForm={form} />
    ];

    return (
        <Animated.View className="w-full p-4">
            {
                tabs[tab]
            }
        </Animated.View>
    );
}
