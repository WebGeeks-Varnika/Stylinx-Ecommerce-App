import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useSelector } from "react-redux";
export default function CustomMenu({
  visible,
  onClose,
  navigation,
}) {
    const user = useSelector(state => state.user?.user);

  useEffect(()=>{
console.log("inside custommenu",user)
  },[])
  return (
    <Modal
  visible={visible}
  transparent
  animationType="slide"
  onRequestClose={onClose}
>

      <View style={styles.overlay}>
        
        {/* Side Menu */}
        <View style={styles.container}>
          
          {/* Profile Section */}
          <View style={styles.profileContainer}>
            <Image
              source={require("../assets/icons/face.png")}
              style={styles.profileImage}
            />
            <Text style={styles.name}>{user?.name || "Guest user"}</Text>
            <Text style={styles.email}>{user?.email}</Text>
          </View>

          {/* Menu Items */}
          <MenuItem
            label="Homepage"
            icon={require("../assets/icons/home.png")}
            onPress={() => {
              onClose();
              navigation.navigate("MainTabs");
            }}
          />
          <MenuItem
            label="Discover"
             icon={require("../assets/icons/search.png")}
            onPress={() => {
              onClose();
              navigation.navigate("Discover");
            }}
          />

          <MenuItem
            label="My Order"
             icon={require("../assets/icons/cart.png")}
            onPress={() => {
              onClose();
              navigation.navigate("OrderScreen");
            }}
          />

          

          <MenuItem
            label="My Profile"
             icon={require("../assets/icons/person.png")}
            onPress={() => {
              onClose();
              navigation.navigate("Profile");
            }}
          />
<View style={styles.item}><Text style={{color:"white"}}>OTHER</Text></View>
          <MenuItem
            label="Settings"
            icon={require("../assets/icons/setting.png")} 
            onPress={() => {
              onClose();
              // navigation.navigate("Settings");
            }}
          />
           <MenuItem
            label="Support"
            icon={require("../assets/icons/Message.png")} 
            onPress={() => {
              onClose();
              // navigation.navigate("Settings");
            }}
          />
           <MenuItem
            label="About us"
            icon={require("../assets/icons/aboutUs.png")} 
            onPress={() => {
              onClose();
              // navigation.navigate("Settings");
            }}
          />

       
        </View>

     
        <TouchableOpacity style={{ flex: 1 }} onPress={onClose} />
      </View>
    </Modal>
  );
}



const MenuItem = ({ label, onPress,icon }) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <Image
      source={icon}
      style={[styles.icon, { tintColor: "white" }]}
    />
    <Text style={styles.itemText}>{label}</Text>
  </TouchableOpacity>
);



const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  container: {
    width: 260,
    backgroundColor: "#0E0E0E",
  },

  profileContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#222",
    marginBottom: 10,
  },

  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },

  name: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  email: {
    color: "#888",
    fontSize: 12,
    marginTop: 2,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },

  itemText: {
    color: "#fff",
    marginLeft: 15,
    fontSize: 15,
  },

  icon: {
    width: 18,
    height: 18,

  },

  logout: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#222",
  },

  logoutText: {
    color: "#ff4d4d",
    fontSize: 15,
  },
});
