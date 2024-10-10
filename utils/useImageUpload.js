import { useState } from "react";
import Parse from "parse/react-native.js";

const useImageUpload = (service, setSnackbar, getAttachments) => {
  const [isLoading, setIsLoading] = useState(false);

  const uploadImages = async (images) => {
    setIsLoading(true);
    try {
      for (const image of images) {
        const base64 = image.base64;
        const mimeType = image.type || "image/jpeg";
        const fileName = `${Date.now()}.jpg`;
        const parseFile = new Parse.File(fileName, { base64 }, mimeType);

        const responseFile = await parseFile.save();
        const Attachments = Parse.Object.extend("Attachments");
        const attachments = new Attachments();
        attachments.set("attachment", responseFile);
        const serviceObject = new Parse.Object("Services", {
          id: service.serviceOrderId,
        });
        attachments.set("service_fkey", serviceObject);
        await attachments.save();
      }

      setSnackbar(true, "Images saved");
      getAttachments(); // Update the list of attachments after upload
    } catch (error) {
      setSnackbar(true, "Oops, something went wrong!");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeImage = async (imageId) => {
    setIsLoading(true);
    try {
      const params = { image_id: imageId };
      await Parse.Cloud.run("deleteGalleryPicture", params);
      setSnackbar(true, "Image deleted");
      getAttachments(); // Refresh the list after deletion
    } catch (error) {
      setSnackbar(true, "Delete Error: " + error.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { uploadImages, removeImage, isLoading };
};

export default useImageUpload;
