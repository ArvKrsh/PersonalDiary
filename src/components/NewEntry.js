import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import InputScrollView from "react-native-input-scroll-view";
import EntryModel from "../models/EntryModel";
import { ModalDatePicker } from "react-native-material-date-picker";
import { saveEntry, readEntriesList, editEntry } from "../util/EntryUtil";
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid';

const windowHeight = Dimensions.get("window").height;

export default function NewEntryScreen({ route, navigation }) {

  const [title, onChangeTitle] = React.useState(route.params && route.params.title ? route.params.title : "");
  const [content, onChangeContent] = React.useState(route.params && route.params.content ? route.params.content : "");
  //const [entry, onChangeEntry] = React.useState(new EntryModel());
  const [date, onChangeDate] = React.useState(route.params && route.params.timestamp ? route.params.timestamp : new Date().toDateString());
  const [id, onChangeId] = React.useState(route.params && route.params.id ? route.params.id : "");

  if(route.params) {
    
  }

  async function save() {
    if (title == "") {
      alert("Please enter a title");
      return;
    }
    if (content == "") {
      alert("Please enter some content");
      return;
    }
    if (date == "") {
      alert("Please choose date");
      return
    }
    var entry = new EntryModel();
    entry.title = title;
    entry.content = content;
    entry.timestamp = date;
    if(!id) {
      entry.id = uuidv4();
      await saveEntry(entry);
    } else {
      entry.id = id
      console.log("edit")
      await editEntry(entry);
    }
    console.log('saved')
    navigation.navigate("Home")
  }

  return (
    <View style={{backgroundColor: "#dfcffa"}}>
      <InputScrollView>
        <ModalDatePicker
          button={<Text style={styles.entry_calendar}>{date}</Text>}
          locale="en"
          onSelect={(d) => {
            onChangeDate(d.toDateString());
          }}
          isHideOnSelect={true}
          initialDate={new Date().toString()}
          //language={require('./locales/en.json')}
        />
        <TextInput
          style={styles.entry_title}
          onChangeText={(title) => onChangeTitle(title)}
          value={title}
          placeholder="Add title"
        />
        <TextInput
          style={styles.entry_content}
          onChangeText={(content) => onChangeContent(content)}
          value={content}
          placeholder="Start typing here..."
          multiline={true}
        />
        <TouchableOpacity style={styles.save_btn} onPress={save}>
          <Text style={styles.save_btn_text}>SAVE</Text>
        </TouchableOpacity>
      </InputScrollView>
    </View>
  );
}

//STYLING
const styles = StyleSheet.create({
  entry_title: {
    height: 50,
    padding: 12,
    fontSize: 16,
    color: "black",
    margin: 20,
    backgroundColor:'#fcfaff',
    elevation: 5
  },
  entry_content: {
    minHeight: windowHeight / 2,
    padding: 12,
    fontSize: 16,
    color: "black",
    textAlignVertical: "top",
    margin: 20,
    backgroundColor:'#fcfaff',
    elevation: 5
  },
  entry_calendar: {
    height: 50,
    padding: 12,
    fontSize: 16,
    color: "black",
    margin: 20,
    backgroundColor:'#fcfaff',
    elevation: 5
  },
  save_btn: {
    margin: 25,
    alignSelf: "center",
    backgroundColor: "#b992fa",
    elevation: 5,
    paddingHorizontal: 50,
    paddingVertical: 14,
    borderRadius: 10,
  },
  save_btn_text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});
