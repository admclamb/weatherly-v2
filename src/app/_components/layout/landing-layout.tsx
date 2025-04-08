import React, { type ReactNode } from "react";
import LandingNavbar from "./landing-navbar";
import LandingFooter from "./landing-footer";

type Props = {
  children?: ReactNode;
};

export default function LandingLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="">
        <LandingNavbar />
      </header>
      <main className="grow">{children}</main>
      <LandingFooter />
    </div>
  );
}
