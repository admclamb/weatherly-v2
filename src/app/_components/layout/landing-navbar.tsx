import React from "react";
import Logo from "../logo/logo";
import { DarkModeToggle } from "~/app/_features/theme/dark-mode-toggle";

export default function LandingNavbar() {
  return (
    <nav className="py-3">
      <div className="container mx-auto flex items-center">
        <Logo />

        <ul className="ml-auto flex items-center">
          <li>
            <DarkModeToggle />
          </li>
        </ul>
      </div>
    </nav>
  );
}
