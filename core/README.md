# next-navigation-interception

> For Next.js with App Router

Navigation guards for Next.js app.

## Install

```sh
npm i @yaredfall/next-navigation-guards
```

## Features

-   confirm navigation through `Link` component and app router methods (`push`, `replace` and others)
-   confirm navigation through browser back and forward buttons (`popstate` events)
-   confirm page leave on tab refresh/close (`beforeunload` event)

## Usage

Wrap your application with `NavigationGuardsProvider`:

```tsx
// src/app/layout.tsx
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <NavigationGuardsProvider>{children}</NavigationGuardsProvider>
            </body>
        </html>
    );
}
```

Use `useNavigationGuards` to guard navigation events in any part of your application:

```tsx
// src/app/demo/page.tsx
"use client";

import { useCallback } from "react";
import { useNavigationInterceptors } from "@yaredfall/next-navigation-guards";

export default function Page() {
    // Confirm with function
    useNavigationGuards({
        // you can disable guards dynamically
        enabled: form.isDirty,
        // you can provide any function that resolves to boolean
        confirm: () => confirm("Are you sure?"),
    });

    return <div>User will be prompted before page leave</div>;
}
```

```tsx
// src/app/demo/page.tsx
"use client";

import { useCallback } from "react";
import { useNavigationInterceptors } from "@yaredfall/next-navigation-guards";

export default function Page() {
    // Confirm with custom logic
    const guards = useNavigationGuards({
        enabled: form.isDirty,
    });

    return (
        <div>
            <div>Guarded page</div>
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
```

You can have multiple guards. They will be executed in order of render.
