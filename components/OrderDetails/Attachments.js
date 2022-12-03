import React, { useState, useEffect } from "react";
import { Image, View, Pressable, StyleSheet, Modal } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { FAB, Dialog, Button, List } from "react-native-paper";
import { moderateScale } from "../../Scaling";
import Parse from "parse/react-native.js";
import { colours } from "../../utils/constants";
import ImageViewer from "react-native-image-zoom-viewer";

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

  const createImageArray = (Attachments) => {
    var array = Attachments.map((x) => ({ url: x.get("attachment").url() }));
    setImages(array);
  };

  const removeImage = async () => {
    setLoading(true);
    try {
      const image_id = deleteItem;
      const params = { image_id };
      const result = await Parse.Cloud.run("deleteGalleryPicture", params);
      setVisibleDelete(false);
      setSnackbar(true, "Image deleted");
      setLoading(false);
      getAttachments();
    } catch (error) {
      setLoading(false);
      setSnackbar(true, "Delete Error: " + error);
      console.log(error);
    }
  };

  const prepareImageDelete = (id) => {
    setDeleteItem(id);
    setVisibleDelete(true);
  };

  const UploadAttachments = async (images) => {
    setLoading(true);
    // 1. Create a file
    var bar = new Promise((resolve, reject) => {
      images.forEach(async (image, index, array) => {
        const { base64 } = image;
        const filename = "testing" + index;
        const parseFile = new Parse.File(filename, { base64 });
        // 2. Save the file
        try {
          const responseFile = await parseFile.save();
          const Attachments = Parse.Object.extend("Attachments");
          const attachments = new Attachments();
          attachments.set("attachment", responseFile);
          const serviceObject = new Parse.Object("Services", {
            id: service.serviceOrderId,
          });
          attachments.set("service_fkey", serviceObject);
          await attachments.save();
          if (index === array.length - 1) resolve();
        } catch (error) {
          setSnackbar(true, "Oops, something went wrong!");
        }
      });
    });
    bar.then(() => {
      setSnackbar(true, "Images saved");
      getAttachments();
      setLoading(false);
    });
  };

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
      if (Array.isArray(result.selected)) UploadAttachments(result.selected);
      else UploadAttachments([result]);
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
        UploadAttachments([result]);
      }
    }
  };

  const prepareImageView = (index) => {
    setIsVisible(true);
    setIndex(index);
  };
  useEffect(() => {
    getAttachments();
  }, []);

  return (
    <>
      <List.Accordion
        style={{ backgroundColor: "rgba(229, 229, 229, 0.4)" }}
        titleStyle={{ color: "#14213D" }}
        title={"Attachments"}
        left={(props) => <List.Icon {...props} icon="image" color="#fca311" />}
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
                  color="#fca311"
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
                <Image
                  source={{ uri: item.get("attachment").url() }}
                  style={styles.imageItem}
                />
              </Pressable>
            ))}
          </View>
        </View>
        <FAB
          icon="upload"
          label="Upload images"
          mode="elevated"
          color="#14213D"
          style={{
            backgroundColor: "#E5E5E5",
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
          backgroundColor: "#E5E5E5",
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
      <Dialog
        style={{ backgroundColor: "#FFFFFF" }}
        visible={visibleDelete}
        onDismiss={() => setVisibleDelete(false)}
      >
        <Dialog.Title>Delete Image</Dialog.Title>
        <Dialog.Actions>
          <Button
            textColor={colours.OXFORD_BLUE}
            onPress={() => setVisibleDelete(false)}
          >
            Cancel
          </Button>
          <Button
            textColor={colours.ANTIQUE_RUBY}
            onPress={() => removeImage()}
          >
            Delete
          </Button>
        </Dialog.Actions>
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
