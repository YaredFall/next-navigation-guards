import { PropsWithChildren } from "react";
import { NavigationInterceptionProvider } from "@yaredfall/next-navigation-interception";

export function NavigationGuardsProvider({ children }: PropsWithChildren) {
    return <NavigationInterceptionProvider>{children}</NavigationInterceptionProvider>;
}
