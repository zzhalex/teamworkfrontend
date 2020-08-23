import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard(props) {
  const [task, setTask] = useState([]);
  let isLogin = props.loginState;
  useEffect(() => {
    let access_token = localStorage.getItem("token");
    if (access_token != null) {
      isLogin = true;
    }
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
          <div className="TaskName inline-block font-bold text-xl mb-2">
            {name}
          </div>
          <span className="TaskNumber inline-block bg-indigo-500 px-3 py-1 text-sm text-white mr-2 float-right">
            Task#: {task.id}
          </span>
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

  let toolBar = (
    <div class="md:flex md:items-center h-24">
      <div className="searchBox md:w-3/4 relative">
        <input
          class="inputsearchBox bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          type="email"
          placeholder="Task Number"
        />
        <span class="material-icons absolute searchIcon">search</span>
      </div>
      <div className="addTask md:w-1/4 flex justify-center">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          Add Task
        </button>
      </div>
    </div>
  );

  if (isLogin) {
    return (
      <div className="Dashboard">
        <div className="toolBar w-full h-24">{toolBar}</div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {taskPart}
        </div>
      </div>
    );
  } else {
    return (
      <div className="Dashboard flex justify-center">
        <img
          className="justify-center self-center box-content h-200 w-320 p-4"
          src={process.env.PUBLIC_URL + "/emptypage.svg"}
        />
      </div>
    );
  }
}
