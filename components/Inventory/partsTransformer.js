import partTransformer from "./partTransformer";

export default function partsTransformer({ parts = [] }) {
  return parts.map((part) => partTransformer({ part }));
}
