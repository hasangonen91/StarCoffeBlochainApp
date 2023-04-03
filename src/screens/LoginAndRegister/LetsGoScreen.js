import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const LetsGoScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.helloHeader}>
        <Image
          style={styles.Image}
          source={require("../../../assets/assets/images/starbucks.png")}
        />
      </View>
      <View style={styles.paragraph}>
        <Text style={styles.paragraphText}>
          Thanks for giving us your precious time. Now you are ready for an
          enjoyable moment.
        </Text>
      </View>
      <Image
        style={styles.doneImage}
        source={{
          uri: "https://i0.wp.com/toscaleblog.co.uk/wp-content/uploads/2021/04/Frame-1.png?fit=452%2C417&ssl=1",
        }}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("HomeScreen");

          }}
        >
          <Text style={styles.buttonText}>Let's go</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LetsGoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  Image: {
    width: width * 0.24,
    height: height * 0.12,
    resizeMode: "contain",
  },
  helloHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.9,
    backgroundColor: "#FFFFFF",
  },
  paragraph: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.9,
    height: height * 0.1,
    backgroundColor: "#FFFFFF",
  },
  paragraphText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
  },
  doneImage: {
    width: width * 0.8,
    height: height * 0.5,
    resizeMode: "contain",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: width * 0.8,
    height: height * 0.08,
    borderRadius: 30,
    backgroundColor: "#00623B",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});
