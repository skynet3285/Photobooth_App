import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { Modal, View, Text, Image, TouchableOpacity } from 'react-native';
import ViewShot from 'react-native-view-shot'
import * as Sharing from 'expo-sharing'
import { dpImgs, selectNumImg, finalImages, completeButton } from '../utils/imageUrls';
import { homeButton } from '../utils/imageUrls';
import styles from '../Style';

const SelectModal = ({ selectModalVisible, imgs, currentImageIndex, selectToFinal, goHome }) => {
    const viewRef = useRef();
    const [img1Selected, setIsImg1Selected] = useState(false);
    const [img2Selected, setIsImg2Selected] = useState(false);
    const [img3Selected, setIsImg3Selected] = useState(false);
    const [img4Selected, setIsImg4Selected] = useState(false);
    const [img5Selected, setIsImg5Selected] = useState(false);
    const [img6Selected, setIsImg6Selected] = useState(false);
    const [selectedImgCount, setSelectedImgCount] = useState(0);
    const [chooseImages, setChooseImages] = useState([]);
    const [finalImage, setFinalImage] = useState(false);
    const [qrUri, setQrUri] = useState(null);
    const [view, setView] = useState(true);

    const useSleep = delay => new Promise(resolve => setTimeout(resolve, delay))

    const toggleImageSelection = (imageIndex) => {
        if (chooseImages.includes(imageIndex)) {
          // 이미지가 이미 선택된 경우 선택 해제
          const updatedchooseImages = chooseImages.filter((index) => index !== imageIndex);
          setChooseImages(updatedchooseImages);
        } else if (chooseImages.length < 4) {
          // 이미지가 선택되지 않은 경우 선택
          if (chooseImages.length < 4) {
            setChooseImages([...chooseImages, imageIndex]);
          }
        }
    };
    const home = () => {
      setIsImg1Selected(false)
      setIsImg2Selected(false)
      setIsImg3Selected(false)
      setIsImg4Selected(false)
      setIsImg5Selected(false)
      setIsImg6Selected(false)
      setSelectedImgCount(0)
      setChooseImages([])
      setQrUri(null)
      setView(true)
      goHome()
    }
    
    useEffect(()=> {
        img1Selected ? setSelectedImgCount(selectedImgCount + 1) : null
        img2Selected ? setSelectedImgCount(selectedImgCount + 1) : null
        img3Selected ? setSelectedImgCount(selectedImgCount + 1) : null
        img4Selected ? setSelectedImgCount(selectedImgCount + 1) : null
        img5Selected ? setSelectedImgCount(selectedImgCount + 1) : null
        img6Selected ? setSelectedImgCount(selectedImgCount + 1) : null
    },[img1Selected,img2Selected,img3Selected,img4Selected,img5Selected,img6Selected])
      
    return(
        <Modal visible={selectModalVisible} transparent={false}>
          <View style={{marginTop:0,height:'100%', width:'100%', flexDirection:'column'}}>
            <TouchableOpacity
                    style={{marginTop:25, position: 'absolute', zIndex: 5}} onPress={()=>home()}>
                    <Image source={homeButton} style={{width:70, height:70,marginLeft:20, marginTop:10}} resizeMode='contain'/>
                </TouchableOpacity>
            <ViewShot ref={viewRef}
            options={{ fileName: 'shared', format: 'png', quality: 1 }} style={{marginLeft:178, width: 473, height: 700, marginTop:100}}>
                {/* <Image source={{uri: qrUri}} style={{marginLeft:400, marginTop:20, width: 50, height:50, position: 'absolute', zIndex: 2}} resizeMode='contain'/> */}
                <Image source={finalImages[currentImageIndex]}  //프레임
                style={{height: 700, marginLeft: -157,position: 'absolute', zIndex: 1}}
                resizeMode='contain'/> 
                <Image source={chooseImages.length>=1 ? {uri : imgs[chooseImages[0]]} : dpImgs[0]}
                style={{width:210,height:280,marginTop:105,marginLeft:22, position: 'absolute', zIndex: 0}}
                resizeMode='contain'/>
                <Image source={chooseImages.length>=2 ? {uri : imgs[chooseImages[1]]} : dpImgs[1]}
                style={{width:210,height:280,marginTop:105,marginLeft:242,position: 'absolute', zIndex: 0}}
                resizeMode='contain'/>
                <Image source={chooseImages.length>=3 ? {uri : imgs[chooseImages[2]]} : dpImgs[2]}
                style={{width:210,height:280,marginTop: 390,marginLeft:22, position: 'absolute', zIndex: 0}}
                resizeMode='contain'/>
                <Image source={chooseImages.length>=4 ? {uri : imgs[chooseImages[3]]} : dpImgs[3]}
                style={{width:210,height:280,marginTop: 390, marginLeft:242, position: 'absolute', zIndex: 0}}
                resizeMode='contain'/>
            </ViewShot>
            
            {qrUri === null ?
              <View style={{ flexDirection: 'row', marginTop:40, height:200}}>
              <TouchableOpacity style={{flex:1, alignItems:'center', marginLeft:30}}
              onPress={() => toggleImageSelection(0)}>
                <Image source={{uri : imgs[0]}}
                style={{width: 120, height:160, borderRadius: 5, position: 'absolute', zIndex: 0,
                ...(chooseImages.indexOf(0) !== -1 ? styles.selB : styles.defB) }}/>
                {chooseImages.indexOf(0) !== -1 ? <Image source={selectNumImg[chooseImages.indexOf(0)]} style={{marginTop: -15, width:120}} resizeMode='contain'/> : null}
              </TouchableOpacity>
              <TouchableOpacity style={{flex:1, alignItems:'center'}}
              onPress={() => toggleImageSelection(1)}>
                <Image source={{uri : imgs[1]}}
                style={{width: 120, height:160, borderRadius: 5, position: 'absolute', zIndex: 0,
                ...(chooseImages.indexOf(1) !== -1 ? styles.selB : styles.defB) }}
                resizeMode='contain'/>
                {chooseImages.indexOf(1) !== -1 ? <Image source={selectNumImg[chooseImages.indexOf(1)]} style={{marginTop: -15, width:120}} resizeMode='contain'/> : null}
              </TouchableOpacity>
              <TouchableOpacity style={{flex:1, alignItems:'center'}}
              onPress={() => toggleImageSelection(2)}>
                <Image source={{uri : imgs[2]}}
                style={{width: 120, height:160, borderRadius: 5, position: 'absolute', zIndex: 0,
                ...(chooseImages.indexOf(2) !== -1 ? styles.selB : styles.defB) }}
                resizeMode='contain'/>
                {chooseImages.indexOf(2) !== -1 ? <Image source={selectNumImg[chooseImages.indexOf(2)]} style={{marginTop: -15, width:120}} resizeMode='contain'/> : null}
              </TouchableOpacity>
              <TouchableOpacity style={{flex:1, alignItems:'center'}}
              onPress={() => toggleImageSelection(3)}>
                <Image source={{uri : imgs[3]}}
                style={{width: 120, height:160, borderRadius: 5, position: 'absolute', zIndex: 0,
                ...(chooseImages.indexOf(3) !== -1 ? styles.selB : styles.defB) }}
                resizeMode='contain'/>
                {chooseImages.indexOf(3) !== -1 ? <Image source={selectNumImg[chooseImages.indexOf(3)]} style={{marginTop: -15, width:120}} resizeMode='contain'/> : null}
              </TouchableOpacity>
              <TouchableOpacity style={{flex:1, alignItems:'center'}}
              onPress={() => toggleImageSelection(4)}>
                <Image source={{uri : imgs[4]}}
                style={{width: 120, height:160, borderRadius: 5, position: 'absolute', zIndex: 0,
                ...(chooseImages.indexOf(4) !== -1 ? styles.selB : styles.defB) }}
                resizeMode='contain'/>
                {chooseImages.indexOf(4) !== -1 ? <Image source={selectNumImg[chooseImages.indexOf(4)]} style={{marginTop: -15, width:120}} resizeMode='contain'/> : null}
              </TouchableOpacity>
              <TouchableOpacity style={{flex:1, alignItems:'center', marginRight:30}}
              onPress={() => toggleImageSelection(5)}>
                <Image source={{uri : imgs[5]}}
                style={{width: 120, height:160, borderRadius: 5, position: 'absolute', zIndex: 0,
                ...(chooseImages.indexOf(5) !== -1 ? styles.selB : styles.defB) }}
                resizeMode='contain'/>
                {chooseImages.indexOf(5) !== -1 ? <Image source={selectNumImg[chooseImages.indexOf(5)]} style={{marginTop: -15, width:120}} resizeMode='contain'/> : null}
              </TouchableOpacity>
            </View>:
            <Image source={{uri:qrUri}}resizeMode='contain'style={{height:250, marginTop:70}}/>}
            {view ? 
            <View style={{ alignItems:'center'}}>
            {chooseImages.length < 4?null:<TouchableOpacity style={{height: 100, width:200, alignItems: 'center'}}
               onPress={
                
                async () => {
                  setView(false)
                  const picData = new FormData()
                  const picData2 = new FormData()
                  const getCurrentDateTime = () => {
                    const now = new Date();
                    const year = now.getFullYear().toString().substr(-2); // 년도에서 뒤의 두 자리만 가져옴
                    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // 월을 두 자리로 표시하고 1을 더합니다.
                    const day = now.getDate().toString().padStart(2, '0'); // 일을 두 자리로 표시합니다.
                    const hours = now.getHours().toString().padStart(2, '0');
                    const minutes = now.getMinutes().toString().padStart(2, '0');
                    const seconds = now.getSeconds().toString().padStart(2, '0');
                    const dateTimeString = `${day}${hours}${seconds}${minutes}${seconds}${month}`;
                    return dateTimeString;
                  };
                  const uri = await viewRef.current
                    .capture()
                    .catch((err) => console.log(err));
                  time = getCurrentDateTime()
                  picData.append('image', {
                    uri: uri,
                    type: 'image/png',
                    name: time, 
                  });
                  
                  console.log("***QR코드 생성 완료***")
                  try {
                    const response = await axios.post('http://211.107.196.100:7878/hello', picData, {
                      responseType: "blob",
                    });
                    if (response.status === 200){
                      
                        const imageBlob = new Blob([response.data], { type: 'image/png' });
                        const imageUrl = URL.createObjectURL(imageBlob);
                        setQrUri(imageUrl);
                        console.log(imageUrl)
                        await useSleep(1000)
                        
                        // const uri2 = await viewRef.current.capture()
                        // picData2.append('image', {
                        //   uri: uri2,
                        //   type: 'image/png',
                        //   name: time, 
                        //  });
                        // try {
                        //   const response2 = await axios.post('http://211.107.196.100:7878/hello2', picData2, {
                        //   });
                        //   console.log("***이미지 저장 완료***")
                        // }catch(error){
                        //   console.log(error)
                        // }
                        
                        
                    } else {
                      console.error('Failed to fetch image');
                    }
                  } catch (error) {
                    console.error('Error uploading image:', error);
                  }
                }
                }>
                <Image source={completeButton} style={{height:100}} resizeMode='contain'/>
              </TouchableOpacity>}
            </View>
            :null }
          </View>
        </Modal>
    )
}

export default SelectModal