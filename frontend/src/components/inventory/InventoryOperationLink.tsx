import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import React from "react";

export default function InventoryOperationLink({
  href,
  image,
  text,
}: {
  href: string;
  image: StaticImageData;
  text: string;
}) {
  return (
    <Link
      href={href}
      className="px-8 sm:px-14 py-1 md:py-2 m-auto box-border flex items-center justify-center hover:bg-secondaryhover bg-secondary text-sm rounded-md transition-transform duration-200 hover:scale-105"
    >
      <Image src={image} alt={text} className="object-cover w-6 h-6 mr-3" />
      {text}
    </Link>
  );
}
