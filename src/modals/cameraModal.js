import React, { useState, useEffect, useRef } from 'react';
import { Modal, View, Text, Image, TouchableOpacity } from 'react-native';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import { Camera } from 'expo-camera';
import ViewShot from 'react-native-view-shot'
import { pinkFrame, cameraButton } from '../utils/imageUrls'
import { homeButton } from '../utils/imageUrls';
import styles from '../Style'
import { captureRef } from 'react-native-view-shot';

const CameraModal = ({ cameraModalVisible, cameraToFrame, setImgs, goHome, imgCount, setImgCount }) => {
    const viewRef = useRef();
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.front);
    const [camera, setCamera] =  useState(null);
    
    const [count, setCount] = useState(1); // 초기 카운터 값 설정
    const [countVisible, setCountVisible] = useState(false)
    const [isActive, setIsActive] = useState(false); // 카운터가 활성화되었는지 여부
    const [test, setTest] = useState(null);

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
                
                const data = await camera.takePictureAsync({sound : false})
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
        let interval2;
        interval2 = setInterval(async () => {
        if (isActive) {
            // await camera.takePictureAsync({sound : false})
            // // const uri = await viewRef.current.capture()
            // //     .catch((err) => console.log(err));
            // // setTest(uri)
            // // console.log(test)
            // // {setVidImgs((prevImgs) => [...prevImgs, uri])}
        }
        }, 500);
        return () => clearInterval(interval2);
    }, [isActive]);

    useEffect(() => {
        if (imgCount == 6){
            cameraToFrame()
        }
    }, [imgCount])

    
    return(
        <Modal visible={cameraModalVisible}>
            <View style={{flex:1, alignItems: 'center', marginTop:0}}>
                <TouchableOpacity
                    style={{marginTop:25, position: 'absolute', zIndex: 4}} onPress={()=>goHome()}>
                    <Image source={homeButton} style={{width:70, height:70,marginLeft:-390}} resizeMode='contain'/>
                </TouchableOpacity>
                <Image source={pinkFrame}
                style={{ width:1070, marginTop:-450, position: 'absolute', zIndex: 0}} resizeMode='contain'/>
                <Image source={{uri : test}}
                style={{ width:1000,height:'50%',  position: 'absolute', zIndex: 3}} resizeMode='contain'/>
                <ViewShot ref={viewRef}
                    options={{ fileName: 'shared', format: 'png', quality: 1 }}
                     style={{width: 543,height: 723,position: 'absolute', zIndex: 1,marginTop: 189, backgroundColor:'blue'}}>
                    <Camera
                    style={styles.camera}
                    ref={ref => setCamera(ref)}
                    type={type}
                    ratio={'1:1'}
                    />
                </ViewShot>
            </View>
            <View style={{flex:0.2,marginTop: 0, flexDirection:'row', backgroundColor:'red'}}>
                {/* <View>
                    <Text style={{marginLeft:300, fontSize:15}}>총 6장 중 4장을 선택하게 됩니다.</Text>
                </View> */}
                <TouchableOpacity style={{}} onPress={() => takePicture()}>
                    <Image source={cameraButton}  style={{marginLeft:70,marginTop:-50,width:300}} resizeMode='contain'/>
                    <Image source={{uri : test}}  style={{marginLeft:0,marginTop:-80,width:300}} resizeMode='contain'/>
                </TouchableOpacity>
                <Text style={{marginTop:70, marginLeft: 60,fontSize:50}}>
                    {imgCount} / 6
                </Text>
            </View>
            <Modal visible={countVisible} transparent={true}>
                <View style={{height:'100%',alignItems:'center',justifyContent:'center'}}>
                    <Text style={{fontSize:70 , color:"white"}}>{count}</Text>
                </View>
            </Modal>
        </Modal>
        
    )
}

export default CameraModal