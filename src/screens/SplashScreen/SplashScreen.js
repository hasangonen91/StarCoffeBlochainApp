import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  StatusBar,
} from "react-native";
import React from "react";

const { width, height } = Dimensions.get("window");

const SplashScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" animated={true} backgroundColor="#00623B" translucent={true} />
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../../../assets/assets/images/starbucks.png")}
        />
      </View>
      <View style={{height:height*0.05}}/>
      <View style={styles.paragraphContainer}>
      <Text style={styles.text}>Good Coffee</Text>
        <Text style={[styles.text, { color: "#000000", marginBottom: 5, }]}>Good Moods </Text>
        <Text style={styles.paragraph}>
          To inspire and nurture the human spirit–one person, one cup and one
          neighborhood at a time.
        </Text>
      </View>

      <View style={styles.bodyContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
             // navigation.navigate("OnboardingIntroScreen");
              navigation.navigate("BottomTabNavigation");

              console.log("OnboardingIntroScreen");
            }}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.accountContainer}>
          <Text style={styles.accountText}>Already have an account? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("LoginScreen")
              console.log("Login");
            }}
          >
            <Text style={styles.accountButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.85,
    height: height * 0.418,
    backgroundColor: "#FFFFFF",
    alignSelf: "center",
    borderRadius: 150,
    position: "relative",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
      },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    marginBottom: height * 0.05,
    marginTop: height*0.05

  },
  logo: {
    width: width * 0.95,
    height: height * 0.5,
    resizeMode: "contain",
    alignSelf: "center",
    shadowColor: "#000",
    
  },
  textContainer: {
    width: width * 0.95,
    height: height * 0.15,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#FFFFFF",
    alignSelf: "center",
  },
  text: {
    fontSize: 30,
    fontWeight: "900",
    color: "#00623B",
  },

  paragraphContainer: {
    width: width * 0.95,
    height: height * 0.25,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#FFFFFF",
    alignSelf: "center",
  },
  paragraph: {
    fontSize: 14,
    color: "#00623B",
    textAlign: "center",
  },

  bodyContainer: {
    width: width * 0.95,
    height: height * 0.2,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#FFFFFF",
    alignSelf: "center",
    flexDirection: "column",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: width * 0.8,
    height: height * 0.1,
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
});
