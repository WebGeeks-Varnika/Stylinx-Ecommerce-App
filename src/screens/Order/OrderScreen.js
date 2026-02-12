import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useSelector } from "react-redux";

export default function OrderScreen({ navigation }) {

  const orders = useSelector(state => state.orders.orders || []);
  const renderItem = ({ item }) => (
    <View style={styles.orderCard}>

   
      <View style={styles.orderHeader}>
        <Text style={styles.orderId}>
          Order #{item.id}
        </Text>

        <Text style={styles.status}>
          {item.status}
        </Text>
      </View>
      {item.items.map(product => (
        <View key={product.id} style={styles.productRow}>

          <Image
            source={{ uri: product.image }}
            style={styles.productImage}
          />

          <View style={{ flex: 1 }}>
            <Text
              style={styles.productTitle}
              numberOfLines={1}
            >
              {product.title}
            </Text>

            <Text style={styles.productMeta}>
              Qty: {product.quantity}
            </Text>

            <Text style={styles.productPrice}>
              $ {product.price}
            </Text>
          </View>
        </View>
      ))}

   
      <View style={styles.footer}>
        <Text style={styles.totalText}>
          Total: $ {item.total}
        </Text>

       
      </View>

    </View>
  );

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.header}>
        My Orders
      </Text>

      <FlatList
        data={orders}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={() => (
          <Text style={styles.empty}>
            No orders yet
          </Text>
        )}
      />

    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E0E0E",
    padding: 15,
  },

  header: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 15,
  },

  orderCard: {
    backgroundColor: "#1c1f26",
    borderRadius: 14,
    padding: 12,
    marginBottom: 15,
  },

  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  orderId: {
    color: "#fff",
    fontWeight: "600",
  },

  status: {
    color: "#7BE495",
  },

  productRow: {
    flexDirection: "row",
    marginBottom: 10,
  },

  productImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },

  productTitle: {
    color: "#fff",
  },

  productMeta: {
    color: "#aaa",
    fontSize: 12,
  },

  productPrice: {
    color: "#fff",
    marginTop: 2,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },

  totalText: {
    color: "#fff",
    fontWeight: "600",
  },

  viewBtn: {
    color: "#7BE495",
  },

  empty: {
    color: "#888",
    textAlign: "center",
    marginTop: 50,
  },
});
