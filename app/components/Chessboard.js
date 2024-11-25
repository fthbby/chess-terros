import React from "react";
import { Box, FlatList } from "native-base";
import Tower from "../components/Pieces/Tower";
import Pawn from "../components/Pieces/Pawn";
import Horses from "../components/Pieces/Horses";
import Bishop from "../components/Pieces/Bishop";

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

    if (index === 0 || index === 7 || index === 56 || index === 63) {
      return <Tower color={index < 32 ? "black" : "white"} />;
    }

    if (index === 1 || index === 6 || index === 57 || index === 62) {
      return <Horses color={index < 32 ? "black" : "white"} />;
    }

    if (index === 2 || index === 5 || index === 58 || index === 61) {
      return <Bishop color={index < 32 ? "black" : "white"} />;
    }
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
