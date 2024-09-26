import React, { useState, useEffect, useRef } from "react";
import { Modal, View, Text, Image, TouchableOpacity } from "react-native";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";
import { Camera } from "expo-camera/legacy";
import ViewShot from "react-native-view-shot";
import { pinkFrame, cameraButton } from "../utils/imageUrls";
import { homeButton } from "../utils/imageUrls";
import styles from "../Style";
import { captureRef } from "react-native-view-shot";

const CameraModal = ({
  cameraModalVisible,
  cameraToFrame,
  setImgs,
  goHome,
  imgCount,
  setImgCount,
}) => {
  const shotCountSecond = 3;

  const viewRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [type, setType] = useState();
  const [camera, setCamera] = useState(null);

  const [shotCount, setShotCount] = useState(shotCountSecond);
  const [shotCountVisible, setShotCountVisible] = useState(false);
  const [isActiveCount, setIsActiveCount] = useState(false);

  const takePicture = () => {
    if (camera) {
      setShotCountVisible(true);
      setIsActiveCount(true);
    }
  };

  const flipImage = async (uri) => {
    return await manipulateAsync(uri, [{ flip: FlipType.Horizontal }], {
      format: SaveFormat.JPEG,
    });
  };

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
      setType(Camera.Constants.Type.front);
    })();
  }, []);

  useEffect(() => {
    let interval;
    if (isActiveCount) {
      interval = setInterval(async () => {
        if (shotCount > 1) {
          setShotCount(shotCount - 1);
        } else {
          clearInterval(interval);
          setIsActiveCount(false);
          setShotCountVisible(false);

          const data = await camera.takePictureAsync({ sound: false });
          const flippedPhoto = await flipImage(data.uri);

          imgCount === 0
            ? setImgs((prevImgs) => [...prevImgs, flippedPhoto.uri])
            : null;
          imgCount === 1
            ? setImgs((prevImgs) => [...prevImgs, flippedPhoto.uri])
            : null;
          imgCount === 2
            ? setImgs((prevImgs) => [...prevImgs, flippedPhoto.uri])
            : null;
          imgCount === 3
            ? setImgs((prevImgs) => [...prevImgs, flippedPhoto.uri])
            : null;
          imgCount === 4
            ? setImgs((prevImgs) => [...prevImgs, flippedPhoto.uri])
            : null;
          imgCount === 5
            ? setImgs((prevImgs) => [...prevImgs, flippedPhoto.uri])
            : null;
          setImgCount(imgCount + 1);

          setShotCount(shotCountSecond);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActiveCount, shotCount]);

  useEffect(() => {
    if (imgCount == 6) {
      cameraToFrame();
    }
  }, [imgCount]);

  return (
    <Modal visible={cameraModalVisible}>
      {/* 상단바 */}
      <View
        style={{
          flex: 1,
          alignItems: "center",
          marginTop: 0,
          backgroundColor: "rgb(28 25 23)",
        }}
      >
        <TouchableOpacity
          style={{ marginTop: 25, position: "absolute", zIndex: 4 }}
          onPress={() => goHome()}
        >
          <Image
            source={homeButton}
            style={{ width: 70, height: 70, marginLeft: -390 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Image
          source={pinkFrame}
          style={{
            width: 1070,
            marginTop: -450,
            position: "absolute",
            zIndex: 0,
          }}
          resizeMode="contain"
        />
        {/* <Image
          source={{ uri: test }}
          style={{
            width: 1000,
            height: "50%",
            position: "absolute",
            zIndex: 3,
          }}
          resizeMode="contain"
        /> */}
        <ViewShot
          ref={viewRef}
          options={{ fileName: "shared", format: "png", quality: 1 }}
          style={{
            width: 543,
            height: 723,
            position: "absolute",
            zIndex: 1,
            marginTop: 189,
            backgroundColor: "blue",
          }}
        >
          {hasCameraPermission && (
            <Camera
              style={styles.camera}
              ref={(ref) => setCamera(ref)}
              type={type}
              ratio={"1:1"}
            />
          )}
        </ViewShot>
      </View>
      {/* 하단바 */}
      <View
        style={{
          flex: 0.2,
          marginTop: 0,
          flexDirection: "row",
          backgroundColor: "rgb(28 25 23)",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            justifyItems: "center",
            width: "100%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <TouchableOpacity onPress={() => takePicture()}>
              {/* <View
                style={{
                  borderStyle: "none",
                  borderRadius: "16px",
                  padding: 16,
                  width: "auto",
                  backgroundColor: "#F22E8A",
                }}
              >
                <Text
                  style={{
                    fontSize: 86,
                    fontWeight: 600,
                    color: "rgb(228 228 231)",
                  }}
                >
                  사진촬영
                </Text>
              </View> */}
              <Image
                source={cameraButton}
                style={{ height: 125, width: 280 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Text
              style={{
                fontSize: 48,
                fontWeight: 600,
                color: "white",
              }}
            >
              {imgCount} / 6
            </Text>
          </View>
        </View>
      </View>
      <Modal visible={shotCountVisible} transparent={true}>
        <View
          style={{
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 360,
              fontWeight: 600,
              color: "white",
              color: "rgb(250 204 21)",
            }}
          >
            {shotCount}
          </Text>
        </View>
      </Modal>
    </Modal>
  );
};

export default CameraModal;
