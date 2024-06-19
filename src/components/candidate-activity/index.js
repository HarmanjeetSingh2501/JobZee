"use client";

import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useState, useEffect } from "react";

function CandidateActivity({ jobList, jobApplicants }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const allMessages = jobApplicants
      .flatMap((jobApplicant) =>
        (jobApplicant.messages || []).map((msg) => ({
          ...msg,
          jobID: jobApplicant.jobID,
          recruiterUserID: jobApplicant.recruiterUserID,
        }))
      )
      .filter((msg) => msg.recruiterUserID);

    setMessages(allMessages);
  }, [jobApplicants]);

  const uniqueStatusArray = [
    ...new Set(
      jobApplicants.map((jobApplicantItem) => jobApplicantItem.status).flat(1)
    ),
  ];

  return (
    <div className="mx-auto max-w-7xl">
      <Tabs defaultValue="Applied" className="w-full">
        <div className="flex items-baseline dark:border-white justify-between border-b pb-6 pt-24">
          <h1 className="text-4xl font-bold dark:text-white tracking-tight text-gray-950">
            Your Activity
          </h1>
          <TabsList>
            {uniqueStatusArray.map((status) => (
              <TabsTrigger key={status} value={status}>
                {status}
              </TabsTrigger>
            ))}
            <TabsTrigger value="Messages">Messages</TabsTrigger>
          </TabsList>
        </div>
        <div className="pb-24 pt-6">
          <div className="container mx-auto p-0 space-y-8">
            <div className="flex flex-col gap-4">
              {uniqueStatusArray.map((status) => (
                <TabsContent key={status} value={status}>
                  {jobList
                    .filter(
                      (jobItem) =>
                        jobApplicants
                          .filter(
                            (jobApplication) =>
                              jobApplication.status.indexOf(status) > -1
                          )
                          .findIndex(
                            (filteredItemByStatus) =>
                              jobItem._id === filteredItemByStatus.jobID
                          ) > -1
                    )
                    .map((finalFilteredItem) => (
                      <CommonCard
                        key={finalFilteredItem._id}
                        icon={<JobIcon />}
                        title={finalFilteredItem?.title}
                        description={finalFilteredItem?.companyName}
                      />
                    ))}
                </TabsContent>
              ))}
              <TabsContent value="Messages">
                {messages.length > 0 ? (
                  messages.map((message, index) => {
                    const jobInfo = jobList.find(
                      (job) => job._id === message.jobID
                    );
                    return (
                      <div
                        key={index}
                        className="p-4 bg-gray-100 rounded-md shadow-md flex gap-6 items-start"
                      >
                        <div className="w-10 h-10 flex-shrink-0">
                          <JobIcon />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-800">
                            {jobInfo?.companyName}
                          </p>
                          <p className="text-sm text-gray-800">
                            {jobInfo?.title}
                          </p>
                          <p className="text-sm text-gray-800">
                            {message.message}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(message.date).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p>No messages from recruiters yet.</p>
                )}
              </TabsContent>
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  );
}

export default CandidateActivity;
