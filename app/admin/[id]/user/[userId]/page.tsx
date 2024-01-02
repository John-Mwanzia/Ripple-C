import React from "react";

export default function page({ params }) {
  const { userId } = params;
  return <div>confirm payment for {userId}</div>;
}
