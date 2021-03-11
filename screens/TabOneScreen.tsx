import React, { useContext } from "react";
import { StyleSheet, View, Text, Image, Switch, Button } from "react-native";
import { CartContext } from "../App";

const items = [
  {
    id: 1,
    name: "Sneackers de la mort",
    price: 89, // Euros
    imageUrl:
      "https://media.discordapp.net/attachments/644472191043371008/819206304861650984/Sneackers_3_1000x1000.png?width=676&height=676",
  },
  {
    id: 2,
    name: "Sneackers 🇩🇿",
    price: 289, // Euros
    imageUrl:
      "https://images.unsplash.com/photo-1528669697102-a6edb9b6a282?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
];

export default function App() {
  const [cart, setCart] = React.useContext(CartContext);

  return (
    <View style={styles.container}>
      <Text>🛒 {cart.length}</Text>
      <View style={styles.header}>
        <Text>Snack Sneackers</Text>
      </View>

      <View style={styles.containerbox}>
        {items.map((item) => {
          const isEnabled =
            cart.length && cart.find((i) => i.itemId === item.id);
          console.log(isEnabled);
          const getCartItemIndex = (id) =>
            cart.findIndex((e) => e.itemId === id);

          return (
            <View key={item.id} style={styles.box}>
              <View style={styles.inner}>
                <Image
                  style={{
                    height: 200,
                    width: "100%",
                    resizeMode: "cover",
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                  source={{
                    uri: item.imageUrl,
                  }}
                />
                <Text style={{ textAlign: "left", padding: 5 }}>
                  {item.name} - {item.price}€
                </Text>
                {isEnabled && (
                  <View>
                    <Text style={{ textAlign: "left", padding: 5 }}>
                      Quantity: {cart[getCartItemIndex(item.id)].quantity}
                    </Text>
                    <Button
                      title="+"
                      onPress={() => {
                        const cartCopy = [...cart];
                        cartCopy[getCartItemIndex(item.id)].quantity =
                          cartCopy[getCartItemIndex(item.id)].quantity + 1;
                        setCart(cartCopy);
                      }}
                    ></Button>
                  </View>
                )}
                <Switch
                  style={{ marginTop: 20, marginRight: 5 }}
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={isEnabled ? "#fff" : "#fff"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={(value) => {
                    if (value) {
                      const updatedCard = [...cart];
                      updatedCard.push({ itemId: item.id, quantity: 1 });
                      console.log(updatedCard);
                      setCart(updatedCard);
                    } else {
                      const updatedCard = cart.filter(
                        (e) => e.itemId !== item.id
                      );
                      setCart(updatedCard);
                    }
                  }}
                  value={isEnabled}
                />
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "15%",
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },

  container: {
    flex: 1,
    alignItems: "center",
  },

  box: {
    width: "45%",
    height: 300,
    marginVertical: 5,
    //borderRadius: 20,
  },

  inner: {
    flex: 1,
    backgroundColor: "#eee",
    //alignItems:'center',
    //justifyContent:'center'
    borderRadius: 10,
  },

  containerbox: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
});
