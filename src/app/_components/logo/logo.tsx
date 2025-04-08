/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Link from "next/link";
import React from "react";
import { routerConfig } from "~/app/router-config";

import Image from "next/image";

export default function Logo() {
  return (
    <Link href={routerConfig.root.path} className="flex items-center">
      <Image
        src="https://openweathermap.org/img/wn/02d.png"
        alt="Weatherly logo"
        width={50}
        height={50}
      />
      <span className="text-lg font-semibold">Weatherly</span>
    </Link>
  );
}
