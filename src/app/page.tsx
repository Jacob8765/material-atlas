import BlogSection from "@/components/LandingPage/BlogSection";
import DatabaseSection from "@/components/LandingPage/DatabaseSection";
import AboutSection from "@/components/LandingPage/AboutSection";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      {/* <BrowseMaterialGraph /> */}

      <div className="grid grid-cols-1">
        <div className="relative h-[60vh] overflow-hidden">
          <Image src="/assets/living_shoreline_4.png" layout="fill" objectFit="cover" objectPosition="0px -350px" alt="background" />

          <h1 className="text-emerald-300 absolute bottom-10 left-10 text-5xl font-extrabold">Crowd sourced material database for next generation of knowledge sharing</h1>
        </div>
        <AboutSection />
        <DatabaseSection />
        <BlogSection />
      </div>
    </main>
  );
}
