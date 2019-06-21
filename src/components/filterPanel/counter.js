import React from "react";

export default function StatCounter({ stat, keyName }) {
  const _count = (stat || {}).hasOwnProperty(keyName) ? stat[keyName] : "0";
  return <span className="filter--counter">{_count}</span>;
}
