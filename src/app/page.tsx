/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import getFoodOptions from "../../api/page";
import React from "react";

export default function Home() {
  getFoodOptions("01-19-2024", "", "Ford")
  .then(res => {
      res.map((menu) => console.log(menu))
  }
    )
  return (
    <div>
      HELLO
    </div>
  );
}
