import { ChangeEvent, FormEvent, useState } from "react";

import { Button, Stack, TextField } from "@mui/material";
import { useRecoilState } from "recoil";

import { activityListState } from "../atoms/states";

function Form() {
  const [activityList, setActivityList] = useRecoilState(activityListState);
  const [value, setValue] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    setActivityList([...activityList, { id: value, date: new Date(0) }]);
    e.preventDefault();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
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
  );
}

export default Form;
