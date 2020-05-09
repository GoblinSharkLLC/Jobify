import React from "react";
import Contact from "./Contact";

export default function Job({
  title,
  company,
  url,
  city,
  state,
  status,
  posted,
  description,
  contact,
  notes,
}) {
  return (
    <div>
      <b>{title}</b>
      <p>{company}</p>
      <p>
        {city}, {state}
      </p>
      <p>
        <span>Status:</span> {status}
      </p>
      <ul>
        <li>{description}</li>
      </ul>
      <p>{url}</p>
      <aside>{posted} days ago</aside>
      {contact ? (
        <div>
          <Contact contact={contact} />
        </div>
      ) : null}
      <textarea>{notes}</textarea>
    </div>
  );
}
