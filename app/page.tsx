import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import HeroSlider from "@/components/HeroSlider";
import "./globals.css";

const slides = [
  {
    title: "Welcome to Our Site",
    description:
      "Discover amazing features and services tailored just for you.lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageSrc: "/assets/Slider-bg-1.jpg",
  },
  {
    title: "Innovative Solutions",
    description: "We provide cutting-edge solutions to meet your needs.",
    imageSrc: "/path/to/image2.jpg",
  },
  {
    title: "Join Our Community",
    description: "Be part of a growing network of satisfied customers.",
    imageSrc: "/path/to/image3.jpg",
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <div className="container mx-auto px-4">
            <header className="py-8 flex justify-between items-center">
              <h1 className="text-4xl font-bold">Welcome to Our Site</h1>
              <div>
                <SignedOut>
                  <SignInButton mode="modal">
                    <Button variant="outline">Sign In</Button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
              </div>
            </header>

            <main>
              <section className="py-12">
                <HeroSlider slides={slides} />
              </section>

              <section className="py-12">
                <h2 className="text-3xl font-semibold mb-6">Our Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="p-6">
                    <h3 className="text-xl font-medium mb-2">Feature 1</h3>
                    <p>Description of feature 1</p>
                  </Card>
                  <Card className="p-6">
                    <h3 className="text-xl font-medium mb-2">Feature 2</h3>
                    <p>Description of feature 2</p>
                  </Card>
                  <Card className="p-6">
                    <h3 className="text-xl font-medium mb-2">Feature 3</h3>
                    <p>Description of feature 3</p>
                  </Card>
                </div>
              </section>

              <section className="py-12 text-center">
                <h2 className="text-3xl font-semibold mb-6">
                  Ready to get started?
                </h2>
                <Button size="lg">Sign Up Now</Button>
              </section>
            </main>
          </div>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
