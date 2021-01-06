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
              backgroundColor: "#ff0073",
              padding: 10,
              elevation: 5,
              marginVertical: 5,
              color: "white",
              borderRadius: 5
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
                onPress={()=>delFunc(item.id)}
              />
            </View>
          )}
          renderRightActions={() => (
            <View style={styles.item_del}>
              <MaterialIcons
                name="edit"
                size={28}
                color="white"
                style={{ marginBottom: 30 }}
                onPress={()=>editFunc(item)}
              />
            </View>
          )}
          onSwipeableLeftOpen={()=> delFunc(item.id)}
          onSwipeableRightOpen={()=> editFunc(item)}
          // overshootFriction={8}
          friction= {2}
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
                <Text style={{ fontSize: 24, paddingBottom: 1, color: 'black' }}>
                  {new Date(item.timestamp).getDate() < 10
                    ? "0" + new Date(item.timestamp).getDate()
                    : new Date(item.timestamp).getDate()}
                </Text>
                <Text style={{ fontSize: 14, paddingBottom: 10, color: 'black' }}>
                  {dayNames[new Date(item.timestamp).getDay()]}
                </Text>
              </View>
              <View style={{ justifyContent: "center" }}>
                <Text style={styles.title}>
                  {item.title && item.title.length > 20
                    ? item.title.substring(0, 20) + "..."
                    : item.title}
                </Text>
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
      {!entries && (
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Text style={{ fontSize: 18, color: "white" }}>
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
    backgroundColor: "#000000",
    alignItems: "stretch",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  item: {
    backgroundColor: "#f2f2f2",
    padding: 14,
    marginVertical: 10,
    elevation: 5,
    borderRadius: 5
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
    backgroundColor: "#000000",
    padding: 30,
    marginVertical: 5,
    elevation: 2,
  },
});
