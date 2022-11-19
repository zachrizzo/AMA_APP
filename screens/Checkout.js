import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import MainButton from "../components/MainButton";
import { BarCodeScanner } from "expo-barcode-scanner";
import { searchPatientByGiftCardNumber, useAmountGiftCard } from "../firebase";
import { useSelector } from "react-redux";
import { selectCompany } from "../slices/globalSlice";
import InputBox from "../components/InputBox";
import Picker from "../components/Picker";
import * as Haptics from "expo-haptics";

const Checkout = () => {
  const [scanGiftCard, setScanGiftCard] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [patient, setPatient] = useState(null);
  const [useGiftCard, setUseGiftCard] = useState(false);
  const [amountUsedOnGiftCard, setAmountUsedOnGiftCard] = useState("");
  const company = useSelector(selectCompany);
  const handleBarCodeScanned = async ({ type, data }) => {
    try {
      if (company !== null) {
        setScanGiftCard(false);
        searchPatientByGiftCardNumber({
          giftCardNumber: data,
          company: company,
          patientArray: setPatient,
        });
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setRefresh(!refresh);
      } else {
        alert("no company");
      }
    } catch (e) {
      alert(e);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={"height"}
      keyboardVerticalOffset={50}
      style={{ flex: 1, flexDirection: "column", alignItems: "center" }}
    >
      <FlatList
        data={[true]}
        bounces={false}
        style={{
          width: "100%",
          flex: 1,
        }}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{ flex: 1, flexDirection: "column", alignItems: "center" }}
            >
              <View
                style={{
                  padding: 10,
                  margin: 30,

                  alignItems: "center",
                  flex: 1,
                  borderRadius: 30,
                  width: Dimensions.get("window").width / 1.3,
                  backgroundColor: "#E2E2E2C2",
                }}
              >
                <MainButton
                  text={"Scan Gift Card"}
                  onPress={() => {
                    setScanGiftCard(true);
                  }}
                />
                {scanGiftCard && (
                  <BarCodeScanner
                    onBarCodeScanned={
                      scanned ? undefined : handleBarCodeScanned
                    }
                    style={StyleSheet.absoluteFillObject}
                  />
                )}
              </View>
              <View
                style={{
                  backgroundColor: "#E2E2E2C2",
                  alignSelf: "center",
                  flexDirection: "column",
                  alignItems: "center",
                  width: Dimensions.get("window").width / 1.5,
                  borderRadius: 30,
                }}
              >
                <FlatList
                  data={patient}
                  bounces={false}
                  style={{ width: "90%" }}
                  renderItem={({ item, index }) => {
                    return (
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "column",
                          marginVertical: 10,
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            marginVertical: 10,
                            fontSize: 20,
                            fontWeight: "bold",
                            color: "#1F52ED",
                          }}
                        >
                          First Name:
                        </Text>
                        <Text style={{ fontSize: 20 }}>{item.firstName}</Text>
                        <Text
                          style={{
                            marginVertical: 10,
                            fontSize: 20,
                            fontWeight: "bold",
                            color: "#1F52ED",
                          }}
                        >
                          Last Name:
                        </Text>
                        <Text style={{ fontSize: 20 }}>{item.lastName}</Text>
                        <Text
                          style={{
                            marginVertical: 10,
                            fontSize: 20,
                            fontWeight: "bold",
                            color: "#1F52ED",
                          }}
                        >
                          DOB:
                        </Text>
                        <Text style={{ fontSize: 20 }}>{item.DOB}</Text>
                        <Text
                          style={{
                            marginVertical: 10,
                            fontSize: 20,
                            fontWeight: "bold",
                            color: "#1F52ED",
                          }}
                        >
                          Gift Card Number:
                        </Text>
                        <Text style={{ fontSize: 20 }}>
                          {item.giftCardNumber}
                        </Text>
                        <Text
                          style={{
                            marginVertical: 10,
                            fontSize: 20,
                            fontWeight: "bold",
                            color: "#1F52ED",
                          }}
                        >
                          Original Value:
                        </Text>
                        <Text style={{ fontSize: 20 }}>
                          {item.totalOnGiftCard}
                        </Text>
                        <Text
                          style={{
                            marginVertical: 10,
                            fontSize: 20,
                            fontWeight: "bold",
                            color: "#1F52ED",
                          }}
                        >
                          Current Balance:
                        </Text>

                        <Text style={{ fontSize: 20 }}>
                          {item.currentAmountOnGiftCard}
                        </Text>
                        <Text
                          style={{
                            marginVertical: 10,
                            fontSize: 20,
                            fontWeight: "bold",
                            color: "#1F52ED",
                          }}
                        >
                          Date Was Purchased
                        </Text>
                        {item.dateGiftCardWasAdded != null && (
                          <Text style={{ fontSize: 20 }}>
                            {item.dateGiftCardWasAdded.toDate().toDateString()}
                          </Text>
                        )}
                        <MainButton
                          text={"Use Gift Card"}
                          onPress={() => {
                            setUseGiftCard(true);
                          }}
                        />
                        {useGiftCard && (
                          <View>
                            <InputBox
                              placeholder={"Amount to Used"}
                              onChangeText={(text) => {
                                setAmountUsedOnGiftCard(text);
                              }}
                              value={amountUsedOnGiftCard}
                              width={Dimensions.get("screen").width / 1.8}
                              color={"#0008ff"}
                              keyboardType={"numeric"}
                            />
                            <MainButton
                              text={"Submit"}
                              onPress={() => {
                                setUseGiftCard(false);
                                //subtract amountToUse from gift card

                                useAmountGiftCard({
                                  email: item.email,
                                  amountToUse:
                                    item.currentAmountOnGiftCard -
                                    amountUsedOnGiftCard,

                                  company: company,
                                });
                              }}
                            />
                          </View>
                        )}
                      </View>
                    );
                  }}
                  keyExtractor={(item, index) => index}
                  listKey={1}
                />
              </View>
            </View>
          );
        }}
        keyExtractor={(item, index) => index}
      />
    </KeyboardAvoidingView>
  );
};
export default Checkout;
