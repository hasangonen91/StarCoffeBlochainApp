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
import { useNavigation } from "@react-navigation/native";
import GoogleSvg from "../../../assets/assets/icons/google.svg";
import FacebookSvg from "../../../assets/assets/icons/facebooka.svg";
import AppModal from "../../Components/LoginAndRegisterComponent/LoginModal";
import SpinnerModal from "../../Components/SpinnerClock/SpinnerClock";

const { width, height } = Dimensions.get("window");

const RegisterScreen = ({}) => {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [spinnerVisible, setSpinnerVisible] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const validationSchema = yup.object().shape({
    fullName: yup.string().required("Full name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleRegister = (values) => {
    validationSchema.validate(values).then(() => {
      navigation.navigate("HomeScreen", values);
      console.log("Values:", values);
    });
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0} // or any other value that works for you
      style={{ flex: 1 }}
    >
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.container}>
          <Image
            style={styles.Image}
            source={require("../../../assets/assets/images/starbucks.png")}
          />
          <View style={styles.backButtonContainer}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Ionicons
                name="chevron-back-circle-outline"
                size={35}
                color="black"
              />
            </TouchableOpacity>
            <View style={styles.helloHeader}>
              <Text style={styles.accountText}>Welcome to </Text>

              <Text style={styles.accountButtonText}>Starbucks</Text>
            </View>
          </View>

          <Text style={styles.title}>Get Started</Text>
          <Formik
            initialValues={{
              fullName: "",
              email: "",
              password: "",
              confirmPassword: "",
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
                  placeholder="Full Name"
                  value={values.fullName}
                  onChangeText={handleChange("fullName")}
                  onBlur={handleBlur("fullName")}
                />
                {touched.fullName && errors.fullName && (
                  <Text style={styles.error}>{errors.fullName}</Text>
                )}

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

                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.inputPassword}
                    placeholder="Password"
                    value={values.password}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity
                    style={styles.eye}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons
                      name={showPassword ? "eye-off" : "eye"}
                      size={24}
                      color="#888"
                    />
                  </TouchableOpacity>
                </View>
                {touched.password && errors.password && (
                  <Text style={styles.error}>{errors.password}</Text>
                )}
                <View style={[styles.passwordContainer]}>
                  <TextInput
                    style={styles.inputPassword}
                    placeholder="Confirm Password"
                    value={values.confirmPassword}
                    onChangeText={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                    secureTextEntry={!showPasswordConfirm}
                  />
                  <TouchableOpacity
                    style={styles.eye}
                    onPress={() => setShowPasswordConfirm(!showPasswordConfirm)}
                  >
                    <Ionicons
                      name={showPasswordConfirm ? "eye-off" : "eye"}
                      size={24}
                      color="#888"
                    />
                  </TouchableOpacity>
                </View>

                {touched.confirmPassword && errors.confirmPassword && (
                  <Text style={styles.error}>{errors.confirmPassword}</Text>
                )}

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      if (
                        values.email === "" ||
                        values.password === "" ||
                        values.fullName === "" ||
                        values.confirmPassword === ""
                      ) {
                        setModalVisible(true);
                      } else {
                        // Add the following code
                        setButtonDisabled(true);
                        setSpinnerVisible(true);

                        setTimeout(() => {
                          handleSubmit();
                          setButtonDisabled(false);
                        }, 4000);
                      }
                    }}
                    disabled={buttonDisabled} // Add this line
                  >
                    <Text style={styles.buttonText}>Join Now</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.accountContainer}>
                  <Text style={styles.accountText}>
                    Already have an account?{"\t"}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("LoginScreen");
                      console.log("Login");
                    }}
                  >
                    <Text style={styles.accountButtonText}>Login</Text>
                  </TouchableOpacity>
                </View>

                <AppModal
                  visible={modalVisible}
                  onClose={() => setModalVisible(false)}
                />
                <SpinnerModal
                  visible={spinnerVisible}
                  onClose={() => setSpinnerVisible(false)}
                />

                <View style={styles.socialButtonContainer}>
                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: "#3B5998" }]}
                    onPress={() => {
                      // Facebook Login işlemleri burada yapılabilir
                    }}
                  >
                    <FacebookSvg width={50} height={40} />
                    <Text style={styles.buttonText}>Facebook Login</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.button,
                      { backgroundColor: "#FFFFFF", borderWidth: 1 },
                    ]}
                    onPress={() => {
                      // Google Login işlemleri burada yapılabilir
                    }}
                  >
                    <GoogleSvg width={40} height={40} />

                    <Text style={[styles.buttonText, { color: "#000000" }]}>
                      Google Login
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: height * 0.05,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  ImageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#FFFFFF",
    width: width * 0.9,
    height: height * 0.2,
  },
  Image: {
    width: width * 0.2,
    height: height * 0.1,
    resizeMode: "contain",
    margin: height * 0.016,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: height * 0.02,
    color: "#000000",
    fontWeight: "bold",
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

  passwordContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: height * 0.016,
    width: width * 0.8,
    borderRadius: 16,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  inputPassword: {
    padding: height * 0.016,
    width: width * 0.65,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
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
    fontSize: 18,
    fontWeight: "bold",
    color: "#3C3C43",
  },
  accountButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00623B",
  },
  eye: {
    position: "absolute",
    right: width * 0.05,
  },
  backButtonContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    width: width * 0.9,
    height: height * 0.1,
    backgroundColor: "#FFFFFF",
    marginBottom: height * 0.08,
  },
  accountTextHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3C3C43",
  },
  backButton: {
    // marginRight: width * 0.8,
  },
  helloHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.9,
    height: height * 0.05,
    backgroundColor: "#FFFFFF",
  },
  socialButtonContainer: {
    width: width * 0.9,
    height: height * 0.2,
    backgroundColor: "#FFFFFF",
    alignSelf: "center",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  button: {
    flexDirection: "row",
    width: width * 0.8,
    height: height * 0.08,
    borderRadius: 30,
    backgroundColor: "#00623B",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});
