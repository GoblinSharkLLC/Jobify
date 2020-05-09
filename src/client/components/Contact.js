import React from "react";

export default function Contact({ name, number, email }) {
  return <div>{name ? <b>{name}</b> : <input type="text" />}</div>;
}
