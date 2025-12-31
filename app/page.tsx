import Hero from "../components/Hero";
import CategoriesGrid from "../components/CategoriesGrid";
import WorkingExamples from "../components/WorkingExamples";
import AboutSection from "../components/AboutSection";

export default function Home() {
  return (
    <div>
      <Hero />
      <CategoriesGrid />
      <WorkingExamples />
      <AboutSection />
    </div>
  );
}
