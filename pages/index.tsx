import { css } from "@emotion/react";
import { Stack, Button } from "@mui/material";
import crypto from "crypto-js";
import { useRecoilValue, useResetRecoilState } from "recoil";

import { activityListState } from "../atoms/states";
import Form from "../components/Form";
import Task from "../components/Task";
import WarningButton from "../components/WarningButton";

function Home() {
  const activityList = useRecoilValue(activityListState);
  const taskList = activityList
    .map((activity) => activity.id)
    .filter((x, i, self) => {
      return self.indexOf(x) === i;
    });
  const resetActivityListState = useResetRecoilState(activityListState);

  const handleClick = () => {
    resetActivityListState();
  };
  const copyTextToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        console.log("Async: Copying to clipboard was successful!");
      },
      (err) => {
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
              if (!process.env.NEXT_PUBLIC_KEY) {
                return;
              }
              copyTextToClipboard(
                crypto.AES.encrypt(
                  JSON.stringify(activityList),
                  process.env.NEXT_PUBLIC_KEY
                ).toString()
              );
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
