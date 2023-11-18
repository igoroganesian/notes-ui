import { useState, useEffect } from 'react';
import './App.css';

type Note = {
  id: number;
  title: string;
  content: string;
};

const App = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/notes');
        const notes: Note[] = await response.json();
        setNotes(notes);
      } catch (e) {
        console.log(e);
      }
    };
    fetchNotes();
  }, []);

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setTitle(title);
    setContent(content);
  };

  const handleAddNote = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/notes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title,
            content
          })
        });

      const newNote = await response.json();

      setNotes([newNote, ...notes]);
      setTitle("");
      setContent("");
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdateNote = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!selectedNote) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5001/api/notes/${selectedNote.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title,
            content,
          })
        }
      );

      const updatedNote = await response.json();

      const updatedNotesList = notes.map((note) =>
        note.id === selectedNote.id
          ? updatedNote
          : note
      );

      setNotes(updatedNotesList);
      setTitle("");
      setContent("");
      setSelectedNote(null);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  const deleteNote = async (
    e: React.MouseEvent,
    noteId: number
  ) => {
    e.stopPropagation();

    try {
      await fetch(`http://localhost:5001/api/notes/${noteId}`,
        {
          method: "DELETE",
        }
      );

      const updatedNotes = notes.filter(
        (note) => note.id !== noteId
      );

      setNotes(updatedNotes);
    } catch (e) {
      console.log(e);
    }
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