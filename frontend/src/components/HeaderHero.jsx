import DarkVeil from "./DarkVail";
import HeroText from "./HeroText";

const HeaderHero = () => {
  return (
    <div className="w-full ">
      <div style={{ width: "100%", height: "100vh", position: "relative" }}>
        <DarkVeil />
      </div>
      <div className="absolute top-50 px-3 z-10  text-white flex items-center justify-center w-[99%] md:w-full" >
        <HeroText/>
      </div>
    </div>
  );
};

export default HeaderHero;
