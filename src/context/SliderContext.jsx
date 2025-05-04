import { createContext, useContext, useState } from "react";

const SliderContext = createContext();

export const SliderProvider = ({ children }) => {
  const [hue, setHue] = useState(240);
  const [saturation, setSaturation] = useState(44);
  const [brightness, setBrightness] = useState(77);
  // const [opacity, setOpacity] = useState(100);

  return (
    <SliderContext.Provider
      value={{
        hue,
        saturation,
        brightness,
        //opacity,
        setHue,
        setSaturation,
        setBrightness
        // setOpacity
      }}
    >
      {children}
    </SliderContext.Provider>
  );
};

export const useSlider = () => useContext(SliderContext);
