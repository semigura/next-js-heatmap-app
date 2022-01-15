import { useEffect, useState } from "react";

import { css } from "@emotion/react";
import { Card, Button, Stack } from "@mui/material";
import {
  addMonths,
  format,
  setHours,
  setSeconds,
  subDays,
  setMinutes,
} from "date-fns";
import CalendarHeatmap from "react-calendar-heatmap";
import { useRecoilState } from "recoil";

import { activityListState, taskListState } from "../atoms/states";

import "react-calendar-heatmap/dist/styles.css";
import DurationSubmittedDate from "./DurationSubmittedDate";
import LastSubmittedDate from "./LastSubmittedDate";

function Task(props: { taskType: string }) {
  const [taskList, setTaskList] = useRecoilState(taskListState);
  const { taskType } = props;
  const [activityList, setActivityList] = useRecoilState(activityListState);
  const [filteredList, setFilteredList] = useState<
    { id: string; date: number | Date }[]
  >([]);

  useEffect(() => {
    setFilteredList(
      activityList.filter((activity) => activity.id === taskType)
    );
  }, [activityList, taskType]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        localStorage.getItem("activityListState") !==
        JSON.stringify(activityList)
      ) {
        localStorage.setItem("activityListState", JSON.stringify(activityList));
      }
      if (localStorage.getItem("taskListState") !== JSON.stringify(taskList)) {
        localStorage.setItem("taskListState", JSON.stringify(taskList));
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [activityList, taskList]);

  const handleClick = () => {
    setActivityList([...activityList, { id: taskType, date: new Date() }]);
  };

  const handleClearClick = () => {
    setActivityList(
      activityList.filter((activity) => activity.id !== taskType)
    );
    setTaskList(taskList.filter((task) => task !== taskType));
  };

  const value = filteredList.map((item) => {
    return {
      date: format(new Date(item.date), "yyyy-MM-dd"),
      count: 1,
    };
  });

  return (
    <Card
      css={css`
        padding: 3%;
      `}
    >
      <Stack spacing={2}>
        <div
          css={css`
            text-align: center;
            & .react-calendar-heatmap {
              max-height: 100px;
            }
          `}
        >
          <CalendarHeatmap
            startDate={addMonths(new Date(), -12)}
            endDate={new Date()}
            values={value}
          />
        </div>
        <Button onClick={handleClick} variant="contained">
          {taskType}
        </Button>
        <LastSubmittedDate filteredList={filteredList} />
        <DurationSubmittedDate filteredList={filteredList} />
        <Button
          onClick={() => {
            setActivityList([
              ...activityList,
              {
                id: taskType,
                date: setSeconds(
                  setMinutes(setHours(subDays(new Date(), 1), 23), 59),
                  59
                ),
              },
            ]);
          }}
          variant="contained"
        >
          押し忘れ
        </Button>
        <Button onClick={handleClearClick} variant="contained">
          {taskType} clear
        </Button>
      </Stack>
    </Card>
  );
}

export default Task;
