import React, { useState, useEffect } from "react";
import {
  Modal,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { MaterialIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const FullscreenModal = ({ visible, onClose, message }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    onClose(data); // data argümanı, QR kodundan alınan verileri içerir
  };

  if (hasPermission === null) {
    return <Text>Izin isteniyor</Text>;
  }
  if (hasPermission === false) {
    return <Text>Kamera erişimi reddedildi</Text>;
  }

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <View style={styles.content}>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>Kapat</Text>
                </TouchableOpacity>
                <Image
                  source={require("../../../assets/assets/images/starbucks.png")}
                  style={styles.headerImage}
                />
                  <BarCodeScanner
                    onBarCodeScanned={handleBarCodeScanned}
                    style={styles.scanner}
                  />
                <View>
                <Text style={styles.paragraph}>Buy by scanning qr code</Text>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalContainer: {
    width: width,
    height: height,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: height*0.02,
    left: width*0.7,
    backgroundColor: "#000000",
    borderRadius: 10,
    padding: width*0.03,
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    width: width * 0.9,
    height: height * 0.7,
    borderRadius: 20,
  },
  scanner: {
    height: width,
    width: height,
  },
  message: {
    fontSize: 18,
    textAlign: "center",
  },
  headerImage: {
    width: width * 0.18,
    height: height * 0.09,
    resizeMode: "contain",
    margin: height*0.01,
  },
    paragraph: {
    fontSize: 18,
    textAlign: "center",
    color: "#000000",
    fontWeight: "bold",
    margin: height*0.01,
    },
});

export default FullscreenModal;
