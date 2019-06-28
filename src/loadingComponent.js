import React from "react";

export default function LoadingComponent({ isLoading, error }) {
  if (isLoading) {
    console.info("⌛ Lazy Loading Component");
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Sorry, there was a problem loading the page.</div>;
  } else {
    return null;
  }
}
