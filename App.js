import React, { useState, useEffect } from "react";
import { View } from "react-native";
import StartModal from "./src/modals/startModal";
import CameraModal from "./src/modals/cameraModal";
import FrameModal from "./src/modals/frameModal";
import SelectModal from "./src/modals/selectModal";
import FinalModal from "./src/modals/finalModal";
import * as MediaLibrary from "expo-media-library";

export default function App() {
  const [imgs, setImgs] = useState([]);
  const [imgCount, setImgCount] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [startModalVisible, setStartModalVisible] = useState(true); // 1 modal
  const [cameraModalVisible, setCameraModalVisible] = useState(false); // 2 modal
  const [frameModalVisible, setFrameModalVisible] = useState(false); // 3 modal
  const [selectModalVisible, setSelectModalVisible] = useState(false); // 4 modal
  const [finalModalVisible, setFinalModalVisible] = useState(false); // 5 modal

  // Request permission to access the media library
  useEffect(() => {
    async function getPermission() {
      const permissionResponse = await MediaLibrary.requestPermissionsAsync();
      if (permissionResponse.status !== "granted") {
        console.log("Permission to access the media library is required!");
      }
    }

    getPermission();
  }, []);

  const startToCamera = () => {
    setStartModalVisible(false);
    setCameraModalVisible(true);
  };

  const cameraToFrame = () => {
    setCameraModalVisible(false);
    setFrameModalVisible(true);
  };

  const frameToSelect = () => {
    setFrameModalVisible(false);
    setSelectModalVisible(true);
  };

  const selectToFinal = () => {
    setSelectModalVisible(false);
    setFinalModalVisible(true);
  };

  const goHome = () => {
    setImgs([]);
    setImgCount(0);
    setCameraModalVisible(false);
    setFrameModalVisible(false);
    setSelectModalVisible(false);
    setStartModalVisible(true);
  };
  return (
    <View>
      <StartModal
        startModalVisible={startModalVisible}
        startToCamera={startToCamera}
      />
      <CameraModal
        cameraModalVisible={cameraModalVisible}
        cameraToFrame={cameraToFrame}
        setImgs={setImgs}
        goHome={goHome}
        imgCount={imgCount}
        setImgCount={setImgCount}
      />
      <FrameModal
        frameModalVisible={frameModalVisible}
        frameToSelect={frameToSelect}
        currentImageIndex={currentImageIndex}
        setCurrentImageIndex={setCurrentImageIndex}
        goHome={goHome}
      />
      <SelectModal
        selectModalVisible={selectModalVisible}
        imgs={imgs}
        currentImageIndex={currentImageIndex}
        selectToFinal={selectToFinal}
        goHome={goHome}
      />
      <FinalModal finalModalVisible={finalModalVisible} />
    </View>
  );
}
