import React, { useState } from "react";
import { Box, FlatList, Text, Button } from "native-base";
import Tower from "../components/Pieces/Tower";
import Pawn from "../components/Pieces/Pawn";
import Horses from "../components/Pieces/Horses";
import Bishop from "../components/Pieces/Bishop";
import Queen from "../components/Pieces/Queen";
import King from "../components/Pieces/King";
import { TouchableOpacity } from "react-native";

function Chessboard({ currentPlayer, setCurrentPlayer }) {
  const data = [];
  const [errorMsg, setErrorMsg] = useState(false);

  for (let i = 0; i < 64; i++) {
    data.push(i);
  }

  const color = (index) =>
    (Math.floor(index / 8) + (index % 8)) % 2 === 0 ? "#172F44" : "#FCBB00";

  const [board, setBoard] = useState(() => {
    const initialBoard = Array(64).fill(null);
    for (let i = 0; i < 64; i++) {
      const row = Math.floor(i / 8);
      if (row === 1) initialBoard[i] = { piece: "Pawn", color: "black" };
      if (row === 6) initialBoard[i] = { piece: "Pawn", color: "white" };
      if (i === 0 || i === 7 || i === 56 || i === 63) {
        initialBoard[i] = { piece: "Tower", color: i < 32 ? "black" : "white" };
      }
      if (i === 1 || i === 6 || i === 57 || i === 62) {
        initialBoard[i] = { piece: "Horse", color: i < 32 ? "black" : "white" };
      }
      if (i === 2 || i === 5 || i === 58 || i === 61) {
        initialBoard[i] = {
          piece: "Bishop",
          color: i < 32 ? "black" : "white",
        };
      }
      if (i === 3 || i === 59) {
        initialBoard[i] = { piece: "Queen", color: i < 32 ? "black" : "white" };
      }
      if (i === 4 || i === 60) {
        initialBoard[i] = { piece: "King", color: i < 32 ? "black" : "white" };
      }
    }
    return initialBoard;
  });

  const renderPiece = (index) => {
    const piece = board[index];
    if (piece) {
      switch (piece.piece) {
        case "Pawn":
          return <Pawn color={piece.color} />;
        case "Tower":
          return <Tower color={piece.color} />;
        case "Horse":
          return <Horses color={piece.color} />;
        case "Bishop":
          return <Bishop color={piece.color} />;
        case "Queen":
          return <Queen color={piece.color} />;
        case "King":
          return <King color={piece.color} />;
        default:
          return null;
      }
    }
    return null;
  };

  const handleMovePawn = (index) => {
    const piece = board[index];

    if (piece && piece.color === currentPlayer) {
      if (piece.piece === "Pawn") {
        const direction = piece.color === "black" ? 8 : -8;
        const targetIndex = index + direction;

        if (targetIndex >= 0 && targetIndex < 64 && !board[targetIndex]) {
          const newBoard = [...board];
          newBoard[targetIndex] = { piece: "Pawn", color: piece.color };
          newBoard[index] = null;
          setBoard(newBoard);

          setCurrentPlayer(currentPlayer === "white" ? "black" : "white");
          setErrorMsg(false);
          return;
        }
      } else if (piece.piece === "King") {
        const direction = piece.color === "black" ? 8 : -8;
        const targetIndex = index + direction;

        if (targetIndex >= 0 && targetIndex < 64 && !board[targetIndex]) {
          const newBoard = [...board];
          newBoard[targetIndex] = { piece: "King", color: piece.color };
          newBoard[index] = null;
          setBoard(newBoard);

          setCurrentPlayer(currentPlayer === "white" ? "black" : "white");
          setErrorMsg(false);
          return;
        }
      } else {
        setErrorMsg("Sorry! This piece is still under construction ;)");
        return;
      }
    } else if (piece) {
      setErrorMsg("Hey! It's not your turn!");
      return;
    }

    setErrorMsg(false);
  };

  return (
    <Box alignItems={"center"} justifyContent={"center"}>
      <Box height={20}>
        {errorMsg ? (
          <Text fontSize={16} color="red.600">
            {errorMsg}
          </Text>
        ) : null}
      </Box>
      <FlatList
        numColumns={8}
        data={data}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity>
            <Box
              onTouchEnd={() => handleMovePawn(index)}
              backgroundColor={color(index)}
              width={10}
              height={10}
              alignItems={"center"}
              justifyContent={"center"}
            >
              {renderPiece(index)}
            </Box>
          </TouchableOpacity>
        )}
        scrollEnabled={false}
      />
    </Box>
  );
}

export default Chessboard;
