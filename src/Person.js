import React, { useState } from "react";

const Person = () => {
  const [age, setAge] = useState(0);
  const [msg, setMsg] = useState(null);
  const birthday = () => {
    setAge(age + 1);
    setMsg("Happy Birthday");
    setTimeout(() => {
      setMsg(null);
    }, 1000);
  };
  return (
    <div className="person">
      <div>
        <button onClick={birthday}>{msg}</button>
        <span>{age}</span>
      </div>
    </div>
  );
};
export default Person;
