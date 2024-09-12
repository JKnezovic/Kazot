import { useEffect, useState } from "react";
import { Dimensions } from "react-native";

const useScreenDimensions = () => {
  const [screenData, setScreenData] = useState(Dimensions.get("screen"));

  useEffect(() => {
    const onChange = (result) => setScreenData(result.screen);

    dimensionsHandler = Dimensions.addEventListener("change", onChange);

    return () => dimensionsHandler.remove();
  });

  return {
    ...screenData,
    isLandscape: screenData.width > screenData.height,
  };
};

export default useScreenDimensions;
