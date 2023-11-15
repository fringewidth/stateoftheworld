import "./App.css";
import LeftSideOfPage from "./Components/LeftSideOfPage/LeftSideOfPage";
import RightSideOfPage from "./Components/RightSideOfPage/RightSideOfPage";
import MiddleOfPage from "./Components/MiddleOfPage/MiddleOfPage";

function App() {
  return (
    <>
      <div className="PageContainer">
        <LeftSideOfPage />
        <MiddleOfPage />
        <RightSideOfPage />
      </div>
    </>
  );
}

export default App;
