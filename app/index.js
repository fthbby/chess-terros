import Chessboard from "./components/Chessboard";
import { NativeBaseProvider, View, Text } from "native-base";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";

export default function Index() {
  const [currentPlayer, setCurrentPlayer] = useState("white");

  const switchUser = () => {
    setCurrentPlayer((prevUser) => (prevUser === "white" ? "black" : "white"));
  };

  return (
    <NativeBaseProvider>
      <View
        alignItems={"center"}
        justifyContent={"center"}
        flex={1}
        height={"100%"}
        paddingY={20}
      >
        <Text fontSize={20} fontWeight={600} pb={5}>
         It is currently player {currentPlayer}'s turn!
        </Text>
       

        <View alignItems="center" justifyContent="center">
          {/* <TouchableOpacity onPress={switchUser}>
            <Text>hi</Text>
          </TouchableOpacity> */}
          <Chessboard
            currentPlayer={currentPlayer}
            setCurrentPlayer={setCurrentPlayer}
          />
        </View>
      </View>
    </NativeBaseProvider>
  );
}
