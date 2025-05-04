import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSlider } from "../context/SliderContext";
import { Volume2, VolumeX } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const { hue, saturation, brightness, opacity } = useSlider();
  const [loading, setLoading] = useState(true);
  const audioElementRef = useRef(null);

  const overlayStyle = useMemo(
    () => `hsla(${hue}, ${saturation}%, ${brightness}%, ${opacity / 100})`,
    [hue, saturation, brightness, opacity]
  );

  const textColor = useMemo(() => {
    let lightness = 100 - brightness;
    if (Math.abs(lightness - brightness) < 30) {
      lightness = brightness < 30 ? brightness + 30 : brightness - 30;
    }
    return `hsl(${hue}, 100%, ${Math.min(95, Math.max(5, lightness))}%)`;
  }, [hue, brightness]);

  useEffect(() => {
    const video = document.getElementById("hero-video");
    if (video?.readyState >= 3) {
      setLoading(false);
    } else {
      video?.addEventListener("loadeddata", () => setLoading(false));
    }
  }, []);

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(0% 100%, 40% 100%, 40% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%"
    });

    const tween = gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom 20%",
        scrub: true
      }
    });

    return () => {
      tween.scrollTrigger?.kill();
    };
  }, []);

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {loading && (
        <div
          className="flex-center absolute z-[100] h-dvh w-screen transition duration-100 ease-out"
          style={{ background: overlayStyle }}
        >
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden"
      >
        <video
          id="hero-video"
          src="/videos/hero.mp4"
          muted
          loop
          playsInline
          preload="auto"
          autoPlay
          className="absolute left-0 top-0 size-full object-cover object-center"
        />

        <div
          className="pointer-events-none absolute left-0 top-0 z-20 size-full transition duration-100 ease-out"
          style={{ background: overlayStyle }}
        />

        <div className="relative z-50 size-full">
          <div className="flex size-full flex-col items-center justify-center">
            <div className="flex items-baseline justify-center">
              <h1
                className="cursor-default font-fancy text-[19vw] font-medium leading-none"
                style={{ color: textColor }}
              >
                CreaDEV.
              </h1>
            </div>

            <p
              className="text-center cursor-default mb-10 font-general text-2xl tracking-widest"
              style={{ color: textColor }}
            >
              Nirit Nagar :: Creative Development
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
