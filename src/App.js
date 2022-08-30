import logo from "./logo.svg";
import "./App.css";
import { useSelector } from "react-redux";
import Inputs from "./inputs";

function App() {
  const auth = useSelector((store) => store.login);
  return (
    <div className="App">{auth.auth ? <div>환영합니다.</div> : <Inputs />}</div>
  );
}

export default App;
