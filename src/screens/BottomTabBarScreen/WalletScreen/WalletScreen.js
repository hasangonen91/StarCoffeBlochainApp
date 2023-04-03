import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Modal,
  Animated,
} from "react-native";

import Header from "../../../Components/HeaderComponents/Header";
import MasterCardSvg from "../../../../assets/assets/icons/mastercard.svg";
import PaypassSvg from "../../../../assets/assets/icons/paypass.svg";
import VisaCardSvg from "../../../../assets/assets/icons/visa.svg";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import CreditCardSvg from "../../../../assets/assets/icons/card.svg";
import GiftSvg from "../../../../assets/assets/icons/gift.svg";
import NotificationSvg from "../../../../assets/assets/icons/notification.svg";
import SettingsSvg from "../../../../assets/assets/icons/settings.svg";
import QrSvg from "../../../../assets/assets/icons/qr.svg";

const { width, height } = Dimensions.get("window");

const mockData = [
  {
    id: 1,
    tarih: "01.01.2023",
    tutar: 25.5,
    urun: "Latte",
    sube: "Starbucks Bebek",
    logo: require("../../../../assets/assets/images/starbucks.png"),
  },
  {
    id: 2,
    tarih: "05.01.2023",
    tutar: 15.25,
    urun: "Disney Premium",
    sube: "Disney Türkiye",
    logo: require("../../../../assets/assets/images/disneyplus.png"),
  },
  {
    id: 3,
    tarih: "10.02.2023",
    tutar: 18.0,
    urun: "Spotify Premium",
    sube: "Spotify Türkiye",
    logo: require("../../../../assets/assets/images/spotify.png"),
  },
  {
    id: 4,
    tarih: "15.03.2023",
    tutar: 30.75,
    urun: "Americano",
    sube: "Starbucks Etiler",
    logo: require("../../../../assets/assets/images/starbucks.png"),
  },
  {
    id: 5,
    tarih: "20.03.2023",
    tutar: 12.5,
    urun: "Espresso",
    sube: "Starbucks Akmerkez",
    logo: require("../../../../assets/assets/images/starbucks.png"),
  },
  {
    id: 6,
    tarih: "20.04.2023",
    tutar: 12.5,
    urun: "Netflix Premium",
    sube: "Netflix Türkiye",
    logo: require("../../../../assets/assets/images/netflix.png"),
  },
];

const cardData = [
  {
    id: 1,
    cardLogo: "STAR CARD",
    cardNumber: "1234 5678 9012 3456",
    cardExpiry: "08/25",
    cardHolder: "Hasan Gönen",
    cardBalance: 5000.0,
    cardBgColors: ["#77A1D3", "#D6A2E8", "#79CBCA"],
    cardIcon: <PaypassSvg width={50} height={35} />,
    cardMark: <MasterCardSvg width={50} height={35} />,
  },
  {
    id: 2,
    cardLogo: "STAR CARD",
    cardNumber: "2345 6789 0123 4567",
    cardExpiry: "12/24",
    cardHolder: "Ahmet Yılmaz",
    cardBalance: 250.5,
    cardBgColors: ["#D31027", "#EA384D", "#F5A9D0"],
    cardIcon: <PaypassSvg width={50} height={35} />,
    cardMark: <MasterCardSvg width={50} height={35} />,
  },
  {
    id: 3,
    cardLogo: "STAR CARD",
    cardNumber: "3456 7890 1234 5678",
    cardExpiry: "06/28",
    cardHolder: "Mehmet Kaya",
    cardBalance: 100.0,
    cardBgColors: ["#CC95C0", "#8CA6DB", "#7AA1D2"],
    cardIcon: <PaypassSvg width={50} height={35} />,
    cardMark: <VisaCardSvg width={50} height={35} />,
  },
];

