import { useEffect, useRef, useMemo, useState } from "react";
import { useSlider } from "../context/SliderContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Upgrade = () => {
  const sectionRef = useRef(null);
  const { hue, saturation, brightness } = useSlider();
  const [showAfter, setShowAfter] = useState(true);
  const beforeImageRef = useRef(null);
  const afterImageRef = useRef(null);

  const overlayStyle = useMemo(
    () => `hsla(${hue}, ${saturation}%, ${brightness}%, 100%)`,
    [hue, saturation, brightness]
  );

  const textColor = useMemo(() => {
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
      const lines = gsap.utils.toArray(".line");
      lines.forEach((line) => {
        gsap.fromTo(
          line,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: line,
              start: "top 80%",
              end: "center center",
              scrub: 1
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (showAfter) {
      gsap.to(beforeImageRef.current, {
        x: "-100%",
        duration: 0.6,
        ease: "power2.out"
      });
      gsap.fromTo(
        afterImageRef.current,
        {
          x: "100%"
        },
        {
          x: "0%",
          duration: 0.6,
          ease: "power2.out"
        }
      );
    } else {
      gsap.to(afterImageRef.current, {
        x: "100%",
        duration: 0.6,
        ease: "power2.out"
      });
      gsap.fromTo(
        beforeImageRef.current,
        {
          x: "-100%"
        },
        {
          x: "0%",
          duration: 0.6,
          ease: "power2.out"
        }
      );
    }
  }, [showAfter]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center bg-white px-4 py-16 text-black"
    >
      <div className="relative z-10 flex flex-col items-center text-center">
        <h2 className="line mb-6 font-fancy text-black text-5xl max-sm:text-6xl leading-[8vw] max-sm:leading-[16vw] md:text-7xl">
          UX Upgrade Project
        </h2>
        <p className="line mb-8 max-w-2xl text-xl text-black font-light leading-relaxed md:text-2xl">
          Improving product page and checkout progress resulting in increasing
          user satisfaction by 40%!
        </p>
        <button
          onClick={() => setShowAfter((prev) => !prev)}
          className="line font-semibold mb-12 text-white rounded-full px-8 py-4 text-xl shadow-lg transition hover:shadow-md"
          style={{ background: textColor }}
        >
          {showAfter ? "Show Me The Before" : "Show Me The After"}
        </button>
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
          <img
            ref={beforeImageRef}
            src="/img/before.jpg"
            alt="before"
            className="absolute inset-0 size-full object-cover transition-all duration-700"
          />
          <img
            ref={afterImageRef}
            src="/img/after.jpg"
            alt="after"
            className="absolute inset-0 size-full object-cover transition-all duration-700"
          />
        </div>
      </div>
    </section>
  );
};

export default Upgrade;
