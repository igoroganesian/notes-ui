import { useState } from 'react';
import './App.css';

type Note = {
  id: number;
  title: string;
  content: string;
};

const App = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 3,
      title: "test note 3",
      content: "note 3 content",
    },
    {
      id: 2,
      title: "test note 2",
      content: "note 2 content",
    },
    {
      id: 1,
      title: "test note 1",
      content: "note 1 content",
    },
  ]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();
    console.log("title: ", title);
    console.log("content: ", content);

    const newNote: Note = {
      id: notes.length + 1,
      title: title,
      content: content,
    };

    setNotes([newNote, ...notes]);
    setTitle(title);
    setContent(content);
  };

  return (
    <div className='app-container'>
      <form
        className='note-form'
        onSubmit={(e) => handleSubmit(e)}
      >
        <input placeholder='Title'
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          required />
        <textarea placeholder='Content'
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
          required />
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