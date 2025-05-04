import { useEffect } from "react";
import { SliderProvider } from "./context/SliderContext";
import Lenis from "@studio-freight/lenis";
import About from "./components/About";
import Breakdown from "./components/Breakdown";
import ProjectsSlider from "./components/ProjectsSlider";
import GlobalSliderBox from "./components/GlobalSliderBox";
import Hero from "./components/Hero";
import ScrollButtons from "./components/ScrollButtons";
import ScrollGrid from "./components/ScrollGrid";
import Upgrade from "./components/Upgrade";
import Footer from "./components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const lenis = new Lenis({
      duration: 1.2,
      smooth: true,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // 🔗 Link Lenis to ScrollTrigger
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        return arguments.length
          ? lenis.scrollTo(value)
          : lenis.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight
        };
      },
      pinType:
        getComputedStyle(document.body).transform !== "none"
          ? "transform"
          : "fixed"
    });

    lenis.on("scroll", ScrollTrigger.update);
    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <SliderProvider>
      <main className="relative min-h-screen w-screen overflow-x-hidden">
        <ScrollButtons />
        <GlobalSliderBox />
        <Hero />
        <About />

        <ProjectsSlider />
        <Breakdown />
        <Upgrade />
        <ScrollGrid />
        <Footer />
      </main>
    </SliderProvider>
  );
}

export default App;
