import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const MainLayOut = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <div className="bg-black">
        <Footer />
      </div>
    </div>
  );
};

export default MainLayOut;