const WalletScreen = ({ navigation }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const handleScroll = (event) => {
    const page = Math.round(
      event.nativeEvent.contentOffset.x /
        event.nativeEvent.layoutMeasurement.width
    );
    setCurrentPage(page);
  };
  const scrollViewRef = React.useRef();

  const [showModal, setShowModal] = useState(false);
  const [animation, setAnimation] = useState(new Animated.Value(0));

  const toggleModal = () => {
    if (showModal) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setShowModal(false));
    } else {
      setShowModal(true);
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const animatedStyles = {
    transform: [
      {
        scale: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        }),
      },
    ],
    opacity: animation,
  };


  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.cardContainer}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onMomentumScrollEnd={handleScroll}
        >
          {cardData.map((card, index) => (
            <View key={index} style={styles.card}>
              <LinearGradient
                colors={card.cardBgColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.background}
              />
              <View style={styles.cardTop}>
                <Text style={styles.cardLogo}>{card.cardLogo}</Text>
                {card.cardIcon}
              </View>
              <Text style={styles.cardBalance}>{card.cardBalance}</Text>

              <View style={styles.cardBody}>
                <View style={styles.cardExpiryContainer}>
                  <Text style={styles.cardNumber}>{card.cardNumber}</Text>
                  <Text style={styles.cardExpiry}>{card.cardExpiry}</Text>
                </View>
                <View style={styles.cardExpiryContainer}>
                  <Text style={styles.cardHolder}>{card.cardHolder}</Text>
                  {card.cardMark}
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={styles.cardIndicatorContainer}>
          {cardData.map((card, index) => (
            <View
              key={index}
              style={[
                styles.cardIndicator,
                {
                  backgroundColor:
                    index === currentPage ? "#00623B" : "#979797",
                },
              ]}
            />
          ))}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleModal}>
          <Ionicons name="qr-code-outline" size={45} color="#1FA2FF" />
        </TouchableOpacity>
        <Modal
        visible={showModal}
        animationType="none"
        transparent={true}
        onRequestClose={toggleModal}
      >
        <TouchableOpacity style={styles.modalContainer} onPress={toggleModal}>
          <Animated.View style={[styles.animatedView, animatedStyles]}>
            <View style={styles.modalHeader}>
              <QrSvg
                width={Dimensions.get("window").width - 100}
                height={Dimensions.get("window").width - 100}
              />
            </View>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
        <TouchableOpacity style={styles.button}>
          <GiftSvg width={44} height={44} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <NotificationSvg width={40} height={40} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <SettingsSvg width={40} height={40} />
        </TouchableOpacity>
      </View>

      <View style={styles.odemeGecmisi}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {mockData.map((item, index) => (
            <View key={index} style={styles.odemeKart}>
              <Image source={item.logo} style={styles.logo} />
              <View style={styles.odemeDetay}>
                <Text style={styles.tarih}>{item.tarih}</Text>
                <Text style={styles.urun}>{item.urun}</Text>
                <Text style={styles.sube}>{item.sube}</Text>
              </View>
              <Text style={styles.tutar}>
                ${"\t"}
                {item.tutar}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default WalletScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCFFFE",
  },
  cardContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: height * 0.01,
    alignSelf: "center",
    width: width * 0.92,
  },
  card: {
    borderRadius: 20,
    padding: width * 0.06,
    width: width * 0.9,
    height: height * 0.25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: width * 0.01,
  },
  cardBody: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardLogo: {
    fontSize: 24,
    fontWeight: "900",
    color: "#00623B",
  },
  cardBalance: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: height * 0.01,
  },
  cardNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
  },
  cardExpiryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: height * 0.02,
  },
  cardExpiryLabel: {
    color: "#555",
    fontSize: 12,
  },
  cardExpiry: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardHolder: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
  },
  background: {
    position: "absolute",
    padding: width * 0.02,
    width: width * 0.9,
    height: height * 0.25,
    borderRadius: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width * 0.9,
    alignSelf: "center",
    height: height * 0.13,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#EEEEEE",
    borderRadius: 20,
    alignItems: "center",
    width: width * 0.21,
    height: height * 0.1,
    justifyContent: "center",
  },
  odemeGecmisi: {
    backgroundColor: "#EEEEEE",
    width: width * 0.98,
    height: height * 0.4,
    alignSelf: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: width * 0.03,
    paddingBottom: height * 0.025,
  },
  odemeKart: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    borderRadius: 4,
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.01,
    marginBottom: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  logo: {
    width: width * 0.16,
    height: height * 0.08,
    marginRight: width * 0.04,
  },
  odemeDetay: {
    flex: 1,
    marginRight: width * 0.04,
  },
  tarih: {
    fontSize: 16,
    color: "#555",
    marginBottom: height * 0.01,
  },
  urun: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: height * 0.01,
  },
  sube: {
    fontSize: 16,
    color: "#555",
  },
  tutar: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00704A",
  },
  cardIndicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: height * 0.01,
  },
  cardIndicator: {
    width: width * 0.024,
    height: width * 0.024,
    borderRadius: width * 0.1,
    backgroundColor: "#00704A",
    marginHorizontal: width * 0.01,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  animatedView: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    elevation: 3,
  },
});
