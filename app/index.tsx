import Chessboard from "./components/Chessboard";
import { NativeBaseProvider, View, Text } from "native-base";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";

export default function Index() {
  const [user, setUser] = useState(true);
  const [player, setPlayer] = useState("");

  const switchUser = () => {
    setUser((prevUser) => !prevUser);
  };

  useEffect(() => {
    setPlayer(user ? "Player 1" : "Player 2");
  }, [user]);

  return (
      <NativeBaseProvider>
        <View
          alignItems={"center"}
          justifyContent={"center"}
          flex={1}
          height={'100%'}
          paddingY={20}
        >
          <Text fontSize={20} fontWeight={600} pb={5}>Current User: {player}</Text>
          <View alignItems="center" justifyContent="center">

          <TouchableOpacity onPress={switchUser}>
            <Chessboard />
          </TouchableOpacity>
          </View>
        </View>
      </NativeBaseProvider>
  );
}
