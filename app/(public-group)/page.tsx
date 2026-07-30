import { Categories } from "@/components/Home/Categories";
import { CTA } from "@/components/Home/cta";
import { FeaturedProperties } from "@/components/Home/FeaturedProperties";
import { Hero } from "@/components/Home/Hero";
import { HowItWorks } from "@/components/Home/HowItWorks";
import { Testimonials } from "@/components/Home/Testimonials";
import { WhyChoose } from "@/components/Home/WhyChoose";



export default function Home() {
  return (
    <div >
      <main >
        <Hero></Hero>
        <Categories></Categories>
        <FeaturedProperties></FeaturedProperties>
        <WhyChoose></WhyChoose>
        <HowItWorks></HowItWorks>
        <Testimonials></Testimonials>
        <CTA></CTA>
      </main>
    </div>
  );
}
