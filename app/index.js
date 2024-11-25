import Chessboard from "./components/Chessboard";
import { NativeBaseProvider, View, Text } from "native-base";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";

export default function Index() {
  const [currentPlayer, setCurrentPlayer] = useState(true);

  const switchUser = () => {
    setCurrentPlayer((prevUser) => !prevUser);
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
        <Text fontSize={20} fontWeight={600} pb={0}>
          CURRENT PLAYER:
        </Text>
        <Text fontSize={20} fontWeight={400} pb={5}>
          Player {currentPlayer ? "1" : "2"} -{" "}
          {currentPlayer ? "white" : "black"}
        </Text>

        <View alignItems="center" justifyContent="center">
          <TouchableOpacity onPress={switchUser}>
            <Text>hi</Text>
          </TouchableOpacity>
          <Chessboard
            currentPlayer={currentPlayer}
            setCurrentPlayer={setCurrentPlayer}
          />
          {/* </TouchableOpacity> */}
        </View>
      </View>
    </NativeBaseProvider>
  );
}
