import  Doing  from "./components/doing/Doing";
import { Done } from "./components/done/Done";
import  Todo  from "./components/todo/Todo";

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
