import CategoriesHero from "@/components/Catagories/CategoriesHero";
import FeaturedCategories from "@/components/Catagories/FeaturedCategory";
import LifestyleSection from "@/components/Catagories/LifestyleSection";
import PopularCategories from "@/components/Catagories/PopularCategories";



const CategoriesPage = async () => {

  return (
    <main className="min-h-screen bg-background">
      <CategoriesHero />
      <PopularCategories></PopularCategories>
      <FeaturedCategories></FeaturedCategories>
      <LifestyleSection></LifestyleSection>
    </main>
  );
};

export default CategoriesPage;

