import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import EntryListScreen from "./EntryList";
import { saveEntry, readEntriesList, getData, deleteEntry, editEntry } from "../util/EntryUtil";

export default function HomeScreen({ navigation }) {

  const [entries, onChangeEntries] = useState([]);

  function del(id) {
    deleteEntry(id).then(()=> {
      fetchData();
    })
  }

  function edit(entry) {
    navigation.navigate("Entry", entry)
  }

  async function fetchData() {
    var e = await getData();
    onChangeEntries(e);
  }

  useEffect(function () {
    fetchData();
  }, []);

  useEffect(()=> {
    const refresh = navigation.addListener('focus', fetchData)
    return refresh;
  },[navigation])
  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <EntryListScreen entries={entries} delFunc={del} editFunc={edit}></EntryListScreen>
      <TouchableOpacity
        style={styles.floating_btn}
        onPress={() => navigation.navigate("Entry")}
      >
        <Text style={styles.floating_btn_txt}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  floating_btn: {
    borderWidth: 1,
    borderColor: "#575757",
    alignItems: "center",
    justifyContent: "center",
    width: 65,
    position: "absolute",
    bottom: 20,
    right: 20,
    height: 65,
    backgroundColor: "#575757",
    borderRadius: 100,
  },
  floating_btn_txt: { fontSize: 42, color: "#fff", marginTop:-5},
});
