import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFunctions } from "firebase/functions";
import { getAuth } from "firebase/auth";
import { getFirestore, where } from "firebase/firestore";
import {
  arrayUnion,
  deleteDoc,
  documentId,
  DocumentSnapshot,
  increment,
  limit,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  serverTimestamp,
  Timestamp,
  collection,
  setDoc,
  doc,
} from "firebase/firestore";
import { async } from "@firebase/util";
import { add } from "react-native-reanimated";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCwzGo9wi9_EnYzIGBcxUQyS59uEoNXAU",
  authDomain: "ama-app-a5e7b.firebaseapp.com",
  projectId: "ama-app-a5e7b",
  storageBucket: "ama-app-a5e7b.appspot.com",
  messagingSenderId: "137084495352",
  appId: "1:137084495352:web:f58d8bce30e6dd6d57e20d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);
export async function AddNewItemToDbManualy({
  barcode,
  itemName,
  quanitiy,
  description,
  selectedCompany,
  location,
  data,
  year,
  month,
  day,
  hours,
  type,
  ItemType,
}) {
  try {
    await setDoc(
      doc(db, "companys", selectedCompany, ItemType, data),
      {
        barcode: barcode,
        id: barcode,
        product: itemName,
        quantity: quanitiy,
        decription: description,
        company: selectedCompany,
        timestamp: serverTimestamp(),
        itemLocation: location,
        lastPersonToScan: auth.currentUser.email,
        peopleWhoScanned: arrayUnion(auth.currentUser.email),

        // quantity: increment(1),
      },
      { merge: true }
    )
      .then(async () => {
        await setDoc(
          doc(
            db,
            "companys",
            selectedCompany,
            ItemType,
            data,
            "year added",
            year
          ),
          {
            // type_of_barcode: type,
            // barcode: data,
            // id: data,
            // product: name,
            year: year,
            timestamp: serverTimestamp(),
            quantity: quanitiy,
            peopleWhoScanned: arrayUnion(auth.currentUser.email),
          },
          { merge: true }
        );
      })
      .then(async () => {
        await setDoc(
          doc(
            db,
            "companys",
            selectedCompany,
            ItemType,
            data,
            "year added",
            year,
            "month",
            month
          ),
          {
            // type_of_barcode: type,
            // barcode: data,
            // id: data,
            // product: name,
            month: month,
            timestamp: serverTimestamp(),
            quantity: quanitiy,
            peopleWhoScanned: arrayUnion(auth.currentUser.email),
          },
          { merge: true }
        );
      })
      .then(async () => {
        await setDoc(
          doc(
            db,
            "companys",
            selectedCompany,
            ItemType,
            data,
            "year added",
            year,
            "month",
            month,
            "day",
            day
          ),
          {
            // type_of_barcode: type,
            // barcode: data,
            // id: data,
            // product: name,
            day: day,
            timestamp: serverTimestamp(),
            quantity: quanitiy,
            peopleWhoScanned: arrayUnion(auth.currentUser.email),
          },
          { merge: true }
        );
      })
      .then(async () => {
        console.log("itemAdded");
        try {
          await setDoc(
            doc(
              db,
              "companys",
              selectedCompany,
              ItemType,
              data,
              "year added",
              year,
              "month",
              month,
              "day",
              day,
              "hours",
              hours
            ),
            {
              // type_of_barcode: type,
              // barcode: data,
              // id: data,
              // product: name,
              hours: hours,
              type_of_barcode: type,
              barcode: data,
              id: data,
              product: itemName,
              quantity: quanitiy,
              decription: description,
              company: selectedCompany,

              itemLocation: location,
              lastPersonToScan: auth.currentUser.email,
              timestamp: serverTimestamp(),

              peopleWhoScanned: arrayUnion(auth.currentUser.email),
            },
            { merge: true }
          );
        } catch (e) {
          alert(e);
        }
      });
  } catch (e) {
    alert(e);
  }
}
export async function addExisitingItemToDb({
  barcode,
  itemName,
  quanitiy,
  description,
  selectedCompany,
  location,
  data,
  year,
  month,
  day,
  hours,
  type,
  ItemType,
}) {
  try {
    await setDoc(
      doc(db, "companys", selectedCompany, ItemType, data),
      {
        type_of_barcode: type,
        // barcode: data,
        // id: data,
        // product: name,

        quantity: increment(1),
      },
      { merge: true }
    )
      .then(async () => {
        await setDoc(
          doc(
            db,
            "companys",
            selectedCompany,
            ItemType,
            data,
            "year added",
            year
          ),
          {
            // type_of_barcode: type,
            // barcode: data,
            // id: data,
            // product: name,
            year: year,
            timestamp: serverTimestamp(),
            quantity: increment(1),
            peopleWhoScanned: arrayUnion(auth.currentUser.email),
          },
          { merge: true }
        );
      })
      .then(async () => {
        await setDoc(
          doc(
            db,
            "companys",
            selectedCompany,
            ItemType,
            data,
            "year added",
            year,
            "month",
            month
          ),
          {
            // type_of_barcode: type,
            // barcode: data,
            // id: data,
            // product: name,
            month: month,
            timestamp: serverTimestamp(),
            quantity: increment(1),
            peopleWhoScanned: arrayUnion(auth.currentUser.email),
          },
          { merge: true }
        );
      })
      .then(async () => {
        await setDoc(
          doc(
            db,
            "companys",
            selectedCompany,
            ItemType,
            data,
            "year added",
            year,
            "month",
            month,
            "day",
            day
          ),
          {
            // type_of_barcode: type,
            // barcode: data,
            // id: data,
            // product: name,
            day: day,
            timestamp: serverTimestamp(),
            quantity: increment(1),
            peopleWhoScanned: arrayUnion(auth.currentUser.email),
          },
          { merge: true }
        );
      })
      .then(async () => {
        await setDoc(
          doc(
            db,
            "companys",
            selectedCompany,
            ItemType,
            data,
            "year added",
            year,
            "month",
            month,
            "day",
            day,
            "hours",
            hours
          ),
          {
            // type_of_barcode: type,
            // barcode: data,
            // id: data,
            // product: name,
            hours: hours,
            type_of_barcode: type,
            barcode: barcode,
            id: data,
            product: itemName,
            quantity: quanitiy,
            decription: description,
            company: selectedCompany,
            timestamp: serverTimestamp(),
            itemLocation: location,
            lastPersonToScan: auth.currentUser.uid,
            timestamp: serverTimestamp(),
            quantity: increment(1),
            peopleWhoScanned: arrayUnion(auth.currentUser.email),
          },
          { merge: true }
        );
      });
  } catch (error) {
    console.log("i got an error ${error}");
  }
}

