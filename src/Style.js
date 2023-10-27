import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    mainView:{
        height:'100%',
        width:'100%',
        flexDirection:'column'
    },
    titleView:{
       flexDirection:'row'
    },
    title: {
        fontSize: 20
    },
    cameraView:{
        alignItems: 'center',
        marginTop: 70
    },
    camera:{
        width: 543,
        height: 723,
        position: 'absolute', zIndex: 1,
       
    },
    modalView:{
        height: '100%',
        alignItems: 'center'
    },
    borderSelected:{
        borderColor: 'black',
        borderWidth: 1
    },
    defB:{
        borderColor:'#696969',
        borderWidth:3
    },
    selB:{
        borderColor:'#E6437E',
        borderWidth: 6
    }
})

export default styles