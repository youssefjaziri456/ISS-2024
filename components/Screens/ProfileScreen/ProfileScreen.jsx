import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS, SIZES, images } from "../../../constants";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { photos } from "../../../constants/data";

const PhotosRoutes = () => (
  <View style={{ flex: 1 }}>
    <FlatList
      data={photos}
      numColumns={3}
      renderItem={({ item, index }) => (
        <View
          style={{
            flex: 1,
            aspectRatio: 1,
            margin: 3,
          }}
        >
          <Image
            key={index}
            source={item}
            style={{ width: "100%", height: "100%", borderRadius: 12 }}
          />
        </View>
      )}
    />
  </View>
);

const LikesRoutes = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: "pink",
    }}
  />
);

const renderScene = SceneMap({
  first: PhotosRoutes,
  second: LikesRoutes,
});

const Profile = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: "first", title: "Photos" },
    { key: "second", title: "Likes" },
  ]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: COLORS.primary,
      }}
      style={{
        backgroundColor: COLORS.white,
        height: 44,
      }}
      renderLabel={({ focused, route }) => (
        <Text style={[{ color: focused ? COLORS.black : COLORS.gray }]}>
          {route.title}
        </Text>
      )}
    />
  );
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <StatusBar backgroundColor={"pink"} />
      <View style={{ width: "100%" }}>
        <Image
          source={images.cover}
          resizeMode="cover"
          style={{
            height: 228,
            width: "100%",
          }}
        />
      </View>

      <View style={{ flex: 1, alignItems: "center" }}>
        <Image
          source={images.profile}
          resizeMode="contain"
          style={{
            height: 155,
            width: 155,
            borderRadius: 999,
            borderColor: "pink",
            borderWidth: 2,
            marginTop: -90,
          }}
        />

        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.primary,
            marginVertical: 8,
          }}
        >
          Lilly 
        </Text>
        <Text
          style={{
            color: COLORS.black,
            ...FONTS.body4,
          }}
        >
          Puppy
        </Text>

        <View
          style={{
            flexDirection: "row",
            marginVertical: 6,
            alignItems: "center",
          }}
        >
          <MaterialIcons name="location-on" size={24} color="pink" />
          <Text
            style={{
              ...FONTS.body4,
              marginLeft: 4,
            }}
          >
            Tunis, Tunisia.
          </Text>
        </View>

        <View
          style={{
            paddingVertical: 8,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              marginHorizontal: SIZES.padding,
            }}
          >
            <Text
              style={{
                ...FONTS.h2,
                color: COLORS.primary,
              }}
            >
              0
            </Text>
            <Text
              style={{
                ...FONTS.body4,
                color: COLORS.primary,
              }}
            >
              Followers
            </Text>
          </View>

          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              marginHorizontal: SIZES.padding,
            }}
          >
            <Text
              style={{
                ...FONTS.h2,
                color: COLORS.primary,
              }}
            >
              0
            </Text>
            <Text
              style={{
                ...FONTS.body4,
                color: COLORS.primary,
              }}
            >
              Followings
            </Text>
          </View>

          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              marginHorizontal: SIZES.padding,
            }}
          >
            <Text
              style={{
                ...FONTS.h2,
                color: COLORS.primary,
              }}
            >
              0
            </Text>
            <Text
              style={{
                ...FONTS.body4,
                color: COLORS.primary,
              }}
            >
              Likes
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              width: 124,
              height: 36,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "pink",
              borderRadius: 10,
              marginHorizontal: SIZES.padding * 2,
            }}
          >
            <Text
              style={{
                ...FONTS.body4,
                color: COLORS.white,
              }}
            >
              Edit Profile
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: 124,
              height: 36,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "pink",
              borderRadius: 10,
              marginHorizontal: SIZES.padding * 2,
            }}
          >
            <Text
              style={{
                ...FONTS.body4,
                color: COLORS.white,
              }}
            >
              Add Friend
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 0.75, marginHorizontal: 22, marginTop: 20 }}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={renderTabBar}
        />
      </View>
    </SafeAreaView>
  );
};

export default Profile;