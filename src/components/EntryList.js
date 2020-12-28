import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { deleteEntry } from '../util/EntryUtil'

export default function EntryListScreen({ navigation, entries, delFunc, editFunc }) {

  // function del(id) {
  //   deleteEntry(id)
  // }

  function Item({ item }) {
    return (
      <View style={styles.item}>
        <Text style={{ fontSize: 12, paddingBottom: 10 }}>
          {new Date(item.timestamp).getDate() +
            "/" +
            new Date(item.timestamp).getMonth() +
            "/" +
            new Date(item.timestamp).getFullYear()}
        </Text>
        <Text style={styles.title}>{item.title}</Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 25,
            marginBottom: 5
          }}
        >
          <TouchableOpacity style={{paddingHorizontal:40, backgroundColor:'white', paddingVertical:10, borderRadius:8}}
          onPress={()=>delFunc(item.id)}>
            <Text style={{color:'red'}}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{paddingHorizontal:45, backgroundColor:'#ff4294', paddingVertical:10, borderRadius:8}}
          onPress={()=>editFunc(item)}>
            <Text style={{color:'white'}}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function RenderItem({ item }) {
    return <Item item={item}></Item>;
  }

  return (
    <SafeAreaView style={styles.container_main}>
      <FlatList
        data={entries}
        renderItem={RenderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

// STYLES

const styles = StyleSheet.create({
  container_main: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "stretch",
    justifyContent: "space-evenly",
  },
  item: {
    backgroundColor: "#e0e0e0",
    padding: 14,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  },
});
