import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { Sizes, Colors, Fonts } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { recommendedsList } from "../../components/recommendedList";
import { SharedElement } from "react-navigation-shared-element";

const popularPlacesList = [
  {
    id: "1",
    placeImage: require("../../assets/images/popular_places/Hunza.jpg"),
    placeName: "Hunza Valley",
  },
  {
    id: "2",
    placeImage: require("../../assets/images/popular_places/Murree.jpg"),
    placeName: "Murree",
  },
  {
    id: "3",
    placeImage: require("../../assets/images/popular_places/azadkashmir.jpg"),
    placeName: "Azad Kashmir",
  },
  {
    id: "4",
    placeImage: require("../../assets/images/popular_places/Lahore.jpg"),
    placeName: "Lahore",
  },
  {
    id: "5",
    placeImage: require("../../assets/images/popular_places/Islamabad.jpg"),
    placeName: "Islamabad",
  },
];

const popularExperiencesList = [
  {
    id: "1",
    experienceImage: require("../../assets/images/popular_experiences/popular_experiences_1.jpg"),
    rating: "4.7",
    experience: "Hotels In Hunza",
    amountPerPerson: 5000,
  },
  {
    id: "2",
    experienceImage: require("../../assets/images/popular_experiences/popular_experiences_2.jpg"),
    rating: "5.0",
    experience: "Best Hotels In Murree",
    amountPerPerson: 5000,
  },
  {
    id: "3",
    experienceImage: require("../../assets/images/popular_experiences/popular_experiences_3.jpg"),
    rating: "4.81",
    experience: "Best Hotels In Azad Kashmir",
    amountPerPerson: 3000,
  },
  {
    id: "4",
    experienceImage: require("../../assets/images/popular_experiences/popular_experiences_4.jpg"),
    rating: "5.0",
    experience: "Lahore",
  },
  {
    id: "5",
    experienceImage: require("../../assets/images/popular_experiences/popular_experiences_5.jpg"),
    rating: "4.96",
    experience: "Islam abad",
    from: "Photo shoot",
    amountPerPerson: 500,
  },
];

const { width } = Dimensions.get("screen");

