import quitArrow from "./assets/quitarrow.svg"
import leftArrow from "./assets/leftarrow.svg"
import rightArrow from "./assets/rightarrow.svg"

function App() {

  return (
    <div>
      <button className="quit" onClick={() => window.electron.exitApp()}>Quit
        <img src={quitArrow} alt="quit"/>
      </button>
      <textarea rows="16"></textarea>
      <button></button>
      <textarea rows="16"></textarea>
      <button className="left">
        <img src={leftArrow} alt="left" />
      </button>
      <button className="right">
        <img src={rightArrow} alt="right" />
      </button>
    </div>
  )
}

export default App

