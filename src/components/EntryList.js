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
              fontSize: 16,
              backgroundColor: "#b992fa",
              padding: 10,
              elevation: 5,
              marginVertical: 5,
              color: 'white'
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
          renderRightActions={() => (
            <View style={styles.item_del}>
              <MaterialIcons
                name="edit"
                size={28}
                color="black"
                style={{ marginBottom: 30 }}
                onPress={() => editFunc(item)}
              />
            </View>
          )}
          overshootLeft={false}
          overshootRight={false}
          overshootFriction={8}
        >
          <View style={styles.item}>
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
                <Text style={styles.title}>{item.title && item.title.length > 10
                    ? item.title.substring(0, 10) + "..."
                    : item.title}</Text>
                <Text style={styles.desc}>
                  {item.content && item.content.length > 30
                    ? item.content.substring(0, 30) + "..."
                    : item.content}
                </Text>
              </View>
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
      {entries && entries.length > 0 && (
        <View>
          <FlatList
            data={entries}
            renderItem={RenderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
      {entries && entries.length <= 0 && (
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
    backgroundColor: "#dfcffa",
    alignItems: "stretch",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  item: {
    backgroundColor: "#ece4fb",
    padding: 14,
    marginVertical: 5,
    elevation: 5
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
    backgroundColor: "#f2eaff",
    padding: 30,
    marginVertical: 5,
    elevation: 2
  },
});
