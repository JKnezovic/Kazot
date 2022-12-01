import Parse from "parse/react-native.js";
import DateToDDMMYY from "../../utils/DateToDDMMYY";

function itemTransformer({ statusHistory = new Parse.Object() }) {
  return {
    statusHistoryId: statusHistory.id,
    status: statusHistory.get("status") || "",
    createdAt: DateToDDMMYY(statusHistory.get("createdAt")) || "",
    username: statusHistory.get("user_name") || "",
  };
}

export default function statusHistoryTransformer({ statusHistory = [] }) {
  return statusHistory.map((item) => itemTransformer({ statusHistory: item }));
}
