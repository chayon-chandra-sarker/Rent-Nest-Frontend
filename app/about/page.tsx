import AboutHero from "@/components/About/AboutHero";
import HowRentNestWorks from "@/components/About/HowRentNestWorks";
import MissionSection from "@/components/About/MissionSection";
import WhyChooseRentNest from "@/components/About/WhyChooseRentNest";


const AboutPage = () => {
  return (
    <main className="min-h-screen bg-background">
    <AboutHero></AboutHero>
    <MissionSection></MissionSection>
    <WhyChooseRentNest></WhyChooseRentNest>
    <HowRentNestWorks></HowRentNestWorks>
    </main>
  );
};

export default AboutPage;