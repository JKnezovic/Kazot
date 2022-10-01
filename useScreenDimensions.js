import { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["EventEmitter.removeListener"]);

const useScreenDimensions = () => {
  const [screenData, setScreenData] = useState(Dimensions.get("screen"));

  useEffect(() => {
    const onChange = (result) => setScreenData(result.screen);

    Dimensions.addEventListener("change", onChange);

    return () => Dimensions.removeEventListener("change", onChange);
  });

  return {
    ...screenData,
    isLandscape: screenData.width > screenData.height,
  };
};

export default useScreenDimensions;
