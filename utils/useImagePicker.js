import * as ImagePicker from "expo-image-picker";

const useImagePicker = () => {
  const pickImage = async (onSuccess) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 0.4,
      allowsMultipleSelection: true,
      base64: true,
    });

    if (!result.canceled && onSuccess) {
      const images = result.assets.map((v) => ({ ...v, url: v.uri }));
      onSuccess(images); // Call the callback with selected images
    }
  };

  const captureImage = async (onSuccess) => {
    let status = await ImagePicker.requestCameraPermissionsAsync();
    if (status.granted) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 0.4,
        base64: true,
      });

      if (!result.canceled && onSuccess) {
        const image = [{ ...result.assets[0], url: result.assets[0].uri }];
        onSuccess(image); // Call the callback with captured image
      }
    }
  };

  return { pickImage, captureImage };
};

export default useImagePicker;
