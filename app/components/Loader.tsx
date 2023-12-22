import Image from "next/image";
import React from "react";

export default function Loader({ width, height }) {
  return (
    <div>
      <Image
        src = "https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca.gif"
        alt="loading"
        width={width}
        height={height}
      />
    </div>
  );
}
