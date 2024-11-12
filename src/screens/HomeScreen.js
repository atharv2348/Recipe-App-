import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  BellIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/categories";
import axios from "axios";
import Recipes from "../components/recipes";
import { debounce } from "lodash";

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("Beef");
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [searchText, setSearchText] = useState([]);
  const [searchRecipe, setSearchRecipe] = useState([]);

  useEffect(() => {
    getCategories();
    getRecipes();
  }, []);

  const handleChangeCategory = (category) => {
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://themealdb.com/api/json/v1/1/categories.php"
      );
      if (response && response.data) {
        setCategories(response.data.categories);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = (value) => {
    if (value && value.length > 2) {
      getRecipesBySearch(value).then((result) => {
        if (result && result.meals) setSearchRecipe(result.meals);
      });
    }
  };

  const getRecipesBySearch = async (name) => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/search.php?s=${name}`
      );
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  // handleSearch will be called after 400ms
  const handelTextDebounce = useCallback(debounce(handleSearch, 400), []);

  const getRecipes = async (category = "Beef") => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );

      if (response && response.data) {
        setMeals(response.data.meals);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Avatar and bell icon */}
      <View style={styles.header}>
        <Image
          style={styles.avatar}
          source={require("../../assets/avatar.png")}
        />
        <BellIcon size={hp(4)} color={"gray"} />
      </View>

      {/* greeting and punchline */}
      <View>
        <Text style={styles.greetings}>Hello, Atharv!</Text>
        <Text style={styles.punchline}>Make your own food</Text>
        <Text style={styles.punchline}>
          stay at <Text style={{ color: "orange" }}>home</Text>
        </Text>
      </View>

      {/* searchbar */}
      <View style={styles.searchbarField}>
        <TextInput
          value={searchText}
          onChangeText={(value) => {
            setSearchText(value);
            handelTextDebounce(value);
          }}
          placeholder="Search any recipe"
          placeholderTextColor={"gray"}
          style={{ fontSize: hp(1.7), paddingLeft: 5 }}
        />
        <View style={styles.searchIconWrapper}>
          {searchText.length == 0 ? (
            <MagnifyingGlassIcon
              size={hp(2.5)}
              strokeWidth={3}
              color={"gray"}
            />
          ) : (
            <XMarkIcon
              onPress={() => {
                setSearchText("");
              }}
              size={hp(2.5)}
              strokeWidth={3}
              color={"gray"}
            />
          )}
        </View>
      </View>

      {/* categories */}
      {categories.length > 0 && searchText.length == 0 ? (
        <Categories
          categories={categories}
          activeCategory={activeCategory}
          handleChangeCategory={handleChangeCategory}
        />
      ) : null}
      {/* recipes */}

      {searchText.length > 0 && <Recipes meals={searchRecipe} />}

      {searchText.length == 0 && <Recipes meals={meals} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp(4),
  },
  avatar: {
    height: hp(8),
    width: hp(8),
  },
  greetings: {
    paddingHorizontal: wp(4),
    marginTop: hp(3),
    fontSize: 16,
  },
  punchline: {
    paddingHorizontal: wp(4),
    marginTop: hp(0.8),
    fontWeight: "600",
    fontSize: 32,
  },
  searchbarField: {
    marginHorizontal: wp(4),
    marginTop: hp(4),
    backgroundColor: "#00000013",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 100,
    flexDirection: "row",
    padding: 10,
  },
  searchIconWrapper: {
    padding: 8,
    borderRadius: 100,
    backgroundColor: "white",
  },
});
