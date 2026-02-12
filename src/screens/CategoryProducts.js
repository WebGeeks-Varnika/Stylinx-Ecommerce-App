import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  SafeAreaView,
  Dimensions, TouchableOpacity
} from "react-native";
import { useSelector } from "react-redux";

const { width } = Dimensions.get("window");

export default function CategoryProducts({ navigation }) {
  const { products, loading } = useSelector(
    state => state.products
  );
  useEffect(() => {
    console.log("product ".products)
  }, [])
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={{ color: "#fff", textAlign: "center" }}>
          Loading...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0E0E0E" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 15,
          paddingVertical: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: "#1c1f26",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image source={require('../assets/icons/backIconDark.png')} style={{ height: "18", width: 18 }} />
        </TouchableOpacity>

        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>
          Category Products
        </Text>


        <View style={{ width: 36 }} />
      </View>

      {products.length > 0 ? <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ padding: 10 }}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "#2a2d35",
              marginBottom: 12,
              borderRadius: 12,
              overflow: "hidden",
            }}
          >

            <Image
              source={{ uri: item?.images[0] }}
              style={{
                width: "100%",
                height: 180,
              }}
              resizeMode="cover"
            />


            <View style={{ padding: 10 }}>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: "600",
                }}
                numberOfLines={2}
              >
                {item.title}
              </Text>

              <Text
                style={{
                  color: "#fff",
                  marginTop: 4,
                  fontWeight: "bold",
                }}
              >
                $ {item.price}
              </Text>
            </View>
          </View>
        )}
      />
        :
        <Text style={{
          color: "#888",
          textAlign: "center",
          marginTop: 50,
        }}>
          No item found
        </Text>

      }
    </SafeAreaView>
  );
}