export async function AddNewItemToDb({
  barcode,
  itemName,
  quanitiy,
  description,
  selectedCompany,
  location,
  data,
  year,
  month,
  day,
  hours,
  type,
  ItemType,
}) {
  try {
    await setDoc(
      doc(db, "companys", selectedCompany, ItemType, data),
      {
        barcode: barcode,
        id: barcode,
        product: itemName,
        quantity: quanitiy,
        decription: description,
        company: selectedCompany,
        timestamp: serverTimestamp(),
        itemLocation: location,
        lastPersonToScan: auth.currentUser.email,
        peopleWhoScanned: arrayUnion(auth.currentUser.email),

        // quantity: increment(1),
      },
      { merge: true }
    )
      .then(async () => {
        await setDoc(
          doc(
            db,
            "companys",
            selectedCompany,
            ItemType,
            data,
            "year added",
            year
          ),
          {
            // type_of_barcode: type,
            // barcode: data,
            // id: data,
            // product: name,
            year: year,
            timestamp: serverTimestamp(),
            quantity: 1,
            peopleWhoScanned: arrayUnion(auth.currentUser.email),
          },
          { merge: true }
        );
      })
      .then(async () => {
        await setDoc(
          doc(
            db,
            "companys",
            selectedCompany,
            ItemType,
            data,
            "year added",
            year,
            "month",
            month
          ),
          {
            // type_of_barcode: type,
            // barcode: data,
            // id: data,
            // product: name,
            month: month,
            timestamp: serverTimestamp(),
            quantity: 1,
            peopleWhoScanned: arrayUnion(auth.currentUser.email),
          },
          { merge: true }
        );
      })
      .then(async () => {
        await setDoc(
          doc(
            db,
            "companys",
            selectedCompany,
            ItemType,
            data,
            "year added",
            year,
            "month",
            month,
            "day",
            day
          ),
          {
            // type_of_barcode: type,
            // barcode: data,
            // id: data,
            // product: name,
            day: day,
            timestamp: serverTimestamp(),
            quantity: 1,
            peopleWhoScanned: arrayUnion(auth.currentUser.email),
          },
          { merge: true }
        );
      })
      .then(async () => {
        console.log("itemAdded");
        await setDoc(
          doc(
            db,
            "companys",
            selectedCompany,
            ItemType,
            data,
            "year added",
            year,
            "month",
            month,
            "day",
            day,
            "hours",
            hours
          ),
          {
            // type_of_barcode: type,
            // barcode: data,
            // id: data,
            // product: name,
            hours: hours,
            type_of_barcode: type,
            barcode: data,
            id: data,
            product: itemName,
            quantity: quanitiy,
            decription: description,
            company: selectedCompany,

            itemLocation: location,
            lastPersonToScan: auth.currentUser.email,
            timestamp: serverTimestamp(),
            quantity: 1,
            peopleWhoScanned: arrayUnion(auth.currentUser.email),
          },
          { merge: true }
        );
      });
  } catch (e) {
    alert(e);
  }
}
export async function UseExistingItemOnDb({
  barcode,
  itemName,
  quanitiy,
  description,
  selectedCompany,
  location,
  data,
  year,
  month,
  day,
  hours,
  type,
  ItemType,
}) {
  try {
    await setDoc(
      doc(db, "companys", selectedCompany, ItemType, data),
      {
        // type_of_barcode: type,
        // barcode: data,
        // id: data,
        // product: name,
        timestamp: serverTimestamp(),
        quantity: increment(-1),
      },
      { merge: true }
    );
  } catch (error) {
    console.log("i got an error ${error}");
  }
  try {
    await setDoc(
      doc(db, "companys", selectedCompany, ItemType, data, "year used", year),
      {
        // type_of_barcode: type,
        // barcode: data,
        // id: data,
        // product: name,
        year: year,
        timestamp: serverTimestamp(),
        quantity: increment(1),
        peopleWhoScanned: arrayUnion(auth.currentUser.email),
      },
      { merge: true }
    )
      .then(async () => {
        await setDoc(
          doc(
            db,
            "companys",
            selectedCompany,
            ItemType,
            data,
            "year used",
            year,
            "month",
            month
          ),
          {
            // type_of_barcode: type,
            // barcode: data,
            // id: data,
            // product: name,
            month: month,
            timestamp: serverTimestamp(),
            quantity: increment(1),
            peopleWhoScanned: arrayUnion(auth.currentUser.email),
          },
          { merge: true }
        );
      })
      .then(async () => {
        await setDoc(
          doc(
            db,
            "companys",
            selectedCompany,
            ItemType,
            data,
            "year used",
            year,
            "month",
            month,
            "day",
            day
          ),
          {
            // type_of_barcode: type,
            // barcode: data,
            // id: data,
            // product: name,
            day: day,
            timestamp: serverTimestamp(),
            quantity: increment(1),
            peopleWhoScanned: arrayUnion(auth.currentUser.email),
          },
          { merge: true }
        );
      })
      .then(async () => {
        await setDoc(
          doc(
            db,
            "companys",
            selectedCompany,
            ItemType,
            data,
            "year used",
            year,
            "month",
            month,
            "day",
            day,
            "hours",
            hours
          ),
          {
            // type_of_barcode: type,
            // barcode: data,
            // id: data,
            // product: name,
            hours: hours,
            type_of_barcode: type,
            barcode: barcode,
            id: barcode,
            product: itemName,
            quantity: quanitiy,
            decription: description,
            company: selectedCompany,

            itemLocation: location,
            lastPersonToScan: auth.currentUser.email,
            timestamp: serverTimestamp(),
            quantity: increment(1),
            peopleWhoScanned: arrayUnion(auth.currentUser.email),
          },
          { merge: true }
        );
      });
  } catch (error) {
    console.log("i got an error ${error}");
    alert(error);
  }
}
export async function DeleteItemOnDB({
  selectedCompany,
  data,
  year,
  month,
  day,
  hours,
  ItemType,
}) {
  try {
    deleteDoc(doc(db, "companys", selectedCompany, ItemType, data));
    // .then(() => {
    //   deleteDoc(
    //     doc(
    //       db,
    //       "companys",
    //       selectedCompany,
    //       ItemType,
    //       data,
    //       "year added",
    //       year,
    //       "month",
    //       month,
    //       "day",
    //       day
    //     )
    //   );
    // })
    // .then(() => {
    //   deleteDoc(
    //     doc(
    //       db,
    //       "companys",
    //       selectedCompany,
    //       ItemType,
    //       data,
    //       "year added",
    //       year,
    //       "month",
    //       month
    //     )
    //   );
    // })
    // .then(() => {
    //   deleteDoc(
    //     doc(
    //       db,
    //       "companys",
    //       selectedCompany,
    //       ItemType,
    //       data,
    //       "year added",
    //       year
    //     )
    //   );
    // })
    // .then(() => {
    //   deleteDoc(doc(db, "companys", selectedCompany, ItemType, data));
    // });
  } catch (error) {
    alert("Item not deleted " + e);
  }
}
export const productsFirebase = [];
export async function GetProducts({
  selectedCompany,
  typeOfProduct,

  productState,
}) {
  try {
    onSnapshot(
      query(
        collection(db, "companys", selectedCompany, typeOfProduct),
        orderBy("timestamp", "desc")
      ),
      (querySnapshot) => {
        const arrays = [];
        querySnapshot.forEach((snap) => {
          arrays.push(snap.data());
          // key: snap.id;
        });
        productState(arrays);
        // console.log(products);
      }
    );
  } catch (e) {
    // alert("hi");
  }
}
export function GetYearForSelectedItem({
  selectedCompany,
  typeOfProduct,
  barcode,
  YearState,
  addOrUsed,
  year,
}) {
  onSnapshot(
    query(
      collection(
        db,
        "companys",
        selectedCompany,
        typeOfProduct,
        barcode,
        addOrUsed,
        year,
        "month"
      ),
      orderBy("timestamp", "asc")
    ),
    (querySnapshot) => {
      const yearArray = [];
      querySnapshot.forEach((snap) => {
        // const data = snap.data();
        yearArray.push(snap.get("month"));
        // console.log(data.year);
        // key: snap.id;
      });
      if (yearArray > 99999999999) {
        YearState(["Na"]);
      } else {
        YearState(yearArray);
      }
    }
  );
}
export function GetProductQuantityYear({
  selectedCompany,
  typeOfProduct,
  barcode,
  QuantityState,
  addOrUsed,
  year,
}) {
  onSnapshot(
    query(
      collection(
        db,
        "companys",
        selectedCompany,
        typeOfProduct,
        barcode,
        addOrUsed,
        year,
        "month"
      )
    ),
    (querySnapshot) => {
      const quantitysnap = [];
      querySnapshot.forEach((snap) => {
        quantitysnap.push(snap.get("quantity"));

        // key: snap.id;
      });
      if (quantitysnap < 9999999999) {
        QuantityState(quantitysnap);
      } else {
        QuantityState([0]);
      }
      console.log("Q " + quantitysnap);
    }
  );
}
export function GetMonthsForSelectedItems({
  selectedCompany,
  typeOfProduct,
  barcode,
  MonthState,
  addOrUsed,
  year,
  month,
}) {
  onSnapshot(
    query(
      collection(
        db,
        "companys",
        selectedCompany,
        typeOfProduct,
        barcode,
        addOrUsed,
        year,
        "month",
        month,
        "day"
      ),
      orderBy("timestamp", "asc")
    ),
    (querySnapshot) => {
      const monthArray = [];
      querySnapshot.forEach((snap) => {
        // const data = snap.data();
        monthArray.push(snap.get("day"));
        // console.log(data.year);
        // key: snap.id;
      });
      if (monthArray > 99999999999) {
        MonthState(["Na"]);
      } else {
        MonthState(monthArray);
      }
      console.log("M " + monthArray);
    }
  );
}
export function GetProductQuantityMonth({
  selectedCompany,
  typeOfProduct,
  barcode,
  QuantityState,
  addOrUsed,
  year,
  month,
}) {
  onSnapshot(
    query(
      collection(
        db,
        "companys",
        selectedCompany,
        typeOfProduct,
        barcode,
        addOrUsed,
        year,
        "month",
        month,
        "day"
      )
    ),
    (querySnapshot) => {
      const quantitysnap = [];
      querySnapshot.forEach((snap) => {
        quantitysnap.push(snap.get("quantity"));

        // key: snap.id;
      });
      if (quantitysnap < 9999999999) {
        QuantityState(quantitysnap);
      } else {
        QuantityState([0]);
      }
      console.log("Q " + quantitysnap);
    }
  );
}
export function GetDayForSelectedItems({
  selectedCompany,
  typeOfProduct,
  barcode,
  DayState,
  addOrUsed,
  year,
  month,
  day,
}) {
  onSnapshot(
    query(
      collection(
        db,
        "companys",
        selectedCompany,
        typeOfProduct,
        barcode,
        addOrUsed,
        year,
        "month",
        month,
        "day",
        day,
        "hours"
      ),
      orderBy("timestamp", "asc")
    ),
    (querySnapshot) => {
      const dayArray = [];
      querySnapshot.forEach((snap) => {
        // const data = snap.data();
        dayArray.push(snap.get("hours"));
        // console.log(data.year);
        // key: snap.id;
      });
      if (dayArray > 99999999999) {
        DayState(["Na"]);
      } else {
        DayState(dayArray);
      }
    }
  );
}
export function GetProductQuantityDay({
  selectedCompany,
  typeOfProduct,
  barcode,
  QuantityState,
  addOrUsed,
  year,
  month,
  day,
}) {
  onSnapshot(
    query(
      collection(
        db,
        "companys",
        selectedCompany,
        typeOfProduct,
        barcode,
        addOrUsed,
        year,
        "month",
        month,
        "day",
        day,
        "hours"
      )
    ),
    (querySnapshot) => {
      const quantitysnap = [];
      querySnapshot.forEach((snap) => {
        quantitysnap.push(snap.get("quantity"));

        // key: snap.id;
      });
      if (quantitysnap < 9999999999) {
        QuantityState(quantitysnap);
      } else {
        QuantityState([0]);
      }
      console.log(quantitysnap);
    }
  );
}
export async function VIC_MIS_addToDb({
  year,
  month,
  day,
  firstName,
  lastName,
  vistId,
  typeOfAppointment,
  typeofRefurel,
  typeOfPatient,
  typeOfIvBag,
  typeOfaddons,
  typeOfboosters,
  typeOfInjections,
}) {
  try {
    await setDoc(
      doc(db, "companys", "Vitalize Infusion", "MIS"),
      {
        // type_of_barcode: type,
        // barcode: data,
        // id: data,
        // product: name,
        typeOfInjections: typeOfInjections,
        typeOfPatient: typeOfPatient,
        typeOfIvBag: typeOfIvBag,
        typeOfaddons: typeOfaddons,
        typeOfboosters: typeOfboosters,
        typeofRefurel: typeofRefurel,
        typeOfAppointment: typeOfAppointment,
        fullName: firstName + " " + lastName,
        firstName: firstName,
        lastName: lastName,
        visitId: vistId,
        year: year,
        timestamp: serverTimestamp(),
        fullName,
        peopleWhoAdded: arrayUnion(auth.currentUser.email),
      },
      { merge: true }
    );
  } catch (e) {
    console.log(e);
  }
}
export const companyTeamsToDo = ({ setTeam }) => {
  onSnapshot(
    doc(db, "users", auth.currentUser.email),

    (doc) => {
      setTeam(doc.get("teams"));
    }
  );
};
export const addNewTask = async ({
  description,
  title,
  importance,
  todaysHours,
  todaysMin,
  fulldate,
  company,
  team,
}) => {
  try {
    const randomNumberTaskId = Math.random() * 1000000 + 1;
    const randomnumberString = randomNumberTaskId.toString();

    await setDoc(
      doc(db, "tasks", randomnumberString),
      {
        description: description,
        name: title,
        importance: parseInt(importance),
        lastUpdateTime: todaysHours + ":" + todaysMin,
        lastUpdateDate: fulldate,
        company: company,
        team: team,
        taskID: randomnumberString,
        whoPostedIt: auth.currentUser.email,
        timestamp: serverTimestamp(),
      },
      { merge: true }
    ).then(async () => {
      await setDoc(
        doc(db, "users", auth.currentUser.email),
        {
          teams: arrayUnion(team),
        },
        { merge: true }
      );
    });
  } catch (error) {
    alert(error);
    console.log("i got an error ${error}");
  }
};
export const addTeam = async (newTeam, teamRecipientArray) => {
  await setDoc(
    doc(db, "users", auth.currentUser.email),
    {
      teams: arrayUnion(newTeam),
    },
    { merge: true }
  ).then(() => {
    teamRecipientArray.forEach(async (item) => {
      await setDoc(
        doc(db, "users", item),
        {
          teams: arrayUnion(newTeam),
        },
        { merge: true }
      );
    });
  });
};
export const checkForEmployees = ({ teamRecipientArray, teamRecipient }) => {
  try {
    onSnapshot(
      query(collection(db, "users"), where("email", ">=", teamRecipient)),
      (querySnapshot) => {
        const quantitysnap = [];

        querySnapshot.forEach((snap) => {
          quantitysnap.push(snap.get("email"));

          // key: snap.id;
        });
        teamRecipientArray(quantitysnap);

        console.log(" fireeee x" + quantitysnap);
      }
    );
  } catch (e) {
    e;
  }
};
//add function to add MIS to db
export const addMIS = async ({
  year,
  month,
  day,
  firstName,
  lastName,

  typeOfAppointment,
  typeofReferral,
  typeOfPatient,
  typeOfIvBag,
  typeOfaddons,
  typeOfboosters,
  typeOfInjections,
  providerRefural,
  discount,
  paymentMethod,
  ulitmaList,
  visitId,
  DOB,
  stykuList,
  phlebotomyList,
  total,
  totalBeforeDiscount,
  timePatientWasSeen,
}) => {
  try {
    await setDoc(
      doc(db, "companys", "Vitalize Infusion", "MIS", visitId.toString()),
      {
        // type_of_barcode: type,
        // barcode: data,
        // id: data,
        // product: name,

        typeOfInjections: typeOfInjections,
        typeOfPatient: typeOfPatient,
        typeOfIvBag: typeOfIvBag,
        typeOfaddons: typeOfaddons,
        typeOfBoosters: typeOfboosters,
        typeofReferral: typeofReferral,
        typeOfAppointment: typeOfAppointment,
        fullName: lastName + ", " + firstName,
        firstName: firstName,
        lastName: lastName,
        visitId: visitId,

        providerReferral: providerRefural,
        timestamp: serverTimestamp(),
        whoSubmitted: auth.currentUser.email,
        discount: discount,
        paymentMethod: paymentMethod,
        ulitma: ulitmaList,
        boosters: typeOfboosters,
        total: total,
        phlebotomyList: phlebotomyList,
        stykuList: stykuList,
        DOB: DOB,
        totalBeforeDiscount: totalBeforeDiscount,
        timePatientWasSeen: timePatientWasSeen,
      },
      { merge: true }
    );
  } catch (e) {
    alert(e);
  }
};
export function patientSearchList({ patientArray, company }) {
  try {
    onSnapshot(
      query(
        collection(db, "companys", company, "patients")
        // where('fullName', '>=', searchName)
      ),

      (querySnapshot) => {
        const quantitysnap = [];

        querySnapshot.forEach((snap) => {
          quantitysnap.push(snap.data());

          // key: snap.id;
        });
        patientArray(quantitysnap);

        // console.log(' fireeee x  ' + quantitysnap)
      }
    );
  } catch (e) {
    e;
  }
}
export async function addNewPatient({
  email,
  lastName,
  firstName,
  phoneNumber,
  DOB,
  address,
  company,
}) {
  await setDoc(
    doc(db, "companys", company, "patients", email),
    {
      fullName: lastName + ", " + firstName,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      DOB: DOB,
      address: address,
      dateAdded: serverTimestamp(),
    },
    { merge: true }
  );
}
