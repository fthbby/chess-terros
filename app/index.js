import Chessboard from "./components/Chessboard";
import { NativeBaseProvider, View, Text } from "native-base";
import { useState } from "react";

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
        <Text pb={3} fontSize={16}>
          Welcome to Nat's chess game!
        </Text>
        <Text fontSize={22} fontWeight={400} pb={5}>
          It is currently player
          <Text fontWeight={600}> {currentPlayer}'s</Text> turn!
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
