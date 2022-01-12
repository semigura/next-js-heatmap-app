import { ChangeEvent, FormEvent, useEffect, useState } from "react";

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
}

export default Home;
