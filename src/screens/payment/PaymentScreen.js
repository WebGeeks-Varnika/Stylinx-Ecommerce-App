import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { useSelector } from "react-redux";

export default function PaymentScreen({navigation,route}) {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [agreeTerms, setAgreeTerms] = useState(false);
const shippingMethod=route.params.shippingMethod
const cartItems = useSelector(state => state.cart.cartItems);
const productTotal = cartItems.reduce(
  (total, item) =>
    total + Number(item.price) * Number(item.quantity),
  0
);
const shippingCost = (shippingMethod=="standard"||shippingMethod=="fast") ? 9.90 : 0;

const subtotal = productTotal + shippingCost;
if (!cartItems.length) {
  return (
    <View style={styles.container}>
      <Text style={{ color: "#fff", textAlign: "center", marginTop: 50 }}>
        Your cart is empty
      </Text>
    </View>
  );
}

return (
  <View style={styles.container}>

    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 140 }}
    >

      <Text style={styles.header}>Check out</Text>

      <Image
        source={require("../../assets/icons/checkout.png")}
        resizeMode="contain"
        style={styles.checkoutImage}
      />

      <Text style={styles.step}>STEP 2</Text>
      <Text style={styles.title}>Payment</Text>

     
      <View style={styles.paymentRow}>
        <PaymentBox
          title="Cash"
          selected={paymentMethod === "cash"}
          icon={require("../../assets/icons/Cash.png")}
          onPress={() => setPaymentMethod("cash")}
        />

        <PaymentBox
          title="Credit Card"
          icon={require("../../assets/icons/CreditCard.png")}
          tintable
          selected={paymentMethod === "card"}
          onPress={() => setPaymentMethod("card")}
        />

        <PaymentBox
          title="•••"
          selected={paymentMethod === "other"}
          onPress={() => setPaymentMethod("other")}
        />
      </View>
   <Image
        source={require("../../assets/icons/payment.png")}
        resizeMode="contain"
        style={styles.paymentImage}
      />

    
      <View style={styles.summaryBox}>
        <SummaryRow
          label="Product price"
          value={`$${productTotal.toFixed(2)}`}
        />

        <SummaryRow
          label="Shipping"
          value={shippingCost === 0 ? "Freeship" : `$${shippingCost}`}
        />

        <SummaryRow
          label="Subtotal"
          value={`$${subtotal.toFixed(2)}`}
          bold
        />
      </View>
    </ScrollView>

  

    <View style={styles.footer}>
      <View style={styles.termsRow}>
        <TouchableOpacity
          style={[
            styles.checkbox,
            agreeTerms && styles.checkboxChecked,
          ]}
          onPress={() => setAgreeTerms(!agreeTerms)}
        >
          {agreeTerms && <Text style={styles.checkmark}>✓</Text>}
        </TouchableOpacity>

        <Text style={styles.termsText}>
          I agree to{" "}
          <Text style={styles.termsLink}>
          Please  Terms and conditions
          </Text>
        </Text>
      </View>

      <TouchableOpacity
      onPress={()=>navigation.navigate("Order")}
        disabled={!agreeTerms}
        style={[
          styles.placeOrderBtn,
          !agreeTerms && { opacity: 0.5 },
        ]}
      >
        <Text style={styles.placeOrderText}>
          Place my order
        </Text>
      </TouchableOpacity>
    </View>

  </View>
);


}

const PaymentBox = ({
  title,
  selected,
  onPress,
  icon,
  tintable,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.paymentBox,
      selected && styles.paymentSelected,
    ]}
  >
    {icon && (
      <Image
        source={icon}
        style={[
          styles.paymentIcon,
          tintable && {
            tintColor: selected ? "#000" : "#fff",
          },
        ]}
      />
    )}

    <Text
      style={[
        styles.paymentText,
        { color: selected ? "#000" : "#fff" },
      ]}
    >
      {title}
    </Text>
  </TouchableOpacity>
);


const CardLogo = ({ text }) => (
  <View style={styles.logoBox}>
    <Text style={styles.logoText}>{text}</Text>
  </View>
);

const SummaryRow = ({ label, value, bold }) => (
  <View style={styles.summaryRow}>
    <Text
      style={[
        styles.summaryText,
        bold && { fontWeight: "700", color: "#fff" },
      ]}
    >
      {label}
    </Text>
    <Text
      style={[
        styles.summaryText,
        bold && { fontWeight: "700", color: "#fff" },
      ]}
    >
      {value}
    </Text>
  </View>
);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E0E0E",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#1c1f26",
    justifyContent: "center",
    alignItems: "center",
  },
  step: {
    color: "#888",
    fontSize: 12,
  },

  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 25,
  },

  paymentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  paymentBox: {
    flex: 1,
    backgroundColor: "#1A1A1A",
    paddingVertical: 22,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 5,
  },

  paymentSelected: {
    backgroundColor: "#EDEDED",
    color:"black"
  },

  paymentText: {
    color: "#fff",
    fontWeight: "600",
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  addNew: {
    color: "red",
    fontSize: 14,
  },

  checkoutWith: {
    color: "#888",
    marginTop: 10,
    marginBottom: 15,
  },

  logoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },

  logoBox: {
    backgroundColor: "#111",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#222",
  },

  logoText: {
    color: "#fff",
    fontSize: 12,
  },

  summaryBox: {
    backgroundColor: "#121212",
    borderRadius: 20,
    padding: 20,
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#222",
  },

  summaryText: {
    color: "#aaa",
    fontSize: 15,
  },
  header: {
  color: "#fff",
  textAlign: "center",
  fontSize: 16,
  fontWeight: "bold",
 paddingLeft:100
},

checkoutImage: {
  width: "80%",
  height: 80,
  alignSelf: "center",
  marginBottom: 20,
},

paymentImage: {
  width: "100%",
  height: 60,
  alignSelf: "center",
  marginBottom: 25,
},

paymentIcon: {
  width: 35,
  height: 25,
  marginBottom: 6,
},
termsRow: {
  flexDirection: "row",
  alignItems: "center",
  marginTop: 20,
},

checkbox: {
  width: 18,
  height: 18,
  borderRadius: 4,
  borderWidth: 1,
  borderColor: "#888",
  justifyContent: "center",
  alignItems: "center",
  marginRight: 10,
},

checkboxChecked: {
  backgroundColor: "#7BE495",
  borderColor: "#7BE495",
},

checkmark: {
  color: "#000",
  fontSize: 12,
  fontWeight: "bold",
},

termsText: {
  color: "#aaa",
},

termsLink: {
  color: "#fff",
  textDecorationLine: "underline",
},

placeOrderBtn: {
  backgroundColor: "#E5E5E5",
  paddingVertical: 16,
  borderRadius: 30,
  marginTop: 20,
  alignItems: "center",
},

placeOrderText: {
  color: "#000",
  fontWeight: "600",
},
footer: {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "#0E0E0E",
  paddingHorizontal: 20,
  paddingBottom: 20,
  paddingTop: 10,
  borderTopWidth: 1,
  borderTopColor: "#222",
},
footer: {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "#0E0E0E",
  paddingHorizontal: 20,
  paddingBottom: 20,
  paddingTop: 10,
  borderTopWidth: 1,
  borderTopColor: "#222",
},

});
