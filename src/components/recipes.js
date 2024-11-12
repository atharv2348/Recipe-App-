import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

import MasonryList from "@react-native-seoul/masonry-list";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";
import Loading from "./loading";
import { useNavigation } from "@react-navigation/native";

export default function Recipes({ meals }) {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>Recipes</Text>
      {meals.length == 0 ? (
        <Loading size="large" style={{ marginTop: 100 }} />
      ) : (
        <MasonryList
          style={styles.masonry_list}
          data={meals}
          keyExtractor={(item) => item.idMeal}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, i }) => (
            <RecipeCard item={item} index={i} navigation={navigation} />
          )}
          onEndReachedThreshold={0.1}
        />
      )}
    </View>
  );
}

const RecipeCard = ({ item, index, navigation }) => {
  let isEven = index % 2 == 0;
  // console.log(item);

  return (
    <Animated.View
      style={styles.container}
      entering={FadeInDown.delay(index * 100)
        .duration(600)
        .springify()
        .damping(12)}
    >
      <Pressable
        style={{
          paddingLeft: isEven ? 0 : 8,
          paddingRight: isEven ? 8 : 0,
          marginBottom: 14,
        }}
        onPress={() => navigation.navigate("RecipeDetail", { ...item })}
      >
        {/* <Animated.View sharedTransitionTag={"unique"}> */}
        <Image
          sharedTransitionTag={item.strMeal}
          style={{
            width: "100%",
            height: index % 3 == 0 ? hp(25) : hp(35),
            borderRadius: 35,
          }}
          source={{ uri: item.strMealThumb }}
        />
        {/* </Animated.View> */}
        <Text style={styles.recipe_name}>
          {item.strMeal.length > 20
            ? item.strMeal.slice(0, 20) + "..."
            : item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 35,
  },
  title: {
    fontSize: hp(2.6),
    color: "#000000a0",
    fontWeight: "500",
    paddingLeft: wp(4),
  },
  masonry_list: {
    marginTop: 10,
    marginHorizontal: wp(4),
  },
  recipe_name: {
    fontSize: hp(1.5),
    marginTop: 12,
    fontWeight: "400",
  },
});
