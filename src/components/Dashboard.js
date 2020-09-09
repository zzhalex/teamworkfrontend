import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import taskDiv from "./Task";

export default function Dashboard(props) {
  const [task, setTask] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const inputSearch = useRef(null);
  let isLogin = props.loginState;
  useEffect(() => {
    let access_token = localStorage.getItem("token");
    if (access_token != null) {
      isLogin = true;
    }
    getAllTask();
  }, []);

  function searchTask() {
    let access_token = localStorage.getItem("token");
    if (inputSearch.current.value === "") {
      getAllTask();
      setIsSearch(false);
    } else {
      getTaskWithId();
      setIsSearch(true);
    }
  }

  function clearSearch() {
    setIsSearch(false);
    getAllTask();
    inputSearch.current.value = "";
  }

  function getTaskWithId() {
    let access_token = localStorage.getItem("token");
    let id = isNaN(inputSearch.current.value) ? -1 : inputSearch.current.value;
    axios
      .get("/task/" + id, {
        headers: {
          Authorization: access_token,
        },
      })
      .then((data) => {
        console.log(data.data);
        if (data.data === "") {
          setTask([]);
        } else {
          setTask([data.data]);
        }
      });
  }

  function getAllTask() {
    let access_token = localStorage.getItem("token");
    axios
      .get("task", {
        headers: {
          Authorization: access_token,
        },
      })
      .then((res) => {
        setTask(res.data.rows);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  let taskPart = task.map((t) => {
    return taskDiv(t);
  });

  let searchBoxIcon = isSearch ? (
    <span className="material-icons absolute clearIcon" onClick={clearSearch}>
      clear
    </span>
  ) : (
    <span className="material-icons absolute searchIcon" onClick={searchTask}>
      search
    </span>
  );
  let toolBar = (
    <div className="md:flex md:items-center h-24">
      <div className="searchBox md:w-3/4 relative">
        <input
          className="inputsearchBox bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          type="email"
          placeholder="Task Number"
          onChange={searchTask}
          ref={inputSearch}
        />
        {searchBoxIcon}
      </div>
      <div className="addTask md:w-1/4 flex justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          Add Task
        </button>
      </div>
    </div>
  );

  let page = <div className="pagination"></div>;

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
