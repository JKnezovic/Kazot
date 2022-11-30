import clientTransformer from "./client-details/clientTransformer";

export default function clientsTransformer({ clients = [] }) {
  return clients.map((client) => clientTransformer({ client }));
}
