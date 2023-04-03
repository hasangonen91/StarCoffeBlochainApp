import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    text: "Starbucks Weaves its Magic with New Color and Flavor Changing Unicorn Frappuccino",
    Image: require("../../../assets/assets/images/unicorn.png"),
    gradient: ["#C9B1FF", "#FFCAF2", "#FFB2B1"],
  },
  {
    id: "2",
    text: "A cold start has never tasted so good. How about milk foam, espresso and a refreshing drink that you can enjoy at any time of the day?",
    Image: require("../../../assets/assets/images/latte.png"),
    gradient: ["#ffba9c", "#ffd5c3", "#e0ad97", "#edca98"],
  },
  {
    id: "3",
    text: "The varieties that stand out with their intense flavors will leave a smile on your face and a mark on your palate.",
    Image: require("../../../assets/assets/images/chilled.png"),
    gradient: ["#8A502B", "#E09762", "#FEFEFE", "#FCECDF"],
  },
];

const OnboardingIntroScreen = ({navigation}) => {
  const sliderRef = useRef(null);

  const renderDoneButton = () => {
    return (
      <View style={styles.buttonContainer}
    
      >
        <TouchableOpacity style={styles.button}
          onPress={() => {
            navigation.navigate("RegisterScreen");
            console.log("RegisterScreen");
          }}
        >
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <View style={[styles.slide, {}]}>
        <LinearGradient colors={item.gradient} style={styles.gradient}>
          <View style={styles.ImageContainer}>
            <View style={styles.logoContainer}>
              <Image
                style={styles.logo}
                source={require("../../../assets/assets/images/starbucks.png")}
              />
            </View>
            <View style={styles.textContainer}>
            <Image style={styles.slideImage} source={item.Image} />

              <Text style={styles.slideText}>{item.text}</Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  };

  return (
    <AppIntroSlider
      ref={sliderRef}
      renderItem={renderItem}
      data={slides}
      dotStyle={styles.dotStyle}
      activeDotStyle={styles.activeDotStyle}
      renderNextButton={() => null} //
      renderDoneButton={renderDoneButton} //
    />
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    marginRight: width * 0.05,
    backgroundColor: "#00623B",
    borderRadius: 30,
    width: width * 0.8,
    height: height * 0.08,  },

  button: {
    backgroundColor: "#00623B",
    borderRadius: 30,
    width: width * 0.8,
    height: height * 0.08,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "bold",
  },
  dotStyle: {
    backgroundColor: "rgba(255,255,255,2)",
  },
  activeDotStyle: {
    backgroundColor: "#00623B",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.2,
    height: height * 0.1,
    backgroundColor: "#F5FCFF",
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
  },
  logo: {
    width: width * 0.24,
    height: height * 0.12,
    resizeMode: "contain",
    alignSelf: "center",
    shadowColor: "#000",
  },

  ImageContainer: {
    alignItems: "center",
    justifyContent: "space-evenly",
    width: width,
    height: "100%",
    alignSelf: "center",
  },
  slideImage: {
    width: width * 0.6,
    height: height * 0.5,
    resizeMode: "contain",
    alignSelf: "center",
  },

  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.8,
    alignSelf: "center",
    marginBottom: height * 0.05,
  },
  slideText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "900",
    alignSelf: "center",
    textAlign: "center",

  },
});

export default OnboardingIntroScreen;
