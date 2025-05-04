import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ArrowUp, ArrowDown } from "lucide-react";

gsap.registerPlugin(ScrollToPlugin);

const ScrollButtons = () => {
  const [atBottom, setAtBottom] = useState(false);
  const buttonContainerRef = useRef(null);
  const { y: scrollY } = useWindowScroll();

  useEffect(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;

    const shouldShow = scrollY > window.innerHeight * 0.1;
    const isAtBottom = scrollY + windowHeight >= scrollHeight - 10;
    setAtBottom(isAtBottom);

    gsap.to(buttonContainerRef.current, {
      opacity: shouldShow ? 1 : 0,
      duration: 0.4,
      ease: "power2.out",
      onStart: () => {
        if (buttonContainerRef.current) {
          buttonContainerRef.current.style.pointerEvents = shouldShow
            ? "auto"
            : "none";
        }
      }
    });
  }, [scrollY]);

  const scrollToTop = () => {
    gsap.to(window, {
      scrollTo: { y: 0 },
      duration: 1.5,
      ease: "power2.inOut"
    });
  };

  const scrollToBottom = () => {
    const bottom = document.documentElement.scrollHeight;
    gsap.to(window, {
      scrollTo: { y: bottom },
      duration: 1.5,
      ease: "power2.inOut"
    });
  };

  return (
    <div
      ref={buttonContainerRef}
      className="fixed right-6 bottom-20 z-[9999] flex flex-col items-center gap-4 opacity-0 transition-opacity duration-500 pointer-events-none"
    >
      <button
        onClick={scrollToTop}
        className="rounded-full bg-black/60 text-white backdrop-blur-md p-2 hover:scale-110 transition"
      >
        <ArrowUp size={24} />
      </button>

      {!atBottom && (
        <button
          onClick={scrollToBottom}
          className="rounded-full bg-black/60 text-white backdrop-blur-md p-2 hover:scale-110 transition"
        >
          <ArrowDown size={24} />
        </button>
      )}
    </div>
  );
};

export default ScrollButtons;
