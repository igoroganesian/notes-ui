import { useState } from 'react';
import './App.css';

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "test note 1",
      content: "note 1 content",
    },
    {
      id: 2,
      title: "test note 2",
      content: "note 2 content",
    },
    {
      id: 3,
      title: "test note 3",
      content: "note 3 content",
    },
  ]);

  return (
    <div className='app-container'>
      <form className='note-form'>
        <input placeholder='Title' required />
        <textarea placeholder='Content' required />
        <button type='submit'>Add Note</button>
      </form>
      <div className='notes-grid'>
        {notes.map((note) => (
          <div className='note-item'>
            <div className='notes-header'>
              <button>x</button>
            </div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;