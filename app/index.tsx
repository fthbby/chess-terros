import { Text, View } from "react-native";
import Chessboard from "./components/Chessboard";
import { NativeBaseProvider } from "native-base";

export default function Index() {
  return (
    <NativeBaseProvider>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Chessboard />
        <Text>Edit app/issndex.tsx to edit this screen.</Text>
      </View>
    </NativeBaseProvider>
  );
}
