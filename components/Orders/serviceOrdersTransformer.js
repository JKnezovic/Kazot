import serviceOrderTransformer from "./serviceOrderTransformer";

export default function serviceOrdersTransformer({ data = [] }) {
  return data.map((serviceOrder) => serviceOrderTransformer({ serviceOrder }));
}
