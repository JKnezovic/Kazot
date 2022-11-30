import React from "react";
import ClientDetails from "./ClientDetails";

export default function ClientDetailsView({ route }) {
  const { clientId } = route.params;

  return <ClientDetails id={clientId} />;
}
