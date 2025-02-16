import quitArrow from './assets/quitarrow.svg'
import leftArrow from './assets/leftarrow.svg'
import rightArrow from './assets/rightarrow.svg'
import { useEffect, useState, useRef } from 'react'

function App() {
  const [journalPath, setJournalPath] = useState(null) //state var to hold path to journal file, initialized to null
  const [text, setText] = useState(''); //text that downloads to the .journ file.

  useEffect(() => {
    //initial render only (parse journ file)
  }, [])

  useEffect(() => {
    //When the page is turned or the application is exited, save to .journ file
    //every render
  })

  //selects a *.journ file and saves it's path to journalPath
  const loadFile = async () => {
    const files = await window.electron.openFilePicker();
    setJournalPath(files[0])
    console.log(`Opening ${files[0]}`)
  }

  // downloads a file with the text variable as it's data, default name is journal.journ
  const downloadFile = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'journal.journ';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <button className="loadButton" onClick={loadFile}>
        Load file
      </button>
      <button className="downloadButton" onClick={() => downloadFile(  )}>
        Download file
      </button>
      <button className="quit" onClick={() => window.electron.exitApp()}>
        Quit
        <img src={quitArrow} alt="quit" />
      </button>
      <textarea rows="16"></textarea>
      <textarea rows="16"></textarea>
      <input type="text" value={journalPath} />
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
