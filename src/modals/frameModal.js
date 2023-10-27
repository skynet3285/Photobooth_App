import React, { useState, useEffect, useRef } from 'react';
import { Modal, View, Text, Image, TouchableOpacity } from 'react-native';
import { leftDirection, rightDirection, completeButton, images } from '../utils/imageUrls';
import { homeButton } from '../utils/imageUrls';

const FrameModal = ({ frameModalVisible, frameToSelect, currentImageIndex, setCurrentImageIndex, goHome }) => {
    
    return(
        <Modal visible={frameModalVisible}>
            <View style={{marginTop:'10%',height:'90%', width:'100%', flexDirection: 'column', alignItems:'center'}}>
            <TouchableOpacity
                    style={{marginTop:25, position: 'absolute', zIndex: 4}} onPress={()=>goHome()}>
                    <Image source={homeButton} style={{width:70, height:70,marginLeft:-390}} resizeMode='contain'/>
                </TouchableOpacity>
                <View style={{flexDirection:'row', flex:0.8}}>
                <TouchableOpacity style={{flex:0.25}}
                onPress={() => {setCurrentImageIndex((prevIndex) =>
                    prevIndex === 0 ? images.length - 1 : prevIndex - 1 )}}>
                    <Image source={leftDirection}
                    style={{width:'80%', marginTop:200, marginRight: 20,
                    shadowColor: "#000",
                    shadowOffset: {width: 1,height: 1,},
                    shadowOpacity: 0.5,
                    shadowRadius: 2}}
                    resizeMode='contain'
                    />
                </TouchableOpacity>
                <View style={{flex:0.7}}>
                    <Image source={images[currentImageIndex]}
                    style={{width:'103%', marginTop:-110}}
                    resizeMode='contain'
                    />
                </View>
                <TouchableOpacity style={{flex:0.25}}
                onPress={() =>  {setCurrentImageIndex((prevIndex) =>
                    prevIndex === images.length - 1 ? 0 : prevIndex + 1 )}}>
                    <Image source={rightDirection}
                    style={{width:'80%', marginTop:200, marginLeft:20,
                    shadowColor: "#000",
                    shadowOffset: {width: 1,height: 1,},
                    shadowOpacity: 0.5,
                    shadowRadius: 2}}
                    resizeMode='contain'
                    />
                </TouchableOpacity>
                </View>
                <View style={{flex:0.2}}>
                <TouchableOpacity style={{marginTop: 60,}}
                    onPress={() => frameToSelect()}>
                    <Image source={completeButton}  style={{marginTop:-100, width:280}} resizeMode='contain'/>
                </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default FrameModal