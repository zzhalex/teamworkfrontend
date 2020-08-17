import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
  const [task, setTask] = useState([]);
  useEffect(() => {
    let access_token = localStorage.getItem("token");
    console.log("local storage");
    console.log(access_token);
    axios
      .get("task", {
        headers: {
          Authorization: access_token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setTask(res.data.rows);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // complete_status: false
  // createdAt: "2020-08-12T06:54:24.287Z"
  // description: "make a to do list"
  // duedate: "2020-12-31T00:00:00.000Z"
  // id: 1
  // name: "task101"
  // owner: 1
  // partner: "[2,3]"
  // updatedAt: "2020-08-12T06:54:24.287Z"
  function taskDiv(task) {
    let createdDate = new Date(task.createdAt);
    let name = task.name.charAt(0).toUpperCase() + task.name.slice(1);

    return (
      <div
        key={task.id}
        className="Task max-w-sm rounded overflow-hidden shadow-lg"
      >
        <div className="px-6 py-4">
          <div className="TaskName font-bold text-xl mb-2">{name}</div>
          <p className="TaskDesc text-gray-700 text-base">{task.description}</p>
        </div>
        <div className="px-6 py-4">
          <span className="Duedate inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            {createdDate.toDateString()}
          </span>
        </div>
      </div>
    );
  }

  let taskPart = task.map((t) => {
    return taskDiv(t);
  });

  return (
    <div className="Dashboard grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
      {taskPart}
    </div>
  );
}
