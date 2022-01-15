import { css } from "@emotion/react";
import { Button, Stack } from "@mui/material";
import { useRecoilState, useSetRecoilState } from "recoil";

import { activityListState, taskListState } from "../atoms/states";
import Form from "../components/Form";
import Task from "../components/Task";

function Home() {
  const [taskList, setTaskList] = useRecoilState(taskListState);
  const setActivityList = useSetRecoilState(activityListState);
  const handleClick = () => {
    setActivityList([]);
    setTaskList([]);
  };

  return (
    <div
      css={css`
        background-color: #f5f5f5;
      `}
    >
      <div
        css={css`
          max-width: 50vw;
          margin: 0 auto;
        `}
      >
        <Stack spacing={2}>
          <Form />
          {taskList.map((task) => {
            return <Task taskType={task} key={task} />;
          })}
          <Button onClick={handleClick} variant="contained">
            all clear
          </Button>
        </Stack>
      </div>
    </div>
  );
}

export default Home;
