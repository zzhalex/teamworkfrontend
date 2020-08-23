import React, { useState, useEffect } from "react";
import axios from "axios";

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
          <div class="md:flex md:items-center mb-12">
            <div class="md:w-1/3">
              <label
                className="block text-gray-700 text-sm font-bold"
                for="userUsername"
              >
                Username
              </label>
            </div>
            <div class="md:w-2/3">
              <p className="userUsername block mb-2">{data.username}</p>
            </div>
          </div>

          <div class="md:flex md:items-center mb-12">
            <div class="md:w-1/3">
              <label
                className="block text-gray-700 text-sm font-bold"
                for="userFirstname"
              >
                Firstname
              </label>
            </div>
            <div class="md:w-2/3">
              <p className="userFirstname block mb-2">{data.firstname}</p>
            </div>
          </div>
          <div class="md:flex md:items-center mb-12">
            <div class="md:w-1/3">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                for="userLastname"
              >
                Lastname
              </label>
            </div>
            <div class="md:w-2/3">
              <p className="userLastname block mb-2">{data.lastname}</p>
            </div>
          </div>
          <div class="md:flex md:items-center mb-12">
            <div class="md:w-1/3">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                for="userEamil"
              >
                Email
              </label>
            </div>
            <div class="md:w-2/3">
              <p className="userEamil block mb-2">{data.email}</p>
            </div>
          </div>
        </div>
      );
    }
  };

  let UserInfo = getuserInfo(userinfo);
  return <div className="User flex justify-center">{UserInfo}</div>;
}
