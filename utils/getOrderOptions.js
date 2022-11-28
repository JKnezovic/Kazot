export default function getOrderOptions(flag) {
  return [
    {
      label: "View order",
      value: "order_details",
    },
    {
      label: "View client",
      value: "client_details",
    },
    {
      label: "Delete order",
      value: "delete_order",
    },
    {
      label: flag ? "Remove highlight" : "Highlight",
      value: "highlight",
    },
  ];
}
