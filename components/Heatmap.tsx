import { css } from "@emotion/react";
import { addMonths, format } from "date-fns";
import CalendarHeatmap from "react-calendar-heatmap";

import { activityListStateProps } from "../atoms/states";

import "react-calendar-heatmap/dist/styles.css";

function Heatmap({ filteredList }: { filteredList: activityListStateProps }) {
  const value = filteredList.map((item) => {
    return {
      date: format(new Date(item.date), "yyyy-MM-dd"),
      count: 1,
    };
  });

  return (
    <div
      css={css`
        text-align: center;
        & .react-calendar-heatmap {
          max-height: 100px;
        }
      `}
    >
      <CalendarHeatmap
        startDate={addMonths(new Date(), -12)}
        endDate={new Date()}
        values={value}
      />
    </div>
  );
}

export default Heatmap;
