import React, { useEffect, useState,useRef } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/slices/categorySlice.js";
import {
  searchProducts,
  filterProductsByCategory,
  fetchProducts,
  filterProductsByPriceRange,
  filterProductsByPrice
} from "../../redux/slices/productSlice";
import { Modal } from "react-native";
export default function DiscoverScreen({ navigation }) {
  const dispatch = useDispatch();
  const { categories } = useSelector(state => state.categories);


  const [search, setSearch] = useState("");
  const [recentSearches, setRecentSearches] = useState([
    "Sunglasses",
    "Sweater",
    "Hoodie",
  ]);

  const [filterVisible, setFilterVisible] = useState(false);
const [minPrice, setMinPrice] = useState("");
const [maxPrice, setMaxPrice] = useState("");
const [price, setPrice] = useState("");
const { products } = useSelector(state => state.products);
const searchTimeout = useRef(null);

const showProducts = search.length > 2 && products.length > 0;
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#0E0E0E", padding: 15 }}>

    
      <Text style={{ color: "#fff", fontSize: 20, textAlign: "center" }}>
        Discover
      </Text>

   
      <View style={{flexDirection:"row",justifyContent:"space-around",alignItems:"center"}}>
      <View style={{
        backgroundColor: "#1c1f26",
        borderRadius: 30,
        width:"80%"
      }}>
        <TextInput
  placeholder="Search"
  placeholderTextColor="#888"
  value={search}
 onChangeText={(text) => {
  setSearch(text);

  if (searchTimeout.current) {
    clearTimeout(searchTimeout.current);
  }

  if (text.length === 0) {
    dispatch(fetchProducts());
    return;
  }

  searchTimeout.current = setTimeout(() => {
    if (text.length > 2) {
      dispatch(searchProducts(text));

      setRecentSearches(prev =>
        [...new Set([text, ...prev])].slice(0, 5)
      );
    }
  }, 500); 
}}

  style={{ color: "#fff", height: 45 }}
/>
{/* <Modal visible={filterVisible} transparent animationType="slide">
  <View style={{
    flex:1,
    justifyContent:"flex-end",
    backgroundColor:"rgba(0,0,0,0.5)"
  }}>

    <View style={{
      backgroundColor:"#1c1f26",
      padding:20,
      borderTopLeftRadius:20,
      borderTopRightRadius:20
    }}>

      <Text style={{color:"#fff", fontSize:18}}>
        Filter by Price
      </Text>

      <TextInput
        placeholder="Min Price"
        placeholderTextColor="#888"
        value={minPrice}
        onChangeText={setMinPrice}
        style={{color:"#fff", borderBottomWidth:1, marginTop:10}}
      />

      <TextInput
        placeholder="Max Price"
        placeholderTextColor="#888"
        value={maxPrice}
        onChangeText={setMaxPrice}
        style={{color:"#fff", borderBottomWidth:1, marginTop:10}}
      />

      <TouchableOpacity
        style={{
          backgroundColor:"#fff",
          padding:15,
          borderRadius:25,
          marginTop:20
        }}
        onPress={() => {
          dispatch(
            filterProductsByPriceRange({
              min: minPrice,
              max: maxPrice,
            })
          );
          setFilterVisible(false);
          navigation.navigate("CategoryProducts");
        }}
      >
        <Text style={{textAlign:"center"}}>Apply Filter</Text>
      </TouchableOpacity>

    </View>
  </View>
</Modal> */}
<Modal visible={filterVisible} transparent animationType="slide">
  <View style={{
    flex:1,
    justifyContent:"flex-end",
    backgroundColor:"rgba(0,0,0,0.5)"
  }}>

    <View style={{
      backgroundColor:"#1c1f26",
      padding:20,
      borderTopLeftRadius:20,
      borderTopRightRadius:20
    }}>

      <Text style={{color:"#fff", fontSize:18}}>
        Filter Products
      </Text>

  
      <TextInput
        placeholder="Exact Price"
        placeholderTextColor="#888"
        value={price}
        onChangeText={setPrice}
        style={{color:"#fff", borderBottomWidth:1, marginTop:10}}
      />

     
      <TextInput
        placeholder="Min Price"
        placeholderTextColor="#888"
        value={minPrice}
        onChangeText={setMinPrice}
        style={{color:"#fff", borderBottomWidth:1, marginTop:10}}
      />

      <TextInput
        placeholder="Max Price"
        placeholderTextColor="#888"
        value={maxPrice}
        onChangeText={setMaxPrice}
        style={{color:"#fff", borderBottomWidth:1, marginTop:10}}
      />

      <TouchableOpacity
        style={{
          backgroundColor:"#fff",
          padding:15,
          borderRadius:25,
          marginTop:20
        }}
        onPress={() => {

          if (price !== "") {
            dispatch(filterProductsByPrice(price));
          } else {
            dispatch(
              filterProductsByPriceRange({
                min: minPrice,
                max: maxPrice,
              })
            );
          }

          setFilterVisible(false);
          navigation.navigate("CategoryProducts");
        }}
      >
        <Text style={{textAlign:"center"}}>Apply Filter</Text>
      </TouchableOpacity>

    </View>
  </View>
</Modal>

      </View>
<TouchableOpacity onPress={() => setFilterVisible(true)}>
  <Image source={require('../../assets/icons/Filter.png')} style={{height:30,width:30,tintColor:"white"}}/>
</TouchableOpacity>
</View>
   
      <Text style={{ color: "#fff", marginTop: 20 }}>
        Recent Searches
      </Text>


      <FlatList
        horizontal
        data={recentSearches}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={{
            backgroundColor: "#1c1f26",
            paddingHorizontal: 15,
            paddingVertical: 1,
            borderRadius: 20,
            marginRight: 10,
            marginTop: 1,
            height:30
          }}>
            <Text style={{ color: "#fff" }}>{item}</Text>
          </View>
        )}
      />

      {showProducts ? (

  <FlatList
    data={products}
    keyExtractor={(item) => item.id.toString()}
    style={{ marginTop: 20 }}
    renderItem={({ item }) => (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ProductDetails", { product: item })
        }
        style={{
          flexDirection: "row",
          backgroundColor: "#2a2d35",
          marginBottom: 12,
          borderRadius: 12,
          padding: 10,
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: item?.images[0] }}
          style={{
            width: 70,
            height: 70,
            borderRadius: 10,
            marginRight: 10,
          }}
        />

        <View style={{ flex: 1 }}>
          <Text style={{ color: "#fff" }} numberOfLines={2}>
            {item?.title}
          </Text>

          <Text style={{ color: "#fff", marginTop: 4 }}>
            $ {item?.price}
          </Text>
        </View>
      </TouchableOpacity>
    )}
  />

) : (

  <FlatList
    data={categories}
    keyExtractor={(item) => item.id.toString()}
    style={{ marginTop: 20 }}
    renderItem={({ item }) => (
      <TouchableOpacity
        onPress={() => {
          dispatch(filterProductsByCategory(item.id));
          navigation.navigate("CategoryProducts");
        }}
        style={{
          height: 120,
          borderRadius: 20,
          backgroundColor: "#2a2d35",
          marginBottom: 15,
          justifyContent: "center",
          paddingLeft: 20,
        }}
      >
        <Text style={{
          color: "#fff",
          fontSize: 18,
          fontWeight: "600",
        }}>
          {item.name.toUpperCase()}
        </Text>

        <Image
          source={{ uri: item.image }}
          style={{
            position: "absolute",
            right: 10,
            bottom: 0,
            width: 120,
            height: 120,
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    )}
  />

)}

    </View>
  );
}
