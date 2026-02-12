import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,Image
} from "react-native";
import { useSelector,useDispatch } from "react-redux";
import { addOrder} from "../../redux/slices/orderSlice"
import { clearCart } from "../../redux/slices/cartSlice";
export default function Order({ navigation }) {
const dispatch=useDispatch();
const cartItems = useSelector(state => state.cart.cartItems);

  const handlePaymentSuccess = () => {

  dispatch(
    addOrder({
      id: Date.now(),
      items: cartItems,
      total: cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
      status: "Processing",
      date: new Date().toISOString(),
    })
  );

  dispatch(clearCart());

  navigation.navigate("MainTabs");
};


  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
       <Image source={require('../../assets/icons/backIconDark.png')}  style={{height:18,width:18}}/>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Check out</Text>

        <View style={{ width: 36 }} />
      </View>
 <Image
          source={require("../../assets/icons/complete.png")}
          style={styles.complete}
          resizeMode="contain"
        />
     
      <View style={styles.centerContent}>

        <Text style={styles.title}>Order Completed</Text>

        <Image
          source={require("../../assets/icons/orderComplete.png")}
          style={styles.completeIcon}
          resizeMode="contain"
        />

        <Text style={styles.message}>
          Thank you for your purchase.
        </Text>

        <Text style={styles.subMessage}>
          You can view your order in 'My Orders' section.
        </Text>

      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handlePaymentSuccess()}
      >
        <Text style={styles.buttonText}>
          Continue shopping
        </Text>
      </TouchableOpacity>

    </View>
  );
}


const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: "#0E0E0E",
  paddingHorizontal: 20,
  paddingTop: 50,
},

header: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
},
complete:{
  marginTop:"20",
width:"80%",
marginHorizontal:'auto',
paddingHorizontal:"auto"
},
 headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

centerContent: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
},

title: {
  color: "#fff",
  fontSize: 24,
  fontWeight: "700",
  marginBottom: 30,
},

completeIcon: {
  width: 120,
  height: 120,
  marginBottom: 30,
},

message: {
  color: "#fff",
  fontSize: 16,
  textAlign: "center",
},

subMessage: {
  color: "#aaa",
  fontSize: 14,
  textAlign: "center",
  marginTop: 6,
},

button: {
  backgroundColor: "#EDEDED",
  paddingVertical: 16,
  borderRadius: 30,
  alignItems: "center",
  marginBottom: 30,
},
});
