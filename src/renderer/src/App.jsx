import quitArrow from "./assets/quitarrow.svg"
import leftArrow from "./assets/leftarrow.svg"
import rightArrow from "./assets/rightarrow.svg"
import { useEffect, useState } from "react";
import { saveAs } from 'file-saver';

function App() {

  //File Saving!!!
  // const blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
  // saveAs(blob, "hello world.txt");

  useEffect(() => {
    //initial render only (parse journ file)


  }, []);

  useEffect(() => {
    //When the page is turned or the application is exited, save to .journ file
    //every render


  });

  return (
    <div>
      <button className="quit" onClick={() => window.electron.exitApp()}>Quit
        <img src={quitArrow} alt="quit"/>
      </button>
      <textarea rows="16"></textarea>
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

