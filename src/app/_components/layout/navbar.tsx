import React from "react";
import Logo from "../logo/logo";
import { DarkModeToggle } from "~/app/_features/theme/dark-mode-toggle";
import NavbarSearch from "~/app/_features/search/navbar-search";

export default function Navbar() {
  return (
    <nav className="py-3">
      <div className="container mx-auto flex items-center">
        <Logo />

        <ul className="ml-auto flex items-center gap-2">
          <li>
            <NavbarSearch />
          </li>
          <li>
            <DarkModeToggle />
          </li>
        </ul>
      </div>
    </nav>
  );
}
