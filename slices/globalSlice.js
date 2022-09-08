import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const globalSlice = createSlice({
  name: "global",
  initialState: {
    company: null,
    date: null,
    isAuthUser: false,
    taskID: null,
    patientFirstName: null,
    patientLastName: null,
    patientDOB: null,
  },
  reducers: {
    setCompany: (state, action) => {
      state.company = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setIsAuthUser: (state, action) => {
      state.isAuthUser = action.payload;
    },
    setTaskID: (state, action) => {
      state.taskID = action.payload;
    },
    setPatientFirstName: (state, action) => {
      state.patientFirstName = action.payload;
    },
    setPatientLastName: (state, action) => {
      state.patientLastName = action.payload;
    },
    setPatientDOB: (state, action) => {
      state.patientDOB = action.payload;
    },
  },
});

export const {
  setCompany,
  setDate,
  setIsAuthUser,
  setTaskID,
  setPatientFirstName,
  setPatientLastName,
  setPatientDOB,
} = globalSlice.actions;
export const selectCompany = (state) => state.global.company;
export const selectDate = (state) => state.global.date;
export const selectIsAuthUser = (state) => state.global.isAuthUser;
export const selectTaskID = (state) => state.global.taskID;
export const selectPatientFirstName = (state) => state.global.patientFirstName;
export const selectPatientLastName = (state) => state.global.patientLastName;
export const selectPatientDOB = (state) => state.global.patientDOB;
export default globalSlice.reducer;
