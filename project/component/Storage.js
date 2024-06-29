import Storage from "react-native-storage";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const storage = new Storage({
  size: 1000,
  storageBackend: Platform.OS === "web" ? window.localStorage : AsyncStorage, // Use localStorage for web and AsyncStorage for mobile
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
});

export default storage;
