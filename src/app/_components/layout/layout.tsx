import React, { type ReactNode } from "react";
import Navbar from "./navbar";
import Footer from "./footer";

type Props = {
  children?: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="">
        <Navbar />
      </header>
      <main className="grow">{children}</main>
      <Footer />
    </div>
  );
}
