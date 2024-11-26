import React, { useState, useEffect } from "react";
import { Box, FlatList, Text, View } from "native-base";
import Tower from "../components/Pieces/Tower";
import Pawn from "../components/Pieces/Pawn";
import Horses from "../components/Pieces/Horses";
import Bishop from "../components/Pieces/Bishop";
import Queen from "../components/Pieces/Queen";
import King from "../components/Pieces/King";
import { TouchableOpacity } from "react-native";
import AlertModal from "../components/AlertModal";
import { DevSettings } from "react-native";

function Chessboard({ currentPlayer, setCurrentPlayer }) {
  const data = [];
  const [errorMsg, setErrorMsg] = useState(false);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const [winner, setWinner] = useState(null);

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

  const handleMovePiece = (index) => {
    console.log("move index :", index);
    const piece = board[index];

    if (!selected && piece && piece.color === currentPlayer) {
      setSelected(index);
      setErrorMsg(false);
      return;
    }

    if (selected !== null) {
      const selectedPiece = board[selected];

      // PAWN MOVEMENTS
      if (selectedPiece.piece === "Pawn") {
        const direction = selectedPiece.color === "black" ? 8 : -8;
        const targetIndex = selected + direction;

        if (index === targetIndex && !board[index]) {
          const newBoard = [...board];
          newBoard[index] = selectedPiece;
          newBoard[selected] = null;
          setBoard(newBoard);
          setCurrentPlayer(currentPlayer === "white" ? "black" : "white");

          reset();
          return;
        }
        setErrorMsg("Invalid move!");
        return;
      }

      // KING MOVEMENTS
      if (selectedPiece.piece === "King") {
        const directions = [-8, 8, 1, -1, -9, -7, 7, 9];

        const legalMove = directions.some((x) => {
          const targetIndex = selected + x;
          if (targetIndex < 0 || targetIndex >= 64) return false;

          const targetPiece = board[targetIndex];
          return !targetPiece || targetPiece.color !== selectedPiece.color;
        });

        if (
          legalMove &&
          index === selected + directions.find((x) => x === index - selected)
        ) {
          const newBoard = [...board];
          newBoard[index] = selectedPiece;
          newBoard[selected] = null;
          setBoard(newBoard);
          setCurrentPlayer(currentPlayer === "white" ? "black" : "white");
          reset();
          return;
        }

        setErrorMsg("Invalid move!");
        return;
      }

      // TOWER MOVES

      if (selectedPiece.piece === "Tower") {
        const directions = [-8, 8, -1, 1];
        const legalMove = directions.some((direction) => {
          let targetIndex = selected;

          while (true) {
            targetIndex += direction;

            if (targetIndex < 0 || targetIndex >= 64) return false;

            const targetPiece = board[targetIndex];

            if (targetPiece && targetPiece.color === selectedPiece.color)
              return false;

            if (targetPiece && targetPiece.color !== selectedPiece.color) {
              return targetIndex === index;
            }

            if (!targetPiece && targetIndex === index) return true;

            if (!targetPiece) continue;

            return false;
          }
        });

        if (legalMove) {
          const newBoard = [...board];
          newBoard[index] = selectedPiece;
          newBoard[selected] = null;
          setBoard(newBoard);
          setCurrentPlayer(currentPlayer === "white" ? "black" : "white");
          reset();
          return;
        }
        setErrorMsg("Invalid move!");
        return;
      }

      // HORSE MOVES
      if (selectedPiece.piece === "Horse") {
        const directions = [15, 17, -15, -17, 10, -10, 6, -6];

        const legalMove = directions.some((direction) => {
          const targetIndex = selected + direction;
          const targetPiece = board[targetIndex];

          if (targetIndex < 0 || targetIndex >= 64) return false;

          if (targetPiece && targetPiece.color === selectedPiece.color)
            return false;

          if (targetPiece && targetPiece.color !== selectedPiece.color) {
            return targetIndex === index;
          }

          if (!targetPiece && targetIndex === index) return true;

          return false;
        });

        if (legalMove) {
          const newBoard = [...board];
          newBoard[index] = selectedPiece;
          newBoard[selected] = null;
          setBoard(newBoard);
          setCurrentPlayer(currentPlayer === "white" ? "black" : "white");
          reset();
          return;
        }
        setErrorMsg("Invalid move!");
        return;
      }

      // BISHOPS MOVES
      if (selectedPiece.piece === "Bishop") {
        const directions = [9, -9, 7, -7];

        const legalMove = directions.some((direction) => {
          let targetIndex = selected;

          while (true) {
            targetIndex += direction;

            if (targetIndex < 0 || targetIndex >= 64) return false;

            const targetPiece = board[targetIndex];

            if (targetPiece && targetPiece.color === selectedPiece.color)
              return false;

            if (targetPiece && targetPiece.color !== selectedPiece.color) {
              return targetIndex === index;
            }

            if (!targetPiece && targetIndex === index) return true;

            if (!targetPiece) continue;

            return false;
          }
        });

        if (legalMove) {
          const newBoard = [...board];
          newBoard[index] = selectedPiece;
          newBoard[selected] = null;
          setBoard(newBoard);
          setCurrentPlayer(currentPlayer === "white" ? "black" : "white");
          reset();
          return;
        }
        setErrorMsg("Invalid move!");
        return;
      }

      // QUEEN MOVES
      if (selectedPiece.piece === "Queen") {
        const directions = [-8, 8, 1, -1, -9, -7, 7, 9];

        const legalMove = directions.some((direction) => {
          let targetIndex = selected;

          while (true) {
            targetIndex += direction;

            if (targetIndex < 0 || targetIndex >= 64) return false;

            const targetPiece = board[targetIndex];

            if (targetPiece && targetPiece.color === selectedPiece.color)
              return false;

            if (targetPiece && targetPiece.color !== selectedPiece.color) {
              return targetIndex === index;
            }

            if (!targetPiece && targetIndex === index) return true;

            if (!targetPiece) continue;

            return false;
          }
        });

        if (legalMove) {
          const newBoard = [...board];
          newBoard[index] = selectedPiece;
          newBoard[selected] = null;
          setBoard(newBoard);
          setCurrentPlayer(currentPlayer === "white" ? "black" : "white");
          reset();
          return;
        }
        setErrorMsg("Invalid move!");
        return;
      }
    }
  };

  const reset = () => {
    setSelected(null);
    setErrorMsg(false);
  };

  useEffect(() => {
    const checkForKings = () => {
      let whiteKingAlive = false;
      let blackKingAlive = false;

      for (const piece of board) {
        if (piece?.piece === "King" && piece.color === "white") {
          whiteKingAlive = true;
        }
        if (piece?.piece === "King" && piece.color === "black") {
          blackKingAlive = true;
        }
      }

      if (!whiteKingAlive) {
        setWinner("Black");
        setOpen(true);
      } else if (!blackKingAlive) {
        setWinner("White");
        setOpen(true);
      }
    };

    checkForKings();
  }, [board]);

  const resetApp = () => {
    setWinner(null);
    setCurrentPlayer("white");
    reset();
    DevSettings.reload();
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
              onTouchEnd={() => handleMovePiece(index)}
              backgroundColor={index === selected ? "red.500" : color(index)}
              width={10}
              height={10}
              alignItems={"center"}
              justifyContent={"center"}
            >
              {renderPiece(index)}
              {/* {index} */}
            </Box>
          </TouchableOpacity>
        )}
        scrollEnabled={false}
      />
      <Text>
        Currently Selected Piece:{" "}
        {selected !== null
          ? `${board[selected]?.color || "None"} ${
              board[selected]?.piece || "Empty"
            }`
          : "None"}
      </Text>
      <TouchableOpacity onPress={reset}>
        <View
          paddingX={4}
          background="#172F44"
          height={10}
          borderRadius={5}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Text color="#FCBB00" fontWeight={600}>
            Deselect
          </Text>
        </View>
      </TouchableOpacity>
      <AlertModal
        open={open}
        setOpen={setOpen}
        winner={winner}
        onPress={resetApp}
      />
    </Box>
  );
}

export default Chessboard;
