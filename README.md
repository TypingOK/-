inputs.jsx와 app.jsx, store폴더의 두개의 파일을 주로 사용할 생각이다.

​

우선적으로 스토어를 생성 해보자

```
import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./login";

export const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});
```

그 다음으로는 스토어의 모든 내용을 받을 수 있도록 index.js에 다음과 같이 설정 한다.

```
import { store } from "./store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

다음으로는 제일 중요한 로그인 store쪽 코드를 작성 한다.

```
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loginThunk = createAsyncThunk(
  "login/loginThunks",
  async ({ id, password }) => {
    try {
      const response = await axios.post(
        "백엔드 주소",
        {
          id,
          password,
        }
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  }
);
```

위와 같이 코드를 작성한다.

주의 해야할 점은 createAsyncThunk에는 reducer를 작성하지 않는다.

그 다음으로는 아래와 같이 적어준다.

```
export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout: (state) => {
      state.id = "";
      state.password = "";
      state.auth = false;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: {
    [loginThunk.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [loginThunk.fulfilled]: (state) => {
      state.loading = false;
      state.auth = true;
    },
    [loginThunk.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { logout } = loginSlice.actions;

export default loginSlice.reducer;
```

여기서 thunk에서 리듀서를 작성하지 않는 이유를 알 수 있는데

thunk에서 가져온 데이터를 이곳에 가져와서 extraReducers를 통해서 reducer를 따로 작성하기 때문이다.

3가지의 상태를 제공하는데

pending은 데이터를 요청하기 전 상태를 의미한다. 따라서 로딩 상태와 같은 것들을 설정하기에 좋다.

fulfilled는 데이터를 요청에 성공해서 데이터를 가져왔을 때 상태를 의미한다. 데이터를 가져오는데 성공 했다면 store에 payload를 통해 데이터를 넣을 수 있다.

rejected는 데이터를 가져오는데 실패한 경우다.

​

```
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
```

간단한 인풋 두개를 통해 로그인 하도록 설정 해두었다.

그리고 로그인 버튼을 눌렀을 때 dispatch를 통해서 로그인을 하도록 했다.

```
import { useSelector } from "react-redux";
import Inputs from "./inputs";

function App() {
  const auth = useSelector((store) => store.login);
  return (
    <div className="App">{auth.auth ? <div>환영합니다.</div> : <Inputs />}</div>
  );
}
```

그 다음으로는 app.jsx에서 사용하면 된다.

상태가 변경 되었을 때 환영합니다가 뜬다.

간단하게 리덕스를 사용해서 비동기 통신을 해봤다.

추후에는 리액트 쿼리를 사용해보는걸 공부해보고 싶다.
