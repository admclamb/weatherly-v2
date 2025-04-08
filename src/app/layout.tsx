import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider } from "./_features/theme/theme.provider";
import { Toaster } from "~/components/ui/sonner";
import { UnitsProvider } from "./_features/units/units.provider";

export const metadata: Metadata = {
  title: "Weatherly",
  description: "Basic Weather Application",
  icons: [{ rel: "icon", url: "https://openweathermap.org/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <TRPCReactProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <UnitsProvider>{children}</UnitsProvider>

            <Toaster />
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
