import { StyleSheet, Text, View, Pressable, Image } from "react-native";

const DressItem = ({ item }) => {
  return (
    <View>
      <Pressable
        style={{
          backgroundColor: "rgb(255, 255, 255);",
          borderRadius: 8,
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          margin: 14,
        }}
      >
        <View>
          <Image
            style={{ width: 70, height: 70 }}
            source={{ uri: item.image }}
          />
        </View>

        <View>
          <Text
            style={{
              width: 83,
              fontSize: 17,
              fontWeight: "500",
              marginBottom: 7,
            }}
          >
            {item.name}
          </Text>
          <Text style={{ width: 60, color: "gray", fontSize: 15 }}>
            ${item.price}
          </Text>
        </View>

        <Pressable style={{ width: 80 }}>
          <Text
            style={{
              borderColor: "gray",
              borderRadius: 4,
              borderWidth: 0.8,
              marginVertical: 10,
              color: "#088F8F",
              textAlign: "center",
              padding: 5,
              fontSize: 17,
              fontWeight: "500",
            }}
          >
            Add
          </Text>
        </Pressable>
      </Pressable>
    </View>
  );
};

export default DressItem;
const styles = StyleSheet.create({});
