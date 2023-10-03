import React, { useState } from 'react';
import { View } from 'react-native';
import StartModal from './modals/startModal'
import CameraModal from './modals/cameraModal'
import FrameModal from './modals/frameModal';
import SelectModal from './modals/selectModal';

export default function App() {
  
  const [imgs, setImgs] = useState([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [startModalVisible, setStartModalVisible] = useState(true)  // 1 modal
  const [cameraModalVisible, setCameraModalVisible] = useState(false) // 2 modal
  const [frameModalVisible, setFrameModalVisible] = useState(false) // 3 modal
  const [selectModalVisible, setSelectModalVisible] = useState(false) // 4 modal

  const startToCamera = () => {
    setStartModalVisible(false)
    setCameraModalVisible(true)
  }
  
  const cameraToFrame = () => {
    setCameraModalVisible(false)
    setFrameModalVisible(true)
  }

  const frameToSelect = () => {
    setFrameModalVisible(false)
    setSelectModalVisible(true)
  }

  return (
    <View>
      <StartModal startModalVisible={startModalVisible} startToCamera={startToCamera}/>
      <CameraModal cameraModalVisible={cameraModalVisible} cameraToFrame={cameraToFrame} setImgs={setImgs}/>
      <FrameModal frameModalVisible={frameModalVisible} frameToSelect={frameToSelect} currentImageIndex={currentImageIndex} setCurrentImageIndex={setCurrentImageIndex} s/>
      <SelectModal selectModalVisible={selectModalVisible} imgs={imgs} currentImageIndex={currentImageIndex}/>
    </View>
  );
}

