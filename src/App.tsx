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
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setTitle(title);
    setContent(content);
  };

  const handleAddNote = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const newNote: Note = {
      id: notes.length + 1,
      title: title,
      content: content,
    };

    setNotes([newNote, ...notes]);
    setTitle(title);
    setContent(content);
  };

  const handleUpdateNote = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!selectedNote) {
      return;
    }

    const updatedNote: Note = {
      id: selectedNote.id,
      title: title,
      content: content,
    };

    const updatedNotesList = notes.map((note) =>
      note.id === selectedNote.id
        ? updatedNote
        : note
    );

    setNotes(updatedNotesList);
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  const deleteNote = (
    e: React.MouseEvent,
    noteId: number
  ) => {
    e.stopPropagation();

    const updatedNotes = notes.filter(
      (note) => note.id !== noteId
    );

    setNotes(updatedNotes);
  };

  return (
    <div className='app-container'>
      <form
        className='note-form'
        onSubmit={(e) =>
          selectedNote
            ? handleUpdateNote(e)
            : handleAddNote(e)
        }
      >
        <input placeholder='Title'
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          required />
        <textarea
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
          placeholder="Content"
          rows={10}
          required />
        {selectedNote ? (
          <div className='edit-buttons'>
            <button type='submit'>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <button type='submit'>Add Note</button>
        )}
      </form>
      <div className='notes-grid'>
        {notes.map((note) => (
          <div
            key={note.id}
            className='note-item'
            onClick={() => handleNoteClick(note)}
          >
            <div className='notes-header'>
              <button
                onClick={(e) =>
                  deleteNote(e, note.id)
                }
              >
                x
              </button>
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