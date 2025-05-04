import { useEffect, useRef, useMemo, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useSlider } from "../context/SliderContext";

gsap.registerPlugin(ScrollTrigger);

const images = [
  {
    src: "/img/21.png",
    style: {
      zIndex: "90",
      position: "absolute",
      width: "420px",
      height: "420px",
      top: "0",
      left: "45%"
    }
  },
  {
    src: "/img/22.png",
    style: {
      zIndex: "80",
      position: "absolute",
      width: "700px",
      height: "700px",
      top: "17%",
      left: "0"
    }
  },
  {
    src: "/img/23.png",
    style: {
      zIndex: "10",
      position: "absolute",
      width: "600px",
      height: "400px",
      top: "15%",
      right: "12%"
    }
  },
  {
    src: "/img/24.png",
    style: {
      width: "600px",
      height: "600px",
      top: "27%",
      right: "0"
    }
  },
  {
    src: "/img/25.png",
    style: {
      zIndex: "50",
      position: "absolute",
      width: "700px",
      height: "700px",
      top: "54%",
      left: "0"
    }
  },
  {
    src: "/img/26.png",
    style: {
      zIndex: "40",
      position: "absolute",
      width: "600px",
      height: "600px",
      bottom: "2%",
      left: "15%"
    }
  },
  {
    src: "/img/27.png",
    style: {
      zIndex: "40",
      position: "absolute",
      width: "300px",
      height: "600px",
      top: "70%",
      right: "10%"
    }
  },
  {
    src: "/img/28.png",
    style: {
      zIndex: "40",
      position: "absolute",
      width: "600px",
      height: "600px",
      bottom: "23%",
      right: "5%"
    }
  }
];

function ScrollGrid() {
  const gridContainerRef = useRef(null);
  const titleRef = useRef(null);
  const { hue, saturation, brightness } = useSlider();
  const [isMobile, setIsMobile] = useState(false);

  const overlayStyle = useMemo(
    () => `hsla(${hue}, ${saturation}%, ${brightness}%`,
    [hue, saturation, brightness]
  );

  const textColor = useMemo(() => {
    let lightness = 100 - brightness;
    if (lightness > 48 && lightness < 54 && saturation > 90) {
      lightness = lightness + 20;
    }
    return `hsl(${hue}, 100%, ${lightness}%)`;
  }, [hue, brightness, saturation]);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const imgs = document.querySelectorAll("img[alt^='img-']");
      imgs.forEach((img) => {
        gsap.set(img, {
          transformOrigin: "100% 0%"
        });
        gsap.to(img, {
          scale: 0,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });
      });
    }, gridContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={gridContainerRef}
      className="grid-section bg-white relative w-screen h-[2200px] max-sm:h-[3400px] overflow-hidden"
    >
      {images.map((img, index) => {
        const mobileStyleOverrides = isMobile
          ? {
              ...(index === 0 && {
                top: "5%",
                left: "10%",
                width: "400px",
                height: "400px"
              }),
              ...(index === 1 && {
                top: "16%",
                left: "2%",
                width: "400px",
                height: "400px"
              }),
              ...(index === 2 && {
                top: "30%",
                right: "5%",
                width: "360px",
                height: "270px"
              }),
              ...(index === 3 && {
                top: "45%",
                right: "5%",
                width: "400px",
                height: "400px"
              }),
              ...(index === 4 && {
                top: "55%",
                left: "0%",
                width: "400px",
                height: "400px"
              }),
              ...(index === 5 && {
                top: "87%",
                left: "5%",
                width: "450px",
                height: "450px"
              }),
              ...(index === 6 && {
                top: "64%",
                right: "10%",
                width: "300px",
                height: "600px"
              }),
              ...(index === 7 && {
                top: "79%",
                left: "1%",
                width: "400px",
                height: "400px"
              })
            }
          : {};

        const combinedStyle = {
          ...img.style,
          ...mobileStyleOverrides
        };

        return (
          <img
            key={index}
            src={img.src}
            alt={`img-${index}`}
            className="absolute object-cover z-50"
            style={combinedStyle}
          />
        );
      })}
      <div ref={titleRef} className="relative size-full">
        <h2
          className="relative pointer-events-none text-[16vw] max-sm:text-[28vw] leading-none font-fancy tracking-tight z-10 top-[10%] max-sm:top-[2%]  max-sm:left-[18%] left-[2%]"
          style={{
            color: "transparent",
            WebkitTextStrokeWidth: "2px",
            WebkitTextStrokeColor: textColor,
            TextStrokeWidth: "2px",
            TextStrokeColor: textColor
          }}
        >
          More
        </h2>
        <h2
          className="pointer-events-none relative text-[26vw] sm:text-[16vw] leading-none font-fancy tracking-tight z-10 top-[38%] max-sm:left-[7%] left-[2%]"
          style={{ color: textColor }}
        >
          Projects
        </h2>
      </div>
      <div
        className="pointer-events-none absolute left-0 top-0 z-0 size-full transition duration-100 ease-out"
        style={{ background: overlayStyle }}
      />
    </section>
  );
}

export default ScrollGrid;
