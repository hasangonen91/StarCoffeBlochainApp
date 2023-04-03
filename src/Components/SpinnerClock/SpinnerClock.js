import SandClockSvg from "../../../assets/assets/icons/sandclock.svg";
import React, { useState, useEffect } from 'react';
import { Modal, View, Animated, Easing } from 'react-native';


const SpinnerClock = ({ visible, onClose, message }) => {
  const [showSpinner, setShowSpinner] = useState(false);
  const [rotation] = useState(new Animated.Value(0));

  useEffect(() => {
    let timer;
    if (visible) {
      setShowSpinner(true);
      timer = setTimeout(() => {
        setShowSpinner(false);
        onClose();
      }, 5000);

      // Rotate the spinner continuously
      Animated.loop(
        Animated.timing(rotation, {
          toValue: 1,
          duration: 5000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    } else {
      setShowSpinner(false);
      clearTimeout(timer);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [visible, onClose]);

  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.modalOverlay}>
        {showSpinner && (
          <View style={styles.modalContainer}>
            <Animated.View
              style={[
                styles.spinner,
                {
                  transform: [
                    {
                      rotate:
                        rotation.interpolate({
                          inputRange: [0, 1],
                          outputRange: ['0deg', '360deg'],
                        }),
                    },
                  ],
                },
              ]}
            >
              <SandClockSvg />
            </Animated.View>
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = {
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  spinner: {
    width: 50,
    height: 50,
  },
};

export default SpinnerClock;