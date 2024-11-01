// import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import MainNav from "./Main-nav";
// import MobileNav from "./Mobile-nav";
// import { FilePlus2 } from "lucide-react";

// const Header = () => {
//   return (
//     <div className="container mx-auto px-4">
//       <header className="py-8 flex justify-between items-center sticky top-0 z-50">
//         <div className="h-14 container flex items-center">
//           {/* Desktop */}
//           <MainNav />

//           {/* Mobile */}
//           <MobileNav />

//           {/* Desktop & mobile */}
//         </div>

//         <div>
//           <SignedOut>
//             <SignInButton mode="modal">
//               <Button variant="outline">Sign In</Button>
//             </SignInButton>
//           </SignedOut>
//           <SignedIn>
//             <div className="flex gap-4">
//               <Button asChild variant="link" className="hidden md:flex">
//                 <Link href="/dashboard/upgrade">Pricing</Link>
//               </Button>
//               <Button asChild variant="outline" className="hidden md:flex">
//                 <Link href="/dashboard">My Documents</Link>
//               </Button>
//               <Button
//                 asChild
//                 variant="outline"
//                 className="bg-indigo-400 text-white"
//               >
//                 <Link href="/dashboard/upload">
//                   <FilePlus2 />
//                 </Link>
//               </Button>
//               <UserButton afterSwitchSessionUrl="/dashboard" />
//             </div>
//           </SignedIn>
//         </div>
//       </header>
//     </div>
//   );
// };

// export default Header;
import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import { FilePlus2 } from "lucide-react";
import UpgradeButton from "./UpgradeButton";

function Header() {
  return (
    <div className="flex justify-between bg-white shadow-sm p-5 border-b">
      <Link href="/dashboard" className="text-2xl">
        Chat to <span className="text-indigo-600">PDF</span>
      </Link>

      <SignedIn>
        <div className="flex items-center space-x-2">
          <Button asChild variant="link" className="hidden md:flex">
            <Link href="/dashboard/upgrade">Pricing</Link>
          </Button>

          <Button asChild variant="outline">
            <Link href="/dashboard">My Documents</Link>
          </Button>

          <Button asChild variant="outline" className="border-indigo-600">
            <Link href="/dashboard/upload">
              <FilePlus2 className="text-indigo-600" />
            </Link>
          </Button>

          <UpgradeButton />
          <UserButton />
        </div>
      </SignedIn>
    </div>
  );
}
export default Header;
