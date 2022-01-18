import { atom } from "recoil";

export type activityListStateProps = { id: string; date: number | Date }[];

export const activityListState = atom<activityListStateProps>({
  key: "activityListState",
  default: [],
});

export const taskListState = atom<string[]>({
  key: "taskListState",
  default: [],
});
