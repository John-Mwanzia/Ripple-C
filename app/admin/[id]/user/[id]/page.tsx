import React from "react";

export default function page({ params }) {
  const { id } = params;
  return <div>confirm payment for {id}</div>;
}
