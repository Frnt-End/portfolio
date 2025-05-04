import { useEffect, useRef, useMemo } from "react";
import { useSlider } from "../context/SliderContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkle, Sparkles, WandSparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ScrollText = () => {
  const sectionRef = useRef(null);
  const { hue, saturation, brightness } = useSlider();

  const overlayStyle = useMemo(() => {
    let light = brightness;

    if (light > 80) {
      light = light - 20;
    }

    return `hsl(${hue}, ${saturation}%, ${light}%)`;
  }, [hue, brightness, saturation]);

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
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: line,
              start: "top 70%",
              end: "top 30%",
              scrub: 1
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-auto items-start justify-start overflow-hidden bg-white text-black"
    >
      {/*  <div
        className="pointer-events-none absolute left-0 top-0 z-0 size-full transition duration-100 ease-out"
        style={{ background: overlayStyle }}
      /> */}
      <div className="z-10 w-full pb-18 pt-24 px-2 text-2xl font-light leading-relaxed sm:text-3xl lg:text-4xl">
        <div className="p-9 line font-bold font-fancy text-black text-[14vw] sm:text-[6vw] h-auto leading-[10vh]">
          Let's unpack this project..
        </div>

        <div className="flex flex-wrap w-full p-2 sm:w-full">
          <div className="line relative w-full sm:w-[50%] mt-6 p-8">
            <div className="mb-4 flex items-center text-[3vw] font-normal text-black">
              <span className="mx-4">
                <Sparkle size="30" />
              </span>
              <h4 className="text-black panel-title text-4xl sm:text-5xl font-fancy font-bold">
                Problem Statements
              </h4>
            </div>
            <div
              className="w-full sm:w-[50%] h-2 rounded-full panel-underline"
              style={{ background: textColor }}
            ></div>
            <div>
              <ul className="list-none mt-6 text-[5vw] sm:text-[1.6vw] space-y-6">
                <li className="flex items-start">
                  "Users are overwhelmed by too many charting tools at once."
                </li>

                <li className="flex items-start">
                  "The confirmation step for trades causes confusion during high
                  volatility."
                </li>

                <li className="flex items-start">
                  "Users don’t understand how fees are calculated."
                </li>
              </ul>
            </div>
          </div>

          <div className="line relative w-full sm:w-[45%] mt-6 p-8">
            <div className="mb-3 flex items-center justify-start text-black text-[3vw] font-normal">
              <span className="mx-4">
                <Sparkles size="30" />
              </span>
              <h4 className="text-black panel-title text-4xl sm:text-5xl font-fancy font-bold">
                UX Goals
              </h4>
            </div>
            <div
              className="w-[50%] h-2 rounded-full panel-underline"
              style={{ background: textColor }}
            ></div>
            <div>
              <ul className="list-none text-[5vw] sm:text-[1.6vw] mt-6 space-y-6">
                <li className="flex items-start">
                  Minimize friction between insight → action
                </li>

                <li className="flex items-start">
                  Prevent costly errors (like selling too early/late)
                </li>

                <li className="flex items-start">
                  Build trust through clarity (fees, data freshness, security)
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full line flex sm:flex-row max-sm:flex-col justify-center items-center py-10 px-6 mt-6">
            <div className="w-full sm:w-[35%] relative">
              <div className="mb-4 flex items-center justify-start text-black text-[3vw] font-normal">
                <span className="mx-4">
                  <WandSparkles size="30" />
                </span>
                <h4 className="text-black panel-title text-5xl font-fancy font-bold">
                  Final Result
                </h4>
              </div>
              <div
                className="w-[50%] h-2 rounded-full panel-underline"
                style={{ background: textColor }}
              ></div>
              <div className="flex pt-5">
                <ul className="list-none text-[5vw] sm:text-[1.6vw] mt-6 space-y-6">
                  <li className="flex items-start">
                    Establishing trust immediately (clean UI, security language,
                    palette)
                  </li>

                  <li className="flex items-start">
                    Highlighting ease of trading
                  </li>

                  <li className="flex items-start">
                    Presenting key data points clearly (market overview,
                    portfolio value)
                  </li>
                </ul>
              </div>
            </div>

            <img
              src="img/01.png"
              alt="project"
              width="100%"
              height="100%"
              className="w-full sm:w-[60%] mt-12 sm:mt-0 max-sm:size-full pointer-events-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollText;
