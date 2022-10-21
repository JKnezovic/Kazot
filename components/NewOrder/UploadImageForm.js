import React, { useState, useEffect } from "react";
import { Image, View, Pressable, StyleSheet, FlatList } from "react-native";
import * as ImagePicker from "expo-image-picker";
import ImageView from "react-native-image-viewing";
import { MaterialIcons } from "@expo/vector-icons";
import { FAB, Dialog, Button } from "react-native-paper";
import { moderateScale } from "../../Scaling";

const UploadImageForm = ({ FadeIn, images, setImages }) => {
  const [visible, setIsVisible] = useState(false);
  const [visibleDialog, setVisibleDialog] = useState(false);
  const hideDialog = () => setVisibleDialog(false);

  useEffect(() => {
    FadeIn();
  }, []);

  const pickImage = async () => {
    hideDialog();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 0.5,
      allowsMultipleSelection: true,
      base64: true,
    });
    if (!result.cancelled) {
      if (Array.isArray(result.selected))
        setImages((array) => [...array, ...result.selected]);
      else setImages((array) => [...array, result]);
    }
  };

  const captureImage = async () => {
    hideDialog();
    let status = await ImagePicker.requestCameraPermissionsAsync();
    console.log(status);
    if (status) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 0.5,
        base64: true,
      });
      if (!result.cancelled) {
        setImages((array) => [...array, result]);
      }
    }
  };

  const removeImage = (uri) => {
    setImages(images.filter((image) => image.uri != uri));
  };

  return (
    <View style={styles.container}>
      <FAB
        icon="upload"
        label="Upload images"
        mode="elevated"
        color="#14213D"
        style={{
          backgroundColor: "#E5E5E5",
          marginVertical: "10%",
          width: moderateScale(300),
          alignSelf: "center",
        }}
        onPress={() => setVisibleDialog(true)}
      />
      <FlatList
        contentContainerStyle={styles.listContent}
        data={images}
        horizontal={false}
        numColumns={3}
        renderItem={({ item }) => (
          <Pressable onPress={() => setIsVisible(true)}>
            <MaterialIcons
              name="highlight-remove"
              size={24}
              color="#fca311"
              onPress={() => removeImage(item.uri)}
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                zIndex: 2,
                backgroundColor: "rgba(52, 52, 52, 0.5)",
                borderRadius: 20,
              }}
            />

            <Image source={{ uri: item.uri }} style={styles.imageItem} />
          </Pressable>
        )}
        keyExtractor={(item) => item.uri}
      />
      <Dialog
        visible={visibleDialog}
        onDismiss={hideDialog}
        style={{ backgroundColor: "#E5E5E5" }}
      >
        <Dialog.Content
          style={{
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
          }}
        >
          <Button
            textColor="#14213D"
            icon="camera"
            onPress={() => captureImage()}
          >
            Capture Photo
          </Button>
          <Button
            textColor="#14213D"
            icon="folder-image"
            onPress={() => pickImage()}
          >
            Upload
          </Button>
        </Dialog.Content>
      </Dialog>
      <ImageView
        images={images}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, width: "100%" },
  listContent: {
    flex: 1,
    alignItems: "center",
  },
  imageItem: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    marginHorizontal: 5,
    marginVertical: 5,
  },
});

export default UploadImageForm;
