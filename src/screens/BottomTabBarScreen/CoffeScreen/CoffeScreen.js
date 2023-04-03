import React, { useState, useRef, useEffect, useLayoutEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import {
  Ionicons,
  SimpleLineIcons,
  AntDesign,
  Feather,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");

const data = [
  {
    id: "1",
    name: "Chocolate Frappuccino",
    image: require("../../../../assets/assets/images/coffeOne.png"),
    price: 20.0,
  },
  {
    id: "2",
    name: "Tea Frappuccino",
    image: require("../../../../assets/assets/images/frappuccino.png"),
    price: 8.0,
  },
  {
    id: "3",
    name: "Strawberry Frappuccino",
    image: require("../../../../assets/assets/images/strawbery.png"),
    price: 15.0,
  },
];

const carouselData = [
  {
    image: require("../../../../assets/assets/images/food.png"),
    title: "Foods",
  },
  {
    image: require("../../../../assets/assets/images/ice.png"),
    title: "Frappuccino",
  },
  {
    image: require("../../../../assets/assets/images/food.png"),
    title: "Food",
  },
  {
    image: require("../../../../assets/assets/images/ice.png"),
    title: "Frappuccino",
  },
  {
    image: require("../../../../assets/assets/images/food.png"),
    title: "Food",
  },
  {
    image: require("../../../../assets/assets/images/ice.png"),
    title: "Frappuccino",
  },
];

const CoffeScreen = ({}) => {
  const navigation = useNavigation();

  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    console.log("Search Text:", searchText);
    // Burada arama işlemini yapabilirsin
  };

  const [selectedButton, setSelectedButton] = useState(0);
  const buttonTitles = ["All", "Coffe", "Drink", "Food"];

  const [likes, setLikes] = useState(data.map(() => false));

  const handleLike = (index) => {
    const newLikes = [...likes];
    newLikes[index] = !newLikes[index];
    setLikes(newLikes);

    Animated.sequence([
      Animated.timing(animatedValues[index], {
        toValue: 1.5,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValues[index], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animatedValues = useRef(data.map(() => new Animated.Value(1))).current;

  const [currentPage, setCurrentPage] = useState(0);
  const scrollViewRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      const nextPage =
        currentPage === carouselData.length - 1 ? 0 : currentPage + 1;
      scrollViewRef.current.scrollTo({
        x: nextPage * width * 0.82,
        animated: true,
      });
      setCurrentPage(nextPage);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentPage]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.shape}>
          <Ionicons name="menu" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.logo}>Starbucks</Text>
        <TouchableOpacity style={styles.shape}>
          <SimpleLineIcons name="handbag" size={30} color="#000000" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.searchBar}>
          <TouchableOpacity>
            <Feather name="search" size={24} color="#000000" />
          </TouchableOpacity>
          <TextInput placeholder="Search..." style={styles.searchInput} />
          <TouchableOpacity style={styles.shapeFilter}>
            <Feather name="filter" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <View style={styles.scrollContainer}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            // style={styles.buttonContainer}
          >
            {buttonTitles.map((title, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.button,
                  selectedButton === index && styles.selectedButton,
                ]}
                onPress={() => setSelectedButton(index)}
              >
                <Text
                  style={[
                    styles.buttonText,
                    selectedButton === index && styles.selectedButtonText,
                  ]}
                >
                  {title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.carouselContainer}>
          <ScrollView
            ref={scrollViewRef}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            onMomentumScrollEnd={(event) => {
              const pageNumber = Math.round(
                event.nativeEvent.contentOffset.x / width
              );
              setCurrentPage(pageNumber);
            }}
          >
            {carouselData.map((item, index) => (
              <View key={index} style={[styles.carousel, {}]}>
                <Image style={[styles.carouselImage, {}]} source={item.image} />
                <View style={[styles.overlay]}>
                  <Text style={styles.textOverlay}>{item.title}</Text>
                </View>
              </View>
            ))}
          </ScrollView>

          <View style={styles.indicatorContainer}>
            {carouselData.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  currentPage === index ? styles.activeIndicator : null,
                ]}
              />
            ))}
          </View>
        </View>

        <View style={styles.cardContainer}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {data.map((item, index) => (
              <View key={item.id} style={styles.card}>
                <TouchableOpacity
                  onPress={
                    () => navigation.navigate("ShowCoffe", { item: item })
                  }
                >
                  <View style={styles.cardImageContainer}>
                    <Image style={styles.cardImage} source={item.image} />
                  </View>
                  <Text style={styles.cardText}>{item.name}</Text>
                  <View style={styles.cardPayContainer}>
                    <Text style={styles.cardPayText}>
                      ${item.price.toFixed(2)}
                    </Text>
                    <TouchableOpacity onPress={() => handleLike(index)}>
                      <View style={styles.iconContainer}>
                        <Animated.View
                          style={[
                            styles.iconWrapper,
                            { transform: [{ scale: animatedValues[index] }] },
                          ]}
                        >
                          <AntDesign
                            name={likes[index] ? "heart" : "hearto"}
                            size={24}
                            color={likes[index] ? "red" : "black"}
                          />
                        </Animated.View>
                      </View>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default CoffeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCFFFE",
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.03,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    height: height * 0.1,
    width: width,
    alignSelf: "center",
    backgroundColor: "#FCFFFE",
    borderBottomWidth: 1,
    borderBottomColor: "#DDDDDD",
  },
  logo: {
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  shape: {
    width: width * 0.15,
    height: height * 0.07,
    borderRadius: 50,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },
  shapeFilter: {
    width: width * 0.12,
    height: height * 0.06,
    borderRadius: 50,
    backgroundColor: "#00623B",
    alignItems: "center",
    justifyContent: "center",
    left: width * 0.03,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.01,
    borderRadius: 50,
    backgroundColor: "#F5F5F5",
    width: width * 0.9,
    height: height * 0.06,
    marginTop: height * 0.02,
  },
  searchInput: {
    flex: 1,
    marginLeft: width * 0.02,
    fontSize: 18,
  },
  scrollContainer: {
    width: width,
    flexDirection: "row",
    marginTop: height * 0.02,
    // borderRadius: 50,
    overflow: "hidden",
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: width,
    flexDirection: "row",
    marginTop: height * 0.02,
    borderRadius: 50,
    overflow: "hidden",
    backgroundColor: "blue",
  },
  button: {
    backgroundColor: "#EEEEEE",
    borderRadius: 20,
    width: width * 0.3,
    height: height * 0.06,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: width * 0.02,
  },
  buttonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
  selectedButton: {
    backgroundColor: "#00623B",
  },
  selectedButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cardContainer: {
    flex: 1,
    width: width,
    backgroundColor: "#FCFFFE",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 20,
  },
  card: {
    width: width * 0.7,
    height: height * 0.4,
    borderRadius: 20,
    backgroundColor: "#FCFFFE",
    alignItems: "center",
    justifyContent: "flex-start",
    marginHorizontal: width * 0.02,
    //   marginVertical: height * 0.04,
    // Shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  cardImageContainer: {
    width: width * 0.7,
    height: height * 0.3,
    borderRadius: 20,
    backgroundColor: "#F3F1ED",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  cardImage: {
    width: width * 0.25,
    height: height * 0.25,
    borderRadius: 20,
    alignItems: "center",
  },
  cardText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginLeft: height * 0.01,
  },
  cardPayContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: width * 0.6,
    height: height * 0.06,
    borderRadius: 20,
    backgroundColor: "#FCFFFE",
    marginLeft: height * 0.01,
  },
  cardPayText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00623B",
    marginTop: height * 0.01,
    marginRight: height * 0.18,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.1,
    height: height * 0.06,
    alignSelf: "center",
    right: width * 0.03,
    
  },
  iconWrapper: {
    width: width * 0.1,
    height: height * 0.06,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: width * 0.1,
    height: height * 0.06,
  },
  carouselContainer: {
    flex: 0.34,
    width: width,
    flexDirection: "column",
    overflow: "hidden",
    backgroundColor: "#FCFFFE",
    marginTop: height * 0.02,
    justifyContent: "space-between",
    alignItems: "center", // center vertically
    alignSelf: "center",
  },
  carousel: {
    width: width * 0.8,
    height: height * 0.16,
    borderRadius: 20,
    backgroundColor: "#F3F1ED",
    marginHorizontal: width * 0.02,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    //   justifyContent: "space-between",
    alignItems: "center", // center vertically
    alignSelf: "flex-start",
  },
  carouselImage: {
    width: width * 0.8,
    height: height * 0.16,
    alignItems: "center",
    borderRadius: 20,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width * 0.8,
    height: height * 0.16,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  textOverlay: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  carouselText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginTop: height * 0.01,
  },
  indicatorContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  indicator: {
    width: width * 0.018,
    height: height * 0.009,
    borderRadius: 5,
    backgroundColor: "#ccc",
    margin: width * 0.01,
  },
  activeIndicator: {
    width: width * 0.025,
    height: height * 0.012,
    borderRadius: 5,
    backgroundColor: "#00623B",
    margin: width * 0.01,
  },
});
