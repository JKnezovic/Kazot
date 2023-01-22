export const colours = {
  BLACK: "#000000",
  OXFORD_BLUE: "#14213D",
  ANTIQUE_RUBY: "#93032E",
  ORANGE_WEB: "#FCA311",
  PLATINUM: "#E5E5E5",
  WHITE: "#FFFFFF",
  AMAZON: "#419D78",
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
  Called: colours.OXFORD_BLUE,
  Closed: colours.BLACK,
  Created: colours.AMAZON,
  Diagnosed: colours.OXFORD_BLUE,
  "NO SHOW": colours.OXFORD_BLUE,
  "Not Registered": colours.OXFORD_BLUE,
  Received: colours.OXFORD_BLUE,
  Registered: colours.OXFORD_BLUE,
  Opened: colours.OXFORD_BLUE,
  "Waiting for Parts": colours.OXFORD_BLUE,
  "Won't come": colours.OXFORD_BLUE,
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
