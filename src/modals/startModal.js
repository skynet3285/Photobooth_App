import React, { useState, useEffect, useRef } from "react";
import { Modal, View, Text, Image, TouchableOpacity } from "react-native";
import { dearLogo, startButton } from "../utils/imageUrls";

const StartModal = ({ startModalVisible, startToCamera }) => {
  return (
    <Modal visible={startModalVisible} animationType="fade">
      <View
        style={{
          width: "100%",
          height: "100%",
          flexDirection: "column",
          backgroundColor: "rgb(28 25 23)",
        }}
      >
        <View
          style={{ flex: 0.8, flexDirection: "column", alignItems: "center" }}
        >
          <Image
            style={{
              height: "150%",
              width: "150%",
              marginTop: "8%",
              resizeMode: "contain",
            }}
            source={dearLogo}
          />
        </View>
        <View
          style={{ flex: 1, alignItems: "center", flexDirection: "column" }}
        >
          <TouchableOpacity style={{}} onPress={() => startToCamera()}>
            <Image
              source={startButton}
              style={{ marginTop: 150, width: 280 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View
            style={{
              width: "100%",
              marginTop: 100,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "rgb(214 211 209)",
                  fontSize: 18,
                  fontWeight: 600,
                }}
              >
                Refactor by Shin Gwon
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "rgb(214 211 209)",
                  fontSize: 18,
                  fontWeight: 600,
                }}
              >
                Made by no & park
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default StartModal;
