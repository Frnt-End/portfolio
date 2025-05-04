import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useMemo, useState } from "react";
import { useSlider } from "../context/SliderContext";
import { Mail, MailOpen } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const { hue, saturation, brightness, opacity } = useSlider();
  const [loading, setLoading] = useState(true);
  const [showSend, setShowSend] = useState(false);
  const handleMouseEnter = () => setShowSend(true);
  const handleMouseLeave = () => setShowSend(false);

  const mailIconClass = showSend ? "opacity-0" : "opacity-100";
  const mailOpenIconClass = showSend ? "opacity-100" : "opacity-0";
  const textClass = showSend ? "opacity-0" : "opacity-100";
  const textClassActive = showSend ? "opacity-100" : "opacity-0";

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

  const sendMail = () => {
    window.location.href =
      "mailto:nirit.nagar.dev@gmail.com?subject=Let's Connect – Opportunity to Collaborate";
  };

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
                className="cursor-default font-fancy text-[19vw] max-sm:text-[22vw] font-medium leading-none"
                style={{ color: textColor }}
              >
                CreaDEV.
              </h1>
            </div>

            <p
              className="text-center cursor-default mb-10 max-sm:mb-6 font-general text-2xl tracking-widest"
              style={{ color: textColor }}
            >
              Nirit Nagar :: Creative Development
            </p>
            <button
              onClick={sendMail}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="line font-medium text-white bg-transparent border-2 rounded-full w-auto flex py-1 sm:py-4 pr-12 pl-14 max-sm:px-4 max-sm:mt-0 items-center justify-center"
              style={{ borderColor: "rgba(255, 255, 255, 0.5)" }}
              aria-label="Send email"
              role="button"
            >
              <span className="mr-1 size-[40px] pl-2 sm:pl-0 mt-0 relative">
                <Mail
                  className={`${mailIconClass} size-[28px] sm:size-[34px] absolute top-1/2 transform -translate-y-1/2 transition-opacity duration-500`}
                />
                <MailOpen
                  className={`${mailOpenIconClass} size-[28px] sm:size-[34px] absolute left top-1/2 transform -translate-y-1/2 transition-opacity duration-500`}
                />
              </span>
              <span className="text-white text-[7vw] sm:text-[2vw] transition-opacity duration-500">
                Let's connect
                <span
                  className={`${textClass} transition-opacity duration-500`}
                >
                  !
                </span>
                <span
                  className={`${textClassActive} transition-opacity duration-500`}
                >
                  {":)"}
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
