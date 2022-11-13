import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  Pressable,
  StyleSheet,
  FlatList,
  Modal,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { FAB, Dialog, Button } from "react-native-paper";
import { moderateScale } from "../../Scaling";
import ImageViewer from "react-native-image-zoom-viewer";

const UploadImageForm = ({ FadeIn, images, setImages }) => {
  const [visible, setIsVisible] = useState(false);
  const [visibleDialog, setVisibleDialog] = useState(false);
  const hideDialog = () => setVisibleDialog(false);
  const [index, setIndex] = useState(0);

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
      if (Array.isArray(result.selected)) {
        let arrayURL = result.selected.map((v) => ({ ...v, url: v.uri }));
        setImages((array) => [...array, ...arrayURL]);
      } else {
        result.url = result.uri;
        setImages((array) => [...array, result]);
      }
    }
  };

  const captureImage = async () => {
    hideDialog();
    let status = await ImagePicker.requestCameraPermissionsAsync();
    if (status) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 0.5,
        base64: true,
      });
      if (!result.cancelled) {
        result.url = result.uri;
        setImages((array) => [...array, result]);
      }
    }
  };

  const removeImage = (uri) => {
    setImages(images.filter((image) => image.uri != uri));
  };
  const prepareImageView = (index) => {
    setIsVisible(true);
    setIndex(index);
  };

  return (
    <View style={styles.container}>
      <FAB
        icon="upload"
        label="Upload images"
        mode="flat"
        color="#14213D"
        style={{
          backgroundColor: "#E5E5E5",
          marginVertical: "8%",
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
        renderItem={({ item, index }) => (
          <Pressable onPress={() => prepareImageView(index)}>
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
                overflow: "hidden",
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
        style={{
          backgroundColor: "#FFFFFF",
          width: moderateScale(300),
          alignSelf: "center",
        }}
      >
        <Dialog.Content
          style={{
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "space-around",
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
      <Modal
        visible={visible}
        transparent={true}
        onRequestClose={() => setIsVisible(false)}
      >
        <ImageViewer
          renderHeader={() => (
            <Pressable
              alignSelf="flex-end"
              right={8}
              top={15}
              zIndex={1}
              position="absolute"
              onPress={() => setIsVisible(false)}
            >
              <MaterialIcons name="highlight-remove" size={28} color="white" />
            </Pressable>
          )}
          saveToLocalByLongPress={false}
          imageUrls={images}
          index={index}
        />
      </Modal>
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
    width: moderateScale(100),
    height: moderateScale(100),
    resizeMode: "cover",
    marginHorizontal: 5,
    marginVertical: 5,
  },
});

export default UploadImageForm;
