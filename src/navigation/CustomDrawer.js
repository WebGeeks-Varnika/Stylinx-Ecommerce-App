import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { useSelector } from "react-redux";
export default function CustomDrawer(props) {
     const user = useSelector(state => state.user?.user);

  return (
    <View style={{ flex: 1, backgroundColor: "#0E0E0E" }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ flex: 1 }}
      >
     
        <View style={styles.profileContainer}>
          <Image
             source={require("../assets/icons/face.png")}
            style={styles.profileImage}
          />
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.email}>
        {user?.email}
          </Text>
        </View>

     
        <DrawerItem
          label="Home"
         icon={require("../assets/icons/home.png")}
          onPress={() => props.navigation.navigate("Home")}
        />

        <DrawerItem
          label="My Orders"
         icon={require("../assets/icons/home.png")}
          onPress={() =>
            props.navigation.navigate("OrderScreen")
          }
        />

        <DrawerItem
          label="Wishlist"
           icon={require("../assets/icons/home.png")}
          onPress={() =>
            props.navigation.navigate("Wishlist")
          }
        />

        <DrawerItem
          label="Profile"
        icon={require("../assets/icons/home.png")}
          onPress={() =>
            props.navigation.navigate("Profile")
          }
        />

        <DrawerItem
          label="Settings"
         icon={require("../assets/icons/home.png")}
          onPress={() =>
            props.navigation.navigate("Settings")
          }
        />
      </DrawerContentScrollView>

     
      <TouchableOpacity style={styles.logout}>
        <Icon name="log-out" size={18} color="#ff4d4d" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}



const DrawerItem = ({ label, icon, onPress }) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
   <Image
  source={require("../assets/icons/home.png")}
  style={[styles.icon, { tintColor: "#ff4d4d" }]}
/>

    <Text style={styles.itemText}>{label}</Text>
  </TouchableOpacity>
);



const styles = StyleSheet.create({
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

  logout: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#222",
  },

  logoutText: {
    color: "#ff4d4d",
    marginLeft: 10,
    fontSize: 15,
  },
});
