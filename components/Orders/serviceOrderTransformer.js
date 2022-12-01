import Parse from "parse/react-native.js";

export default function serviceOrderTransformer({
  serviceOrder = new Parse.Object(),
}) {
  return {
    serviceOrderId: serviceOrder.id,
    createdAt: serviceOrder.get("createdAt") || false,
    status: serviceOrder.get("status") || "",
    issue: serviceOrder.get("issue") || "",
    type: serviceOrder.get("type") || "",
    notes: serviceOrder.get("notes") || "",
    isHighlighted: serviceOrder.get("is_higlighted") || false,
    serviceId: serviceOrder.get("service_id") || "",
    clientId: serviceOrder.get("client_fkey")?.id || null,
    clientName: serviceOrder.get("client_fkey")?.get("name") || "",
    clientSurname: serviceOrder.get("client_fkey").get("surname") || "",
    clientContact: serviceOrder.get("client_fkey").get("contact") || "",
    clientEmail: serviceOrder.get("client_fkey").get("email") || "",
    vehicleModel:
      serviceOrder.get("vehicle_fkey") &&
      (serviceOrder.get("vehicle_fkey").get("model") || ""),
    vehicleId:
      serviceOrder.get("vehicle_fkey") &&
      (serviceOrder.get("vehicle_fkey").id || ""),
    vehicleSerialNumber:
      serviceOrder.get("vehicle_fkey") &&
      (serviceOrder.get("vehicle_fkey").get("serial_number") || ""),
    client: serviceOrder.get("client_fkey")
      ? JSON.parse(JSON.stringify(serviceOrder.get("client_fkey")))
      : {},
  };
}
