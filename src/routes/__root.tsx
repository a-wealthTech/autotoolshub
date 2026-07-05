import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import faviconIco from "../../public/favicon.ico.asset.json";
import favicon16 from "../../public/favicon-16x16.png.asset.json";
import favicon32 from "../../public/favicon-32x32.png.asset.json";
import appleTouchIcon from "../../public/apple-touch-icon.png.asset.json";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Biztrait Market  Marketplace for Software, APIs, Hosting & AI Tools" },
      { name: "description", content: "BizTrait offers automation tools, software, APIs, hosting, AI, marketing, creator, and developer solutions all in one marketplace." },
      { name: "author", content: "Biztrait" },
      { property: "og:title", content: "Biztrait Market  Marketplace for Software, APIs, Hosting & AI Tools" },
      { property: "og:description", content: "BizTrait offers automation tools, software, APIs, hosting, AI, marketing, creator, and developer solutions all in one marketplace." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Biztrait Market  Marketplace for Software, APIs, Hosting & AI Tools" },
      { name: "twitter:description", content: "BizTrait offers automation tools, software, APIs, hosting, AI, marketing, creator, and developer solutions all in one marketplace." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/6735c341-1e1e-4fa3-9183-d588acb1e9b3" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/6735c341-1e1e-4fa3-9183-d588acb1e9b3" },
      { name: "theme-color", content: "#0A58CA" },
      { name: "og:site_name", content: "Biztrait Market" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", type: "image/x-icon", href: faviconIco.url },
      { rel: "icon", type: "image/png", sizes: "16x16", href: favicon16.url },
      { rel: "icon", type: "image/png", sizes: "32x32", href: favicon32.url },
      { rel: "apple-touch-icon", sizes: "180x180", href: appleTouchIcon.url },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://biztrait.com/#organization",
              name: "Biztrait Market",
              url: "https://biztrait.com",
              logo: "https://biztrait.com/__l5e/assets-v1/d306670c-d73e-48e3-8db1-e281ba5e7222/android-chrome-512x512.png",
              description:
                "Biztrait Market is a unified digital marketplace for software, APIs, hosting, AI, automation, and creator tools.",
              sameAs: [
                "https://twitter.com/biztrait",
                "https://linkedin.com/company/biztrait",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer support",
                url: "https://biztrait.com/contact",
                availableLanguage: ["English"],
              },
            },
            {
              "@type": "WebSite",
              "@id": "https://biztrait.com/#website",
              url: "https://biztrait.com",
              name: "Biztrait Market",
              publisher: { "@id": "https://biztrait.com/#organization" },
              inLanguage: "en",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://biztrait.com/tools?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
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
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
