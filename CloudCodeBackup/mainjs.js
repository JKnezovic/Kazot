require("./newOrder.js");

Parse.Cloud.define("deleteGalleryPicture", async (request) => {
  const { image_id } = request.params;
  const Gallery = Parse.Object.extend("Attachments");
  const query = new Parse.Query(Gallery);
  try {
    const Image = await query.get(image_id);
    const picture = Image.get("attachment");

    await picture.destroy({ useMasterKey: true });
    await Image.destroy();
    return "Image removed.";
  } catch (error) {
    console.log(error);
    throw new Error("Error deleting image");
  }
});

Parse.Cloud.define("deleteImagesForServiceOrder", async (request) => {
  const { serviceOrderId } = request.params;
  const Gallery = Parse.Object.extend("Attachments");
  const query = new Parse.Query(Gallery);
  const serviceOrder = new Parse.Object("Services", { id: serviceOrderId });
  query.equalTo("service_fkey", serviceOrder);
  try {
    const Images = await query.find();
    for (let i = 0; i < Images.length; i++) {
      const picture = Images[0].get("attachment");
      await picture.destroy({ useMasterKey: true });
    }
    await Parse.Object.destroyAll(Images, { useMasterKey: true });
    return "Images removed.";
  } catch (error) {
    console.log(error);
    throw new Error(`Error deleting images ${error}`);
  }
});

Parse.Cloud.define("registerUser", async (request) => {
  const myObj = new Parse.Object("_User");
  myObj.set("username", request.params.username);
  myObj.set("password", request.params.password);
  myObj.set("email", request.params.email);
  myObj.set("role", request.params.role);
  myObj.set("surname", request.params.surname);
  const result = await myObj.save();
  return {
    result: result,
  };
});
