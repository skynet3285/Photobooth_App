import React, { useState, useEffect, useRef } from 'react';
import { Modal, View, Text, Image, TouchableOpacity } from 'react-native';
import ViewShot from 'react-native-view-shot'
import * as Sharing from 'expo-sharing'
import { dpImgs, selectNumImg, finalImages, completeButton } from '../utils/imageUrls';
import styles from '../Style';

const SelectModal = ({ selectModalVisible, imgs, currentImageIndex }) => {
    const viewRef = useRef();
    const [img1Selected, setIsImg1Selected] = useState(false);
    const [img2Selected, setIsImg2Selected] = useState(false);
    const [img3Selected, setIsImg3Selected] = useState(false);
    const [img4Selected, setIsImg4Selected] = useState(false);
    const [img5Selected, setIsImg5Selected] = useState(false);
    const [img6Selected, setIsImg6Selected] = useState(false);
    const [selectedImgCount, setSelectedImgCount] = useState(0);
    const [chooseImages, setChooseImages] = useState([])
  
    
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
          <View style={{marginTop:100,height:'100%', width:'100%', flexDirection:'column'}}>
            <ViewShot ref={viewRef}
            options={{ fileName: 'shared', format: 'png', quality: 1 }} style={{marginLeft:178, width: 473, height: 700}}>
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
            </View>
            <View style={{ alignItems:'center'}}>
            {chooseImages.length < 4?null:<TouchableOpacity style={{height: 100, width:200, alignItems: 'center'}}
               onPress={async () => {
                              const uri = await viewRef.current
                                .capture()
                                .catch((err) => console.log(err));
                              await Sharing.shareAsync(
                                Platform.OS === 'ios' ? `file://${uri}` : uri,
                                {
                                  mimeType: 'image/png',
                                  dialogTitle: '공유하기',
                                  UTI: 'image/png',
                                },
                              );}
                }>
                <Image source={completeButton}  style={{height:100}} resizeMode='contain'/>
              </TouchableOpacity>}
            </View>
          </View>
        </Modal>
    )
}

export default SelectModal