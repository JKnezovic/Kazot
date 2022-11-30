import Parse from "parse/react-native.js";

export default function clientTransformer({ client = new Parse.Object() }) {
  return {
    clientId: client.id,
    name: client.get("name") || "",
    surname: client.get("surname") || "",
    contact: client.get("contact") || "",
    email: client.get("email") || "",
    initials: client.get("surname")
      ? `${client.get("name")[0]}${client.get("surname")[0]}`
      : `${client.get("name")[0]}${client.get("name")[1]}`,
  };
}
