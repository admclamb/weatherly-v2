import React from "react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar";
import { SidebarApp } from "./sidebar-app";
import { Separator } from "~/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import Footer from "./footer";

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface SidebarLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  headerContent?: React.ReactNode;
}

export default function SidebarLayout({
  children,
  breadcrumbs = [],
  headerContent,
}: SidebarLayoutProps) {
  return (
    <SidebarProvider>
      <SidebarApp />
      <SidebarInset>
        <div className="flex min-h-screen flex-col">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((item, index) => (
                  <React.Fragment key={item.name}>
                    <BreadcrumbItem className="hidden md:block">
                      {index === breadcrumbs.length - 1 ? (
                        <BreadcrumbPage>{item.name}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={item.href ?? "#"}>
                          {item.name}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {index < breadcrumbs.length - 1 && (
                      <BreadcrumbSeparator className="hidden md:block" />
                    )}
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
            {headerContent && (
              <>
                <div className="flex-1" />
                {headerContent}
              </>
            )}
          </header>
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
