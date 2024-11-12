import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// import axios from "axios";
import React, { useEffect, useState } from "react";
import { categoryData } from "../constants";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function Categories({
  categories,
  activeCategory,
  handleChangeCategory,
}) {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ marginHorizontal: 4 }}
      >
        {categories.map((cat, index) => {
          let isActive = cat.strCategory === activeCategory;
          let activeButtonClass = isActive ? "#ffa60099" : "#80808021";
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleChangeCategory(cat.strCategory)}
              style={{ marginVertical: 20, alignItems: "center" }}
            >
              <View
                style={{
                  borderRadius: 100,
                  padding: 8,
                  marginHorizontal: 10,
                  backgroundColor: activeButtonClass,
                }}
              >
                <Image
                  style={{ height: hp(6), width: hp(6), borderRadius: 100 }}
                  source={{ uri: cat.strCategoryThumb }}
                />
              </View>
              <Text>{cat.strCategory}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({});
