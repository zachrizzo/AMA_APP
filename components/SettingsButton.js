import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  Button,
  View,
  FlatList,
  Animated,
  TextInput,
  Switch,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
export default function SettingsButton({
  setting,
  onPressTrue,
  onPressFalse,
  text,
  width,
}) {
  if (setting == true) {
    return (
      <TouchableOpacity onPress={onPressTrue}>
        <View
          style={{
            marginVertical: 5,
            marginHorizontal: 20,
            borderRadius: 20,
            width: width,
            backgroundColor: "#0008ff",
          }}
        >
          <Text style={{ textAlign: "center", fontSize: 20, padding: 2 }}>
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity onPress={onPressFalse}>
        <View
          style={{
            marginVertical: 5,
            marginHorizontal: 20,
            borderRadius: 20,
            width: width,
            backgroundColor: "#A9A9A9",
          }}
        >
          <Text style={{ textAlign: "center", fontSize: 20, padding: 2 }}>
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
