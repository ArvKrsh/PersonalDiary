import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";

export default function EntryListScreen({
  navigation,
  entries,
  delFunc,
  editFunc,
}) {
  var month = -1;
  var year = -1;

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  function Item({ item }) {
    var divideEntry = false;
    var m = new Date(item.timestamp).getMonth();
    var y = new Date(item.timestamp).getFullYear();
    if (m <= 12 && m >= 0 && month != m) {
      month = m;
      year = y;
      divideEntry = true;
    } else if (m == month && y != year) {
      year = y;
      divideEntry = true;
    }
    return (
      <View>
        {divideEntry && (
          <Text
            style={{
              marginVertical: 10,
              fontSize: 16,
              backgroundColor: "#e9e4f3",
              padding: 10,
            }}
          >
            {monthNames[m] + " " + year}
          </Text>
        )}
        <Swipeable
          renderLeftActions={() => (
            <View style={styles.item_del}>
              <MaterialIcons
                name="delete"
                size={28}
                color="red"
                style={{ marginBottom: 30 }}
                onPress={() => delFunc(item.id)}
              />
            </View>
          )}
          overshootLeft={false}
          style={{ backgroundColor: "red" }}
        >
          <View
            style={styles.item}
            onStartShouldSetResponder={() => editFunc(item)}
          >
            <View
              style={{
                flexDirection: "row",
                alignContent: "stretch",
                justifyContent: "flex-start",
              }}
            >
              <View style={{ paddingRight: 60, justifyContent: "center" }}>
                <Text style={{ fontSize: 24, paddingBottom: 1 }}>
                  {new Date(item.timestamp).getDate()}
                </Text>
                <Text style={{ fontSize: 14, paddingBottom: 10 }}>
                  {dayNames[new Date(item.timestamp).getDay()]}
                </Text>
              </View>
              <View style={{ justifyContent: "center" }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.desc}>
                  {item.content && item.content.length > 30
                    ? item.content.substring(0, 30) + "..."
                    : item.content}
                </Text>
              </View>
              {/* <View style={{justifyContent: "center", paddingVertical: 5}}>
              

              <Entypo
                name="edit"
                size={24}
                color="grey"
                onPress={() => editFunc(item)}
              />
            </View> */}
            </View>
          </View>
        </Swipeable>
      </View>
    );
  }

  function RenderItem({ item }) {
    return <Item item={item}></Item>;
  }

  return (
    <SafeAreaView style={styles.container_main}>
      {/* {console.log(entries.length)} */}
      {entries.length > 0 && (
        <View>
          <FlatList
            data={entries}
            renderItem={RenderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
      {entries.length <= 0 && (
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Text style={{ fontSize: 18, color: "black" }}>
            Click + to add entry
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

// STYLES

const styles = StyleSheet.create({
  container_main: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "stretch",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  item: {
    backgroundColor: "#e0e0e0",
    padding: 14,
    marginVertical: 8,
  },
  title: {
    fontSize: 20,
    paddingBottom: 10,
  },
  desc: {
    fontSize: 14,
    paddingBottom: 10,
  },
  item_del: {
    backgroundColor: "white",
    padding: 30,
    marginVertical: 8,
  },
});
