import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  KeyboardAvoidingView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import InputBox from "../components/InputBox";
import { Picker } from "@react-native-picker/picker";
import DividerLine from "../components/DividerLine";
import MainButton from "../components/MainButton";
import { addMIS } from "../firebase";
import { arrayUnion } from "firebase/firestore";
import MISListItem from "../components/MISListItem";
import PatientSearch from "../components/PatientSearch";
import { useSelector, useDispatch } from "react-redux";
import {
  selectPatientDOB,
  selectPatientEmail,
  selectPatientFirstName,
  selectPatientLastName,
  setPatientDOB,
  setPatientFirstName,
  setPatientLastName,
} from "../slices/globalSlice";
// import DatePicker from "@react-native-community/datetimepicker";

const MISscreen = () => {
  //const [dob, setDob] = useState(null);
  const [typeOfAppoinment, setTypeOfAppoinment] = useState("Walk In");
  const [typeOfPatient, setTypeOfPatient] = useState("New");
  const [typeOfRefural, setTypeOfRefural] = useState("Google");
  const [providerRefural, setProviderRefural] = useState("Ashlee");
  const [typeOfIV, setTypeOfIV] = useState("Myers Cocktail");
  const [ivBagList, setIvBagList] = useState([]);
  const [ivBagObject, setIvBagObject] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [addOns, setAddOns] = useState("Electrolyte");
  const [addOnsList, setAddOnsList] = useState([]);
  const [addOnsObject, setAddOnsObject] = useState(null);
  const [vitaminInjections, setVitaminInjections] = useState("B Complex");
  const [injectionsList, setInjectionsList] = useState([]);
  const [injectionsObject, setInjectionsObject] = useState(null);
  const [visitNumber, setVisitNumber] = useState(null);
  const [booster, setBooster] = useState("Glutathione Booster");
  const [boosterList, setBoosterList] = useState([]);
  const [boosterObject, setBoosterObject] = useState(null);
  const [ulitma, setUlitma] = useState("Watermelon Packet");
  const [ulitmaList, setUlitmaList] = useState([]);
  const [ulitmaObject, setUlitmaObject] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [discount, setDiscount] = useState(0);
  const [styku, setStyku] = useState("1 Scans");
  const [stykuList, setStykuList] = useState([]);
  const [stykuObject, setStykuObject] = useState(null);
  const [otherPricePhlebotomy, setOtherPricePhlebotomy] = useState(null);

  const [total, setTotal] = useState(0);
  const [totalList, setTotalList] = useState([]);
  const [totalObject, setTotalObject] = useState(null);
  const [Phlebotomy, setPhlebotomy] = useState("Lab Draw");
  const [PhlebotomyList, setPhlebotomyList] = useState([]);
  const [PhlebotomyObject, setPhlebotomyObject] = useState(null);
  const [totalBeforeDiscount, setTotalBeforeDiscount] = useState(0);
  const [amaVitamins, setAmaVitamins] = useState("Myers AMA Vitamins");
  const [amaVitaminsList, setAmaVitaminsList] = useState([]);
  const [amaVitaminsObject, setAmaVitaminsObject] = useState(null);
  const [virtueRF, setVirtueRF] = useState("Buccal");
  const [virtueRFList, setVirtueRFList] = useState([]);
  const [virtueRFObject, setVirtueRFObject] = useState(null);
  const [splendorX, setSplendorX] = useState("Vascular Treatment");
  const [splendorXList, setSplendorXList] = useState([]);
  const [splendorXObject, setSplendorXObject] = useState(null);

  const firstName = useSelector(selectPatientFirstName);
  const lastName = useSelector(selectPatientLastName);
  const dob = useSelector(selectPatientDOB);
  const email = useSelector(selectPatientEmail);
  const dispatch = useDispatch();

  const [timePatientWasSeen, setTimePatientWasSeen] = useState("9:00AM");

  const amaProvider = () => {
    if (typeOfRefural == "AMA Provider") {
      return (
        <Picker
          style={{
            //   sheight: 50,
            width: Dimensions.get("screen").width / 1.5,

            //   marginBottom: 100,
          }}
          selectedValue={providerRefural}
          onValueChange={(itemValue, itemIndex) =>
            setProviderRefural(itemValue)
          }
        >
          <Picker.Item label="Ashlee" value="Ashlee" />
          <Picker.Item label="Nicole" value="Nicole" />
          <Picker.Item label="Seun" value="Seun" />
          <Picker.Item label="Dr. Nadir" value="Dr. Nadir" />
          <Picker.Item label="Dr. Khan" value="Dr. Khan" />
          <Picker.Item label="Daniel" value="Daniel" />
          <Picker.Item label="Brett" value="Brett" />
        </Picker>
      );
    }
  };
  var firstNames = null;
  useEffect(() => {
    //create random visit number
    const visitNumber = Math.floor(Math.random() * 1000000000000000);
    setVisitNumber(visitNumber);
    return () => {
      undefined;
    };
  }, [refresh]);
  // useEffect(() => {
  //   console.log(firstNames);
  // }, [firstNames]);
  useEffect(() => {
    //get total by adding up all in toal list

    var total = 0;
    if (totalList.length > 0) {
      totalList.forEach((item) => {
        total = total + item;
        console.log(total);
      });
      //find total aftrer discount percentage

      var discountAmount = (total * discount) / 100;
      var totalAfterDiscount = total - discountAmount;
      setTotalBeforeDiscount(total);
      setTotal(totalAfterDiscount);
    } else {
      setTotalBeforeDiscount(0);
      setTotal(0);
      total = 0;
    }
    return () => {
      undefined;
    };
  }, [totalList, refresh, discount]);

  return (
    <KeyboardAvoidingView
      behavior={"height"}
      keyboardVerticalOffset={50}
      style={{ flex: 1, alignItems: "center" }}
    >
      <View style={{ alignItems: "center" }}>
        <FlatList
          bounces={false}
          showsHorizontalScrollIndicator={false}
          data={[true]}
          renderItem={({ item, index }) => {
            return (
              <View style={{ alignItems: "center", flex: 1, margin: 20 }}>
                <PatientSearch />
                {firstName != null && lastName != null && dob != null && (
                  <View
                    style={{
                      backgroundColor: "#0291FFE6",
                      width: Dimensions.get("screen").width / 1.5,
                      margin: 10,
                      borderRadius: 40,
                      padding: 10,
                    }}
                  >
                    <TouchableOpacity
                      onLongPress={() => {
                        dispatch(setPatientDOB(null));
                        dispatch(setPatientFirstName(null));
                        dispatch(setPatientLastName(null));
                      }}
                    >
                      <Text style={{ textAlign: "center", fontSize: 18 }}>
                        {firstName} {lastName}
                      </Text>
                      <Text style={{ textAlign: "center", fontSize: 18 }}>
                        {dob}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
                <Picker
                  style={{
                    //   sheight: 50,
                    width: Dimensions.get("screen").width / 1.5,

                    //   marginBottom: 100,
                  }}
                  selectedValue={typeOfAppoinment}
                  onValueChange={(itemValue, itemIndex) =>
                    setTypeOfAppoinment(itemValue)
                  }
                >
                  <Picker.Item label="Walk In" value="Walk In" />
                  <Picker.Item label="Scheduled" value="Scheduled" />
                </Picker>
                <Text style={{ marginTop: 30, fontSize: 18, marginBottom: 10 }}>
                  Time Patient was Seen
                </Text>
                <DividerLine
                  lineWidth={Dimensions.get("screen").width / 2.5}
                  lineColor={"#0008ff"}
                />
                <Picker
                  style={{
                    //   height: 50,
                    width: Dimensions.get("screen").width / 1.5,

                    //   marginBottom: 2,
                  }}
                  selectedValue={timePatientWasSeen}
                  onValueChange={(itemValue, itemIndex) =>
                    setTimePatientWasSeen(itemValue)
                  }
                >
                  <Picker.Item label="7:00AM" value="7:00AM" />
                  <Picker.Item label="7:30AM" value="7:30AM" />
                  <Picker.Item label="8:00AM" value="8:00AM" />
                  <Picker.Item label="8:30M" value="8:30M" />
                  <Picker.Item label="9:00AM" value="9:00AM" />
                  <Picker.Item label="9:30AM" value="9:30AM" />
                  <Picker.Item label="10:00AM" value="10:00AM" />
                  <Picker.Item label="10:30AM" value="10:30AM" />
                  <Picker.Item label="11:00AM" value="11:00AM" />
                  <Picker.Item label="11:30AM" value="11:30AM" />
                  <Picker.Item label="12:00PM" value="12:00PM" />
                  <Picker.Item label="12:30PM" value="12:30PM" />
                  <Picker.Item label="1:00PM" value="1:00PM" />
                  <Picker.Item label="1:30PM" value="1:30PM" />
                  <Picker.Item label="2:00PM" value="2:00PM" />
                  <Picker.Item label="2:30PM" value="2:30PM" />
                  <Picker.Item label="3:00PM" value="3:00PM" />
                  <Picker.Item label="3:30PM" value="3:30PM" />
                  <Picker.Item label="4:00PM" value="4:00PM" />
                  <Picker.Item label="4:30PM" value="4:30PM" />
                  <Picker.Item label="5:00PM" value="5:00PM" />
                  <Picker.Item label="5:30PM" value="5:30PM" />
                  <Picker.Item label="6:00PM" value="6:00PM" />
                  <Picker.Item label="6:30PM" value="6:30PM" />
                  <Picker.Item label="7:00PM" value="7:00PM" />
                  <Picker.Item label="7:30PM" value="7:30PM" />
                  <Picker.Item label="8:00PM" value="8:00PM" />
                  <Picker.Item label="8:30PM" value="8:30PM" />
                  <Picker.Item label="9:00PM" value="9:00PM" />
                  <Picker.Item label="9:30PM" value="9:30PM" />
                  <Picker.Item label="10:00PM" value="10:00PM" />
                </Picker>

                <Picker
                  style={{
                    //   height: 50,
                    width: Dimensions.get("screen").width / 1.5,

                    //   marginBottom: 2,
                  }}
                  selectedValue={typeOfRefural}
                  onValueChange={(itemValue, itemIndex) =>
                    setTypeOfRefural(itemValue)
                  }
                >
                  <Picker.Item label="Google" value="Google" />
                  <Picker.Item label="Walk by" value="Walk by" />
                  <Picker.Item label="Instagram" value="Instagram" />
                  <Picker.Item label="Facebook" value="Facebook" />
                  <Picker.Item label="Yelp" value="Yelp" />

                  <Picker.Item label="Word of Mouth" value="Word of Mouth" />
                  <Picker.Item label="Online Add" value="Online Add" />
                  <Picker.Item label="AMA Provider" value="AMA Provider" />
                  <Picker.Item label="N/A" value="N/A" />
                  <Picker.Item
                    label="Vitalize Medspa"
                    value="Vitalize Medspa"
                  />
                  <Picker.Item label="Youtube" value="Youtube" />
                </Picker>
                {amaProvider()}
                <Text style={{ marginTop: 30, fontSize: 18, marginBottom: 10 }}>
                  Type Of Patient
                </Text>
                <DividerLine
                  lineWidth={Dimensions.get("screen").width / 2.5}
                  lineColor={"#0008ff"}
                />
                <Picker
                  style={{
                    //   height: 50,
                    width: Dimensions.get("screen").width / 1.5,

                    //   marginBottom: 2,
                  }}
                  selectedValue={typeOfPatient}
                  onValueChange={(itemValue, itemIndex) =>
                    setTypeOfPatient(itemValue)
                  }
                >
                  <Picker.Item label="New" value="New" />
                  <Picker.Item label="Established" value="Established" />
                  <Picker.Item label="Concierge" value="Concierge" />
                </Picker>
                <MISListItem
                  titleOfList={"Type Of Bag"}
                  pickerItems={[
                    <Picker.Item
                      label="Myers Cocktail"
                      value="Myers Cocktail"
                    />,
                    <Picker.Item
                      label="Mini Myers Cocktail"
                      value="Mini Myers Cocktail"
                    />,
                    <Picker.Item
                      label="1L Mini Myers Cocktail"
                      value="1L Mini Myers Cocktail"
                    />,
                    <Picker.Item label="1L Saline" value="1L Saline" />,
                    <Picker.Item label="AMA 1L Saline" value="AMA 1L Saline" />,
                    <Picker.Item label="500ml Saline" value="500ml Saline" />,
                    <Picker.Item label="Forever Young" value="Forever Young" />,
                    <Picker.Item label="Myers +" value="Myers +" />,

                    <Picker.Item label="NAD+ 250MG" value="NAD+ 250MG" />,
                    <Picker.Item label="NAD+ 500MG" value="NAD+ 500MG" />,
                    <Picker.Item label="NAD+ 1000MG" value="NAD+ 1000MG" />,

                    <Picker.Item label="Vitamin C-5G" value="Vitamin C-5G" />,
                    <Picker.Item label="High Dose C" value="High Dose C" />,
                  ]}
                  setPickedList={setIvBagList}
                  selectedValue={typeOfIV}
                  setPickerState={setTypeOfIV}
                  refresh={refresh}
                  setRefresh={setRefresh}
                  pickedList={ivBagList}
                  pickerValue={typeOfIV}
                  totalList={totalList}
                  setObject={setIvBagObject}
                  object={ivBagObject}
                  listKeyNumber={1}
                />

                {ivBagList.find((element) => {
                  if (element.product == "AMA 1L Saline") {
                    return true;
                  }
                }) && (
                  <MISListItem
                    titleOfList={"AMA Vitamins"}
                    pickerItems={[
                      <Picker.Item
                        label="Myers AMA Vitamins"
                        value="Myers AMA Vitamins"
                      />,
                      <Picker.Item
                        label="Myers + AMA Vitamins"
                        value="Myers + AMA Vitamins"
                      />,
                      <Picker.Item
                        label="Glutathione AMA Vitamins"
                        value="Glutathione AMA Vitamins"
                      />,
                    ]}
                    setPickedList={setAmaVitaminsList}
                    selectedValue={amaVitamins}
                    setPickerState={setAmaVitamins}
                    refresh={refresh}
                    setRefresh={setRefresh}
                    pickedList={amaVitaminsList}
                    pickerValue={amaVitamins}
                    totalList={totalList}
                    setObject={setAmaVitaminsObject}
                    object={amaVitaminsObject}
                    listKeyNumber={2}
                  />
                )}

                <MISListItem
                  titleOfList={"Add Ons"}
                  pickerItems={[
                    <Picker.Item label="Myers +" value="Myers +" />,
                    <Picker.Item label="Electrolyte" value="Electrolyte" />,
                    <Picker.Item label="Electrolyte" value="Electrolyte" />,
                    <Picker.Item label="Zinc" value="Zinc" />,
                    <Picker.Item label="Vitamin C" value="Vitamin C" />,
                    <Picker.Item label="Glutathione" value="Glutathione" />,
                    <Picker.Item label="B Complex" value="B Complex" />,
                    <Picker.Item label="B12 Add-On" value="B12 Add-On" />,
                    <Picker.Item label="4MG Zofran" value="4MG Zofran" />,
                    <Picker.Item
                      label="AMA 4MG Zofran"
                      value="AMA 4MG Zofran"
                    />,
                  ]}
                  setPickedList={setAddOnsList}
                  selectedValue={addOns}
                  setPickerState={setAddOns}
                  refresh={refresh}
                  setRefresh={setRefresh}
                  pickedList={addOnsList}
                  pickerValue={addOns}
                  totalList={totalList}
                  listKeyNumber={3}
                />
                <MISListItem
                  titleOfList={"Injections"}
                  pickerItems={[
                    <Picker.Item label="B Complex" value="B Complex" />,
                    <Picker.Item label="B-12" value="B-12" />,
                    <Picker.Item label="MIC-B12" value="MIC-B12" />,
                    <Picker.Item label="Vitamin D" value="Vitamin D" />,
                    <Picker.Item label="MIC JAGGER" value="MIC JAGGER" />,
                    <Picker.Item label="Extra 500ml" value="Extra 500ml" />,
                    <Picker.Item label="Extra 1L" value="Extra 1L" />,
                  ]}
                  setPickedList={setInjectionsList}
                  selectedValue={vitaminInjections}
                  setPickerState={setVitaminInjections}
                  refresh={refresh}
                  setRefresh={setRefresh}
                  pickedList={injectionsList}
                  pickerValue={vitaminInjections}
                  totalList={totalList}
                  listKeyNumber={4}
                />
                <MISListItem
                  titleOfList={"boosters"}
                  pickerItems={[
                    <Picker.Item
                      label="Glutathione Booster"
                      value="Glutathione Booster"
                    />,
                    <Picker.Item
                      label="Vitamin C Booster"
                      value="Vitamin C Booster"
                    />,
                    <Picker.Item label="Myers Booster" value="Myers Booster" />,
                    <Picker.Item
                      label="Myers + Booster"
                      value="Myers + Booster"
                    />,
                  ]}
                  setPickedList={setBoosterList}
                  selectedValue={booster}
                  setPickerState={setBooster}
                  refresh={refresh}
                  setRefresh={setRefresh}
                  pickedList={boosterList}
                  pickerValue={booster}
                  totalList={totalList}
                  listKeyNumber={5}
                />
                <Text style={{ marginTop: 30, fontSize: 18, marginBottom: 10 }}>
                  Payment Type
                </Text>
                <DividerLine
                  lineWidth={Dimensions.get("screen").width / 2.5}
                  lineColor={"#0008ff"}
                />
                <Picker
                  style={{
                    //   height: 50,
                    width: Dimensions.get("screen").width / 1.5,

                    //   marginBottom: 2,
                  }}
                  selectedValue={paymentMethod}
                  onValueChange={(itemValue, itemIndex) =>
                    setPaymentMethod(itemValue)
                  }
                >
                  <Picker.Item label="Cash" value="Cash" />
                  <Picker.Item label="Card" value="Card" />
                  <Picker.Item label="Gift Card" value="Gift Card" />
                </Picker>
                {/* //Watermelon, raspberry, grape, orange, cherry pomegranate,lemon
                aid ,pink lemon aid, blue raspberry,mocktini */}
                <MISListItem
                  titleOfList={"Ulitma Replenisher"}
                  pickerItems={[
                    <Picker.Item
                      label="Watermelon Packet"
                      value="Watermelon Packet"
                    />,
                    <Picker.Item
                      label="Watermelon Box"
                      value="Watermelon Box"
                    />,
                    <Picker.Item
                      label="Watermelon Canister"
                      value="Watermelon Canister"
                    />,
                    <Picker.Item
                      label="Watermelon Tub"
                      value="Watermelon Tub"
                    />,
                    <Picker.Item
                      label="Raspberry Packet"
                      value="Raspberry Packet"
                    />,
                    <Picker.Item label="Raspberry Box" value="Raspberry Box" />,
                    <Picker.Item
                      label="Raspberry Canister"
                      value="Raspberry Canister"
                    />,
                    <Picker.Item label="Raspberry Tub" value="Raspberry Tub" />,
                    <Picker.Item label="Grape Packet" value="Grape Packet" />,
                    <Picker.Item label="Grape Box" value="Grape Box" />,
                    <Picker.Item
                      label="Grape Canister"
                      value="Grape Canister"
                    />,
                    <Picker.Item label="Grape Tub" value="Grape Tub" />,
                    <Picker.Item label="Orange Packet" value="Orange Packet" />,
                    <Picker.Item label="Orange Box" value="Orange Box" />,
                    <Picker.Item
                      label="Orange Canister"
                      value="Orange Canister"
                    />,
                    <Picker.Item label="Orange Tub" value="Orange Tub" />,
                    <Picker.Item
                      label="Cherry Pomegranate Packet"
                      value="Cherry Pomegranate Packet"
                    />,
                    <Picker.Item
                      label="Cherry Pomegranate Box"
                      value="Cherry Pomegranate Box"
                    />,
                    <Picker.Item
                      label="Cherry Pomegranate Canister"
                      value="Cherry Pomegranate Canister"
                    />,
                    <Picker.Item
                      label="Cherry Pomegranate Tub"
                      value="Cherry Pomegranate Tub"
                    />,
                    <Picker.Item
                      label="Lemon Aid Packet"
                      value="Lemon Aid Packet"
                    />,
                    <Picker.Item label="Lemon Aid Box" value="Lemon Aid Box" />,
                    <Picker.Item
                      label="Lemon Aid Canister"
                      value="Lemon Aid Canister"
                    />,
                    <Picker.Item label="Lemon Aid Tub" value="Lemon Aid Tub" />,
                    <Picker.Item
                      label="Pink Lemon Aid Packet"
                      value="Pink Lemon Aid Packet"
                    />,
                    <Picker.Item
                      label="Pink Lemon Aid Box"
                      value="Pink Lemon Aid Box"
                    />,
                    <Picker.Item
                      label="Pink Lemon Aid Canister"
                      value="Pink Lemon Aid Canister"
                    />,
                    <Picker.Item
                      label="Pink Lemon Aid Tub"
                      value="Pink Lemon Aid Tub"
                    />,
                    <Picker.Item
                      label="Blue Raspberry Packet"
                      value="Blue Raspberry Packet"
                    />,
                    <Picker.Item
                      label="Blue Raspberry Box"
                      value="Blue Raspberry Box"
                    />,
                    <Picker.Item
                      label="Blue Raspberry Canister"
                      value="Blue Raspberry Canister"
                    />,
                    <Picker.Item
                      label="Blue Raspberry Tub"
                      value="Blue Raspberry Tub"
                    />,
                    <Picker.Item
                      label="Mocktini Packet"
                      value="Mocktini Packet"
                    />,
                    <Picker.Item label="Mocktini Box" value="Mocktini Box" />,
                    <Picker.Item
                      label="Mocktini Canister"
                      value="Mocktini Canister"
                    />,
                    <Picker.Item label="Mocktini Tub" value="Mocktini Tub" />,
                    <Picker.Item label="Sarcotropin" value="Sarcotropin" />,
                  ]}
                  setPickedList={setUlitmaList}
                  selectedValue={ulitma}
                  setPickerState={setUlitma}
                  refresh={refresh}
                  setRefresh={setRefresh}
                  pickedList={ulitmaList}
                  pickerValue={ulitma}
                  totalList={totalList}
                  listKeyNumber={6}
                />
                <MISListItem
                  titleOfList={"Styku"}
                  pickerItems={[
                    <Picker.Item label="1 Scans" value="1 Scans" />,
                    <Picker.Item label="3 Scans" value="3 Scans" />,
                  ]}
                  setPickedList={setStykuList}
                  selectedValue={styku}
                  setPickerState={setStyku}
                  refresh={refresh}
                  setRefresh={setRefresh}
                  pickedList={stykuList}
                  pickerValue={styku}
                  totalList={totalList}
                  listKeyNumber={7}
                />
                <MISListItem
                  titleOfList={"Phlebotomy"}
                  pickerItems={[
                    <Picker.Item label="Lab Draw" value="Lab Draw" />,
                    <Picker.Item
                      label="Therapeutic Phlebotomy"
                      value="Therapeutic Phlebotomy"
                    />,
                    <Picker.Item
                      label="Other Phlebotomy"
                      value="Other Phlebotomy"
                    />,
                  ]}
                  setPickedList={setPhlebotomyList}
                  selectedValue={Phlebotomy}
                  setPickerState={setPhlebotomy}
                  refresh={refresh}
                  setRefresh={setRefresh}
                  pickedList={PhlebotomyList}
                  pickerValue={Phlebotomy}
                  totalList={totalList}
                  listKeyNumber={8}
                />
                <Text style={{ marginTop: 30, fontSize: 18, marginBottom: 10 }}>
                  MedSpa
                </Text>
                <DividerLine
                  lineWidth={Dimensions.get("screen").width / 1.2}
                  lineColor={"#34B417"}
                />
                <MISListItem
                  titleOfList={"Splendor X"}
                  pickerItems={[
                    <Picker.Item
                      label="Vascular Treatment"
                      value="Vascular Treatment"
                    />,
                    <Picker.Item
                      label="Vascular Treatment package of 6"
                      value="Vascular Treatment package of 6"
                    />,
                    <Picker.Item
                      label="Pigment Treatment"
                      value="Pigment Treatment"
                    />,
                    <Picker.Item
                      label="Pigment Treatment package of 6"
                      value="Pigment Treatment package of 6"
                    />,
                    <Picker.Item label="Laser Facial" value="Laser Facial" />,
                    <Picker.Item
                      label="Laser Facial package of 6"
                      value="Laser Facial package of 6"
                    />,
                    <Picker.Item
                      label="Extra Small Area"
                      value="Extra Small Area"
                    />,
                    <Picker.Item
                      label="Extra Small Area package of 6"
                      value="Extra Small Area package of 6"
                    />,
                    <Picker.Item label="Small Area" value="Small Area" />,
                    <Picker.Item
                      label="Small Area package of 6"
                      value="Small Area package of 6"
                    />,
                    <Picker.Item label="Medium Area" value="Medium Area" />,
                    <Picker.Item
                      label="Medium Area package of 6"
                      value="Medium Area package of 6"
                    />,
                    <Picker.Item label="Large Area" value="Large Area" />,
                    <Picker.Item
                      label="Large Area package of 6"
                      value="Large Area package of 6"
                    />,
                    <Picker.Item
                      label="Extra Large Area"
                      value="Extra Large Area"
                    />,
                    <Picker.Item
                      label="Extra Large Area package of 6"
                      value="Extra Large Area package of 6"
                    />,
                    <Picker.Item label="Full Body" value="Full Body" />,
                  ]}
                  setPickedList={setSplendorXList}
                  selectedValue={splendorX}
                  setPickerState={setSplendorX}
                  refresh={refresh}
                  setRefresh={setRefresh}
                  pickedList={splendorXList}
                  pickerValue={splendorX}
                  totalList={totalList}
                  listKeyNumber={9}
                />
                <MISListItem
                  titleOfList={"Virtue RF"}
                  pickerItems={[
                    <Picker.Item label="Buccal" value="Buccal" />,
                    <Picker.Item
                      label="Buccal package of 3"
                      value="Buccal package of 3"
                    />,
                    <Picker.Item label="Submental" value="Submental" />,
                    <Picker.Item
                      label="Submental package of 3"
                      value="Submental package of 3"
                    />,
                    <Picker.Item label="Arms" value="Arms" />,
                    <Picker.Item
                      label="Arms package of 3"
                      value="Arms package of 3"
                    />,
                    <Picker.Item label="Abdomen" value="Abdomen" />,
                    <Picker.Item
                      label="Abdomen package of 3"
                      value="Abdomen package of 3"
                    />,
                    <Picker.Item label="Scars" value="Scars" />,
                    <Picker.Item
                      label="Scars package of 3"
                      value="Scars package of 3"
                    />,
                    <Picker.Item label="Buttocks" value="BucButtockscal" />,
                    <Picker.Item
                      label="Buttocks package of 3"
                      value="Buttocks package of 3"
                    />,
                    <Picker.Item label="Stretch Marks" value="Stretch Marks" />,
                    <Picker.Item
                      label="Stretch Marks package of 3"
                      value="Stretch Marks package of 3"
                    />,
                    <Picker.Item label="Thighs" value="Thighs" />,
                    <Picker.Item
                      label="Thighs package of 3"
                      value="Thighs package of 3"
                    />,
                    <Picker.Item label="Face" value="Face" />,
                    <Picker.Item
                      label="Face package of 3"
                      value="Face package of 3"
                    />,
                    <Picker.Item label="Face + Neck" value="Face + Neck" />,
                    <Picker.Item
                      label="Face + Neck package of 3"
                      value="Face + Neck package of 3"
                    />,
                    <Picker.Item
                      label="Face + Neck + Decollete"
                      value="Face + Neck + Decollete"
                    />,
                    <Picker.Item
                      label="Face + Neck + Decollete package of 3"
                      value="Face + Neck + Decollete package of 3"
                    />,
                  ]}
                  setPickedList={setVirtueRFList}
                  selectedValue={virtueRF}
                  setPickerState={setVirtueRF}
                  refresh={refresh}
                  setRefresh={setRefresh}
                  pickedList={virtueRFList}
                  pickerValue={virtueRF}
                  totalList={totalList}
                  listKeyNumber={10}
                />
                <MISListItem
                  titleOfList={"PCA"}
                  pickerItems={[
                    <Picker.Item label="Lab Draw" value="Lab Draw" />,
                    <Picker.Item
                      label="Therapeutic Phlebotomy"
                      value="Therapeutic Phlebotomy"
                    />,
                    <Picker.Item
                      label="Other Phlebotomy"
                      value="Other Phlebotomy"
                    />,
                  ]}
                  setPickedList={setPhlebotomyList}
                  selectedValue={Phlebotomy}
                  setPickerState={setPhlebotomy}
                  refresh={refresh}
                  setRefresh={setRefresh}
                  pickedList={PhlebotomyList}
                  pickerValue={Phlebotomy}
                  totalList={totalList}
                  listKeyNumber={11}
                />
                <MISListItem
                  titleOfList={"Phlebotomy"}
                  pickerItems={[
                    <Picker.Item label="Lab Draw" value="Lab Draw" />,
                    <Picker.Item
                      label="Therapeutic Phlebotomy"
                      value="Therapeutic Phlebotomy"
                    />,
                    <Picker.Item
                      label="Other Phlebotomy"
                      value="Other Phlebotomy"
                    />,
                  ]}
                  setPickedList={setPhlebotomyList}
                  selectedValue={Phlebotomy}
                  setPickerState={setPhlebotomy}
                  refresh={refresh}
                  setRefresh={setRefresh}
                  pickedList={PhlebotomyList}
                  pickerValue={Phlebotomy}
                  totalList={totalList}
                  listKeyNumber={12}
                />
                <Text style={{ marginTop: 30, fontSize: 18, marginBottom: 10 }}>
                  Discount
                </Text>
                <DividerLine
                  lineWidth={Dimensions.get("screen").width / 2.5}
                  lineColor={"#0008ff"}
                />
                <Picker
                  style={{
                    //   height: 50,
                    width: Dimensions.get("screen").width / 1.5,

                    //   marginBottom: 2,
                  }}
                  selectedValue={discount}
                  onValueChange={(itemValue, itemIndex) =>
                    setDiscount(itemValue)
                  }
                >
                  <Picker.Item label="0%" value={0} />
                  <Picker.Item label="5%" value={5} />
                  <Picker.Item label="10%" value={10} />
                  <Picker.Item label="15%" value={15} />
                  <Picker.Item label="20%" value={20} />
                  <Picker.Item label="25%" value={25} />
                  <Picker.Item label="30%" value={30} />
                  <Picker.Item label="35%" value={35} />
                  <Picker.Item label="40%" value={40} />
                  <Picker.Item label="45%" value={45} />
                  <Picker.Item label="50%" value={50} />
                  <Picker.Item label="55%" value={55} />
                  <Picker.Item label="60%" value={60} />
                  <Picker.Item label="65%" value={65} />
                  <Picker.Item label="70%" value={70} />
                  <Picker.Item label="75%" value={75} />
                  <Picker.Item label="80%" value={80} />
                  <Picker.Item label="85%" value={85} />
                  <Picker.Item label="90%" value={90} />
                  <Picker.Item label="95%" value={95} />
                  <Picker.Item label="100%" value={100} />
                </Picker>
                <Text style={{ marginTop: 30, fontSize: 18, marginBottom: 10 }}>
                  Total Before Discount {totalBeforeDiscount}
                </Text>
                <Text style={{ marginTop: 30, fontSize: 18, marginBottom: 10 }}>
                  Total {total}
                </Text>
                <MainButton
                  text={"Add MIS"}
                  onPress={() => {
                    //add mis to db
                    if (firstName == null && lastName == null) {
                      alert("Please select a patient");
                    } else if (totalList.length == 0) {
                      alert("Please select a service");
                    } else if (
                      visitNumber != null &&
                      timePatientWasSeen != null
                    ) {
                      addMIS({
                        typeOfIvBag: ivBagList,
                        providerRefural: providerRefural,
                        typeOfInjections: injectionsList,
                        firstName: firstName,
                        lastName: lastName,
                        DOB: dob,
                        email: email,
                        typeofReferral: typeOfRefural,
                        typeOfAppointment: typeOfAppoinment,
                        typeOfaddons: addOnsList,
                        ulitmaList: ulitmaList,
                        discount: discount,
                        paymentMethod: paymentMethod,
                        visitId: visitNumber,
                        typeOfboosters: boosterList,
                        typeOfPatient: typeOfPatient,
                        total: total,
                        stykuList: stykuList,
                        phlebotomyList: PhlebotomyList,
                        totalBeforeDiscount: totalBeforeDiscount,
                        timePatientWasSeen: timePatientWasSeen,
                      }).then(() => {
                        setIvBagList([]);
                        setProviderRefural(null);
                        setInjectionsList([]);
                        setTotalList([]);
                        setTypeOfRefural(null);
                        setTypeOfAppoinment(null);
                        setAddOnsList([]);
                        setUlitmaList([]);
                        setDiscount(0);
                        setPaymentMethod(null);
                        setVisitNumber(null);
                        setBoosterList([]);
                        setTypeOfPatient(null);
                        setTotal(0);
                        setStykuList([]);
                        setPhlebotomyList([]);
                        setTotalBeforeDiscount(0);
                        setTimePatientWasSeen(null);

                        dispatch(setPatientDOB(null));
                        dispatch(setPatientFirstName(""));
                        dispatch(setPatientLastName(""));
                        setRefresh(!refresh);
                        alert("MIS Added");
                      });
                    }
                  }}
                  buttonWidth={Dimensions.get("screen").width / 1.2}
                />
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default MISscreen;

const styles = StyleSheet.create({});
