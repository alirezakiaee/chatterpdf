import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AlignJustify, Apple } from "lucide-react";
import Link from "next/link";

export default function MobileNav() {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger>
          <div className="flex items-center gap-4">
            {" "}
            <Apple className="text-red-500" />
            <AlignJustify />
          </div>
        </SheetTrigger>
        <SheetContent side="left">
          <Link href="/">
            <Apple className="text-red-500" />
          </Link>
          <nav className="flex flex-col gap-3 lg:gap-4 mt-6">
            <Link href="/project">Project</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
