import React, { useEffect,useState,useCallback  } from 'react';
import { View, FlatList, ActivityIndicator, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/slices/productSlice';
import ProductCard from './ProductDetails'
import CustomMenu from '../../navigation/CustomMenu'
import { useFocusEffect } from '@react-navigation/native';
export default function HomeScreen({navigation}) {
  const dispatch = useDispatch();
  const [menuVisible, setMenuVisible] = useState(false);

  const { products, loading } = useSelector(state => state.products);
  const [selectedCategory, setSelectedCategory] = useState('1');

const categories = [
  {
    id: '1',
    name: 'Women',
    icon: require('../../assets/icons/women.png'),
  },
  {
    id: '2',
    name: 'Men',
    icon: require('../../assets/icons/men.png'),
  },
  {
    id: '3',
    name: 'Accessories',
    icon: require('../../assets/icons/eyewear.png'),
  },
  {
    id: '4',
    name: 'Beauty',
    icon: require('../../assets/icons/screwdriver.png'),
  },
];

 useFocusEffect(
  useCallback(() => {
    dispatch(fetchProducts());
  }, [dispatch])
);


  if (loading) return <ActivityIndicator size="large" />;

  return (
    <ScrollView style={{flex: 1,
      backgroundColor: '#2e3036',
    paddingTop:20,
   }}

     contentContainerStyle={{
    paddingBottom: 40, 
    alignItems: "center" ,

  }}
     showsVerticalScrollIndicator={false} >
      <View style={{width: "100%", maxWidth: 360, alignSelf: "center",}}>
      <View style={{flexDirection:"row", justifyContent:"space-between" , alignItems: "center"}}>
         <View>
        <TouchableOpacity
  activeOpacity={1}
  style={{ flex: 1 }}
 onPress={() => setMenuVisible(true)}
><Image source={require('../../assets/images/drawer.png')} />
</TouchableOpacity>
    <CustomMenu
  visible={menuVisible}
  onClose={() => setMenuVisible(false)}
  navigation={navigation}
/>
</View>
      <Text style={{color:"#FCFCFD",fontWeight:700,fontSize:20}}>Stylinx</Text>
     <Image source={require('../../assets/images/bellPin.png')} />
     </View>
<View style={{ marginTop: 20 ,justifyContent:'center',alignItems:"center"}}>

  <FlatList
    data={categories}
    horizontal
    showsHorizontalScrollIndicator={false}
    keyExtractor={(item) => item.id}
    renderItem={({ item, index }) => {
      const isSelected = selectedCategory === item.id;
      return(
    <TouchableOpacity
      onPress={() => setSelectedCategory(item.id)}
      style={{ alignItems: "center", marginRight: 40 }}
    >
        
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: 30,
            backgroundColor:
              isSelected ? '#FCFCFD' : '#2c2f36',
               borderWidth: isSelected ? 2 : 0,
          borderColor: "#FCFCFD",
            justifyContent: 'center',
            alignItems: 'center',
           
          }}
        >
          <Image
            source={item.icon}
            style={{
              width: 12.5,
              height: 20,
             tintColor: isSelected ? "#000" : "#B1B5C3",
              resizeMode: 'contain',
            }}
          />
        </View>

        <Text
          style={{   
            marginTop: 8,
            fontSize: 10,
              color: isSelected ? "#FCFCFD" : "#777E90",
               fontWeight: "300"
          }}
        >
          {item.name}
        </Text>
    </TouchableOpacity>
      )
    }}
  />
</View>
 <View
    style={{
      margin: 15,
      // backgroundColor: '#2a2d35',
      borderRadius: 12,
      padding: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}
  >
 
  </View>

   <View style={{ paddingHorizontal: 15, marginTop: 15 }}>
    
    <View style={{ position: 'relative' }}>
      
      <Image
        source={require('../../assets/images/promo.png')}
        style={{
          width: '100%',
          height: 200,
          borderRadius: 12,
        }}
        resizeMode="cover"
      />

      <View
        style={{
          position: 'absolute',
          right: 20,
          top: 40,
        }}
      >
        <Text
          style={{
            color: '#fff',
            fontSize: 18,
            fontWeight: '600',
          }}
        >
          Autumn
        </Text>

        <Text
          style={{
            color: '#fff',
            fontSize: 18,
            fontWeight: '600',
          }}
        >
          Collection
        </Text>

        <Text
          style={{
            color: '#fff',
            fontSize: 14,
          }}
        >
          2021
        </Text>
      </View>

    </View>
  </View>
  <View style={{flexDirection:"row", justifyContent:"space-between",alignItems:"center",width:"100%",height:24,marginHorizontal:10,marginVertical:10}}>
<Text style={{color:"#FFFFFF",fontWeight:"700",fontSize:20}}>Feature Products</Text>
<Text style={{color:"#E6E8EC",fontWeight:"500",fontSize:13}}>Show all</Text>
</View>
     <FlatList
      horizontal
      data={products}
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      renderItem={({ item }) => (
        <TouchableOpacity
    onPress={() =>
      navigation.navigate('ProductDetails', {
        product: item,
      })
    }
  >
        <View
          style={{
            width:128,
            height:227,
            backgroundColor: '#2e3036',
            borderRadius: 12,
            padding: 10,
            marginRight: 12,
          }}
        >
          <Image
            source={{ uri: item.images[0] }}
            style={{ width:128,height: 152, borderRadius: 10 }}
          />
          <View style={{height:41,width:125}}>
          <Text style={{ color: '#FCFCFD',fontSize:12,fontWeight:500 }}>
            {item.title}
          </Text>
          <Text style={{ color: '#fff', fontSize:16,fontWeight:700 }}>
            $ {item.price}
          </Text>
          </View>
        </View>
        </TouchableOpacity>
      )}
    />


<Image source={require("../../assets/images/banner1.png")}
style={{width:"100%",height:158}}
/>
 <View style={{flexDirection:"row", justifyContent:"space-between",alignItems:"center",width:"100%",height:24,marginHorizontal:10,marginVertical:10}}>
<Text style={{color:"#FFFFFF",fontWeight:"700",fontSize:20}}>Recommended</Text>
<Text style={{color:"#E6E8EC",fontWeight:"500",fontSize:13}}>Show all</Text>
</View>

<ScrollView
  horizontal
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={{ paddingHorizontal: 10, }}
>
  {products.map(item => (
    <View
      key={item.id}
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1c1f26",
        borderRadius: 12,
        padding: 10,
        marginRight: 12,
        width: 213,
      }}
    >
      <Image
        source={{ uri: item.images[0] }}
        style={{ height: 66, width: 66, borderRadius: 8 }}
      />

      <View style={{ marginLeft: 10, flex: 1 }}>
        <Text
          style={{ color: "#FCFCFD" }}
          numberOfLines={1}
        >
          {item.title}
        </Text>

        <Text style={{ color: "#FCFCFD", fontWeight: "700" }}>
          ${item.price}
        </Text>
      </View>
    </View>
  ))}
</ScrollView>


 <View style={{flexDirection:"row", justifyContent:"space-between",alignItems:"center",width:"100%",height:28,marginHorizontal:10,marginVertical:10}}>
<Text style={{color:"#FFFFFF",fontWeight:"700",fontSize:20}}>Top Collection</Text>
<Text style={{color:"#E6E8EC",fontWeight:"500",fontSize:13}}>Show all</Text>
</View>
<Image source={require("../../assets/images/banner 1.png")}
style={{width:"100%",height:141.03}}
/>
<Image source={require("../../assets/images/banner 2.png")}
style={{width:"100%",height:229}}
/>
<View style={{flexDirection:"row",justifyContent:"space-between",  width: "100%",
  paddingHorizontal: 15,padding:15,marginBottom:50}}>
<Image source={require("../../assets/images/banner 3.png")}
style={{maxWidth:156,height:194}
}
  resizeMode="cover"/><Image source={require("../../assets/images/banner 4.png")}
style={{maxWidth:156,height:194}}
  resizeMode="cover"
/>
</View>
    </View>
    
    </ScrollView>
  );
}
