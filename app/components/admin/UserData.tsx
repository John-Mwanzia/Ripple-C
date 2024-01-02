"use client";

import React from "react";

export default function UserData({ data }) {
  const [userData, setUserData] = React.useState(null);

  React.useEffect(() => {
    if (data) {
      setUserData(data);
    }
  }, [data]);

  console.log(userData);

  return <div></div>;
}
