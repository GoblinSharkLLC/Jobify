import React from "react";

export default function Contact({ contact }) {
  const { name, email, number } = contact;
  return (
    <div>
      <p>
        <b>{name}: </b>
        {email}, {number}
      </p>
    </div>
  );
}
