import vehicleTransformer from "./vehicleTransformer";

export default function vehiclesTransformer({ vehicles = [] }) {
  return vehicles.map((vehicle) => vehicleTransformer({ vehicle }));
}
