import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";

const { width } = Dimensions.get("window");

export default function ProductDetailsScreen({ route, navigation }) {
  const product = route?.params?.product;
  const dispatch = useDispatch();


  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("#d2a48c");
  const [showDescription, setShowDescription] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  useEffect(() => {
    console.log("Product;", product)
  }, [])
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>

          <Image
            source={{ uri: product?.images[0] }}
            style={styles.image}
          />

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
          >
            <Image
              source={require("../../assets/icons/backIconDark.png")}
              style={styles.iconback}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.heartBtn}>
            <Image
              source={require("../../assets/icons/heart.png")}
              style={styles.iconheart}
            />
          </TouchableOpacity>

        </View>


        <View style={styles.detailsContainer}>
          <View style={styles.rowBetween}>
            <Text style={styles.title}>{product?.title}</Text>
            <Text style={styles.price}>$ {product?.price}</Text>
          </View>

       
          <View style={styles.ratingRow}>
            <Text style={styles.rating}>⭐ 4.9</Text>
            <Text style={styles.reviewCount}>(83)</Text>
          </View>

   
          <Text style={styles.label}>Color</Text>
          <View style={styles.colorRow}>
            {["#d2a48c", "#000", "#ff6b6b"].map(color => (
              <TouchableOpacity
                key={color}
                onPress={() => setSelectedColor(color)}
                style={[
                  styles.colorCircle,
                  { backgroundColor: color },
                  selectedColor === color && styles.colorSelected
                ]}
              />
            ))}
          </View>

          <Text style={styles.label}>Size</Text>
          <View style={styles.sizeRow}>
            {["S", "M", "L"].map(size => (
              <TouchableOpacity
                key={size}
                onPress={() => setSelectedSize(size)}
                style={[
                  styles.sizeBox,
                  selectedSize === size && styles.sizeSelected
                ]}
              >
                <Text
                  style={[
                    styles.sizeText,
                    selectedSize === size && { color: "#000" }
                  ]}
                >
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>


          <TouchableOpacity
            style={styles.expandRow}
            onPress={() => setShowDescription(!showDescription)}
          >
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={styles.expandTitle}>Description</Text>
              {!showDescription && (
                <Image
                  source={require("../../assets/icons/rightArrow.png")}
                  style={styles.arrowIcon}
                />
              )}
            </View>

          </TouchableOpacity>

          {showDescription && (
            <Text style={styles.description}>
              {product.description}
            </Text>
          )}

          <View style={styles.divider} />

   
          <TouchableOpacity
            style={styles.expandRow}
            onPress={() => setShowReviews(!showReviews)}
          >
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={styles.expandTitle}>Reviews</Text>

              {!showReviews && (
                <Image
                  source={require("../../assets/icons/rightArrow.png")}
                  style={styles.arrowIcon}
                />
              )}
            </View>
          </TouchableOpacity>

          {showReviews && (
            <Text style={styles.reviewText}>
              ⭐ 4.9 out of 5 (47 Reviews)
            </Text>
          )}

        
          <Text style={styles.label}>Similar Product</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {product?.images?.map((img, index) => (
              <View key={index} style={styles.similarCard}>

                <Image
                  source={{ uri: img }}
                  style={styles.similarImage}
                  resizeMode="cover"
                />

                <Text style={{ color: "#fff" }}>
                  $ {product.price}
                </Text>

              </View>
            ))}
          </ScrollView>


        </View>
      </ScrollView>


      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          dispatch(
            addToCart({
              id: product.id,
              title: product.title,
              price: product.price,
              image: product.images?.[0],
              size: selectedSize,
              color: selectedColor,
              quantity: 1,
            })
          );

          navigation.navigate("CartScreen");
        }}
      >
        <Image source={require("../../assets/icons/cart.png")} />
        <Text style={styles.buttonText}> Add To Cart</Text>
      </TouchableOpacity>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  expandTitle: {
    color: "white",
  },
  expandRow: {
    paddingVertical: 5,
    marginVertical: 5
  },
  image: {
    width: width,
    height: 420,
    resizeMode: "cover",
  },

  detailsContainer: {
    backgroundColor: "#111",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    marginTop: -30,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  price: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  ratingRow: {
    flexDirection: "row",
    marginVertical: 8,
  },

  rating: { color: "#4CAF50" },
  reviewCount: { color: "#aaa", marginLeft: 5 },

  label: {
    color: "#fff",
    marginTop: 15,
    marginBottom: 8,
    fontWeight: "600",
  },

  colorRow: { flexDirection: "row" },

  colorCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 10,
  },

  colorSelected: {
    borderWidth: 2,
    borderColor: "#fff",
  },

  sizeRow: { flexDirection: "row" },

  sizeBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#222",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  sizeSelected: {
    backgroundColor: "#fff",
  },

  sizeText: {
    color: "#fff",
  },

  description: {
    color: "#aaa",
    lineHeight: 20,
  },

  reviewText: {
    color: "#aaa",
  },

  similarCard: {
    width: 120,
    marginRight: 12,
  },

  similarImage: {
    height: 120,
    backgroundColor: "#333",
    borderRadius: 12,
    marginBottom: 5,
  },

  button: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    margin: 15,
  },

  buttonText: {
    color: "#000",
    fontWeight: "600",
    marginLeft: 5,
  },
  arrowIcon: {
    color: 'white'
  },
  imageContainer: {
    position: "relative",
  },

  backBtn: {
    position: "absolute",
    top: 30,
    left: 20,
    width: 36,
    height: 36,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  heartBtn: {
    position: "absolute",
    top: 30,
    right: 20,
    width: 32,
    height: 32,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  iconheart: {
    width: 32,
    height: 32,

  },
  iconback: {
    width: 36,
    height: 36,

  },
})


