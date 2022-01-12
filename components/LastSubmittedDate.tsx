import { useEffect, useState } from "react";

import { formatISO9075 } from "date-fns";

function LastSubmittedDate(props: {
  filteredList: { id: string; date: number | Date }[];
}) {
  const { filteredList } = props;
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
