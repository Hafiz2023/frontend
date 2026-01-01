import Hero from "../components/Hero";
import CategoriesGrid from "../components/CategoriesGrid";
import WorkingExamples from "../components/WorkingExamples";
import AboutSection from "../components/AboutSection";
import SomeFacts from "../components/SomeFacts";

export default function Home() {
  return (
    <div>
      <Hero />
  
      <CategoriesGrid />
      <WorkingExamples />
          <SomeFacts />
      <AboutSection />
    </div>
  );
}
