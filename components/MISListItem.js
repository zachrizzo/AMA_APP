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
      product: "B12",
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
  ];
  useEffect(async () => {
    // caculate price after discountPercentage

    var priceAfterDiscount =
      productLocal.price - productLocal.price * (discountPercentage / 100);
    // setTotalAfterDiscount(0);
    setTotalAfterDiscount(priceAfterDiscount);
    return async () => {
      await setRefresh(!refresh);
    };
  });
  useEffect(() => {
    //match picker value with listofitemposibiltys and if it matches set the product

    console.log("pickerValue", pickerValue);
    listOfitemPosibiltys.map((item) => {
      if (item.product === pickerValue) {
        setProductLocal(item);
        // console.log("item", item);
      }
    });
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
                  totalList.push(totalAfterDiscount);
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
          keyExtractor={(item, index) => index}
          listKey={listKeyNumber}
        />
      </View>
    </View>
  );
};

export default MISListItem;
