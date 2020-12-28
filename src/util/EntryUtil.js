import AsyncStorage from "@react-native-async-storage/async-storage";

export const getData = async () => {
  try {
    const value = await AsyncStorage.getItem("diary_entries");
    //console.log(JSON.parse(value))
    return value!=null ? JSON.parse(value) : null;
  } catch (e) {
    // error reading value
    console.log("error in reading: " + e);
  }
};

export async function saveEntry(entry) {
  var entries = await getData();
  entries == null ? (entries = [entry]) : entries.push(entry);
  await storeData(JSON.stringify(entries));
}

const storeData = async (entries) => {
  try {
    await AsyncStorage.setItem("diary_entries", entries);
  } catch (e) {
    // saving error
    console.log("error in saving: " + e);
  }
};

export async function deleteEntry(id) {
    console.log('delete'+id)
    var entries = await getData();
    if(entries==null || entries=='' || entries==[]) {
        return
    }
    const newEntries = entries.filter((entry) => entry.id !== id);
    const newEntriesJSON = JSON.stringify(newEntries)
    await AsyncStorage.setItem("diary_entries", newEntriesJSON);
    //await AsyncStorage.removeItem('diary_entries')
}

export async function editEntry(entry) {
    var entries = await getData();
    for(var i=0; i<entries.length; i++) {
        if(entries[i].id == entry.id) {
            console.log(i)
            entries[i] = entry
        }
    }
    const newEntriesJSON = JSON.stringify(entries)
    await AsyncStorage.setItem("diary_entries", newEntriesJSON);
}