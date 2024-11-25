import Chessboard from "./components/Chessboard";
import { NativeBaseProvider, View, Text } from "native-base";
import { useEffect, useState } from "react";

export default function Index() {
  const [currentPlayer, setCurrentPlayer] = useState("white");

  return (
    <NativeBaseProvider>
      <View
        alignItems={"center"}
        justifyContent={"center"}
        flex={1}
        paddingY={"20%"}
      >
        <Text fontSize={20} fontWeight={600} pb={5}>
          It is currently player {currentPlayer}'s turn!
        </Text>

        <View alignItems="center" justifyContent="center">
          <Chessboard
            currentPlayer={currentPlayer}
            setCurrentPlayer={setCurrentPlayer}
          />
        </View>
      </View>
    </NativeBaseProvider>
  );
}
