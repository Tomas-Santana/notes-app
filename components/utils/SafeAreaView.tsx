import { SafeAreaView as RNSafeAreaView } from "react-native";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { Platform } from "react-native";


import { ReactNode } from "react";

// allow all props to be passed to SafeAreaView

interface SafeAreaViewProps extends ViewProps {
    children: ReactNode;
}

export function SafeAreaView(
    { children, ...props }: SafeAreaViewProps
) {
    return (
        <RNSafeAreaView style={{ paddingTop: Platform.OS === "android" ? 50 : 0 }} {...props}>
            {children}
        </RNSafeAreaView>
    );
}