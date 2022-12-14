import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = (size) => (width / guidelineBaseWidth) * size;
const verticalScale = (size) => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;
const isSmartPhoneBasedOnRatio = () => height / width > 1.6;

export { scale, verticalScale, moderateScale, isSmartPhoneBasedOnRatio };
