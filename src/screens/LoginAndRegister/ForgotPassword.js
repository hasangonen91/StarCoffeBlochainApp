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
import { Formik } from "formik";
import * as yup from "yup";
import { Ionicons } from "@expo/vector-icons";
import ForgotSvg from "../../../assets/assets/icons/forgot.svg";
import SpinnerModal from "../../Components/SpinnerClock/SpinnerClock";

const { width, height } = Dimensions.get("window");

const ForgotPassword = ({ navigation }) => {
  const [spinnerVisible, setSpinnerVisible] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
  });

  const handleRegister = (values) => {
    validationSchema.validate(values).then(() => {
      navigation.navigate("MailScreen", values);
      console.log("Values:", values);
    });
  };

  return (
    <KeyboardAvoidingView
      enabled
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
      >
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
              <Text style={styles.accountText}>Forgot Password </Text>
              <Text style={styles.headerParagraph}>
                Don’t worry! Enter your registered email below to receive
                password instructions
              </Text>
            </View>
          </View>

          <View style={styles.ImageContainer}>
            <ForgotSvg width={width} height={height * 0.5} />
          </View>

          <Formik
            initialValues={{
              email: "",
            }}
            onSubmit={handleRegister}
            validationSchema={validationSchema}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  keyboardType="email-address"
                />
                {touched.email && errors.email && (
                  <Text style={styles.error}>{errors.email}</Text>
                )}

                <View style={styles.accountContainer}>
                  <Text style={styles.accountText}>Remember Password? </Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("LoginScreen");
                      console.log("Login");
                    }}
                  >
                    <Text style={styles.accountButtonText}>Login</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      // Add the following code
                      setButtonDisabled(true);
                      setSpinnerVisible(true);
                      setTimeout(() => {
                        handleSubmit();
                        setButtonDisabled(false);
                      }, 4000);
                    }}
                    disabled={buttonDisabled} // Add this line

                  >
                    <Text style={styles.buttonText}>Reset Password</Text>
                  </TouchableOpacity>
                </View>
                <SpinnerModal
                  visible={spinnerVisible}
                  onClose={() => setSpinnerVisible(false)}
                />
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;

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
    width: width,
    height: height * 0.3,
  },
  Image: {
    width: width * 0.2,
    height: height * 0.1,
    resizeMode: "contain",
    margin: height * 0.016,
  },
  input: {
    borderWidth: 1,
    borderColor: "#000",
    padding: height * 0.016,
    marginBottom: height * 0.016,
    width: width * 0.8,
    borderRadius: 16,
  },
  error: {
    color: "#FF0000",
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#0066cc",
    padding: height * 0.016,
    margin: height * 0.016,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
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
  accountContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: height * 0.05,
  },
  accountText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00623B",
  },
  accountButtonText: {
    fontSize: 16,
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
});
