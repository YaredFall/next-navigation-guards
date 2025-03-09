"use client";

import { useState } from "react";
import { useNavigationGuards } from "@yaredfall/next-navigation-guards";

export default function NavigationGuards({}) {
    const [enabled, setEnabled] = useState(false);
    const [asyncHandle, setAsyncHandle] = useState(false);

    const guards = useNavigationGuards({
        enabled,
        confirm: asyncHandle ? undefined : () => confirm("FOOOFEL"),
    });
    return (
        <div>
            <button onClick={() => setEnabled((prev) => !prev)}>navigation guards: {String(enabled)}</button>;
            <button onClick={() => setAsyncHandle((prev) => !prev)}>async handler: {String(asyncHandle)}</button>;
            {guards.active && (
                <div>
                    <p>Are you sure you want to leave this page?</p>
                    <button onClick={guards.accept}>Yes</button>
                    <button onClick={guards.reject}>No</button>
                </div>
            )}
        </div>
    );
}
