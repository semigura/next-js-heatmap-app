import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { css } from "@emotion/react";
import {
  addMonths,
  format,
  formatDuration,
  formatISO9075,
  intervalToDuration,
} from "date-fns";
import type { NextPage } from "next";
import CalendarHeatmap from "react-calendar-heatmap";
import { useRecoilState, useSetRecoilState } from "recoil";

import { activityListState, taskListState } from "../atoms/states";

import "react-calendar-heatmap/dist/styles.css";

function DurationSubmittedDate(props: {
  filteredList: { id: string; date: number | Date }[];
}) {
  const { filteredList } = props;
  const [durationSubmittedDate, setDurationSubmittedDate] = useState("");

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (filteredList.length > 0) {
      const interval = setInterval(() => {
        setDurationSubmittedDate(
          formatDuration(
            intervalToDuration({
              start: new Date(filteredList[filteredList.length - 1].date),
              end: new Date(),
            })
          )
        );
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [filteredList]);

  return (
    <div>
      {durationSubmittedDate && `最後に押してから：${durationSubmittedDate}`}
    </div>
  );
}

function LastSubmittedDate(props: {
  filteredList: { id: string; date: number | Date }[];
}) {
  const { filteredList } = props;
  const [lastSubmittedDate, setLastSubmittedDate] = useState("");

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (filteredList.length > 0) {
      setLastSubmittedDate(
        formatISO9075(new Date(filteredList[filteredList.length - 1].date))
      );
    }
  }, [filteredList]);

  return (
    <div>{lastSubmittedDate && `最後に押した日時：${lastSubmittedDate}`}</div>
  );
}

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

  // eslint-disable-next-line consistent-return
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
      <button onClick={handleClearClick} type="button">
        {taskType} clear
      </button>
    </div>
  );
}

// eslint-disable-next-line react/function-component-definition
const Home: NextPage = () => {
  const [taskList, setTaskList] = useRecoilState(taskListState);
  const setActivityList = useSetRecoilState(activityListState);
  const handleClick = () => {
    setActivityList([]);
  };
  const [value, setValue] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    setTaskList([...taskList, value]);
    e.preventDefault();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.setItem("taskListState", JSON.stringify(taskList));
    }, 1000);
    return () => clearInterval(interval);
  }, [taskList]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={value} onChange={handleChange} />
        <input type="submit" value="Submit" />
      </form>
      {taskList.map((task) => {
        return <Task taskType={task} key={task} />;
      })}
      <button onClick={handleClick} type="button">
        all clear
      </button>
    </div>
  );
};

export default Home;
