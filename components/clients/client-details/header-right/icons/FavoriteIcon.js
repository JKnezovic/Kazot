import React from "react";
import { AntDesign } from "@expo/vector-icons";

const FavoriteIcon = ({ isFavorite }) =>
  isFavorite ? (
    <AntDesign name="heart" size={24} color="red" />
  ) : (
    <AntDesign name="hearto" size={24} color="black" />
  );

export default FavoriteIcon;
