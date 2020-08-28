import React, { useState, useEffect } from "react";
import axios from "axios";

import Sidebar from "./Sidebar";

export default function User() {
  const [userinfo, updateUserinfo] = useState([]);
  useEffect(() => {
    let access_token = localStorage.getItem("token");
    console.log("local storage");
    console.log(access_token);
    axios
      .get("/users/info", {
        headers: {
          Authorization: access_token,
        },
      })
      .then((res) => {
        console.log(res.data);
        updateUserinfo(res.data);
      });
  }, []);
  //   createdAt: "2020-08-05T02:51:21.406Z"
  //   email: "alex@demo.ca"
  //   firstname: "alex"
  //   id: 1
  //   lastname: "zhou"
  //   password: "123456"
  //   updatedAt: "2020-08-05T02:51:21.406Z"
  //   username: "alex"
  const getuserInfo = (data) => {
    console.log(data);
    if (data === undefined) {
      return;
    } else {
      return (
        <div className="userInfo w-full max-w-sm">
          <div className="md:flex md:items-center mb-12">
            <div className="md:w-1/3">
              <label
                className="block text-gray-700 text-sm font-bold"
                htmlFor="userUsername"
              >
                Username
              </label>
            </div>
            <div className="md:w-2/3">
              <p className="userUsername block mb-2">{data.username}</p>
            </div>
          </div>

          <div className="md:flex md:items-center mb-12">
            <div className="md:w-1/3">
              <label
                className="block text-gray-700 text-sm font-bold"
                htmlFor="userFirstname"
              >
                Firstname
              </label>
            </div>
            <div className="md:w-2/3">
              <p className="userFirstname block mb-2">{data.firstname}</p>
            </div>
          </div>
          <div className="md:flex md:items-center mb-12">
            <div className="md:w-1/3">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="userLastname"
              >
                Lastname
              </label>
            </div>
            <div className="md:w-2/3">
              <p className="userLastname block mb-2">{data.lastname}</p>
            </div>
          </div>
          <div className="md:flex md:items-center mb-12">
            <div className="md:w-1/3">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="userEamil"
              >
                Email
              </label>
            </div>
            <div className="md:w-2/3">
              <p className="userEamil block mb-2">{data.email}</p>
            </div>
          </div>
        </div>
      );
    }
  };

  let UserInfo = getuserInfo(userinfo);
  return (
    <div className="User md:flex mb-12">
      <div className="sideBarContainer md:w-1/4">
        <Sidebar />
      </div>
      <div className="md:w-3/4">{UserInfo}</div>
    </div>
  );
}
