import React, { useState, useEffect, useRef } from "react";
import { Modal, View, Text, Image, TouchableOpacity } from "react-native";
import { final } from "../utils/imageUrls";

const FinalModal = ({ finalModalVisible }) => {
  return (
    <Modal visible={finalModalVisible}>
      <View
        style={{
          marginTop: "10%",
          height: "90%",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Image source={final} style={{ height: "100%" }} resizeMode="contain" />
      </View>
    </Modal>
  );
};

export default FinalModal;
