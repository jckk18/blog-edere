import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4" style={{ background: "#111827", color: "#faf7f0" }}>
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold">404</h1>
        <p className="mt-2 text-sm" style={{ color: "#cbd5e1" }}>Página no encontrada</p>
        <Link to="/" className="mt-6 inline-block rounded-md px-4 py-2 text-sm font-medium" style={{ background: "#faf7f0", color: "#111827" }}>Volver al inicio</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center px-4" style={{ background: "#111827", color: "#faf7f0" }}>
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Esta página no cargó</h1>
        <button onClick={() => { router.invalidate(); reset(); }} className="mt-6 rounded-md px-4 py-2 text-sm font-medium" style={{ background: "#faf7f0", color: "#111827" }}>Reintentar</button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "CiberVenezuela · Phishing en Venezuela | Blog Académico UBA 2026" },
      { name: "description", content: "Análisis académico del phishing como delito informático en Venezuela: marco legal LECDI, impacto psicológico, casos reales y prevención. Blog de Informática, Universidad Bicentenaria de Aragua (UBA), Maracay 2026." },
      { name: "author", content: "Universidad Bicentenaria de Aragua — UBA" },
      { property: "og:title", content: "CiberVenezuela · Phishing en Venezuela" },
      { property: "og:description", content: "Blog académico sobre phishing y delitos informáticos en Venezuela." },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
