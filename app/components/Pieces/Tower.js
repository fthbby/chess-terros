import React from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

function Tower({ color = "white" }) {
  return <FontAwesome5 name="chess-rook" size={24} color={color} />;
}

export default Tower;
