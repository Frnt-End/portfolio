import { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useSlider } from "../context/SliderContext";

gsap.registerPlugin(ScrollTrigger);

function About() {
  const { hue, saturation, brightness } = useSlider();

  const pathRef = useRef(null);
  const shapeContainerRef = useRef(null);

  const shapeColor = useMemo(() => {
    let lightness = brightness;

    if (lightness > 60) {
      lightness = lightness - 20;
    }

    if (lightness < 30) {
      lightness = lightness + 10;
    }

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }, [hue, brightness, saturation]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (pathRef.current && shapeContainerRef) {
        const initialPath = pathRef.current.getAttribute("d");
        const finalPath = pathRef.current.getAttribute("data-path-to");

        if (initialPath && finalPath) {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: shapeContainerRef.current,
                start: "top center",
                end: "bottom top",
                scrub: 1
              }
            })
            .fromTo(
              pathRef.current,
              { attr: { d: initialPath } },
              { attr: { d: finalPath }, ease: "none", duration: 1 }
            );
        }
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div id="about" className="bg-white relative min-h-screen w-screen">
      <div className="relative z-10 flex flex-col items-center gap-5">
        <div
          ref={shapeContainerRef}
          className="absolute -left-[50%] top-0 z-0 w-full h-full"
        >
          <svg
            className="absolute w-full h-full"
            viewBox="-100 -100 100 200"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              ref={pathRef}
              fill={shapeColor}
              className="transition-colors opacity-35 duration-300"
              data-path-to="M 37 -101.8 C 45.3 -89.6 47.5 -61 52.6 -33.4 C 57.6 -5.8 65.4 21 63.6 44.4 C 61.9 67.8 50.6 88 38.4 110.6 C 26.2 133.2 13.1 157.8 -1.4 161.6 C -15.8 165.4 -31.7 148 -44.9 126.2 C -58.1 104.4 -68.8 78 -75.8 46.4 C -82.9 15 -86.3 -21.6 -79.8 -48.8 C -73.3 -76 -56.9 -93.8 -41.9 -101.6 C -27 -109.4 -13.5 -107.4 0.4 -108.6 C 14.3 -109.6 28.7 -114 37 -101.8 Z"
              d="M 49.7167 34.1118 C 36.6196 62.227 18.1996 92.7227 -13.1472 100.4284 C -44.4207 107.861 -89.0675 92.5305 -104.4551 63.0785 C -119.7427 33.7996 -105.871 -9.774 -83.5979 -55.1959 C -61.3249 -100.6178 -30.7504 -148.0612 -2.2658 -146.7245 C 26.1188 -145.5609 52.5136 -95.4438 61.6873 -57.5545 C 70.761 -19.8383 62.8137 5.9965 49.7167 34.1118 Z"
            />
          </svg>
        </div>

        <h2 className="font-fancy mt-44 z-10 text-[16vw] sm:text-[10vw] w-[70%] lg:w-[50%] leading-tight">
          Creativity isn't just about color, code, or layout.
        </h2>

        <p className="font-fancy z-10 text-[12vw]">it's about..</p>
      </div>
    </div>
  );
}

export default About;
