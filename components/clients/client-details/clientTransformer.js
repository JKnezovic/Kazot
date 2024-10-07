import Parse from "parse/react-native.js";

export default function clientTransformer({ client = new Parse.Object() }) {
  return {
    clientId: client.id,
    name: client.get("name") || "",
    surname: client.get("surname") || "",
    contact: client.get("contact") || "",
    email: client.get("email") || "",
    initials: getInitials(client),
    isFavorite: client.get("isFavorite") || false,
    isFlagged: client.get("isFlagged") || false,
  };
}

const getInitials = (client) => {
  // it's sometimes possible both
  // name and surname are undefined
  if (!client.get("name") && !client.get("surname")) return `??`;
  else if (client.get("name") && client.get("surname"))
    return `${client.get("name")[0]}${client.get("surname")[0]}`;
  else if (client.get("name") && !client.get("surname"))
    return `${client.get("name")[0]}${client.get("name")[1]}`;
};
