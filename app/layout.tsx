import { AppSidebar } from "@/components/app-sidebar";
import ModeToggle from "@/components/mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Input } from "@/components/ui/input";
import { Analytics } from "@vercel/analytics/react";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

const title = process.env.NEXT_PUBLIC_SITE_NAME || "ToolBox";
const description = "All your tools in one place";
const url = "https://www.toolbox.fr";

export const metadata: Metadata = {
  title: {
    default: title,
    template: `%s | ${title}`,
  },
  description: description,
  icons: {
    icon: "/32x32.png",
    shortcut: "/32x32.png",
    // apple: "/180x180.png",
  },
  openGraph: {
    title: title,
    description: description,
    url: url,
    siteName: title,
    locale: "fr_FR",
    type: "website",
    images: "/banner.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Clotair",
    card: "summary_large_image",
    images: "/banner.png",
  },
  verification: {
    google: "",
    yandex: "",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${poppins.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4 w-full">
                  <SidebarTrigger className="-ml-1" />
                  <Separator orientation="vertical" className="mr-2 h-4" />
                  <div className="w-full flex justify-between gap-4">
                    <Input placeholder="Search" className="w-[50%]" />
                    <ModeToggle />
                  </div>
                </div>
              </header>
              <div className="flex flex-1 flex-col gap-4 p-4 pt-4">
                {children}
              </div>
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
