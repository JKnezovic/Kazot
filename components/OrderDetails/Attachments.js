import React, { useState, useEffect } from "react";
import { Image, View, Pressable, StyleSheet, Modal } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { FAB, Dialog, Button, List } from "react-native-paper";
import { moderateScale } from "../../Scaling";
import Parse from "parse/react-native.js";
import { Colors } from "../../utils/constants";
import ImageViewer from "react-native-image-zoom-viewer";
import useImagePicker from "../../utils/useImagePicker";
import useImageUpload from "../../utils/useImageUpload";

const Attachments = ({ service, setSnackbar, open, setLoading }) => {
  const [expanded, setExpanded] = useState(open);
  const [attachments, setAttachments] = useState([]);
  const [visible, setIsVisible] = useState(false);
  const [visibleDialog, setVisibleDialog] = useState(false);
  const hideDialog = () => setVisibleDialog(false);
  const handlePress = () => setExpanded(!expanded);
  const [deleteItem, setDeleteItem] = useState(null);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);

  const getAttachments = async () => {
    const attachmentQuery = new Parse.Query("Attachments");
    const serviceObject = new Parse.Object("Services", {
      id: service.serviceOrderId,
    });
    attachmentQuery.equalTo("service_fkey", serviceObject);
    try {
      let Attachments = await attachmentQuery.find();
      setAttachments(Attachments);
      createImageArray(Attachments);
      return true;
    } catch (error) {
      console.log("Error!", error.message);
      return false;
    }
  };
  const { uploadImages, removeImage, isLoading } = useImageUpload(
    service,
    setSnackbar,
    getAttachments
  );

  const { pickImage, captureImage } = useImagePicker();

  const createImageArray = (Attachments) => {
    var array = Attachments.map((x) => ({ url: x.get("attachment").url() }));
    setImages(array);
  };

  const prepareImageDelete = (id) => {
    setDeleteItem(id);
    setVisibleDelete(true);
  };

  const handleDeleteImage = async () => {
    await removeImage(deleteItem);
    setVisibleDelete(false);
  };

  const prepareImageView = (index) => {
    setIsVisible(true);
    setIndex(index);
  };

  const handlePickImage = async () => {
    hideDialog();
    pickImage(async (selectedImages) => {
      await uploadImages(selectedImages);
    });
  };

  const handleCaptureImage = async () => {
    hideDialog();
    captureImage(async (capturedImages) => {
      await uploadImages(capturedImages);
    });
  };

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    getAttachments();
  }, []);

  return (
    <>
      <List.Accordion
        style={{ backgroundColor: "rgba(229, 229, 229, 0.4)" }}
        titleStyle={{ color: Colors.OXFORD_BLUE }}
        title={"Attachments"}
        left={(props) => <List.Icon {...props} icon="image" color={Colors.ORANGE_WEB} />}
        expanded={expanded}
        onPress={handlePress}
      >
        <View style={{ flex: 1, paddingLeft: 0 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {attachments.map((item, index) => (
              <Pressable
                key={item.id}
                style={styles.imageItem}
                onPress={() => prepareImageView(index)}
              >
                <MaterialIcons
                  name="highlight-remove"
                  size={24}
                  color={Colors.ORANGE_WEB}
                  onPress={() => prepareImageDelete(item.id)}
                  style={{
                    position: "absolute",
                    top: 0,
                    right: -10,
                    zIndex: 2,
                    backgroundColor: "rgba(52, 52, 52, 0.5)",
                    borderRadius: 20,
                    overflow: "hidden",
                  }}
                />
                <Image source={{ uri: item.get("attachment").url() }} style={styles.imageItem} />
              </Pressable>
            ))}
          </View>
        </View>
        <FAB
          icon="upload"
          label="Upload images"
          mode="elevated"
          color={Colors.OXFORD_BLUE}
          style={{
            backgroundColor: Colors.PLATINUM,
            marginVertical: "8%",
            width: moderateScale(250),
            alignSelf: "center",
            paddingLeft: 0,
          }}
          onPress={() => setVisibleDialog(true)}
        />
      </List.Accordion>
      <Dialog
        visible={visibleDialog}
        onDismiss={hideDialog}
        style={{
          backgroundColor: Colors.PLATINUM,
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
      <Dialog
        style={{ backgroundColor: Colors.WHITE }}
        visible={visibleDelete}
        onDismiss={() => setVisibleDelete(false)}
      >
        <Dialog.Title>Delete Image</Dialog.Title>
        <Dialog.Actions>
          <Button textColor={Colors.OXFORD_BLUE} onPress={() => setVisibleDelete(false)}>
            Cancel
          </Button>
          <Button textColor={Colors.ANTIQUE_RUBY} onPress={handleDeleteImage}>
            Delete
          </Button>
        </Dialog.Actions>
      </Dialog>
      <Modal visible={visible} transparent={true} onRequestClose={() => setIsVisible(false)}>
        <ImageViewer
          enableSwipeDown={true}
          onSwipeDown={() => setIsVisible(false)}
          saveToLocalByLongPress={false}
          imageUrls={images}
          index={index}
        />
      </Modal>
    </>
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

export default Attachments;
