import { Doing } from "./Doing";
import { Done } from "./Done";
import  Todo  from "./Todo";

function App() {
  return (
    <div className="dashboard">
      <Todo></Todo>
      <Doing></Doing>
      <Done></Done>
    </div>
  );
}

export default App;
