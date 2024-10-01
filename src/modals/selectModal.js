import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { Modal, View, Text, Image, TouchableOpacity } from "react-native";
import ViewShot from "react-native-view-shot";
import { QrCodeSvg } from "react-native-qr-svg";
import {
  dpImgs,
  selectNumImg,
  finalImages,
  completeButton,
} from "../utils/imageUrls";
import { homeButton } from "../utils/imageUrls";
import styles from "../Style";
import * as MediaLibrary from "expo-media-library";

function getCurrentDateTime() {
  const now = new Date();
  const year = now.getFullYear().toString().substring(2, 4);
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const dateTimeString = `${year}-${month}-${day}_${hours}${minutes}${seconds}`;
  return dateTimeString;
}

const SelectModal = ({
  selectModalVisible,
  imgs,
  currentImageIndex,
  selectToFinal,
  goHome,
}) => {
  const viewRef = useRef();
  const [img1Selected, setIsImg1Selected] = useState(false);
  const [img2Selected, setIsImg2Selected] = useState(false);
  const [img3Selected, setIsImg3Selected] = useState(false);
  const [img4Selected, setIsImg4Selected] = useState(false);
  const [img5Selected, setIsImg5Selected] = useState(false);
  const [img6Selected, setIsImg6Selected] = useState(false);
  const [selectedImgCount, setSelectedImgCount] = useState(0);
  const [chooseImages, setChooseImages] = useState([]);
  const [qrUrl, setQrUrl] = useState(null);
  const [isVisibleButton, setIsVisibleButton] = useState(true);

  const useSleep = (delay) =>
    new Promise((resolve) => setTimeout(resolve, delay));

  const toggleImageSelection = (imageIndex) => {
    if (chooseImages.includes(imageIndex)) {
      // 이미지가 이미 선택된 경우 선택 해제
      const updatedchooseImages = chooseImages.filter(
        (index) => index !== imageIndex
      );
      setChooseImages(updatedchooseImages);
    } else if (chooseImages.length < 4) {
      // 이미지가 선택되지 않은 경우 선택
      if (chooseImages.length < 4) {
        setChooseImages([...chooseImages, imageIndex]);
      }
    }
  };
  const home = () => {
    setIsImg1Selected(false);
    setIsImg2Selected(false);
    setIsImg3Selected(false);
    setIsImg4Selected(false);
    setIsImg5Selected(false);
    setIsImg6Selected(false);
    setSelectedImgCount(0);
    setChooseImages([]);
    setQrUrl(null);
    setIsVisibleButton(true);
    goHome();
  };

  useEffect(() => {
    img1Selected ? setSelectedImgCount(selectedImgCount + 1) : null;
    img2Selected ? setSelectedImgCount(selectedImgCount + 1) : null;
    img3Selected ? setSelectedImgCount(selectedImgCount + 1) : null;
    img4Selected ? setSelectedImgCount(selectedImgCount + 1) : null;
    img5Selected ? setSelectedImgCount(selectedImgCount + 1) : null;
    img6Selected ? setSelectedImgCount(selectedImgCount + 1) : null;
  }, [
    img1Selected,
    img2Selected,
    img3Selected,
    img4Selected,
    img5Selected,
    img6Selected,
  ]);

  return (
    <Modal visible={selectModalVisible} transparent={false}>
      <View
        style={{
          marginTop: 0,
          height: "100%",
          width: "100%",
          flexDirection: "column",
          backgroundColor: "rgb(75 75 75)",
        }}
      >
        <TouchableOpacity
          style={{ marginTop: 25, position: "absolute", zIndex: 5 }}
          onPress={() => home()}
        >
          <Image
            source={homeButton}
            style={{ width: 70, height: 70, marginLeft: 20, marginTop: 10 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <ViewShot
          ref={viewRef}
          options={{ fileName: "shared", format: "png", quality: 1 }}
          style={{ marginLeft: 178, width: 473, height: 700, marginTop: 100 }}
        >
          <Image
            source={finalImages[currentImageIndex]}
            style={{
              height: 700,
              marginLeft: -157,
              position: "absolute",
              zIndex: 1,
            }}
            resizeMode="contain"
          />
          <Image
            source={
              chooseImages.length >= 1
                ? { uri: imgs[chooseImages[0]] }
                : dpImgs[0]
            }
            style={{
              width: 210,
              height: 280,
              marginTop: 105,
              marginLeft: 22,
              position: "absolute",
              zIndex: 0,
            }}
            resizeMode="contain"
          />
          <Image
            source={
              chooseImages.length >= 2
                ? { uri: imgs[chooseImages[1]] }
                : dpImgs[1]
            }
            style={{
              width: 210,
              height: 280,
              marginTop: 105,
              marginLeft: 242,
              position: "absolute",
              zIndex: 0,
            }}
            resizeMode="contain"
          />
          <Image
            source={
              chooseImages.length >= 3
                ? { uri: imgs[chooseImages[2]] }
                : dpImgs[2]
            }
            style={{
              width: 210,
              height: 280,
              marginTop: 390,
              marginLeft: 22,
              position: "absolute",
              zIndex: 0,
            }}
            resizeMode="contain"
          />
          <Image
            source={
              chooseImages.length >= 4
                ? { uri: imgs[chooseImages[3]] }
                : dpImgs[3]
            }
            style={{
              width: 210,
              height: 280,
              marginTop: 390,
              marginLeft: 242,
              position: "absolute",
              zIndex: 0,
            }}
            resizeMode="contain"
          />
        </ViewShot>

        {qrUrl === null ? (
          <View style={{ flexDirection: "row", marginTop: 40, height: 200 }}>
            <TouchableOpacity
              style={{ flex: 1, alignItems: "center", marginLeft: 30 }}
              onPress={() => toggleImageSelection(0)}
            >
              <Image
                source={{ uri: imgs[0] }}
                style={{
                  width: 120,
                  height: 160,
                  borderRadius: 5,
                  position: "absolute",
                  zIndex: 0,
                  ...(chooseImages.indexOf(0) !== -1
                    ? styles.selB
                    : styles.defB),
                }}
              />
              {chooseImages.indexOf(0) !== -1 ? (
                <Image
                  source={selectNumImg[chooseImages.indexOf(0)]}
                  style={{ marginTop: -15, width: 120 }}
                  resizeMode="contain"
                />
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flex: 1, alignItems: "center" }}
              onPress={() => toggleImageSelection(1)}
            >
              <Image
                source={{ uri: imgs[1] }}
                style={{
                  width: 120,
                  height: 160,
                  borderRadius: 5,
                  position: "absolute",
                  zIndex: 0,
                  ...(chooseImages.indexOf(1) !== -1
                    ? styles.selB
                    : styles.defB),
                }}
                resizeMode="contain"
              />
              {chooseImages.indexOf(1) !== -1 ? (
                <Image
                  source={selectNumImg[chooseImages.indexOf(1)]}
                  style={{ marginTop: -15, width: 120 }}
                  resizeMode="contain"
                />
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flex: 1, alignItems: "center" }}
              onPress={() => toggleImageSelection(2)}
            >
              <Image
                source={{ uri: imgs[2] }}
                style={{
                  width: 120,
                  height: 160,
                  borderRadius: 5,
                  position: "absolute",
                  zIndex: 0,
                  ...(chooseImages.indexOf(2) !== -1
                    ? styles.selB
                    : styles.defB),
                }}
                resizeMode="contain"
              />
              {chooseImages.indexOf(2) !== -1 ? (
                <Image
                  source={selectNumImg[chooseImages.indexOf(2)]}
                  style={{ marginTop: -15, width: 120 }}
                  resizeMode="contain"
                />
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flex: 1, alignItems: "center" }}
              onPress={() => toggleImageSelection(3)}
            >
              <Image
                source={{ uri: imgs[3] }}
                style={{
                  width: 120,
                  height: 160,
                  borderRadius: 5,
                  position: "absolute",
                  zIndex: 0,
                  ...(chooseImages.indexOf(3) !== -1
                    ? styles.selB
                    : styles.defB),
                }}
                resizeMode="contain"
              />
              {chooseImages.indexOf(3) !== -1 ? (
                <Image
                  source={selectNumImg[chooseImages.indexOf(3)]}
                  style={{ marginTop: -15, width: 120 }}
                  resizeMode="contain"
                />
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flex: 1, alignItems: "center" }}
              onPress={() => toggleImageSelection(4)}
            >
              <Image
                source={{ uri: imgs[4] }}
                style={{
                  width: 120,
                  height: 160,
                  borderRadius: 5,
                  position: "absolute",
                  zIndex: 0,
                  ...(chooseImages.indexOf(4) !== -1
                    ? styles.selB
                    : styles.defB),
                }}
                resizeMode="contain"
              />
              {chooseImages.indexOf(4) !== -1 ? (
                <Image
                  source={selectNumImg[chooseImages.indexOf(4)]}
                  style={{ marginTop: -15, width: 120 }}
                  resizeMode="contain"
                />
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flex: 1, alignItems: "center", marginRight: 30 }}
              onPress={() => toggleImageSelection(5)}
            >
              <Image
                source={{ uri: imgs[5] }}
                style={{
                  width: 120,
                  height: 160,
                  borderRadius: 5,
                  position: "absolute",
                  zIndex: 0,
                  ...(chooseImages.indexOf(5) !== -1
                    ? styles.selB
                    : styles.defB),
                }}
                resizeMode="contain"
              />
              {chooseImages.indexOf(5) !== -1 ? (
                <Image
                  source={selectNumImg[chooseImages.indexOf(5)]}
                  style={{ marginTop: -15, width: 120 }}
                  resizeMode="contain"
                />
              ) : null}
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              padding: 15,
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <QrCodeSvg
              style={{ padding: 15, backgroundColor: "rgb(75 75 75)" }}
              value={qrUrl}
              frameSize={225}
              contentCells={5}
              content={<Text style={{ fontSize: 20 }}>👋</Text>}
              contentStyle={{
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          </View>
        )}
        {isVisibleButton ? (
          <View style={{ alignItems: "center" }}>
            {chooseImages.length < 4 ? null : (
              <TouchableOpacity
                style={{ height: 100, width: 200, alignItems: "center" }}
                onPress={async () => {
                  setIsVisibleButton(false);

                  const uri = await viewRef.current
                    .capture()
                    .catch((err) => console.log(err));

                  console.log(uri);

                  time = getCurrentDateTime();

                  const pngFileName = `${time}.png`;

                  try {
                    const picData = new FormData();
                    picData.append("image", {
                      uri: uri,
                      type: "image/png",
                      name: pngFileName,
                    });
                    MediaLibrary.saveToLibraryAsync(uri);

                    console.log(pngFileName);
                    console.log("API_URL: " + process.env.API_URL);

                    const uploadResponse = await axios.post(
                      `${process.env.API_URL}/upload/${pngFileName}`,
                      picData,
                      {
                        headers: {
                          "Content-Type": "multipart/form-data",
                        },
                      }
                    );
                    setQrUrl(`${process.env.API_URL}/load/png/${pngFileName}`);

                    console.log(
                      "File uploaded successfully:",
                      uploadResponse.data
                    );
                  } catch (error) {
                    console.error("Error uploading file:", error);
                  }
                }}
              >
                <Image
                  source={completeButton}
                  style={{ height: 100 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                borderStyle: "none",
                borderRadius: "16px",
                padding: 16,
                width: "auto",
                backgroundColor: "rgb(219 39 119)",
              }}
            >
              <Text
                style={{
                  fontSize: 45,
                  fontWeight: 700,
                  color: "white",
                }}
              >
                ↑↑ QR코드 스캔하고 포토 다운 ↑↑
              </Text>
            </View>

            {/* <TouchableOpacity
              style={{
                height: 100,
                width: 200,
                alignItems: "center",
                backgroundColor: "blue",
              }}
              onPress={() => {
                selectToFinal();
              }}
            >
              <Text style={{ fontSize: 45, color: "white" }}>마지막으로</Text>
            </TouchableOpacity> */}
          </View>
        )}
      </View>
    </Modal>
  );
};

export default SelectModal;
