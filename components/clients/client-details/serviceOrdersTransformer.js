import serviceOrderTransformer from "./serviceOrderTransformer";

export default function serviceOrdersTransformer({ serviceOrders = [] }) {
  return serviceOrders.map((serviceOrder) =>
    serviceOrderTransformer({ serviceOrder })
  );
}
