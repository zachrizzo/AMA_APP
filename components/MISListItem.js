import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DividerLine from "./DividerLine";
import MainButton from "./MainButton";
import InputBox from "./InputBox";

const MISListItem = ({
  titleOfList,
  pickerItems,
  setPickerState,
  setRefresh,
  refresh,
  pickedList,
  pickerValue,
  listKeyNumber,
  totalList,
}) => {
  const [otherPrice, setOtherPrice] = useState(null);
  const listOfitemPosibiltys = [
    { product: "Myers Cocktail", price: 150 },
    { product: "Mini Myers Cocktail", price: 75 },
    { product: "1L Saline", price: 100 },
    { product: "500ml Saline", price: 80 },
    { product: "Forever Young", price: 50 },
    { product: "Myers +", price: 225 },
    { product: "NAD+ 500MG", price: 350 },
    { product: "NAD+ 250MG", price: 250 },
    { product: "NAD+ 1000MG", price: 450 },
    { product: "Vitamin C-5G", price: 150 },
    { product: "High Dose C", price: 300 },
    { product: "Electrolyte", price: 25 },
    { product: "Zinc", price: 25 },
    { product: "Vitamin C", price: 25 },
    { product: "Glutathione", price: 25 },
    { product: "B Complex", price: 25 },
    { products: "B12", price: 25 },
    { product: "B Complex", price: 25 },
    { product: "B12", price: 25 },
    { product: "MIC-B12", price: 25 },
    { product: "Vitamin D", price: 25 },
    { product: "MIC JAGGER", price: 50 },
    { product: "Myers +", price: 50 },
    { product: "Glutathione Booster", price: 50 },
    { product: "Vitamin C Booster", price: 50 },
    { product: "Myers Booster", price: 50 },
    { product: "Myers + Booster", price: 50 },
    { product: "Watermelon Packet", price: 1 },
    { product: "Watermelon Box", price: 20 },
    { product: "Watermelon Canister", price: 21 },
    { product: "Watermelon Tub", price: 40 },
    { product: "Raspberry Packet", price: 1 },
    { product: "Raspberry Box", price: 20 },
    { product: "Raspberry Canister", price: 21 },
    { product: "Raspberry Tub", price: 40 },
    { product: "Grape Packet", price: 1 },
    { product: "Grape Box", price: 20 },
    { product: "Grape Canister", price: 21 },
    { product: "Grape Tub", price: 40 },
    { product: "Orange Packet", price: 1 },
    { product: "Orange Box", price: 20 },
    { product: "Orange Canister", price: 21 },
    { product: "Orange Tub", price: 40 },

    { product: "Cherry Pomegranate Packet", price: 1 },
    { product: "Cherry Pomegranate Box", price: 20 },
    {
      product: "Cherry Pomegranate Canister",
      price: 21,
    },
    { product: "Cherry Pomegranate Tub", price: 40 },
    { product: "Lemon Aid Packet", price: 1 },
    { product: "Lemon Aid Box", price: 20 },
    { product: "Lemon Aid Canister", price: 21 },
    { product: "Lemon Aid Tub", price: 40 },
    { product: "Pink Lemon Aid Packet", price: 1 },
    { product: "Pink Lemon Aid Box", price: 20 },
    { product: "Pink Lemon Aid Canister", price: 21 },
    { product: "Pink Lemon Aid Tub", price: 40 },
    { product: "Blue Raspberry Packet", price: 1 },
    { product: "Blue Raspberry Box", price: 20 },
    { product: "Blue Raspberry Canister", price: 21 },
    { product: "Blue Raspberry Tub", price: 40 },
    { product: "Mocktini Packet", price: 1 },
    { product: "Mocktini Box", price: 20 },
    { product: "Mocktini Canister", price: 21 },
    { product: "Mocktini Tub", price: 40 },
    { product: "Sarcotropin", price: 200 },
    { product: "Lab Draw", price: 20 },
    { product: "Therapeutic Phlebotomy", price: 200 },
    { product: "Other Phlebotomy", price: otherPrice },
    { product: "AMA 1L Saline", price: 0 },
    { product: "4MG Zofran", price: 25 },
    { product: "AMA 4MG Zofran", price: 0 },
    { product: "Extra 1L", price: 50 },
    { product: "Extra 500ml", price: 50 },
    { product: "3 Scans", price: 150 },
    { product: "1 Scans", price: 60 },
  ];

  return (
    <View
      style={{
        alignItems: "center",
        flex: 1,
        margin: 10,
        width: Dimensions.get("screen").width / 1.3,
      }}
    >
      <Text style={{ marginTop: 30, fontSize: 18, marginBottom: 10 }}>
        {titleOfList}
      </Text>
      <DividerLine
        lineWidth={Dimensions.get("screen").width / 2.5}
        lineColor={"#0008ff"}
      />
      <Picker
        style={{
          //   height: 50,
          width: Dimensions.get("screen").width / 1.3,

          //   marginBottom: 2,
        }}
        sel
        selectedValue={pickerValue}
        onValueChange={(itemValue, itemIndex) => {
          // itemValue.map((item) => {

          // });
          setPickerState(itemValue);
        }}
      >
        {pickerItems}
      </Picker>
      {pickerValue != null && pickerValue.includes("Other") && (
        <InputBox
          width={Dimensions.get("screen").width / 1.3}
          color={"#0008ff"}
          value={otherPrice}
          placeholder={"Other Price (no $, no space )"}
          keyboardType={"numeric"}
          onChangeText={(text) => {
            if (text != null || text != "") {
              // var textClean = text.replace(/[^0-9]/g, "");
              setOtherPrice(parseInt(text));
            }
          }}
        ></InputBox>
      )}
      <MainButton
        text={"Add Item"}
        onPress={() => {
          if (pickerValue != null) {
            listOfitemPosibiltys.map((item) => {
              if (
                pickerValue != null &&
                pickerValue.includes("Other") &&
                otherPrice != null &&
                otherPrice != ""
              ) {
                if (pickerValue == item.product) {
                  pickedList.push(item);
                  totalList.push(item);
                }
              } else if (pickerValue.includes("Other") == false) {
                if (pickerValue == item.product) {
                  pickedList.push(item);
                  totalList.push(item);
                }
              } else {
                alert("if other is selected please enter a price");
              }
            });
          }

          setRefresh(!refresh);
        }}
      />

      <View
        style={{
          flex: 1,
          marginVertical: 30,
          backgroundColor: "#64646465",
          borderRadius: 15,
        }}
      >
        <FlatList
          data={pickedList}
          bounces={false}
          style={{ width: "90%" }}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  backgroundColor: "#E9E7E7D4",
                  width: Dimensions.get("screen").width / 1.3,
                  margin: 10,
                  borderRadius: 40,
                  padding: 10,
                }}
              >
                <TouchableOpacity
                  onLongPress={() => {
                    var indexPickedList = pickedList.indexOf(item);
                    pickedList.splice(indexPickedList, 1);
                    var indexTotlaList = totalList.indexOf(item);
                    totalList.splice(indexTotlaList, 1);

                    setRefresh(!refresh);
                  }}
                >
                  <Text style={{ textAlign: "center", fontSize: 18 }}>
                    {item.product}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
          keyExtractor={(item, index) => index}
          listKey={listKeyNumber}
        />
      </View>
    </View>
  );
};

export default MISListItem;
