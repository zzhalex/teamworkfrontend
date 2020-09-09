// complete_status: false
// createdAt: "2020-08-12T06:54:24.287Z"
// description: "make a to do list"
// duedate: "2020-12-31T00:00:00.000Z"
// id: 1
// name: "task101"
// owner: 1
// partner: "[2,3]"
// updatedAt: "2020-08-12T06:54:24.287Z"
import React from "react";
import axios from "axios";

function deleteTask(e) {
  console.log(e.target.getAttribute("data-id"));
  // console.log("delete:" + id);
  let access_token = localStorage.getItem("token");
  let id = e.target.getAttribute("data-id");
  axios
    .delete("task/" + id, {
      headers: {
        Authorization: access_token,
      },
    })
    .then((res) => {
      //setTask(res.data.rows);
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}
export default function taskDiv(task) {
  let createdDate = new Date(task.createdAt);
  let name = task.name.charAt(0).toUpperCase() + task.name.slice(1);

  return (
    <div
      key={task.id}
      className="Task max-w-sm rounded overflow-hidden shadow-lg m-1"
    >
      <div className="px-6 py-4">
        <div className="TaskName inline-block font-bold text-xl mb-2">
          {name}
        </div>

        <span
          className="DeleteTask material-icons float-right bg-gray-500 text-white w-8 h-8 rounded-full"
          onClick={deleteTask}
          data-id={task.id}
        >
          delete_outline
        </span>
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
