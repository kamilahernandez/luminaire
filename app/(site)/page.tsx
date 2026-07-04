import { HomeHero } from "@/components/sections/HomeHero";
import { HomeInstagram } from "@/components/sections/HomeInstagram";
import { HomeIntro } from "@/components/sections/HomeIntro";
import { HomeServices } from "@/components/sections/HomeServices";
import { HomeTestimonials } from "@/components/sections/HomeTestimonials";
import { HomePricing } from "@/components/sections/HomePricing";
import { HomeLocation } from "@/components/sections/HomeLocation";

export default function Home() {
  return (
    <div>
      <HomeHero />
      <HomeInstagram />
      <HomeIntro />
      <HomeServices />
      <HomeTestimonials />
      <HomePricing />
      <HomeLocation />
    </div>
  );
}
