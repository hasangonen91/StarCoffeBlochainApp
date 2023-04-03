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
  Modal,
  Platform,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import GoogleSvg from "../../../assets/assets/icons/google.svg";
import FacebookSvg from "../../../assets/assets/icons/facebooka.svg";
import AppModal from "../../Components/LoginAndRegisterComponent/LoginModal";
import SpinnerModal from "../../Components/SpinnerClock/SpinnerClock";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const Dot = ({ isActive }) => {
  return <View style={[styles.dot, isActive && styles.activeDot]} />;
};

const LoginScreen = ({  }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [spinnerVisible, setSpinnerVisible] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  const navigation = useNavigation();
  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleLogin = (values) => {
    validationSchema.validate(values).then(() => {
      navigation.navigate("HomeScreen", values);
      console.log("Values:", values);
    });
  };

  const toggleKeepLoggedIn = () => {
    setKeepLoggedIn(!keepLoggedIn);
  };

  const [showPassword, setShowPassword] = useState(false);

  const now = new Date();
  const hour = now.getHours();

  let message;
  if (hour >= 6 && hour < 12) {
    message = "Good Morning!";
  } else if (hour >= 12 && hour < 18) {
    message = "Good Afternoon!";
  } else if (hour >= 18 && hour < 24) {
    message = "Good Evening!";
  } else {
    message = "Good Night!";
  }

  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const index = Math.round(contentOffset.x / width);
    setActiveIndex(index);
  };

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
          <View style={styles.morningHeader}>
            <Text style={styles.goodMorning}>
              {message}
              {"\t"}
            </Text>
            <Text style={styles.welcomeText}>{"\t"}👋</Text>
          </View>

          <View style={styles.helloHeader}>
            <Text style={styles.welcomeText}>Welcome back!</Text>
            <Image
              style={styles.Image}
              source={require("../../../assets/assets/images/starbucks.png")}
            />
          </View>

          <View style={styles.morningHeader}>
            <Text style={styles.starbucksText}>Starbucks</Text>
            <Text style={[styles.starbucksText, { color: "#000000" }]}>
              {"\t"}Promotion
            </Text>
          </View>


          <View style={styles.promotionContainer}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
              pagingEnabled={true}
            >
              <View
                style={[styles.promotionBox, { marginRight: width * 0.09 }]}
              >
                <Text style={styles.promotionTitle}>STARBUCKS COFFEE</Text>
                <Text style={styles.promotionDiscount}>%30 OFF</Text>
                <View style={styles.promotionTextContainer}>
                  <Image
                    style={styles.promotionImage}
                    source={require("../../../assets/assets/images/ice.png")}
                  />
                </View>
                <Text style={styles.promotionCode}>
                  Starbucks'ta, %30 indirimle alın!
                </Text>
              </View>
              <View
                style={[
                  styles.promotionBox,
                  { marginRight: width * 0.07, backgroundColor: "#E1B995" },
                ]}
              >
                <Text style={styles.promotionTitle}>STARBUCKS COFFEE</Text>
                <Text style={styles.promotionDiscount}>%10 OFF</Text>
                <View style={styles.promotionTextContainer}>
                  <Image
                    style={styles.promotionImage}
                    source={require("../../../assets/assets/images/latte.png")}
                  />
                </View>
                <Text style={styles.promotionCode}>
                  Starbucks'ta, %10 indirimle alın!
                </Text>
              </View>
              <View
                style={[
                  styles.promotionBox,
                  { marginRight: width * 0.07, backgroundColor: "#6c6a69" },
                ]}
              >
                <Text style={styles.promotionTitle}>STARBUCKS COFFEE</Text>
                <Text style={styles.promotionDiscount}>%50 OFF</Text>
                <View style={styles.promotionTextContainer}>
                  <Image
                    style={styles.promotionImage}
                    source={require("../../../assets/assets/images/chilled.png")}
                  />
                </View>
                <Text style={styles.promotionCode}>
                  Starbucks'ta, %50 indirimle alın!
                </Text>
              </View>
            </ScrollView>
            <View style={styles.dotContainer}>
              {[...Array(3)].map((_, index) => (
                <Dot key={index} isActive={index === activeIndex} />
              ))}
            </View>
          </View>



          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={handleLogin}
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
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    keyboardType="email-address"
                    autoCapitalize="none"
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
                  <View style={styles.forgotPasswordContainer}>
                    <TouchableOpacity
                      onPress={toggleKeepLoggedIn}
                      activeOpacity={0.7}
                      style={styles.rememberButton}
                    >
                      <View
                        style={[
                          styles.checkbox,
                          keepLoggedIn && styles.checkboxChecked,
                        ]}
                      >
                        {keepLoggedIn && <View style={styles.dotRemember} />}
                      </View>
                      <Text style={styles.label}>Remember Me</Text>


                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => navigation.navigate("ForgotPassword")}
                    >
                      <Text style={styles.forgotPasswordText}>
                        Forgot Password?
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        if (values.email === "" || values.password === "") {
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
                      <Text style={styles.buttonText}>Login</Text>
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
                </View>
              </>
            )}
          </Formik>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: "black",
                width: width * 0.4,
              }}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#000000",
                marginHorizontal: width * 0.03,
              }}
            >
              OR
            </Text>
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: "black",
                width: width * 0.4,
              }}
            />
          </View>

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

          <View style={styles.accountContainer}>
            <Text style={styles.accountText}>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("RegisterScreen");
                console.log("Login");
              }}
            >
              <Text style={styles.accountButtonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: height * 0.05,
  },
  inputContainer: {
    height: height * 0.35,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#000",
    padding: height * 0.016,
    width: width * 0.8,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
  },
  error: {
    color: "#FF0000",
    marginBottom: height * 0.016,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
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
  passwordContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#000",
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
  eye: {
    position: "absolute",
    right: width * 0.05,
  },
  Image: {
    width: width * 0.16,
    height: height * 0.08,
    resizeMode: "contain",
  },
  helloHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: width * 0.9,
    height: height * 0.07,
    backgroundColor: "#FFFFFF",
    alignSelf: "center",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  goodMorning: {
    fontSize: 18,
    fontWeight: "400",
  },
  morningHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: width * 0.9,
    height: height * 0.04,
    backgroundColor: "#FFFFFF",
    alignSelf: "center",
  },
  starbucksText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#00623B",
  },
  promotionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.98,
    height: height * 0.35,
    backgroundColor: "#FFFFFF",
    alignSelf: "center",
    marginBottom: width * 0.01,
  },
  promotionBox: {
    flexDirection: "column",
    width: width * 0.85,
    height: height * 0.25,
    borderRadius: 20,
    backgroundColor: "#6F4E37",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginLeft: width * 0.05,
  },
  promotionImage: {
    width: width * 0.4,
    height: height * 0.15,
    resizeMode: "contain",
    backgroundColor: "transparent",
  },
  promotionTextContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  promotionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  promotionDiscount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffd700",
  },
  promotionCode: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    marginBottom: width * 0.01,
  },
  dotContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: height * 0.02,
    left: 0,
    right: 0,
  },
  dot: {
    width: width * 0.03,
    height: height * 0.01,
    borderRadius: 4,
    backgroundColor: "#bdbdbd",
    marginHorizontal: width * 0.02,
  },
  activeDot: {
    backgroundColor: "#00623B",
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
  forgotPasswordContainer: {
    flexDirection: "row",
    width: width * 0.95,
    height: height * 0.05,
    backgroundColor: "#FFFFFF",
    alignSelf: "center",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000000",
  },
  checkbox: {
    flexDirection: 'row',
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',

  },
  checkboxChecked: {
    flexDirection: 'row',

    backgroundColor: '#FFFFFF',
    borderColor: '#00623B',
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000000",
  },
  dotRemember: {
    width: width * 0.04,
    height: height * 0.02,
    borderRadius: 20,
    backgroundColor: '#00623B',
  },

  rememberButton: {
    flexDirection: 'row',
    width: width * 0.4,
    height: height * 0.04,
    backgroundColor: "#FFFFFF",
    alignSelf: "center",
    justifyContent: "space-evenly",
    alignItems: "center",
  }
 
});
