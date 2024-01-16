import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import Carousel, { Pagination } from "react-native-snap-carousel-v4";
import { LinearGradient } from "expo-linear-gradient";
import { SharedElement } from "react-navigation-shared-element";
import { recommendedsList } from "../../components/recommendedList";

const { width } = Dimensions.get("screen");

const placeImagesList = [
  {
    image: require("../../assets/images/top_destination/top_destination_1.jpg"),
  },
  {
    image: require("../../assets/images/top_destination/top_destination_2.jpg"),
  },
  {
    image: require("../../assets/images/top_destination/top_destination_3.jpg"),
  },
];

const PopularPlaceScreen = ({ navigation, route }) => {
  const place = route.params.place;

  const [state, setState] = useState({
    places: placeImagesList,
    activeSlide: 0,
  });

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const { places, activeSlide } = state;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
      <View>
        {header()}
        <FlatList
          ListHeaderComponent={
            <>
              {placeImages()}
              {placeInfo()}
              {categoryInfo()}
            </>
          }
          showsVerticalScrollIndicator={false}
          data={recommendedsList}
          keyExtractor={(item) => `${item.id}`}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 8.0 }}
        />
      </View>
    </SafeAreaView>
  );

  function categoryInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginBottom: Sizes.fixPadding * 3.0,
        }}
      >
        <Text style={{ ...Fonts.blackColor20Bold }}>Category</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {category({
            icon: require("../../assets/images/icons/camera.png"),
            name: "Photography",
          })}
          {category({
            icon: require("../../assets/images/icons/wifi.png"),
            name: "Wifi",
          })}
          {category({
            icon: require("../../assets/images/icons/tour.png"),
            name: "Tour",
          })}
          {category({
            icon: require("../../assets/images/icons/travel.png"),
            name: "Travel",
          })}
        </View>
        <Text
          style={{
            ...Fonts.blackColor20Bold,
            marginTop: Sizes.fixPadding * 3.0,
          }}
        >
          Hotel
        </Text>
        <Image
          source={require("../../assets/images/hotel/hotel_1.jpg")}
          style={{ flex: 1, width: 320, height: 200, borderRadius: 10 }}
          resizeMode="cover"
        />
        <Text style={{ ...Fonts.grayColor19Regular, textAlign: "justify" }}>
          Luxus Hunza Attabad Lake Resort
        </Text>
      </View>
    );
  }

  function category({ icon, name }) {
    return (
      <View
        style={{
          alignItems: "center",
          marginTop: Sizes.fixPadding + 5.0,
        }}
      >
        <Image source={icon} style={{ width: 40.0, height: 40.0 }} />
        <Text
          style={{
            ...Fonts.blackColor14Regular,
            marginTop: Sizes.fixPadding - 5.0,
          }}
        >
          {name}
        </Text>
      </View>
    );
  }

  function placeInfo() {
    return (
      <View
        style={{
          marginBottom: Sizes.fixPadding * 3.0,
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginTop: Sizes.fixPadding,
        }}
      >
        <Text
          style={{
            ...Fonts.blackColor20Bold,
            marginVertical: Sizes.fixPadding,
          }}
        >
          {place}
        </Text>
        <Text style={{ ...Fonts.grayColor16Regular, textAlign: "justify" }}>
          Hunza Valley is a breathtakingly beautiful region located in the
          Gilgit-Baltistan region of Pakistan. Nestled in the Karakoram Mountain
          Range, it is often referred to as "Heaven on Earth" due to its
          awe-inspiring landscapes, crystal-clear rivers, and snow-capped peaks.
        </Text>
      </View>
    );
  }

  function placeImages() {
    return (
      <View>
        <Carousel
          data={places}
          sliderWidth={width}
          autoplay={true}
          loop={true}
          autoplayInterval={4000}
          itemWidth={width}
          renderItem={_renderItem}
          onSnapToItem={(index) => updateState({ activeSlide: index })}
        />
        {pagination()}
      </View>
    );
  }

  function _renderItem({ item, index }) {
    return (
      <View>
        <ImageBackground
          source={item.image}
          style={{
            width: width,
            height: 230.0,
          }}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={[
              "transparent",
              "transparent",
              "transparent",
              "transparent",
              "transparent",
              "rgba(255,255,255,0.8)",
              "rgba(255,255,255,0.99)",
            ]}
            style={{
              width: width,
              height: 230.0,
            }}
          ></LinearGradient>
        </ImageBackground>
      </View>
    );
  }

  function pagination() {
    return (
      <Pagination
        dotsLength={places.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.sliderPaginationWrapStyle}
        dotStyle={styles.sliderActiveDotStyle}
        inactiveDotStyle={styles.sliderInactiveDotStyle}
      />
    );
  }

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <Text style={{ ...Fonts.blackColor20Regular }}>{place}</Text>
        <MaterialIcons
          name="arrow-back"
          size={24}
          color="black"
          style={{
            position: "absolute",
            left: 20.0,
          }}
          onPress={() => navigation.pop()}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  headerWrapStyle: {
    backgroundColor: Colors.whiteColor,
    alignItems: "center",
    justifyContent: "center",
    height: 60.0,
  },
  sliderActiveDotStyle: {
    width: 12,
    height: 12,
    borderRadius: 6.0,
    backgroundColor: Colors.whiteColor,
    marginHorizontal: Sizes.fixPadding - 15.0,
  },
  sliderInactiveDotStyle: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: Colors.primaryColor,
  },
  sliderPaginationWrapStyle: {
    position: "absolute",
    bottom: -20.0,
    left: 0.0,
    right: 0.0,
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

export default PopularPlaceScreen;
