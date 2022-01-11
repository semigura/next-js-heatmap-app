import { atom } from "recoil";

export const activityListState = atom<{ id: string; date: number | Date }[]>({
  key: "activityListState",
  default: [],
});

export const taskListState = atom<string[]>({
  key: "taskListState",
  default: [],
});

export default activityListState;
