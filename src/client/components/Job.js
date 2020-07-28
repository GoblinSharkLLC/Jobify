import React, { useState } from 'react';
import Contact from './Contact';
import axios from 'axios';

// Presentation component for displaying the information of a job
export default function Job({ job, savedContainer, saveJob, deleteJob }) {
  const {
    id,
    title,
    location,
    company,
    company_logo,
    url,
    status,
    created_at,
    description,
    contact,
    notes,
  } = job;
  // state hook to denote whether a job has been saved or not
  const [saved, setSaved] = useState(false);

  const formatUrl = (url) => {
    const noHttp = url.substr(url.indexOf('www.'));
    return noHttp.substr(0, noHttp.indexOf('/'));
  };

  const formatDate = (inputDate) => {
    // TODO: format input date for the job card
    return inputDate;
  };

  return (
    <div className="job-container">
      <div className="job-header">{title}</div>
      <div className="job-content">
        <div id="company-info">
          <div>
            <h3>{company}</h3>
            <p id="location">{location}</p>
            <p>Posted: {formatDate(created_at)}</p>
          </div>
          <div id="company-logo">
            <img src={company_logo}></img>
          </div>
        </div>
        {savedContainer === true ? (
          <form>
            <label htmlFor="status">Status: </label>
            <select id="status" name="statusName">
              <option value="Need to Apply">Need to Apply</option>
              <option value="Applied">Applied</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </form>
        ) : null}
        <ul>
          <li>{description.slice(0, 200) + '...'}</li>
        </ul>
        <a href={url}>Find out more</a>
      </div>
      {/* {savedContainer ? (
        <div>
          <Contact contact={contact} />
        </div>
      ) : null} */}
      {savedContainer ? <textarea defaultValue={notes} /> : null}

      {/* Logic to determine whether to display the save or delete button*/}
      {localStorage.getItem('jwt') && !savedContainer ? (
        <input
          type="button"
          value="Save Job"
          onClick={() => {
            saveJob();
            setSaved(true);
          }}
        />
      ) : localStorage.getItem('jwt') && savedContainer ? (
        <input
          type="button"
          value="Delete Job"
          onClick={() => {
            deleteJob();
            setSaved(false);
          }}
        />
      ) : null}
    </div>
  );
}
