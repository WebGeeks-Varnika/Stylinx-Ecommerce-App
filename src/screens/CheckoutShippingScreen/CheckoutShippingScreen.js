import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image
} from "react-native";

export default function CheckoutShippingScreen({navigation}) {
  const [shippingMethod, setShippingMethod] = useState("free");
const [formData, setFormData] = useState({
  firstName: "",
  lastName: "",
  country: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  phone: "",
});


const [errors, setErrors] = useState({});

const handleChange = (key, value) => {
  setFormData(prev => ({
    ...prev,
    [key]: value,
  }));
};

const validateForm = () => {
  let newErrors = {};

  if (!formData.firstName.trim())
    newErrors.firstName = "Field is required";

  if (!formData.lastName.trim())
    newErrors.lastName = "Field is required";

  if (!formData.country.trim())
    newErrors.country = "Field is required";

  if (!formData.street.trim())
    newErrors.street = "Field is required";

  if (!formData.city.trim())
    newErrors.city = "Field is required";

  if (!formData.zip.trim())
    newErrors.zip = "Field is required";

  if (!formData.phone.trim())
    newErrors.phone = "Field is required";

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};



  return (
    <View style={styles.container}>

      <ScrollView showsVerticalScrollIndicator={false}>
   
        
                <TouchableOpacity style={styles.backBtn} onPress={()=>{
                  navigation.goBack()
                }}>
               <Image source={require('../../assets/icons/backIconDark.png')}  style={{height:18,width:18}}/>
                </TouchableOpacity>
        <Text style={styles.header}>Check out</Text>

      
        <Text style={styles.step}>STEP 1</Text>
        <Text style={styles.title}>Shipping</Text>

  <Input
  label="First name *"
  value={formData.firstName}
  onChangeText={(text) => handleChange("firstName", text)}
   error={errors.firstName}
/>

<Input
  label="Last name *"
  value={formData.lastName}
  onChangeText={(text) => handleChange("lastName", text)}
     error={errors.lastName}
/>

<Input
  label="Country *"
  value={formData.country}
  onChangeText={(text) => handleChange("country", text)}
       error={errors.country}
/>

<Input
  label="Street name *"
  value={formData.street}
  onChangeText={(text) => handleChange("street", text)}
       error={errors.street}
/>

<Input
  label="City *"
  value={formData.city}
  onChangeText={(text) => handleChange("city", text)}
     error={errors.city}
/>

<Input
  label="State / Province"
  value={formData.state}
  onChangeText={(text) => handleChange("state", text)}
/>

<Input
  label="Zip-code *"
  value={formData.zip}
  onChangeText={(text) => handleChange("zip", text)}
     error={errors.zip}
/>

<Input
  label="Phone number *"
  value={formData.phone}
  onChangeText={(text) => handleChange("phone", text)}
     error={errors.phone}
/>

        <Text style={styles.sectionTitle}>Shipping method</Text>

        <ShippingOption
          selected={shippingMethod === "free"}
          title="Free"
          subtitle="Delivery to home"
          description="Delivery from 3 to 7 business days"
          onPress={() => setShippingMethod("free")}
        />

        <ShippingOption
          selected={shippingMethod === "standard"}
          title="$9.90"
          subtitle="Delivery to home"
          description="Delivery from 4 to 6 business days"
          onPress={() => setShippingMethod("standard")}
        />

        <ShippingOption
          selected={shippingMethod === "fast"}
          title="$9.90"
          subtitle="Fast Delivery"
          description="Delivery from 2 to 3 business days"
          onPress={() => setShippingMethod("fast")}
        />

    
        <Text style={styles.sectionTitle}>Coupon Code</Text>
        <View style={styles.couponBox}>
          <TextInput
            placeholder="Have a code? type it here..."
            placeholderTextColor="#777"
            style={styles.couponInput}
          />
          <TouchableOpacity>
            <Text style={styles.validateText}>Validate</Text>
          </TouchableOpacity>
        </View>

     
     <TouchableOpacity
  style={styles.button}
  onPress={() => {
    if (validateForm()) {
      navigation.navigate("PaymentScreen", {
        shippingData: formData,
        shippingMethod: shippingMethod,
      });
    }
  }}
>
  <Text style={styles.buttonText}>Continue to payment</Text>
</TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const Input = ({ label, error, value, onChangeText }) => {
  const isRequired = label.includes("*");

  return (
    <View style={{ marginBottom: 18 }}>
    
      <Text style={styles.label}>
        {label.replace("*", "")}
        {isRequired && (
          <Text style={{ color: error ? "red" : "#fff" }}>
            {" "}*
          </Text>
        )}
      </Text>

    
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#777"
        style={[
          styles.input,
          error && { borderBottomColor: "red" },
        ]}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};


const ShippingOption = ({
  selected,
  title,
  subtitle,
  description,
  onPress,
}) => (
  <TouchableOpacity
    style={[styles.shippingBox, selected && styles.shippingSelected]}
    onPress={onPress}
  >
    <View style={styles.radioOuter}>
      {selected && <View style={styles.radioInner} />}
    </View>

    <View style={{ flex: 1 }}>
      <Text style={styles.shippingTitle}>
        {title}{" "}
        <Text style={styles.shippingSubtitle}>{subtitle}</Text>
      </Text>
      <Text style={styles.shippingDesc}>{description}</Text>
    </View>
  </TouchableOpacity>
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
  header: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
  },

  step: {
    color: "#888",
    fontSize: 12,
  },

  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
  },

  label: {
    color: "#aaa",
    fontSize: 13,
    marginBottom: 6,
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#444",
    color: "#fff",
    paddingVertical: 6,
  },

  error: {
    color: "red",
    fontSize: 11,
    marginTop: 4,
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 25,
    marginBottom: 10,
  },

  shippingBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#151515",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },

  shippingSelected: {
    borderWidth: 1,
    borderColor: "#4CAF50",
  },

  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#aaa",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4CAF50",
  },

  shippingTitle: {
    color: "#fff",
    fontWeight: "600",
  },

  shippingSubtitle: {
    color: "#aaa",
    fontWeight: "400",
  },

  shippingDesc: {
    color: "#777",
    fontSize: 12,
    marginTop: 2,
  },

  couponBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#151515",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginTop: 8,
  },

  couponInput: {
    flex: 1,
    color: "#fff",
    paddingVertical: 12,
  },

  validateText: {
    color: "#4CAF50",
    fontWeight: "600",
  },

  button: {
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    marginVertical: 30,
  },

  buttonText: {
    color: "#000",
    fontWeight: "600",
    fontSize: 16,
  },
});
