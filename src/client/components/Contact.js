import React from 'react';

// To be implemented.  Users shoudl be able to add contact to each individual job
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
