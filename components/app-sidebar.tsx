"use client";

import { QrCode } from "lucide-react";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { NavMain } from "./main-nav";

// This is sample data.
const data = {
  navMain: [
    {
      title: "QR Code",
      url: "/qr-code",
      icon: QrCode,
      isActive: true,
      items: [
        {
          title: "vCard",
          url: "/qr-code/v-card",
        },
        {
          title: "Wifi",
          url: "/qr-code/wifi",
        },
      ],
    },
    // {
    //   title: "Models",
    //   url: "#",
    //   icon: Bot,
    //   items: [
    //     {
    //       title: "Genesis",
    //       url: "#",
    //     },
    //     {
    //       title: "Explorer",
    //       url: "#",
    //     },
    //     {
    //       title: "Quantum",
    //       url: "#",
    //     },
    //   ],
    // },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="px-[17px] py-[15px]">
        <Link href="/" className="text-2xl font-bold">
          ToolBox
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <div className="flex flex-col items-center justify-center">
          <span className="text-muted-foreground text-sm text-center">
            {process.env.NEXT_PUBLIC_SITE_NAME} v1 © {new Date().getFullYear()}{" "}
          </span>
          <Link
            className="text-primary text-sm text-center underline"
            href="https://www.alexandre-artisien.fr/"
            target="_blank"
          >
            Alexandre Artisien
          </Link>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
