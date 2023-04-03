import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons,SimpleLineIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ScanSvg from "../../../assets/assets/icons/scan.svg";
import QrModal from "../QrScanModal/ScanQr";

const { width, height } = Dimensions.get("window");

const ShowHeader = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerFnish}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.shape, { backgroundColor: "#FFFFFF" }]}
        >
          <Ionicons name="chevron-back" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("CoffeScreen")}
        >
          <Image
            source={require("../../../assets/assets/images/starbucks.png")}
            style={styles.headerImage}
          />
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.shape}>
          <SimpleLineIcons name="handbag" size={30} color="#000000" />
      
        </TouchableOpacity> */}

      <TouchableOpacity 
          onPress={() => setModalVisible(true)}
      style={styles.shape}>
          <ScanSvg 
          width={width*0.09}
          height={height*0.045}
          />

        </TouchableOpacity>
      </View>
      <QrModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        
      />

    </View>
  );
};

export default ShowHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: width * 0.01,
    height: height * 0.14,
    width: width,
    alignSelf: "center",
    backgroundColor: "#FCFFFE",
    borderBottomWidth: 1,
    borderBottomColor: "#DDDDDD",
  },
  headerFnish: {
    flexDirection: "row",
    backgroundColor: "#FCFFFE",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: width * 0.01,
    width: width * 0.98,
    alignSelf: "center",
    marginTop: height * 0.03,
  },
  logo: {
    fontSize: 20,
    fontWeight: "bold",
  },
  shape: {
    width: width * 0.15,
    height: height * 0.07,
    borderRadius: 50,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },
  headerImage: {
    width: width * 0.18,
    height: height * 0.09,
    resizeMode: "contain",
  },
});
