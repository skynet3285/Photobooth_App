import React, { useState, useEffect, useRef } from 'react';
import { Modal, View, Text, Image, TouchableOpacity } from 'react-native';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import { Camera } from 'expo-camera';
import { pinkFrame, cameraButton } from '../utils/imageUrls'
import styles from '../Style'

const CameraModal = ({ cameraModalVisible, cameraToFrame, setImgs }) => {

    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.front);
    const [camera, setCamera] =  useState(null);
    const [imgCount, setImgCount] = useState(0) // 사진개수 카운트
    const [count, setCount] = useState(1); // 초기 카운터 값 설정
    const [countVisible, setCountVisible] = useState(false)
    const [isActive, setIsActive] = useState(false); // 카운터가 활성화되었는지 여부

    const takePicture = () => {
        if (camera){
          setCountVisible(true)
          setIsActive(true);
        }
    }

    const flipImage = async (uri) => {
        return await manipulateAsync(
          uri,
          [{ flip: FlipType.Horizontal }],
          { format: SaveFormat.JPEG }
        );
    }

    useEffect(() => {
        (async () => {
          const cameraStatus = await Camera.requestCameraPermissionsAsync();
          setHasCameraPermission(cameraStatus.status === 'granted');
        })();   
    }, []);

    useEffect(() => {
        let interval;
        if (isActive) {
            interval = setInterval(async () => {
            if (count > 1) {
                setCount(count - 1);
            } else {
                clearInterval(interval);
                setIsActive(false);
                setCountVisible(false)
                setCount(1);
                
                const data = await camera.takePictureAsync()
                const flippedPhoto = await flipImage(data.uri);
                imgCount === 0 ? setImgs((prevImgs) => [...prevImgs, flippedPhoto.uri]) : null
                imgCount === 1 ? setImgs((prevImgs) => [...prevImgs, flippedPhoto.uri]) : null
                imgCount === 2 ? setImgs((prevImgs) => [...prevImgs, flippedPhoto.uri]) : null
                imgCount === 3 ? setImgs((prevImgs) => [...prevImgs, flippedPhoto.uri]) : null
                imgCount === 4 ? setImgs((prevImgs) => [...prevImgs, flippedPhoto.uri]) : null
                imgCount === 5 ? setImgs((prevImgs) => [...prevImgs, flippedPhoto.uri]) : null
                setImgCount(imgCount + 1)
            }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isActive, count]);

    useEffect(() => {
        if (imgCount == 6){
            cameraToFrame()
        }
    }, [imgCount])

    return(
        <Modal visible={cameraModalVisible}>
            <View style={{flex:1, alignItems: 'center', marginTop:100}}>
                <Image source={pinkFrame}
                style={{ width:1070, marginTop:-550, position: 'absolute', zIndex: 0}} resizeMode='contain'/>
                <Camera
                style={styles.camera}
                ref={ref => setCamera(ref)}
                type={type}
                ratio={'1:1'}
                />
                <View>
                    <Text style={{marginTop:880, fontSize:15}}>총 6장 중 4장을 선택하게 됩니다.</Text>
                </View>
            </View>
            <View style={{flex:0.2,marginTop: 10, flexDirection:'row'}}>
                <TouchableOpacity style={{}} onPress={() => takePicture()}>
                    <Image source={cameraButton}  style={{marginLeft:260,marginTop:-80,width:300}} resizeMode='contain'/>
                </TouchableOpacity>
                <Text style={{marginTop:40, marginLeft: 60,fontSize:50}}>
                    {imgCount} / 6
                </Text>
            </View>
            <Modal visible={countVisible} transparent={true}>
                <View style={{height:'100%',alignItems:'center',justifyContent:'center'}}>
                    <Text style={{fontSize:50}}>{count}</Text>
                </View>
            </Modal>
        </Modal>
        
    )
}

export default CameraModal