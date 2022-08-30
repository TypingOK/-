import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { loginThunk } from "./store/login";

const Inputs = () => {
  const refId = useRef(null);
  const refPassword = useRef(null);
  const dispatch = useDispatch();

  const onClick = () => {
    const id = refId.current.value;
    console.log(id);
    const password = refPassword.current.value;
    console.log(password);
    dispatch(loginThunk(id, password));

    refId.current.value = "";
    refPassword.current.value = "";
  };

  return (
    <div>
      <div>아이디와 비밀번호를 입력하십시오.</div>
      <div>
        <input ref={refId} id="inputId" />
      </div>
      <div>
        <input ref={refPassword} password="inputPassword" />
      </div>
      <button onClick={onClick}>로그인</button>
    </div>
  );
};

export default Inputs;
