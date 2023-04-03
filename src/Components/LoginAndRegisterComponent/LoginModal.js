import React from "react";
import {
  Modal,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Text,
  Dimensions,

} from "react-native";
import { Foundation } from '@expo/vector-icons';

const { width, height } = Dimensions.get("window");


const LoginModal = ({ visible, onClose, message }) => {
  return (
    <Modal visible={visible} transparent={true}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
          <Foundation name="alert" size={30} color="#FF0000" />
            <Text style={styles.message}>Please do not leave blank!</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: height*0.02,
    borderRadius: 20,
    alignItems: "center",
  },
  message: {
    fontSize: 18,
    textAlign: "center",
  },
});

export default LoginModal;
