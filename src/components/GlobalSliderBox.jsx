import { useRef, useState, useMemo } from "react";
import { useSlider } from "../context/SliderContext";
import ColorSlider from "./ColorSlider";
import {
  Droplet,
  //Eraser,
  Maximize2,
  Minimize2,
  Paintbrush,
  Sun
} from "lucide-react";
import gsap from "gsap";

const GlobalSliderBox = () => {
  const {
    hue,
    saturation,
    brightness,
    //opacity,
    setHue,
    setSaturation,
    setBrightness
    //setOpacity
  } = useSlider();

  const boxRef = useRef(null);
  const contentRef = useRef(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const textColor = useMemo(() => {
    let lightness = 100 - brightness;

    if (lightness > 70) {
      lightness = 70;
    }

    return `hsl(${hue}, 100%, ${lightness}%)`;
  }, [hue, brightness]);

  const toggleResize = () => {
    const box = boxRef.current;
    const content = contentRef.current;
    if (!box || !content) return;

    if (isCollapsed) {
      // Expand
      gsap.to(box, {
        opacity: 1,
        width: "220px",
        height: "auto",
        borderRadius: "1rem",
        padding: "1.5rem 0 1.5rem 1.25rem",
        duration: 0.6,
        ease: "power2.inOut"
      });
      gsap.to(content, {
        opacity: 1,
        delay: 0.4,
        duration: 0.3,
        pointerEvents: "auto"
      });
    } else {
      // Collapse
      gsap.to(content, {
        opacity: 0,
        duration: 0.2,
        pointerEvents: "none"
      });
      gsap.to(box, {
        opacity: 0,
        delay: 0.2,
        width: "0px",
        height: "0px",
        padding: "0",
        duration: 0.6,
        ease: "power2.inOut"
      });
    }

    setIsCollapsed(!isCollapsed);
  };

  const iconStyle = { color: "#fff", marginLeft: 5 };

  const sliders = [
    {
      key: "H",
      icon: <Paintbrush size={26} style={iconStyle} />,
      value: hue,
      onChange: setHue
    },
    {
      key: "S",
      icon: <Droplet size={26} style={iconStyle} />,
      value: saturation,
      onChange: setSaturation
    },
    {
      key: "B",
      icon: <Sun size={26} style={iconStyle} />,
      value: brightness,
      onChange: setBrightness
    }
    /* {
      key: "O",
      icon: <Eraser size={26} style={iconStyle} />,
      value: opacity,
      onChange: setOpacity
    } */
  ];

  return (
    <div className="fixed flex-row-reverse top-6 right-6 z-[9999] flex items-start justify-start">
      <div
        onClick={toggleResize}
        className="ml-4 flex size-12 items-center justify-center rounded-full shadow-xl transition hover:scale-110"
        style={{
          background: "#000",
          cursor: "pointer",
          pointerEvents: "auto"
        }}
      >
        {isCollapsed ? (
          <Maximize2 size={20} style={{ color: "#fff" }} />
        ) : (
          <Minimize2 size={20} style={{ color: "#fff" }} />
        )}
      </div>

      <div
        ref={boxRef}
        className="h-auto w-[230px] space-y-4 rounded-lg py-6 pl-5 pr-0 shadow-lg"
        style={{
          background: "#000",
          pointerEvents: "auto"
        }}
      >
        <div
          ref={contentRef}
          className="w-full flex-col items-center space-y-4 transition-opacity duration-300"
        >
          {sliders.map(({ key, icon, value, onChange }) => (
            <div
              key={key}
              className="flex w-full items-center justify-around gap-4"
            >
              {icon}
              <ColorSlider
                key={key}
                mode={key}
                value={value}
                onChange={onChange}
                min={0}
                max={key === "H" ? 360 : 100} // Saturation value 0-360
                hue={hue}
                saturation={saturation}
                brightness={brightness}
                //opacity={opacity}
              />
            </div>
          ))}
        </div>
        {/* <div className="text-lg">
          <p className="text-center" style={{ color: "#fff" }}>
            H {hue.toFixed(2)} S {saturation.toFixed(2)}% B
            {brightness.toFixed(2)}%
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default GlobalSliderBox;
