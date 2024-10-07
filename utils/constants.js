export const Colors = {
  BLACK: "#000000",
  OXFORD_BLUE: "#14213D",
  ANTIQUE_RUBY: "#93032E",
  ORANGE_WEB: "#F7A806",
  PLATINUM: "#E5E5E5",
  WHITE: "#FFFFFF",
  AMAZON: "#419D78",
  DARK_GREY: "#363535",
};

export const orderOptions = [
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
];

export const colorMap = {
  Called: Colors.OXFORD_BLUE,
  Closed: Colors.BLACK,
  Created: Colors.AMAZON,
  Diagnosed: Colors.OXFORD_BLUE,
  "NO SHOW": Colors.OXFORD_BLUE,
  "Not Registered": Colors.OXFORD_BLUE,
  Received: Colors.OXFORD_BLUE,
  Registered: Colors.OXFORD_BLUE,
  Opened: Colors.OXFORD_BLUE,
  "Waiting for Parts": Colors.OXFORD_BLUE,
  "Won't come": Colors.OXFORD_BLUE,
};

export const serviceStatuses = [
  {
    value: "Called",
    label: "Called",
  },
  {
    value: "Closed",
    label: "Closed",
  },
  {
    value: "Created",
    label: "Created",
  },
  {
    value: "Diagnosed",
    label: "Diagnosed",
  },
  {
    value: "NO SHOW",
    label: "NO SHOW",
  },
  {
    value: "Not Registered",
    label: "Not Registered",
  },
  {
    value: "Received",
    label: "Received",
  },
  {
    value: "Registered",
    label: "Registered",
  },
  {
    value: "Opened",
    label: "Opened",
  },
  {
    value: "Waiting for Parts",
    label: "Waiting for Parts",
  },
  {
    value: "Won't come",
    label: "Won't come",
  },
];

export const initialServiceOrderStatusFilters = [
  "Opened",
  "Created",
  "Reservation",
  "Calendly",
];
