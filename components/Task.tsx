import { useEffect, useState } from "react";

import { css } from "@emotion/react";
import { Card, Button, Stack } from "@mui/material";
import { setHours, setSeconds, subDays, setMinutes } from "date-fns";
import { useRecoilState } from "recoil";

import { activityListState, activityListStateProps } from "../atoms/states";

import DurationSubmittedDate from "./DurationSubmittedDate";
import Heatmap from "./Heatmap";
import LastSubmittedDate from "./LastSubmittedDate";
import WarningButton from "./WarningButton";

function Task({ taskType }: { taskType: string }) {
  const [activityList, setActivityList] = useRecoilState(activityListState);
  const [filteredList, setFilteredList] = useState<activityListStateProps>([]);

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
    }, 2000);
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

  const handleReliefClick = () => {
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
  };

  return (
    <Card
      css={css`
        padding: 3%;
      `}
    >
      <Stack spacing={2}>
        <Heatmap filteredList={filteredList} />
        <Button onClick={handleClick} variant="contained">
          {taskType}
        </Button>
        <LastSubmittedDate filteredList={filteredList} />
        <DurationSubmittedDate filteredList={filteredList} />
        <Button onClick={handleReliefClick} variant="contained">
          押し忘れ
        </Button>
        <WarningButton handleConfirm={handleClearClick}>
          {taskType} clear
        </WarningButton>
      </Stack>
    </Card>
  );
}

export default Task;
