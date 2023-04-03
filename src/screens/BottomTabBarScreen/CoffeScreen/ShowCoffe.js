import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import { Ionicons, AntDesign, FontAwesome } from "@expo/vector-icons";
import Header from "../../../Components/HeaderComponents/ShowHeader";
import { useNavigation } from "@react-navigation/native";
import TallSvg from "../../../../assets/assets/icons/tall.svg";
import GrandeSvg from "../../../../assets/assets/icons/grande.svg";
import VentiSvg from "../../../../assets/assets/icons/venti.svg";

const { width, height } = Dimensions.get("window");
const sizes = [
  {
    size: "Tall",
    icon: <TallSvg width={width * 0.1} height={height * 0.1} />,
    price: 5.99,
  },
  {
    size: "Grande",
    icon: <GrandeSvg width={width * 0.1} height={height * 0.1} />,
    price: 7.99,
  },
  {
    size: "Venti",
    icon: <VentiSvg width={width * 0.1} height={height * 0.1} />,
    price: 9.99,
  },
];

const ShowCoffe = () => {
  const navigation = useNavigation();

  const [count, setCount] = useState(1); // Başlangıç değeri 1 olan bir sayaç tanımlıyoruz

  function decreaseCount() {
    if (count > 1) {
      setCount(count - 1);
      setSelectedPrice(sizes.find((size) => size.size === selectedSize).price * (count - 1));
    }
  }

  function increaseCount() {
    setCount(count + 1);
    setSelectedPrice(sizes.find((size) => size.size === selectedSize).price * (count + 1));
  }

  const [selectedPrice, setSelectedPrice] = useState(5.99);
  const [selectedSize, setSelectedSize] = useState("Tall");

 

  const handleSizeSelect = (size, price) => {
    setSelectedSize(size);
    setSelectedPrice(price);
    setCount(1);

  };

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.cardImageContainer}>
          <Image
            source={require("../../../../assets/assets/images/coffe.png")}
            style={styles.cardImage}
          />
          <View style={styles.Sheap}>
            <TouchableOpacity style={styles.greenSheep} onPress={decreaseCount}>
              <AntDesign name="minus" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.minusPlusText}>{count}</Text>
            <TouchableOpacity style={styles.greenSheep} onPress={increaseCount}>
              <AntDesign name="plus" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.coffeInformationContainer}>
          <View style={styles.coffeInformation}>
            <View style={styles.coffeName}>
              <Text style={styles.drink}>Coffee</Text>
              <Text style={styles.drinkName}>Chocolate Frappuccino</Text>
            </View>
            <View style={styles.starAndNumber}>
              <FontAwesome name="star" size={25} color="gold" />
              <Text style={styles.starNumber}>{"\t"}4.2</Text>
            </View>
          </View>
          <Text style={styles.coffeText}>
            Double Chocolaty Chip Crème Frappuccino® Blended Beverage 410
            calories
          </Text>
        </View>
        <View style={styles.coffePriceContainer}>
          <View style={styles.coffePrice}>
            {sizes.map((item, index) => (
              <View key={index} style={styles.bottleandText}>
                <TouchableOpacity
                  style={[
                    styles.selectBottle,
                    selectedSize === item.size ? styles.selected : null,
                  ]}
                  onPress={() => handleSizeSelect(item.size, item.price)}
                >
                  <View
                    style={[
                      styles.selectBottleShape,
                      selectedSize === item.size ? styles.selected : null,
                    ]}
                  >
                    {item.icon}
                  </View>
                </TouchableOpacity>
                <Text
                  style={
                   styles.bottleText
                  }
                >
                  {item.size}
                </Text>
              </View>
            ))}

            <View
              style={{ width: 2, height: 30, backgroundColor: "#000000" }}
            />
            <Text style={styles.price}>
              {"\t"}${'\t'}
              {selectedPrice.toFixed(2)}
            </Text>
          </View>
          <TouchableOpacity style={styles.addCoffeButton}>
            <Text style={styles.addCoffeText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ShowCoffe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCFFFE",
    
  },

  content: {
    height: height,
    alignItems: "center",
    //justifyContent: "center",

    flexGrow: 8,
    marginTop: height * 0.01,
  },
  cardImageContainer: {
    flexDirection: "column",
    width: width * 0.9,
    height: height * 0.5,
    borderRadius: 20,
    backgroundColor: "#F3F1ED",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  cardImage: {
    width: width * 0.4,
    height: height * 0.4,
    resizeMode: "cover",
  },
  Sheap: {
    width: width * 0.4,
    height: height * 0.05,
    backgroundColor: "#FFFFFF",
    bottom: 0,
    marginTop: height * 0.01,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  greenSheep: {
    width: width * 0.08,
    height: height * 0.04,
    backgroundColor: "#00623B",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  minusPlusText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000000",
  },
  coffeInformationContainer: {
    alignItems: "center",
    justifyContent: "space-around",
    alignSelf: "center",
  },

  coffeInformation: {
    flexDirection: "row",
    width: width * 0.9,
    alignItems: "center",
    justifyContent: "space-between",
    // backgroundColor: "red",
  },
  coffeName: {
    flexDirection: "column",
    justifyContent: "center",
  },
  drink: {
    fontSize: 18,
    fontWeight: "400",
    color: "#000000",
  },
  drinkName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
  },
  starAndNumber: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  starNumber: {
    fontSize: 20,
    fontWeight: "400",
    color: "#000000",
  },
  coffeText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#000000",
    marginTop: height * 0.01,
  },
  coffePriceContainer: {
    flexDirection: "column",
    width: width * 0.9,
    height: height * 0.15,
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "center",
    marginTop: height * 0.01,
  },
  coffePrice: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: width * 0.98,
    height: height * 0.15,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
  },
  addCoffeButton: {
    width: width * 0.8,
    height: height * 0.07,
    backgroundColor: "#00623B",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: height * 0.02,
  },
  addCoffeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  bottleandText: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  selectBottle: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
  },
  selectBottleText: {
    fontSize: 18,
    fontWeight: "400",
    color: "#000000",
  },
  selectBottleShape: {
    width: width * 0.22,
    height: height * 0.11,
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  selectBottleShapeText: {
    fontSize: 18,
    fontWeight: "400",
    color: "#000000",
  },
  bottleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",

    
  },
  selected: {
    backgroundColor: "#00623B",
  },
  selectedText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});
