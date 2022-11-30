import Parse from "parse/react-native.js";
import DateToDDMMYY from "../../utils/DateToDDMMYY";

export default function partTransformer({ part = new Parse.Object() }) {
  return {
    partId: part.id || null,
    name: part.get("name") || "",
    stock: part.get("stock") !== undefined ? part.get("stock") : "",
    MSQ: part.get("MSQ") !== undefined ? part.get("MSQ") : "",
    inventoryStock:
      part.get("inventory_stock") !== undefined
        ? part.get("inventory_stock")
        : "",
    lastPurchase: part.get("last_purchase")
      ? DateToDDMMYY(part.get("last_purchase"))
      : "",
    lastInventoryCheck: part.get("last_inventory_check")
      ? DateToDDMMYY(part.get("last_inventory_check"))
      : "",
  };
}
