"use client";

import { UserCard } from "@/components/UserCard";
import { cleanUser } from "@/libs/cleanUser";
import axios from "axios";
import { useEffect, useState } from "react";

export default function RandomUserPage() {
  //user = null or array of object
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [genAmount, setGenAmount] = useState(1);
  const [first, setfirst] = useState(true);

  const generateBtnOnClick = async () => {
    setIsLoading(true);
    const resp = await axios.get(
      `https://randomuser.me/api/?results=${genAmount}`
    );
    setIsLoading(false);
    const users = resp.data.results;
    const cleaneduser = users.map((person) => cleanUser(person));
    setUsers(cleaneduser);
    //Your code here
    //Process result from api response with map function. Tips use function from /src/libs/cleanUser
    //Then update state with function : setUsers(...)
  };
  useEffect(() => {
    if (first) {
      setfirst(false);
      return;
    }
    localStorage.setItem("num", genAmount);
  }, [genAmount]);
  useEffect(() => {
    const getnum = localStorage.getItem("num");
    if (getnum == null || getnum == "") {
      localStorage.setItem("num", 1);
      setGenAmount(1);
      return;
    }
    setGenAmount(getnum);
  }, []);
  return (
    <div style={{ maxWidth: "700px" }} className="mx-auto">
      <p className="display-4 text-center fst-italic m-4">Users Generator</p>
      <div className="d-flex justify-content-center align-items-center fs-5 gap-2">
        Number of User(s)
        <input
          className="form-control text-center"
          style={{ maxWidth: "100px" }}
          type="number"
          onChange={(e) => setGenAmount(e.target.value)}
          value={genAmount}
        />
        <button className="btn btn-dark" onClick={generateBtnOnClick}>
          Generate
        </button>
      </div>
      {isLoading && (
        <p className="display-6 text-center fst-italic my-4">Loading ...</p>
      )}
      {users &&
        !isLoading &&
        users.map((person) => (
          <UserCard
            key={person.email}
            name={person.name}
            imgUrl={person.imgUrl}
            email={person.email}
            address={person.address}
          ></UserCard>
        ))}
    </div>
  );
}
