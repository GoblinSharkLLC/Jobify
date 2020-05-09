import React from "react";

export default function Contact({ contact }) {
  console.log(contact);
  const { name, email, number } = contact;
  return (
    <div>
      {name ? <b>{name}</b> : <input type="text" placeholder="name" />}
      {email ? <p>{email}</p> : <input type="text" placeholder="email" />}
      {number ? <p>{number}</p> : <input type="text" placeholder="number" />}
    </div>
  );
}
