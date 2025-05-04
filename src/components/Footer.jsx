import { useEffect, useState, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Mail, MailOpen } from "lucide-react";
import { useSlider } from "../context/SliderContext";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const [showSend, setShowSend] = useState(false);
  const handleMouseEnter = () => setShowSend(true);
  const handleMouseLeave = () => setShowSend(false);

  const mailIconClass = showSend ? "opacity-0" : "opacity-100";
  const mailOpenIconClass = showSend ? "opacity-100" : "opacity-0";
  const textClass = showSend ? "opacity-0" : "opacity-100";
  const textClassActive = showSend ? "opacity-100" : "opacity-0";

  const { hue, saturation, brightness } = useSlider();

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

  const sendMail = () => {
    window.location.href =
      "mailto:nirit.nagar.dev@gmail.com?subject=Let's Connect – Opportunity to Collaborate";
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#clip",
          start: "top 80%",
          end: "bottom 68%",
          scrub: 1
        }
      });

      tl.fromTo(
        ".bg-anime",
        { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
        {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          ease: "power2.inOut"
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <footer className="relative h-screen w-screen bg-white" id="clip">
      <div className="bg-anime z-40 absolute size-full">
        <div
          className="pointer-events-none absolute left-0 top-0 size-full transition duration-100 ease-out"
          style={{ background: overlayStyle }}
        />
      </div>
      <div className="flex justify-center items-center size-full flex-col relative z-0">
        <h3
          className="pointer-events-none line text-[14vw] font-fancy font-bold"
          style={{ color: textColor }}
        >
          Intrigued..?
        </h3>
        <button
          onClick={sendMail}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="line mb-24 bg-transparent border-2 rounded-full w-auto flex py-1 sm:py-4 pr-12 pl-14 max-sm:px-4 max-sm:mt-4 items-center justify-center"
          style={{ borderColor: textColor, color: textColor }}
          aria-label="Send email"
          role="button"
        >
          <span className="mr-1 size-[40px] pl-2 sm:pl-0 mt-1 relative">
            <Mail
              className={`${mailIconClass} size-[32px] sm:size-[40px] absolute top-1/2 transform -translate-y-1/2 transition-opacity duration-500`}
            />
            <MailOpen
              className={`${mailOpenIconClass} size-[32px] sm:size-[40px] absolute left top-1/2 transform -translate-y-1/2 transition-opacity duration-500`}
            />
          </span>
          <span
            className="text-[7vw] sm:text-[3vw] transition-opacity duration-500"
            style={{ color: textColor }}
          >
            Let's connect
            <span className={`${textClass} transition-opacity duration-500`}>
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

      <div className="w-full left-36 relative max-sm:m-auto max-sm:bottom-11 max-sm:left-0 max-sm:text-center bottom-4 sm:absolute z-50">
        <p className="text-sm font-light" style={{ color: textColor }}>
          ©Nirit Nagar Portfolio 2025. All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
