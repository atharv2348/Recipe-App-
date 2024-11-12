import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);

  const navigation = useNavigation();

  useEffect(() => {
    ring1padding.value = 0;
    ring2padding.value = 0;
    setTimeout(
      () => (ring1padding.value = withSpring(ring1padding.value + hp(5))),
      100
    );
    setTimeout(
      () => (ring2padding.value = withSpring(ring2padding.value + hp(5.5))),
      300
    );
    setTimeout(() => navigation.replace("Home"), 2500);
  }, []);

  return (
    <View style={styles.container}>
      {/* <StatusBar style="dark" /> */}
      {/* logo image with rings */}
      <Animated.View style={[styles.ring1, { padding: ring1padding }]}>
        <Animated.View style={[styles.ring1, { padding: ring2padding }]}>
          <Image
            style={styles.logo}
            source={require("../../assets/app_logo.png")}
          />
        </Animated.View>
      </Animated.View>

      {/* App name and puchline */}
      <Text style={styles.title}>Foody</Text>
      <Text style={styles.punchline}>Food is always right!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffa600",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: hp(20),
    height: hp(20),
  },
  ring1: {
    backgroundColor: "#ffffff56",
    borderRadius: 200,
  },
  ring2: {
    backgroundColor: "#ffffff8e",
    borderRadius: 200,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
    letterSpacing: 3,
    marginTop: hp(3),
  },
  punchline: {
    color: "white",
    letterSpacing: 1,
    marginTop: hp(1),
  },
});
