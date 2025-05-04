import { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { useSlider } from "../context/SliderContext";

gsap.registerPlugin(ScrollTrigger);

const ProjectsSlider = () => {
  const containerRef = useRef(null);
  const { hue, brightness, saturation } = useSlider();

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

  const panelsData = [
    {
      backgroundColor: "#fff",
      image: "",
      title: "Feelings",
      subtitle:
        "A segue into emotion-driven UI, microinteractions, and storytelling in design."
    },
    {
      backgroundColor: "#fff",
      image: "/img/444.jpg",
      title: "",
      subtitle: ""
    },
    {
      backgroundColor: "#fff",
      image: "",
      title: "Moments",
      subtitle:
        "Highlights research-based design and accessibility to create meaningful interactions."
    },
    {
      backgroundColor: "#fff",
      image: "/img/02.jpg",
      title: "",
      subtitle: ""
    },
    {
      backgroundColor: "#fff",
      image: "",
      title: "It's UX :)",
      subtitle: ""
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
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
        pinType: document.body.style.transform ? "transform" : "fixed"
      });

      lenis.on("scroll", ScrollTrigger.update);

      const panels = gsap.utils.toArray(".panel");

      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${containerRef.current.offsetWidth}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          id: "horizontal-slider"
        }
      });

      panels.forEach((panel) => {
        const title = panel.querySelector(".panel-title");
        const subtitle = panel.querySelector(".panel-subtitle");
        const underline = panel.querySelector(".panel-underline");

        const targets = [title, subtitle, underline].filter(Boolean); // filter out nulls

        if (targets.length > 0) {
          gsap.fromTo(
            targets,
            { y: 200, scale: 0.95, opacity: 0 },
            {
              y: 0,
              scale: 1,
              opacity: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: panel,
                containerAnimation:
                  ScrollTrigger.getById("horizontal-slider")?.animation,
                start: "top center",
                end: "left center",
                scrub: 2
              }
            }
          );
        }
      });

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="horizontal-slider-section flex h-screen w-[500vw] overflow-hidden"
    >
      {panelsData.map(({ backgroundColor, image, title, subtitle }, i) => (
        <div
          key={i}
          className="panel relative flex h-full w-screen items-center justify-center text-white"
          style={{ backgroundColor }}
        >
          {image && (
            <img
              src={image}
              alt="project"
              width="100%"
              height="100%"
              className="h-full w-full absolute inset-0 object-cover max-sm:object-contain transition-opacity duration-700"
            />
          )}
          <div className="z-10 text-center max-w-[70%]">
            {title && (
              <h2 className="mb-6 text-black panel-title text-6xl sm:text-8xl font-fancy font-bold">
                {title}
              </h2>
            )}
            <div
              className="w-[30%] h-2 m-auto rounded-full panel-underline"
              style={{ background: textColor }}
            ></div>
            {subtitle && (
              <p className="text-black panel-subtitle mt-4 text-4xl font-light">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      ))}
    </section>
  );
};

export default ProjectsSlider;
