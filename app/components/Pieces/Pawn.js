import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

function Pawn({color}) {
  return <MaterialCommunityIcons name="chess-pawn" size={24} color={color} />;
}

export default Pawn;
