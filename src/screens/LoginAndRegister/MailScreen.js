import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MailSvg from "../../../assets/assets/icons/mail2.png";
import SpinnerModal from "../../Components/SpinnerClock/SpinnerClock";

const { width, height } = Dimensions.get("window");

const MailScreen = ({ navigation }) => {
  const [spinnerVisible, setSpinnerVisible] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  return (
    <View style={styles.container}>
      <Image
        style={styles.Image}
        source={require("../../../assets/assets/images/starbucks.png")}
      />
      <View style={styles.backButtonContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
            console.log("Login");
          }}
        >
          <Ionicons
            name="chevron-back-circle-outline"
            size={35}
            color="black"
          />
        </TouchableOpacity>
        <View style={styles.helloHeader}>
          <Text style={styles.accountText}>Email Sent! </Text>
          <Text style={styles.headerParagraph}>
            We’ve sent a password reset link to
          </Text>
          <Text style={styles.mailText}>hasangonen916@gmail.com</Text>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.ImageContainer}>
          <Image
            style={{ width: width * 0.7, height: height * 0.35 }}
            source={require("../../../assets/assets/icons/send.png")}
          />
        </View>

        <View style={[styles.helloHeader, { flexDirection: "row" }]}>
          <Text style={styles.headerParagraph}>Didnt Receive?{'\t'}</Text>
          <Text style={[styles.mailText,{color:'#00623B'}]}>{'\t'}Resend</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              // Add the following code
              setButtonDisabled(true);
              setSpinnerVisible(true);
              setTimeout(() => {
                navigation.navigate("LoginScreen");
                setButtonDisabled(false);
              }, 4000);
            }}
            disabled={buttonDisabled} // Add this line

          >
            <Text style={styles.buttonText}>Back to Login</Text>
          </TouchableOpacity>
        </View>
        <SpinnerModal
          visible={spinnerVisible}
          onClose={() => setSpinnerVisible(false)}
        />
      </View>
    </View>
  );
};

export default MailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  ImageContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    width: width * 0.9,
    height: height * 0.3,
  },
  Image: {
    width: width * 0.2,
    height: height * 0.1,
    resizeMode: "contain",
    margin: height * 0.016,
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

  accountText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00623B",
  },

  backButtonContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    width: width * 0.9,
    height: height * 0.15,
    backgroundColor: "#FFFFFF",
    marginBottom: height * 0.08,
  },

  helloHeader: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.9,
    height: height * 0.05,
    backgroundColor: "#FFFFFF",
  },
  headerParagraph: {
    fontSize: 16,
    fontWeight: "400",
    color: "#000000",
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    width: width * 0.9,
    height: height * 0.5,
    backgroundColor: "#FFFFFF",
  },
  mailText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
  },
});
