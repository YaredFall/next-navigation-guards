import { useCallback, useState } from "react";
import { NavigationInterceptors, useNavigationInterceptors } from "@yaredfall/next-navigation-interception";

type EventType = Parameters<Exclude<NavigationInterceptors[keyof NavigationInterceptors], undefined>>[0];
interface NavigationGuardParams {
    type: EventType["type"];
    to: string | undefined;
}

type NavigationGuardCallback = (params: NavigationGuardParams) => boolean | Promise<boolean>;

export function useNavigationGuards(
    options: {
        /** @default true */
        enabled?: boolean | ((params: NavigationGuardParams) => boolean);
        confirm?: NavigationGuardCallback;
    } = {}
) {
    const [pendingState, setPendingState] = useState<{
        resolve: (accepted: boolean) => void;
    } | null>(null);

    const onBeforeNavigation = useCallback(
        async ({ type, args }: EventType) => {
            const [target] = args;
            const to = type === "popstate" ? location.pathname + location.search : target;
            const enabled = typeof options.enabled === "function" ? options.enabled({ type, to }) : options.enabled ?? true;

            if (!enabled) return;

            // We can not await promises on "beforeunload"
            if (type === "beforeunload") return false;

            if (options.confirm) {
                return options.confirm({ type, to });
            }

            return await new Promise<boolean>((resolve) => {
                setPendingState({ resolve });
            });
        },
        [options]
    );

    useNavigationInterceptors({
        onBack: onBeforeNavigation,
        onForward: onBeforeNavigation,
        onPush: onBeforeNavigation,
        onReplace: onBeforeNavigation,
        onRefresh: onBeforeNavigation,

        onPopstate: onBeforeNavigation,
        onBeforeunload: onBeforeNavigation,
    });

    const active = pendingState !== null;

    const accept = useCallback(() => {
        if (!pendingState) return;
        pendingState.resolve(true);
        setPendingState(null);
    }, [pendingState]);

    const reject = useCallback(() => {
        if (!pendingState) return;
        pendingState.resolve(false);
        setPendingState(null);
    }, [pendingState]);

    return { active, accept, reject };
}
