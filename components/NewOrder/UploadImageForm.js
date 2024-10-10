import React, { useState, useEffect } from "react";
import { Image, View, Pressable, StyleSheet, FlatList, Modal } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { FAB, Dialog, Button } from "react-native-paper";
import { moderateScale } from "../../Scaling";
import ImageViewer from "react-native-image-zoom-viewer";
import useImagePicker from "../../utils/useImagePicker";
import { Colors } from "../../utils/constants";

const UploadImageForm = ({ FadeIn, images, setImages }) => {
  const [visible, setIsVisible] = useState(false);
  const [visibleDialog, setVisibleDialog] = useState(false);
  const hideDialog = () => setVisibleDialog(false);
  const [index, setIndex] = useState(0);

  const { pickImage, captureImage } = useImagePicker();

  useEffect(() => {
    FadeIn();
  }, []);

  const handlePickImage = () => {
    hideDialog();
    pickImage((selectedImages) => {
      setImages((array) => [...array, ...selectedImages]);
    });
  };

  const handleCaptureImage = () => {
    hideDialog();
    captureImage((capturedImage) => {
      setImages((array) => [...array, ...capturedImage]);
    });
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
        color={Colors.OXFORD_BLUE}
        style={{
          backgroundColor: Colors.PLATINUM,
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
              color={Colors.ORANGE_WEB}
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
          backgroundColor: Colors.WHITE,
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
          <Button textColor={Colors.OXFORD_BLUE} icon="camera" onPress={handleCaptureImage}>
            Capture Photo
          </Button>
          <Button textColor={Colors.OXFORD_BLUE} icon="folder-image" onPress={handlePickImage}>
            Upload
          </Button>
        </Dialog.Content>
      </Dialog>
      <Modal visible={visible} transparent onRequestClose={() => setIsVisible(false)}>
        <ImageViewer
          enableSwipeDown
          onSwipeDown={() => setIsVisible(false)}
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
