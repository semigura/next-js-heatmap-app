import { useEffect, useState } from "react";

import { css } from "@emotion/react";
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

import { activityListState } from "../atoms/states";

import "react-calendar-heatmap/dist/styles.css";
import DurationSubmittedDate from "./DurationSubmittedDate";
import LastSubmittedDate from "./LastSubmittedDate";

function Task(props: { taskType: string }) {
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
      localStorage.setItem("activityListState", JSON.stringify(activityList));
    }, 1000);
    return () => clearInterval(interval);
  }, [activityList]);

  const handleClick = () => {
    setActivityList([...activityList, { id: taskType, date: new Date() }]);
  };

  const handleClearClick = () => {
    setActivityList(
      activityList.filter((activity) => activity.id !== taskType)
    );
  };

  const value = filteredList.map((item) => {
    return {
      date: format(new Date(item.date), "yyyy-MM-dd"),
      count: 1,
    };
  });

  return (
    <div>
      <div
        css={css`
          & .react-calendar-heatmap {
            max-height: 100px;
          }
        `}
      >
        <CalendarHeatmap
          startDate={addMonths(new Date(), -1)}
          endDate={new Date()}
          values={value}
        />
      </div>
      <button onClick={handleClick} type="button">
        {taskType}
      </button>
      <LastSubmittedDate filteredList={filteredList} />
      <DurationSubmittedDate filteredList={filteredList} />
      <button
        type="button"
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
      >
        押し忘れ
      </button>
      <button onClick={handleClearClick} type="button">
        {taskType} clear
      </button>
    </div>
  );
}

export default Task;
