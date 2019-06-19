import React from "react";

export default function StatCounter({ count }) {
  return <span className="filter--counter">{count || 0}</span>;
}
