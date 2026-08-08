import CategoriesHero from "@/components/Catagories/CategoriesHero";
import PopularCategories from "@/components/Catagories/PopularCategories";


const CategoriesPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <CategoriesHero />
      <PopularCategories></PopularCategories>
    </main>
  );
};

export default CategoriesPage;

