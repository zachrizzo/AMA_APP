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
  selectPatientFirstName,
  selectPatientLastName,
  setPatientDOB,
  setPatientFirstName,
  setPatientLastName,
} from "../slices/globalSlice";
import DatePicker from "@react-native-community/datetimepicker";

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
  const [vitaminInjections, setVitaminInjections] = useState("B12");
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

  const MyersCocktailPrice = 150;
  const ForeverYoungPrice = 200;
  const MyersPlusPrice = 250;
  const Glutathoineprice = 50;
  const NADprice = 50;
  const VitaminCInfusionPrice = 50;
  const VitaminC5GPrice = 50;
  const HighDoseVitaminCPrice = 50;
  const MyersCocktailAddOnsPrice = 50;
  const ElectrolytePrice = 25;
  const VitaminCPrice = 25;
  const GlutathioneadonsPrice = 25;
  const BComplexPrice = 25;
  const B12Price = 25;
  const GlutathioneBoosterPrice = 25;
  const WatermelonPacketPrice = 25;
  const firstName = useSelector(selectPatientFirstName);
  const lastName = useSelector(selectPatientLastName);
  const dob = useSelector(selectPatientDOB);
  const dispatch = useDispatch();

  const [timePatientWasSeen, setTimePatientWasSeen] = useState(null);

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
  }, [refresh]);
  useEffect(() => {
    console.log(firstNames);
  }, [firstNames]);
  useEffect(() => {
    //get total by adding up all in toal list

    var total = 0;
    if (totalList.length > 0) {
      totalList.forEach((item) => {
        total = total + item.price;
        console.log(total);
      });
      //find total aftrer discount percentage

      var discountAmount = (total * discount) / 100;
      var totalAfterDiscount = total - discountAmount;
      setTotalBeforeDiscount(total);
      setTotal(totalAfterDiscount);
    } else {
      setTotal(0);
      total = 0;
    }
  }, [totalList, refresh, discount]);

  return (
    <KeyboardAvoidingView
      behavior={"height"}
      keyboardVerticalOffset={50}
      style={{ flex: 1, alignItems: "center" }}
    >
      <View style={{ alignItems: "center" }}>
        <FlatList
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
                    <Picker.Item label="B12" value="B12" />,
                    <Picker.Item label="4MG Zofran" value="4MG Zofran" />,
                    <Picker.Item
                      label="AMA 4MG Zofran"
                      value="AMA 4MG Zofran"
                    />,
                  ]}
                  selectedValue={addOns}
                  setPickerState={setAddOns}
                  refresh={refresh}
                  setRefresh={setRefresh}
                  pickedList={addOnsList}
                  pickerValue={addOns}
                  totalList={totalList}
                  listKeyNumber={2}
                />
                <MISListItem
                  titleOfList={"Injections"}
                  pickerItems={[
                    <Picker.Item label="B Complex" value="B Complex" />,
                    <Picker.Item label="B12" value="B12" />,
                    <Picker.Item label="MIC-B12" value="MIC-B12" />,
                    <Picker.Item label="Vitamin D" value="Vitamin D" />,
                    <Picker.Item label="MIC JAGGER" value="MIC JAGGER" />,
                    <Picker.Item label="Extra 500ml" value="Extra 500ml" />,
                    <Picker.Item label="Extra 1L" value="Extra 1L" />,
                  ]}
                  selectedValue={vitaminInjections}
                  setPickerState={setVitaminInjections}
                  refresh={refresh}
                  setRefresh={setRefresh}
                  pickedList={injectionsList}
                  pickerValue={vitaminInjections}
                  totalList={totalList}
                  listKeyNumber={3}
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
                  selectedValue={booster}
                  setPickerState={setBooster}
                  refresh={refresh}
                  setRefresh={setRefresh}
                  pickedList={boosterList}
                  pickerValue={booster}
                  totalList={totalList}
                  listKeyNumber={4}
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
                  selectedValue={ulitma}
                  setPickerState={setUlitma}
                  refresh={refresh}
                  setRefresh={setRefresh}
                  pickedList={ulitmaList}
                  pickerValue={ulitma}
                  totalList={totalList}
                  listKeyNumber={5}
                />
                <MISListItem
                  titleOfList={"Styku"}
                  pickerItems={[
                    <Picker.Item label="1 Scans" value="1 Scans" />,
                    <Picker.Item label="3 Scans" value="3 Scans" />,
                  ]}
                  selectedValue={styku}
                  setPickerState={setStyku}
                  refresh={refresh}
                  setRefresh={setRefresh}
                  pickedList={stykuList}
                  pickerValue={styku}
                  totalList={totalList}
                  listKeyNumber={6}
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
                  selectedValue={Phlebotomy}
                  setPickerState={setPhlebotomy}
                  refresh={refresh}
                  setRefresh={setRefresh}
                  pickedList={PhlebotomyList}
                  pickerValue={Phlebotomy}
                  totalList={totalList}
                  listKeyNumber={7}
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
                    if (
                      totalList.length > 0 &&
                      total > 0 &&
                      totalBeforeDiscount > 0 &&
                      firstName != null &&
                      lastName != null &&
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
                        ivBagList = [];
                        providerRefural = null;
                        injectionsList = [];
                        firstName = null;
                        lastName = null;
                        dob = null;
                        typeOfRefural = null;
                        typeOfAppoinment = null;
                        addOnsList = [];
                        ulitmaList = [];
                        discount = 0;
                        paymentMethod = null;
                        visitNumber = null;
                        boosterList = [];
                        typeOfPatient = null;
                        total = 0;
                        stykuList = [];
                        PhlebotomyList = [];
                        totalBeforeDiscount = 0;
                        timePatientWasSeen = null;
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
