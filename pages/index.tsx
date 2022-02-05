import { css } from "@emotion/react";
import { Stack, Button } from "@mui/material";
import { useRecoilValue, useResetRecoilState } from "recoil";

import { activityListState, taskListState } from "../atoms/states";
import Form from "../components/Form";
import Task from "../components/Task";
import WarningButton from "../components/WarningButton";

function Home() {
  const taskList = useRecoilValue(taskListState);
  const activityList = useRecoilValue(activityListState);
  const resetTaskListState = useResetRecoilState(taskListState);
  const resetActivityListState = useResetRecoilState(activityListState);
  const handleClick = () => {
    resetTaskListState();
    resetActivityListState();
  };
  const copyTextToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      function () {
        console.log("Async: Copying to clipboard was successful!");
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
      }
    );
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
          <WarningButton handleConfirm={handleClick}>all clear</WarningButton>
          <Button
            onClick={() => {
              copyTextToClipboard(JSON.stringify(activityList));
            }}
            variant="contained"
          >
            Copy clipboard
          </Button>
        </Stack>
      </div>
    </div>
  );
}

export default Home;
