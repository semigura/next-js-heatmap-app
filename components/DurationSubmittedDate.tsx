import { useEffect, useState } from "react";

import { formatDuration, intervalToDuration } from "date-fns";

function DurationSubmittedDate(props: {
  filteredList: { id: string; date: number | Date }[];
}) {
  const { filteredList } = props;
  const [durationSubmittedDate, setDurationSubmittedDate] = useState("");

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

export default DurationSubmittedDate;
