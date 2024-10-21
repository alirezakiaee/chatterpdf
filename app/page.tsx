import HeroSlider from "@/components/HeroSlider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React from "react";
import { Camera } from "lucide-react";
import { AnimatedHead1 } from "@/components/AnimatedHead1";
import Link from "next/link";
import Image from "next/image";

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
const features = [
  {
    name: "Feature 1",
    description: "Description of feature 1",
    icon: Camera,
  },
  {
    name: "Feature 2",
    description: "Description of feature 2",
    icon: Camera,
  },
  {
    name: "Feature 3",
    description: "Description of feature 3",
    icon: Camera,
  },
  {
    name: "Feature 4",
    description: "Description of feature 3",
    icon: Camera,
  },
  {
    name: "Feature 5",
    description: "Description of feature 3",
    icon: Camera,
  },
  {
    name: "Feature 6",
    description: "Description of feature 3",
    icon: Camera,
  },
];

const Landing = () => {
  return (
    <main className="flex-1 mx-auto px-4 bg-gradient-to-bl from-white to-gray-100  rounded-xl">
      <section className="py-12 flex flex-col items-center mx-auto  ">
        <HeroSlider slides={slides} />
        <AnimatedHead1 />
        <p>Discover amazing features and services tailored just for you.</p>
      </section>
      <section className="relative overflow-hidden pt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Image
            alt="Hero Image"
            src="https://i.imgur.com/VciRSTI.png"
            width={500}
            height={500}
            className="w-full h-auto bg-cover"
          />
          <div aria-hidden="true" className="relative">
            <div className="absolute bottom-0 -inset-x-32 bg-gradient-to-t from-white/95 pt-[10%]" />
          </div>
        </div>
      </section>
      <section className="py-12">
        <h2 className="text-3xl font-semibold mb-6">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-wrap">
          {features.map((feature) => (
            <Card className="p-6 relative" key={feature.name}>
              <div className="inline font-semibold text-gray-900">
                <feature.icon className="w-6 h-6 inline-block" />
              </div>
              <h3 className="text-xl font-medium mb-2">{feature.name}</h3>
              <p>{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-12 text-center">
        <h2 className="text-3xl font-semibold mb-6">Ready to get started?</h2>
        <Button asChild size="lg" className="mt-10">
          <Link href="/dashboard">Get Started</Link>
        </Button>
      </section>
    </main>
  );
};

export default Landing;
