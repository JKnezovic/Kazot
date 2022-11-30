import Parse from "parse/react-native.js";
import DateToDDMMYY from "../../../utils/DateToDDMMYY";

export default function serviceOrderTransformer({
  serviceOrder = new Parse.Object(),
}) {
  return {
    serviceOrderId: serviceOrder.id,
    createdAt: DateToDDMMYY(serviceOrder.get("createdAt")) || "",
  };
}