const HomeScreen = ({ navigation }) => {
  const [state, setState] = useState({
    isSearch: false,
  });

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const { isSearch } = state;

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        navigation.push("HotelDetail", {
          item,
        })
      }
      style={styles.recommendedWrapStyle}
    >
      <SharedElement id={item.id}>
        <Image source={item.hotelImage} style={styles.recommendedImageStyle} />
      </SharedElement>
      <View style={styles.recommendedInfoWrapStyle}>
        <View
          style={{
            width: width / 1.7,
          }}
        >
          <Text numberOfLines={2} style={{ ...Fonts.blackColor18Regular }}>
            {item.hotelName}
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginVertical: Sizes.fixPadding - 5.0,
              alignItems: "center",
            }}
          >
            {showRating({ number: item.rating })}
            <Text
              style={{
                ...Fonts.grayColor15Regular,
                marginLeft: Sizes.fixPadding,
              }}
            >
              ({item.rating.toFixed(1)})
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialIcons
              name="location-on"
              size={16}
              color={Colors.grayColor}
            />
            <Text
              style={{
                ...Fonts.grayColor17Regular,
                marginLeft: Sizes.fixPadding - 3.0,
              }}
            >
              {item.place}
            </Text>
          </View>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ ...Fonts.primaryColor30Regular }}>
            pk{item.amount}
          </Text>
          <Text style={{ ...Fonts.primaryColor15Regular }}>per night</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ListHeaderComponent={
          <>
            {userWelcome()}
            {searchTextField()}
            {title({ title: "Popular Places" })}
            {popularPlaces()}
            {title({ title: "Popular Experiences" })}
            {popularExperiences()}
            {recommendedTitle()}
          </>
        }
        data={recommendedsList}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 8.0 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );

  function showRating({ number }) {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {number == 5.0 ||
        number == 4.0 ||
        number == 3.0 ||
        number == 2.0 ||
        number == 1.0 ? (
          <MaterialIcons name="star" size={24} color="#C0CA33" />
        ) : (
          <MaterialIcons name="star-outline" size={24} color="#C0CA33" />
        )}
        {number == 5.0 || number == 4.0 || number == 3.0 || number == 2.0 ? (
          <MaterialIcons name="star" size={24} color="#C0CA33" />
        ) : (
          <MaterialIcons name="star-outline" size={24} color="#C0CA33" />
        )}
        {number == 5.0 || number == 4.0 || number == 3.0 ? (
          <MaterialIcons name="star" size={24} color="#C0CA33" />
        ) : (
          <MaterialIcons name="star-outline" size={24} color="#C0CA33" />
        )}
        {number == 5.0 || number == 4.0 ? (
          <MaterialIcons name="star" size={24} color="#C0CA33" />
        ) : (
          <MaterialIcons name="star-outline" size={24} color="#C0CA33" />
        )}
        {number == 5.0 ? (
          <MaterialIcons name="star" size={24} color="#C0CA33" />
        ) : (
          <MaterialIcons name="star-outline" size={24} color="#C0CA33" />
        )}
      </View>
    );
  }

  function recommendedTitle() {
    return (
      <Text
        style={{
          ...Fonts.blackColor20Bold,
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginVertical: Sizes.fixPadding * 2.0,
        }}
      >
        Recommended
      </Text>
    );
  }

  function popularExperiences() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.9}
        // onPress={() => navigation.navigate('PopularExperience', {
        //     item
        // })}
        style={{
          width: 155.0,
          marginRight: Sizes.fixPadding + 2.0,
        }}
      >
        <Image
          source={item.experienceImage}
          style={styles.experiencesImageWrapStyle}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <MaterialIcons name="star" size={17} color="#C0CA33" />
          <Text
            style={{
              ...Fonts.blackColor15Regular,
              marginLeft: Sizes.fixPadding - 5.0,
            }}
          >
            {item.rating}
          </Text>
        </View>
        <Text numberOfLines={2} style={{ ...Fonts.blackColor18Regular }}>
          {item.experience}
        </Text>
        <Text style={{ ...Fonts.blackColor16Regular }}>
          From pkr{item.amountPerPerson}/person
        </Text>
      </TouchableOpacity>
    );

    return (
      <View>
        <FlatList
          horizontal
          data={popularExperiencesList}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingLeft: Sizes.fixPadding * 2.0,
            paddingRight: Sizes.fixPadding - 2.0,
          }}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }

  function popularPlaces() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() =>
          navigation.push("PopularPlace", {
            place: item.placeName,
          })
        }
      >
        <ImageBackground
          source={item.placeImage}
          style={styles.placesImageWrapStyle}
          borderRadius={Sizes.fixPadding + 7.0}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={[
              "transparent",
              "transparent",
              "transparent",
              "rgba(0,0,0,0.4)",
              "rgba(0,0,0,0.6)",
              "rgba(0,0,0,0.7)",
            ]}
            style={styles.placesImageShadowWrapStyle}
          >
            <Text style={{ ...Fonts.whiteColor17Regular }}>
              {item.placeName}
            </Text>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    );
    return (
      <View>
        <FlatList
          horizontal
          data={popularPlacesList}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingLeft: Sizes.fixPadding * 2.0,
            paddingRight: Sizes.fixPadding,
          }}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }

  function title({ title }) {
    return (
      <View style={styles.titleWrapStyle}>
        <Text style={{ ...Fonts.blackColor20Bold }}>{title}</Text>
        <Text style={{ ...Fonts.grayColor15Regular }}>View all</Text>
      </View>
    );
  }

  function searchTextField() {
    return (
      <View style={styles.searchFieldWrapStyle}>
        <MaterialIcons
          name="search"
          size={24}
          color={isSearch ? Colors.primaryColor : "gray"}
        />
        <TextInput
          placeholder="Search city,hotel,etc"
          style={{
            flex: 1,
            marginLeft: Sizes.fixPadding,
            ...Fonts.blackColor18Regular,
          }}
          selectionColor={Colors.primaryColor}
          onFocus={() => updateState({ isSearch: true })}
          onBlur={() => updateState({ isSearch: false })}
        />
      </View>
    );
  }

  function userWelcome() {
    return (
      <View style={styles.userWelcomeWrapStyle}>
        <View>
          <Text style={{ ...Fonts.grayColor15Regular }}>Hello,</Text>
          <Text style={{ ...Fonts.blackColor30Bold }}>Ali</Text>
        </View>
        <Image
          source={require("../../assets/images/javed.iqbal.png")}
          style={{
            height: 50.0,
            width: 50.0,
            borderRadius: Sizes.fixPadding + 10.0,
          }}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  searchFieldWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Sizes.fixPadding * 2.0,
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding + 5.0,
    height: 55.0,
    borderColor: Colors.grayColor,
    borderWidth: 1.0,
    paddingLeft: Sizes.fixPadding * 3.0,
  },
  userWelcomeWrapStyle: {
    flexDirection: "row",
    marginVertical: Sizes.fixPadding * 3.0,
    justifyContent: "space-between",
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
  titleWrapStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: Sizes.fixPadding * 2.0,
  },
  placesImageWrapStyle: {
    width: 155.0,
    height: 180.0,
    justifyContent: "flex-end",
    marginRight: Sizes.fixPadding,
  },
  placesImageShadowWrapStyle: {
    width: 155.0,
    height: 180.0,
    justifyContent: "flex-end",
    borderRadius: Sizes.fixPadding + 7.0,
    paddingVertical: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding * 2.0,
  },
  experiencesImageWrapStyle: {
    width: 155.0,
    height: 180.0,
    marginRight: Sizes.fixPadding + 2.0,
    borderRadius: Sizes.fixPadding + 7.0,
    marginBottom: Sizes.fixPadding,
  },
  recommendedWrapStyle: {
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding + 7.0,
    elevation: 2.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding * 2.0,
  },
  recommendedImageStyle: {
    height: 200.0,
    width: "100%",
    borderTopLeftRadius: Sizes.fixPadding + 7.0,
    borderTopRightRadius: Sizes.fixPadding + 7.0,
  },
  recommendedInfoWrapStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Sizes.fixPadding + 5.0,
  },
});

export default HomeScreen;
