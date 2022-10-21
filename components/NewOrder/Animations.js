import { Animated } from "react-native";

const fadeIn = (duration, translateFadeAnim, fadeAnim) => {
  Animated.parallel([
    Animated.timing(translateFadeAnim, {
      toValue: 0,
      duration: duration,
      useNativeDriver: true,
    }),
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: duration,
      useNativeDriver: true,
    }),
  ]).start();
};

const fadeOutLeft = (duration, translateFadeAnim, fadeAnim) => {
  Animated.sequence([
    Animated.parallel([
      Animated.timing(translateFadeAnim, {
        toValue: -200,
        duration: duration - 10,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: duration - 10,
        useNativeDriver: true,
      }),
    ]),
    Animated.timing(translateFadeAnim, {
      toValue: 200,
      duration: 10,
      useNativeDriver: true,
    }),
  ]).start();
};

const fadeOutRight = (duration, translateFadeAnim, fadeAnim) => {
  Animated.sequence([
    Animated.parallel([
      Animated.timing(translateFadeAnim, {
        toValue: 200,
        duration: duration - 10,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: duration - 10,
        useNativeDriver: true,
      }),
    ]),
    Animated.timing(translateFadeAnim, {
      toValue: -200,
      duration: 10,
      useNativeDriver: true,
    }),
  ]).start();
};

export { fadeIn, fadeOutLeft, fadeOutRight };
