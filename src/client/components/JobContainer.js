import React, { useState } from "react";
import Job from "./Job";
import Contact from "./Contact";
import axios from "axios";

export default function JobContainer() {
  const [savedJobs, setSavedJobs] = useState([
    {
      title: "Engineering",
      company: "Tech Corp",
      url: "url",
      city: "city",
      state: "state",
      status: "status",
      posted: "posted",
      description: "description",
      contact: { name: "John", email: "John@email", number: "8398080" },
      notes: "Whats up",
    },
  ]);
  const getSavedJob = async () => {
    try {
      const result = await axios.get("url for saved job", {
        data: "user's id",
      });
      setSavedJobs(result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <p>This is the Job Container</p>
      {savedJobs.map((savedJob, idx) => {
        return (
          <Job key={`savedJob${idx}`} job={savedJob} savedContainer={true} />
        );
      })}
    </div>
  );
}
