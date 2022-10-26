import React from "react";
import ClientDetails from "./ClientDetails";

export default function ClientDetailsView({ route }) {
  const client = route.params;

  return <ClientDetails client={client} />;
}
