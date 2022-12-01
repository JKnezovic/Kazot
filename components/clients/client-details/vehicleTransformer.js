import Parse from "parse/react-native.js";

export default function vehicleTransformer({ vehicle = new Parse.Object() }) {
  return {
    vehicleId: vehicle.id,
    model: vehicle.get("model") || "",
    serialNumber: vehicle.get("serial_number") || "",
  };
}
