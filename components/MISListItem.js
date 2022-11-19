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
  setPickedList,
  pickedList,
  pickerValue,
  listKeyNumber,
  totalList,
}) => {
  const [otherPrice, setOtherPrice] = useState(null);
  const [discountPercentage, setDiscountPercentage] = useState("0");
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [productLocal, setProductLocal] = useState({ price: 0 });
  const [showDiscountPercentageInput, setShowDiscountPercentageInput] =
    useState(false);
  const [isPrePaid, setIsPrePaid] = useState(false);

  const listOfitemPosibiltys = [
    {
      product: "Myers Cocktail",
      price: 150,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Mini Myers Cocktail",
      price: 75,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "1L Mini Myers Cocktail",
      price: 100,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "1L Saline",
      price: 100,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "500ml Saline",
      price: 80,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Forever Young",
      price: 150,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Myers +",
      price: 225,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "NAD+ 500MG",
      price: 350,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "NAD+ 250MG",
      price: 250,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "NAD+ 1000MG",
      price: 450,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Vitamin C-5G",
      price: 150,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "High Dose C",
      price: 300,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Electrolyte",
      price: 25,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Zinc",
      price: 25,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Vitamin C",
      price: 25,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Glutathione",
      price: 25,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "B Complex",
      price: 25,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "B-12",
      price: 25,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "B12 Add-On",
      price: 25,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "MIC-B12",
      price: 25,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Vitamin D",
      price: 25,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "MIC JAGGER",
      price: 50,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },

    {
      product: "Glutathione Booster",
      price: 50,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Vitamin C Booster",
      price: 50,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Myers Booster",
      price: 50,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Myers + Booster",
      price: 75,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Watermelon Packet",
      price: 1,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Watermelon Box",
      price: 20,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Watermelon Canister",
      price: 21,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Watermelon Tub",
      price: 40,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Raspberry Packet",
      price: 1,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Raspberry Box",
      price: 20,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Raspberry Canister",
      price: 21,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Raspberry Tub",
      price: 40,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Grape Packet",
      price: 1,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Grape Box",
      price: 20,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Grape Canister",
      price: 21,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },

    {
      product: "Grape Tub",
      price: 40,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Orange Packet",
      price: 1,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Orange Box",
      price: 20,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Orange Canister",
      price: 21,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Orange Tub",
      price: 40,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },

    {
      product: "Cherry Pomegranate Packet",
      price: 1,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Cherry Pomegranate Box",
      price: 20,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Cherry Pomegranate Canister",
      price: 21,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Cherry Pomegranate Tub",
      price: 40,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Lemon Aid Packet",
      price: 1,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Lemon Aid Box",
      price: 20,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Lemon Aid Canister",
      price: 21,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Lemon Aid Tub",
      price: 40,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Pink Lemon Aid Packet",
      price: 1,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Pink Lemon Aid Box",
      price: 20,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Pink Lemon Aid Canister",
      price: 21,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Pink Lemon Aid Tub",
      price: 40,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },

    {
      product: "Blue Raspberry Packet",
      price: 1,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Blue Raspberry Box",
      price: 20,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Blue Raspberry Canister",
      price: 21,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Blue Raspberry Tub",
      price: 40,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Mocktini Packet",
      price: 1,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Mocktini Box",
      price: 20,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
    },
    {
      product: "Mocktini Canister",
      price: 21,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Mocktini Tub",
      price: 40,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Sarcotropin",
      price: 200,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Lab Draw",
      price: 20,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Therapeutic Phlebotomy",
      price: 100,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Other Phlebotomy",
      price: otherPrice,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "AMA 1L Saline",
      price: 0,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "4MG Zofran",
      price: 25,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "AMA 4MG Zofran",
      price: 0,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Extra 1L",
      price: 50,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Extra 500ml",
      price: 50,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "3 Scans",
      price: 150,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "1 Scans",
      price: 60,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Myers AMA Vitamins",
      price: 75,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Myers + AMA Vitamins",
      price: 95,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Glutathione AMA Vitamins",
      price: 75,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    ///////////////////////////
    //////////////////////////
    /////////////////////////
    ///////////MedSpa////////
    {
      product: "Buccal",
      price: 449,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Buccal package of 3",
      price: 1099,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Submental",
      price: 649,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Submental package of 3",
      price: 1599,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Arms",
      price: 1249,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Arms package of 3",
      price: 2999,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Abdomen",
      price: 1499,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Abdomen package of 3",
      price: 3599,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Scars",
      price: 849,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Scars package of 3",
      price: 2049,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Buttocks",
      price: 1499,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Buttocks package of 3",
      price: 3599,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Stretch Marks",
      price: 1249,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Stretch Marks package of 3",
      price: 2999,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Thighs",
      price: 1499,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Thighs package of 3",
      price: 3599,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Face",
      price: 849,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Face package of 3",
      price: 2099,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Face + Neck",
      price: 1049,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Face + Neck package of 3",
      price: 2599,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Face + Neck + Decollete",
      price: 1199,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Face + Neck + Decollete package of 3",
      price: 2899,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    //////splender XL///////
    {
      product: "Vascular Treatment",
      price: 249,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Vascular Treatment package of 6",
      price: 1349,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Pigment Treatment",
      price: 299,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Pigment Treatment package of 4",
      price: 1499,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Laser Facial",
      price: 249,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Laser Facial package of 6",
      price: 1349,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Extra Small Area",
      price: 75,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Extra Small Area package of 6",
      price: 289,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Small Area",
      price: 150,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Small Area package of 6",
      price: 599,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Medium Area",
      price: 300,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Medium Area package of 6",
      price: 1169,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Large Area",
      price: 500,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Large Area package of 6",
      price: 2149,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Extra Large Area",
      price: 800,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Extra Large Area package of 6",
      price: 3599,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Full Body",
      price: 4999,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    ///////pca///////
    {
      product: "BPO 5% Cleanser",
      price: 39,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Creamy Cleanser",
      price: 33,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Daily Cleansing Oil",
      price: 39,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Daily Exfoliant",
      price: 39,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Facial Wash",
      price: 33,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Facial Wash Oily/Problem",
      price: 33,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Makeup Removing Wipes",
      price: 20,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Blemish Control Bar",
      price: 48,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Dry Skin Relief Bar",
      price: 48,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Pigment Bar",
      price: 48,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Daily Cleansing Bar",
      price: 48,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Hydrating Toner",
      price: 40,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Nutrient Toner",
      price: 40,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Smoothing Toner",
      price: 40,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Detoxifying Mask",
      price: 62,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Hyaluronic Acid Overnight Mask",
      price: 69,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Hydrating Mask",
      price: 62,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Pore Refining Treatment",
      price: 62,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Purifying Mask",
      price: 62,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Purifying Mask",
      price: 62,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Revitalizing Mask",
      price: 62,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Acne Cream",
      price: 36,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Acne Gel with OmniSome",
      price: 60,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    ///
    {
      product: "Anti-Redness Serum",
      price: 110,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "C-Quench Antioxidant Serum",
      price: 120,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "C&E Advanced with Hexylresorcinol & Silymarin",
      price: 80,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "C&E Hand Renewal",
      price: 115,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "C&E Strength Max",
      price: 50,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "CliniCalm  1%",
      price: 49,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Daily Defense Mist",
      price: 117,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Dual Action Redness Relief",
      price: 115,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "ExLinea Peptide Smoothing Serum",
      price: 117,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Hyaluronic Acid Boosting Serum",
      price: 46,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Hyaluronic Acid Lip Booster",
      price: 92,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Hydrating Serum",
      price: 90,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Ideal Complex Restorative Eye Cream I year",
      price: 90,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Ideal Complex® Revitalizing Eye Gel 4-5 months",
      price: 90,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Intensive Age Refining Treatment",
      price: 111,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Intensive Brightening Treatment",
      price: 111,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Intensive Clarity Treatment",
      price: 111,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Peptide Lip Therapy",
      price: 28,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Perfecting Neck & Decollete",
      price: 84,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Pigment Gel HQ Free",
      price: 64,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Pore Minimizer Skin Mattifying Gel",
      price: 70,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Rejuvenating Serum",
      price: 96,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Resveratrol Restorative Complex",
      price: 117,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Retinol Renewal with RestorAtive Complex",
      price: 100,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Retinol Treatment for Sensitive Skin",
      price: 111,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Total Strength Serum",
      price: 96,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Vitamin b3 Brightening Serum",
      price: 117,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },

    {
      product: "Active Broad Spectrum SPF 45",
      price: 44,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Active Protection Body Broad Spectrum SPF 30",
      price: 35,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Daily Defense SPF 50",
      price: 44,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Hydrator Plus Broad Spectrum SPF 30",
      price: 44,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Sheer Tint Broad Spectrum SPF 45",
      price: 50,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Sheer Tint Eye Broad Spectrum SPF 30",
      price: 66,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Weightless Protection Broad Spectrum SPF 45",
      price: 44,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },

    {
      product: "Apres Peel Hydrating Balm",
      price: 50,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Clearskin",
      price: 50,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Collagen Hydrator",
      price: 50,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "HydraLuxe",
      price: 152,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "ReBalance",
      price: 50,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Silkcoat Balm",
      price: 50,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Skin Procedure Oinment",
      price: 36,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Body Therapy",
      price: 64,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Daily care|Kits",
      price: 159,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Micro Peel At Home Kit",
      price: 129,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "The Post-Procedure Solution",
      price: 38,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "The Skin Recovery Kit",
      price: 224,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isxPrePaid,
    },
    {
      product: "The Skin Protection Kit",
      price: 69,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    /////////skin better//////
    {
      product: "Cleaning Gel",
      price: 45,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Oxygen Wash",
      price: 42,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Detoxifying Scrub Mask",
      price: 55,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "AlphaRet Peel Pads",
      price: 110,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Alto Defense Serum 1oz",
      price: 160,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Alto Defense Serum 1.7oz",
      price: 225,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Alto Advanced Defense & Repair Serum",
      price: 185,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Solo Hydrating Defense 1oz",
      price: 160,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Intensive Lines .5oz",
      price: 135,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Intensive Lines 1oz",
      price: 235,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "EyeMax AlphaRet",
      price: 115,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Interfuse Eye Cream",
      price: 110,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Instant Eye Gel ",
      price: 100,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Interfuse Face & Neck 1oz",
      price: 130,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Interfuse Face & Neck 1.7oz",
      price: 190,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Techno Neck Perfecting Cream",
      price: 140,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Even",
      price: 150,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Hydration Boosting Cream",
      price: 90,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "Trio Rebalancing Moisturizer",
      price: 145,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "AlphaRet 1oz",
      price: 130,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "AlphaRet 1.7oz",
      price: 190,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "AlphaRet Intensive 1oz",
      price: 130,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "AlphaRet Intensive 1.7oz",
      price: 190,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "AlphaRet Clearing Serum .5oz",
      price: 130,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "A-Team Duo",
      price: 150,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "TONE SMART Lotion SPF 75",
      price: 75,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "TONE SMART Compact SPF 68",
      price: 65,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "SHEER Lotion SPF 70",
      price: 75,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "SHEER Stick SPF 56",
      price: 55,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
    {
      product: "SHEER Compact SPF 56",
      price: 65,
      discountPercentage: discountPercentage,
      totalAfterDiscount: totalAfterDiscount,
      isPrePaid: isPrePaid,
    },
  ];
  useEffect(() => {
    // caculate price after discountPercentage

    var priceAfterDiscount =
      productLocal.price - productLocal.price * (discountPercentage / 100);
    // setTotalAfterDiscount(0);
    setTotalAfterDiscount(priceAfterDiscount);
    return async () => {
      await setRefresh(!refresh);
    };
  }, [pickerValue, discountPercentage, productLocal.price]);
  useEffect(() => {
    //match picker value with listofitemposibiltys and if it matches set the product

    console.log("pickerValue", pickerValue);
    listOfitemPosibiltys.map((item) => {
      if (item.product === pickerValue) {
        setProductLocal(item);
        // console.log("item", item);
      }
    });
    return () => {
      undefined;
    };
  }, [pickerValue]);

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
        />
      )}
      {showDiscountPercentageInput == false && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 30,

            flex: 1,
            width: Dimensions.get("screen").width,
          }}
        >
          <MainButton
            text={"Discount %"}
            onPress={() => {
              setShowDiscountPercentageInput(true);
              setIsPrePaid(false);
            }}
            buttonWidth={Dimensions.get("screen").width / 2.5}
          />
          <MainButton
            buttonColor={isPrePaid ? "#59FF00" : "#0008ff"}
            text={"PrePaid"}
            onPress={() => {
              setIsPrePaid(!isPrePaid);
            }}
            buttonWidth={Dimensions.get("screen").width / 2.5}
          />
        </View>
      )}
      {showDiscountPercentageInput == true && isPrePaid == false && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              marginHorizontal: 10,
            }}
          >
            <InputBox
              width={Dimensions.get("screen").width / 2.5}
              color={"#0008ff"}
              value={discountPercentage}
              placeholder={"Discount Percentage (no %, no space )"}
              keyboardType={"numeric"}
              onChangeText={(text) => {
                if (text != null || text != "") {
                  // var textClean = text.replace(/[^0-9]/g, "");
                  setDiscountPercentage(parseInt(text));
                }
              }}
            />
          </View>
          <MainButton
            buttonColor={isPrePaid ? "#59FF00" : "#0008ff"}
            text={"PrePaid"}
            onPress={() => {
              setIsPrePaid(true);
              setShowDiscountPercentageInput(false);
            }}
            buttonWidth={Dimensions.get("screen").width / 2.5}
          />
        </View>
      )}
      {/* <Text style={{ marginTop: 30, fontSize: 18, marginBottom: 10 }}>
        Price: ${productLocal.price}
      </Text> */}
      <Text style={{ marginTop: 30, fontSize: 18, marginBottom: 10 }}>
        Total: ${totalAfterDiscount}
      </Text>

      <MainButton
        text={"Add Item"}
        onPress={() => {
          if (
            (pickerValue != null &&
              discountPercentage != null &&
              discountPercentage != "") ||
            discountPercentage === 0
          ) {
            listOfitemPosibiltys.map((item) => {
              if (
                pickerValue != null &&
                pickerValue.includes("Other") &&
                otherPrice != null &&
                otherPrice != ""
              ) {
                if (pickerValue == item.product) {
                  pickedList.push(item);

                  totalList.push(totalAfterDiscount);
                }
              } else if (pickerValue.includes("Other") == false) {
                if (pickerValue == item.product) {
                  pickedList.push(item);
                  if (isPrePaid) {
                    totalList.push(0);
                  } else {
                    totalList.push(totalAfterDiscount);
                  }
                }
              } else {
                alert("if other is selected please enter a price");
              }
            });
          } else {
            alert("Please enter a discount percentage");
          }
          setDiscountPercentage(0);
          setOtherPrice(0);
          setTotalAfterDiscount(0);

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
                    {item.product} = ${item.totalAfterDiscount}
                    {"\n"} Discount: {item.discountPercentage}%
                  </Text>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 18,
                      color: item.isPrePaid ? "#59FF00" : "#F3412D",
                    }}
                  >
                    {item.isPrePaid == true ? "PrePaid" : "Not PrePaid"}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
          keyExtractor={(item, index) => item.product}
          listKey={listKeyNumber}
        />
      </View>
    </View>
  );
};

export default MISListItem;
