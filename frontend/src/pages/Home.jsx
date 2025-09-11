import { Helmet } from "react-helmet-async";
import DemoPreview from "../components/DemoPreview";
import FAQ from "../components/FAQ";
import Features from "../components/Features";
import HeaderHero from "../components/HeaderHero";
import HowItWorks from "../components/HowItWork";
import Pricing from "../components/Pricing";
import Seo from "../components/Seo";

const Home = () => {
  return (
    <>
      <Seo
        title={"GenAi – AI-Powered Component Generator for Developers"}
        description={
          "Generate, preview, and export React components instantly with GenAi. Boost productivity with AI-powered code generation."
        }
        url={import.meta.env.WEBSITE_URL}
      />
      <div className="bg-black ">
        <div>
          <HeaderHero />
        </div>
        <div className="px-3 h-full">
          <Features />
        </div>
        <div className="px-3 h-full">
          <HowItWorks />
        </div>
        <div className="px-3 h-full">
          <DemoPreview />
        </div>
        <div className="px-3 h-full">
          <Pricing />
        </div>
        <div className="px-3 h-full">
          <FAQ />
        </div>
      </div>
    </>
  );
};

export default Home;
