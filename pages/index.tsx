import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { css } from "@emotion/react";
import { Button, Stack, TextField } from "@mui/material";
import { useRecoilState, useSetRecoilState } from "recoil";

import { activityListState, taskListState } from "../atoms/states";
import Task from "../components/Task";

function Home() {
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

  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.setItem("taskListState", JSON.stringify(taskList));
    }, 1000);
    return () => clearInterval(interval);
  }, [taskList]);

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
          <form onSubmit={handleSubmit}>
            <Stack direction="row" spacing={2}>
              <TextField
                type="text"
                value={value}
                onChange={handleChange}
                fullWidth
              />
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Stack>
          </form>
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
