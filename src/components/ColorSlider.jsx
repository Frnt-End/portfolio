import { useEffect, useRef, useState } from "react";

const ColorSlider = ({
  mode,
  value,
  onChange,
  min,
  max,
  hue,
  saturation,
  brightness
}) => {
  const trackRef = useRef(null);
  const [trackWidth, setTrackWidth] = useState(0);

  useEffect(() => {
    const updateTrackWidth = () => {
      if (trackRef.current) {
        setTrackWidth(trackRef.current.offsetWidth);
      }
    };

    updateTrackWidth();
    window.addEventListener("resize", updateTrackWidth);
    return () => window.removeEventListener("resize", updateTrackWidth);
  }, []);

  const percent = (value - min) / (max - min);
  const pixelLeft = percent * trackWidth;

  const trackBackgroundMap = {
    H: "linear-gradient(to right, red, yellow, lime, cyan, blue, magenta, red)",
    S: `linear-gradient(to right, hsl(${hue}, 0%, ${brightness}%), hsl(${hue}, 100%, ${brightness}%))`,
    B: `linear-gradient(to right, hsl(${hue}, ${saturation}%, 0%), hsl(${hue}, ${saturation}%, 100%))`
  };

  const thumbColorMap = {
    H: `hsl(${value}, 100%, 50%)`,
    S: `hsl(${hue}, ${value}%, ${brightness}%)`,
    B: `hsl(${hue}, ${saturation}%, ${value}%)`
  };

  const getTrackBackground = () => trackBackgroundMap[mode] ?? "#ccc";
  const getThumbColor = () => thumbColorMap[mode] ?? "#000";

  const handleChange = (e) => {
    const newValue = e.target.valueAsNumber;
    onChange(newValue);
  };

  return (
    <div className="w-full flex items-center">
      <div
        ref={trackRef}
        className="relative flex h-6 w-[85%] cursor-pointer items-center"
      >
        <input
          type="range"
          min={min}
          max={max}
          step="0.1"
          value={value}
          onChange={handleChange}
          className="absolute h-6 w-full appearance-none bg-transparent z-10 touch-none"
          style={{
            WebkitAppearance: "none",
            MozAppearance: "none",
            cursor: "pointer"
          }}
        />

        <div
          className="pointer-events-none absolute h-2 w-full rounded-full"
          style={{
            background: getTrackBackground(),
            zIndex: 1,
            borderRadius: "1rem",
            cursor: "pointer"
          }}
        />

        <div
          className="pointer-events-none absolute h-5 w-5 rounded-full"
          style={{
            left: `${pixelLeft}px`,
            backgroundColor: getThumbColor(),
            transform: "translate(-50%, -50%)",
            top: "50%",
            zIndex: 3,
            boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
            cursor: "pointer"
          }}
        />
      </div>
    </div>
  );
};

export default ColorSlider;
