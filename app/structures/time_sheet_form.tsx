import { type TimeSheet } from "./time_sheet";

export interface TimeSheetFormType {
    type: "create" | "update";
    event?: TimeSheet;
  }