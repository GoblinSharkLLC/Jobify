import React, { useState } from "react";
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
  const [saved, setSaved] = useState([false]);
  const updateButton = () => {
    if (saved) {
      // if the user wants to delete Job
      setSaved(false);
    } else {
      // if the user wants to save Job
      setSaved(true);
    }
  };
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
      {notes || saved ? <textarea>{notes}</textarea> : null}
      {saved === true ? (
        <input type="button" value="Delete Job" onClick={updateButton} />
      ) : (
        <input type="button" value="Save Job" onClick={updateButton} />
      )}
    </div>
  );
}
