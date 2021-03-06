import { useEffect, useState } from "react";

import { formatISO9075 } from "date-fns";

import { activityListStateProps } from "../atoms/states";

function LastSubmittedDate({
  filteredList,
}: {
  filteredList: activityListStateProps;
}) {
  const [lastSubmittedDate, setLastSubmittedDate] = useState("");

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

export default LastSubmittedDate;
