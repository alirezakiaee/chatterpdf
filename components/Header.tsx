import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import MainNav from "./Main-nav";
import MobileNav from "./Mobile-nav";

const Header = () => {
  return (
    <div className="container mx-auto px-4">
      <header className="py-8 flex justify-between items-center sticky top-0 z-50">
        <div className="h-14 container flex items-center">
          {/* Desktop */}
          <MainNav />

          {/* Mobile */}
          <MobileNav />

          {/* Desktop & mobile */}
        </div>

        <div>
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="outline">Sign In</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <div className="flex">

              <UserButton afterSwitchSessionUrl="/dashboard" />
            </div>
          </SignedIn>
        </div>
      </header>
    </div>
  );
};

export default Header;
