import React, { useState, useEffect } from 'react';
import Job from './Job';
import axios from 'axios';

// display for a user's saved jobs
export default function JobContainer() {
  const [savedJobs, setSavedJobs] = useState([
    {
      title: 'Engineering',
      company: 'Tech Corp',
      url: 'url',
      city: 'city',
      state: 'state',
      status: 'status',
      posted: 'posted',
      description: 'description',
      contact: { name: 'John', email: 'John@email', number: '8398080' },
      notes: 'Whats up',
    },
  ]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.post('api/users/savedJobs', {
          accessToken: localStorage.getItem('jwt'),
        });
        console.log(result.data);
        setSavedJobs(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div id="find-jobs-display">
      {savedJobs.map((savedJob, idx) => {
        return (
          <Job key={`savedJob${idx}`} job={savedJob} savedContainer={true} />
        );
      })}
    </div>
  );
}
