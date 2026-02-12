import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  increaseQty,
  decreaseQty}
  from "../../redux/slices/cartSlice"
export default function CartScreen({ navigation,route 
}) {
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);

const cartItems = useSelector(state => state.cart.cartItems);  
const subtotal = cartItems.reduce(
  (total, item) => total + item.price * item.quantity,
  0
);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={()=>{
          navigation.goBack()
        }}>
          <Image source={require('../../assets/icons/backIconDark.png')}  style={{height:18,width:18}}/>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Your Cart</Text>

        <View style={{ width: 30 }} />
      </View>
  {cartItems.map((item) => (
  <View key={item.id} style={styles.card}>
    <Image
      source={{ uri: item.image }}
      style={styles.productImage}
    />

    <View style={{ flex: 1 }}>
      <Text style={styles.productName}>{item.title}</Text>

      <Text style={styles.price}>$ {item.price}</Text>

      <Text style={styles.meta}>
        Size: {item.size} | Color: {item.color}
      </Text>

      <View style={styles.qtyContainer}>
        <TouchableOpacity
          onPress={() =>
            item.quantity > 1 && dispatch(decreaseQty(item.id))
          }
          style={styles.qtyBtn}
        >
          <Text style={styles.qtyText}>-</Text>
        </TouchableOpacity>

        <Text style={styles.qtyNumber}>
          {item.quantity}
        </Text>

        <TouchableOpacity
          onPress={() => dispatch(increaseQty(item.id))}
          style={styles.qtyBtn}
        >
          <Text style={styles.qtyText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>

    <View style={styles.checkBox}>
      <Text style={{ color: "#000" }}>✓</Text>
    </View>
  </View>
))}


     {cartItems.length>0 ? 
     <View style={styles.bottomContainer}>

        <Row label="Product price" value={`$${subtotal}`} />
        <Row label="Shipping" value="Freeship" />

        <View style={styles.divider} />

        <Row
          label="Subtotal"
          value={`$${subtotal}`}
          bold
        />

        <TouchableOpacity style={styles.checkoutBtn} onPress={()=>
          navigation.navigate("CheckoutShippingScreen")
        }>
          <Text style={styles.checkoutText}>
            Proceed to checkout
          </Text>
        </TouchableOpacity>

      
       </View> : 
        <View style={styles.container}>
             <Text style={{ color: "#fff", textAlign: "center", marginTop: 50 }}>
               Your cart is empty
             </Text>
           </View>    
       }
    </SafeAreaView>
  );
}


const Row = ({ label, value, bold }) => (
  <View style={styles.row}>
    <Text style={[styles.rowText, bold && { fontWeight: "600" }]}>
      {label}
    </Text>
    <Text style={[styles.rowText, bold && { fontWeight: "600", fontSize: 16 }]}>
      {value}
    </Text>
  </View>
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#12141A",
    paddingHorizontal: 16,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 15,
  },

  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#1c1f26",
    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#1c1f26",
    borderRadius: 16,
    padding: 10,
    alignItems: "center",
  },

  productImage: {
    width: 90,
    height: 90,
    borderRadius: 12,
    marginRight: 10,
  },

  productName: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },

  price: {
    color: "#fff",
    fontSize: 16,
    marginVertical: 4,
  },

  meta: {
    color: "#aaa",
    fontSize: 12,
  },

  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#2a2d35",
    justifyContent: "center",
    alignItems: "center",
  },

  qtyText: {
    color: "#fff",
    fontSize: 16,
  },

  qtyNumber: {
    color: "#fff",
    marginHorizontal: 10,
  },

  checkBox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    backgroundColor: "#7BE495",
    justifyContent: "center",
    alignItems: "center",
  },

  bottomContainer: {
    marginTop: "auto",
    backgroundColor: "#0E0F13",
    padding: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },

  rowText: {
    color: "#fff",
    fontSize: 14,
  },

  divider: {
    height: 1,
    backgroundColor: "#222",
    marginVertical: 10,
  },

  checkoutBtn: {
    backgroundColor: "#E5E5E5",
    paddingVertical: 16,
    borderRadius: 30,
    marginTop: 20,
    alignItems: "center",
  },

  checkoutText: {
    fontWeight: "600",
    color: "#000",
  },
});
