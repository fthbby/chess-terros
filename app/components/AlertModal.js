import { Box, Modal, Text, View, VStack } from "native-base";
import { TouchableOpacity } from "react-native";
import React from "react";

function AlertModal({ open, setOpen, winner, onPress }) {

   
  return (
    <Modal isOpen={open} onClose={() => setOpen(false)}>
      <VStack
        background={"white"}
        height={160}
        width={300}
        borderRadius={10}
        padding={8}
        alignItems={"center"}
        justifyContent={'space-between'}
      >
        <Text fontSize={20} fontWeight={600} >Player {winner} Wins!</Text>

        <TouchableOpacity onPress={onPress}>
          <View
            width={100}
            background="#172F44"
            height={10}
            borderRadius={5}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Text color="#FCBB00" fontWeight={600}>
              Play Again!
            </Text>
          </View>
        </TouchableOpacity>
      </VStack>
    </Modal>
  );
}

export default AlertModal;
