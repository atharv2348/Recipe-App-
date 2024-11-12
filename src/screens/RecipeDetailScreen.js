import {
  StyleSheet,
  Text,
  ScrollView,
  Image,
  View,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  ChevronLeftIcon,
  ClockIcon,
  FireIcon,
} from "react-native-heroicons/outline";
import {
  HeartIcon,
  Square3Stack3DIcon,
  UsersIcon,
} from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Loading from "../components/loading";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function RecipeDetailScreen({ route }) {
  const item = route.params;
  //   console.log("......", item);

  const [isFavourite, setIsFavourite] = useState("false");
  const [mealData, setMealData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    getMealData();

    indegredientsIndexes();
  }, []);

  const getMealData = async () => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${item.idMeal}`
      );
      //   console.log("Got the meal data", response.data);

      if (response && response.data) {
        setMealData(response.data.meals[0]);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const indegredientsIndexes = () => {
    if (!mealData) return [];

    let indexArray = [];
    for (let i = 1; i <= 20; i++) {
      //   console.log(mealData["strIngredient" + i]);

      if (mealData["strIngredient" + i]) indexArray.push(i);
    }

    return indexArray;
  };
  if (loading)
    return (
      <Loading
        size="large"
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      />
    );
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      {/* Recipe image */}
      <View style={styles.image_container}>
        <Image
          sharedTransitionTag={item.strMeal}
          source={{ uri: mealData.strMealThumb }}
          style={styles.image}
        />
      </View>

      {/* Back and like button */}
      <View style={styles.header_icons}>
        <TouchableOpacity
          style={[styles.icon_wrapper, { marginLeft: wp(5) }]}
          onPress={() => navigation.goBack()}
        >
          <ChevronLeftIcon color={"#fbbf24"} size={hp(3.5)} strokeWidth={4.5} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.icon_wrapper, { marginRight: wp(5) }]}
          onPress={() => setIsFavourite(!isFavourite)}
        >
          <HeartIcon
            color={isFavourite ? "red" : "gray"}
            size={hp(3.5)}
            strokeWidth={4.5}
          />
        </TouchableOpacity>
      </View>

      {/* meal description */}

      {loading ? (
        <Loading size="large" />
      ) : (
        <View>
          {/* name and area */}
          <Animated.View
            entering={FadeInDown.delay(100).duration(1000).springify()}
            style={styles.name_area_container}
          >
            <Text style={styles.recipe_name}>{mealData.strMeal}</Text>
            <Text style={styles.recipe_area}>{mealData.strArea}</Text>
          </Animated.View>

          {/* miscellaneous info */}
          <Animated.View
            entering={FadeInDown.delay(200).duration(1000).springify()}
            style={styles.misc}
          >
            <View style={styles.misc_tile}>
              <View style={styles.misc_icon_wrapper}>
                <ClockIcon size={hp(4)} strokeWidth={2.5} color={"#525252"} />
              </View>
              <View style={styles.misc_data_wrapper}>
                <Text style={{ fontSize: hp(2), fontWeight: "bold" }}>35</Text>
                <Text style={{ fontSize: hp(1.3), fontWeight: "bold" }}>
                  min
                </Text>
              </View>
            </View>
            <View style={styles.misc_tile}>
              <View style={styles.misc_icon_wrapper}>
                <UsersIcon size={hp(4)} strokeWidth={2.5} color={"#525252"} />
              </View>
              <View style={styles.misc_data_wrapper}>
                <Text style={{ fontSize: hp(2), fontWeight: "bold" }}>03</Text>
                <Text style={{ fontSize: hp(1.3), fontWeight: "bold" }}>
                  servings
                </Text>
              </View>
            </View>
            <View style={styles.misc_tile}>
              <View style={styles.misc_icon_wrapper}>
                <FireIcon size={hp(4)} strokeWidth={2.5} color={"#525252"} />
              </View>
              <View style={styles.misc_data_wrapper}>
                <Text style={{ fontSize: hp(2), fontWeight: "bold" }}>103</Text>
                <Text style={{ fontSize: hp(1.3), fontWeight: "bold" }}>
                  Cal
                </Text>
              </View>
            </View>
            <View style={styles.misc_tile}>
              <View style={styles.misc_icon_wrapper}>
                <Square3Stack3DIcon
                  size={hp(4)}
                  strokeWidth={2.5}
                  color={"#525252"}
                />
              </View>
              <View style={styles.misc_data_wrapper}>
                <Text style={{ fontSize: hp(2), fontWeight: "bold" }}>
                  Easy
                </Text>
                <Text style={{ fontSize: hp(1.3), fontWeight: "bold" }}></Text>
              </View>
            </View>
          </Animated.View>
          {/* ingredients */}

          <Animated.View
            entering={FadeInDown.delay(300).duration(1000).springify()}
            style={{ marginHorizontal: wp(2) }}
          >
            <Text style={styles.title}>Ingredients</Text>

            {indegredientsIndexes().map((i) => {
              return (
                <View
                  key={i}
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: hp(1.4),
                  }}
                >
                  <View
                    style={{
                      height: hp(1.5),
                      width: hp(1.5),
                      borderRadius: 100,
                      backgroundColor: "rgb(252, 211, 77)",
                      marginHorizontal: 10,
                    }}
                  ></View>
                  <Text style={{ fontSize: hp(1.7), fontWeight: "bold" }}>
                    {mealData["strMeasure" + i] + " "}
                  </Text>
                  <Text style={{ fontSize: hp(1.7), fontWeight: "medium" }}>
                    {mealData["strIngredient" + i]}
                  </Text>
                </View>
              );
            })}
          </Animated.View>

          {/* instruction */}

          <View style={{ marginHorizontal: wp(2) }}>
            <Text style={styles.title}>Instruction</Text>
            <Text style={{ fontSize: hp(1.6), marginBottom: hp(2) }}>
              {mealData.strInstructions}
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image_container: {
    flexDirection: "row",
    justifyContent: "center",
  },
  image: {
    width: wp(98),
    height: hp(50),
    borderRadius: 35,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    marginTop: 5,
  },
  header_icons: {
    width: wp(100),
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: wp(5),
    marginTop: StatusBar.currentHeight + hp(1),
  },
  icon_wrapper: {
    backgroundColor: "white",
    padding: 5,
    borderRadius: 14,
  },
  name_area_container: {
    marginTop: hp(3),
    marginHorizontal: wp(2),
  },
  recipe_name: {
    fontWeight: "bold",
    fontSize: hp(3),
    color: "rgb(64, 64, 64)",
  },
  recipe_area: {
    fontWeight: "medium",
    fontSize: hp(2),
    marginVertical: 4,
    color: "rgb(115, 115, 115)",
  },
  misc: {
    justifyContent: "space-around",
    flexDirection: "row",
    marginTop: hp(2),
  },
  misc_tile: {
    backgroundColor: "rgb(252, 211, 77)",
    padding: 7,
    display: "flex",
    borderRadius: 100,
  },
  misc_icon_wrapper: {
    height: hp(6.5),
    width: hp(6.5),
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  misc_data_wrapper: {
    flex: 1,
    alignItems: "center",
    paddingVertical: hp(1),
  },
  title: {
    fontWeight: "bold",
    color: "rgb(64,64,64)",
    marginVertical: hp(2),
    fontSize: hp(2),
  },
});
