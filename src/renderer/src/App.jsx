import quitArrow from "./assets/quitarrow.svg";
import leftArrow from "./assets/leftarrow.svg";
import rightArrow from "./assets/rightarrow.svg";
import { useEffect, useRef, useState } from "react";

function App() {
  const [journalPath, setJournalPath] = useState(null); //state var to hold path to journal file, initialized to null
  const [journalData, setJournalData] = useState({ title: "test", last_page: 0, pages: [] });
  const [currentPage, setCurrentPage] = useState(0);

  // references to each text box so we can programmatically focus and clear them
  const leftPageRef = useRef(null);
  const rightPageRef = useRef(null);

  // Modified this so we can use async properly
  // wont work for me though i get a 'file doesnt exist' error even though i modified it to my exact path
  useEffect(() => {
    //loads on initial and sets the journal path to the last opened .journ file
    const loadLast = async () => {
      const path = await window.electron.relativeReadFile("../../lastWritten.txt")
      setJournalPath(path)
    }
    loadLast()
  }, [])

  useEffect(() => {
    if (journalPath !== null) {
      window.electron.readFile(journalPath).then(data => {
        const parsedData = JSON.parse(data)
        setJournalData(parsedData)
        setCurrentPage(0)
        console.log(parsedData)
      })
    }
  }, [journalPath]);

  // This breaks it and i cant figure out why
  // it says the writeFile function isnt defined
  // useEffect(() => {
  //   if (journalPath !== null) {
  //     window.electron.writeFile(journalPath, JSON.stringify(journalData))
  //   }
  //
  // }, [journalData])

  //selects a *.journ file and saves it's path to journalPath
  const loadFile = async () => {
    const files = await window.electron.openFilePicker();
    setJournalPath(files[0]);
  };

  // downloads a file with the text variable as it's data, default name is journal.journ
  const downloadFile = () => {
    const blob = new Blob([journalData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "journal.journ";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // handles change in the textareas
  const handleChange = (e, pageIndex) => {
    setJournalData((prev) => {
      // prev is the previous journalData
      // copies the prev pages list
      const newPages = [...prev.pages];

      // adds empty strings until list length matches the page the user is on
      // this is how new pages are created
      while (newPages.length <= pageIndex) {
        newPages.push("");
      }

      // updates with changes from text area
      newPages[pageIndex] = e.target.value;

      return { ...prev, pages: newPages };
    });

    // sets page wrapping to 15 characters
    // just set to 15 for testing, will have to configure this further later
    if (e.target.value.length > 15) {
      if (pageIndex % 2 === 0) {
        // move cursor to right textarea
        rightPageRef.current.focus();
      } else {
        // move cursor back to left and increment currentPage
        leftPageRef.current.focus();
        setCurrentPage(currentPage + 2);
      }
    }

    console.log(journalData);
  };

  return (<div>
    <button className="loadButton" onClick={loadFile}>
      Load file
    </button>
    <button className="downloadButton" onClick={() => downloadFile()}>
      Download file
    </button>
    <button className="quit" onClick={() => window.electron.exitApp()}>
      Quit
      <img src={quitArrow} alt="quit" />
    </button>
    <textarea rows="16" ref={leftPageRef} value={journalData.pages[currentPage] || ''}
              onChange={(e) => handleChange(e, currentPage)}></textarea>
    {/* had to switch from defaultValue to value to make sure text boxes clear when increasing currentPage */}
    <textarea rows="16" ref={rightPageRef} value={journalData.pages[currentPage + 1] || ''}
              onChange={(e) => handleChange(e, currentPage + 1)}></textarea>
    <input type="text" value={journalPath} />
    {/* added basic page turning function */}
    <button className="left">
      <img src={leftArrow} onClick={() => setCurrentPage(currentPage - 2)} alt="left" />
    </button>
    <button className="right">
      <img src={rightArrow} onClick={() => setCurrentPage(currentPage + 2)} alt="right" />
    </button>
  </div>);
}

export default App;
