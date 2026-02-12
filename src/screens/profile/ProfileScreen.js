import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,Alert ,ScrollView
} from "react-native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/loginSlice";
import { logoutUser } from "../../../src/services/firebaseAuth"
export default function ProfileScreen({ navigation }) {

  const user = useSelector(state => state.user?.user);
const dispatch = useDispatch();
const handleLogout = () => {
  Alert.alert(
    "Logout",
    "Are you sure you want to logout?",
    [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        onPress: async () => {
          await logoutUser();
          dispatch(logout());
        },
      },
    ]
  );
};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        
        <View style={styles.profileCard}>

          <Image
            source={require("../../assets/icons/face.png")}
            style={styles.avatar}
          />
  <Text style={styles.name}>
            {user?.name || "Guest User"}
          </Text>

          <Text style={styles.name}>
            {user?.email }
          </Text>

          <Text style={styles.email}>
            Welcome back
          </Text>
        </View>

      
     
        <TouchableOpacity style={styles.logoutBtn}  onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E0E0E",
    paddingHorizontal: 15,
  },

  profileCard: {
    alignItems: "center",
    marginVertical: 20,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },

  name: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },

  email: {
    color: "#aaa",
    marginTop: 4,
  },

  menuItem: {
    backgroundColor: "#1c1f26",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: "row",
     justifyContent: "space-between",
    alignItems: "center",
  },

  menuText: {
    color: "#fff",
    fontSize: 15,
  },

  logoutBtn: {
    marginTop: 20,
    backgroundColor: "#2a2d35",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  logoutText: {
    color: "#ff4d4d",
    fontWeight: "600",
  },
});
