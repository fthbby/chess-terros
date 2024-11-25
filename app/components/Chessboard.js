import React from "react";
import { Box, Text, FlatList } from "native-base";

import Pawn from "../components/Pieces/Pawn";

function Chessboard({ player }) {
  const data = [];
  for (let i = 0; i < 64; i++) {
    data.push(i);
  }

  const color = (index) =>
    (Math.floor(index / 8) + (index % 8)) % 2 === 0 ? "#172F44" : "#FCBB00";

  const renderPiece = (index) => {
    const row = Math.floor(index / 8);
    if (row === 1) return <Pawn color="black" />;
    if (row === 6) return <Pawn color="white" />;
    return null;
  };

  return (
    <Box alignItems={"center"} justifyContent={"center"}>
      <FlatList
        numColumns={8}
        data={data}
        renderItem={({ item }) => (
          <Box
            backgroundColor={color(item)}
            width={10}
            height={10}
            alignItems={"center"}
            justifyContent={"center"}
          >
            {renderPiece(item)}
          </Box>
        )}
      />
    </Box>
  );
}

export default Chessboard;
