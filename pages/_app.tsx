import "../styles/globals.css";
import { useEffect, useState } from "react";

import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

import { activityListState } from "../atoms/states";

function MyApp({ Component, pageProps }: AppProps) {
  const [activityList, setActivityList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setActivityList(
      JSON.parse(localStorage.getItem("activityListState") || "[]")
    );
    setLoading(false);
  }, []);

  if (loading) {
    return <h1>読み込み中...</h1>;
  }

  return (
    <RecoilRoot
      initializeState={(mutableSnapshot) => {
        mutableSnapshot.set(activityListState, activityList);
      }}
    >
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;
