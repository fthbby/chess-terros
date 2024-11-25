import React from "react";
import { Box, Text, FlatList } from "native-base";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

function Chessboard() {
  const data = [];
  for (let i = 0; i < 64; i++) {
    data.push(i);
  }

  const color = (index) =>
    (Math.floor(index / 8) + (index % 8)) % 2 === 0 ? "#172F44" : "#FCBB00"

  return (
    <Box alignItems={'center'} justifyContent={'center'}>
      <FlatList
        numColumns={8}
        data={data}
        renderItem={({ item }) => (
          <Box backgroundColor={color(item)} width={10} height={10}>
            {/* {item} */}
          </Box>
        )}
      />
    </Box>
  );
}

export default Chessboard;
