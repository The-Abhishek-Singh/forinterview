'use client';
import { useState, useEffect } from 'react';

export default function ResponsiveNoteApp() {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState('');
  const [title, setTitle] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [activeSection, setActiveSection] = useState('all');
  const [sections, setSections] = useState(['personal', 'work', 'ideas']);
  const [newSection, setNewSection] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notesListOpen, setNotesListOpen] = useState(true);

  // Load notes from localStorage on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    const savedSections = localStorage.getItem('sections');
    
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
    
    if (savedSections) {
      setSections(JSON.parse(savedSections));
    }

    // Set initial responsive state based on screen size
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
        setNotesListOpen(false);
      } else {
        setSidebarOpen(true);
        setNotesListOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  // Save sections to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('sections', JSON.stringify(sections));
  }, [sections]);

  const handleSaveNote = () => {
    if (!title.trim()) {
      alert('Please add a title for your note');
      return;
    }

    if (editIndex !== null) {
      // Update existing note
      const updatedNotes = [...notes];
      updatedNotes[editIndex] = {
        ...updatedNotes[editIndex],
        title,
        content: currentNote,
        updatedAt: new Date().toISOString()
      };
      setNotes(updatedNotes);
    } else {
      // Add new note
      const newNote = {
        id: Date.now(),
        title,
        content: currentNote,
        section: activeSection === 'all' ? 'personal' : activeSection,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setNotes([...notes, newNote]);
    }

    // Reset form
    setCurrentNote('');
    setTitle('');
    setEditIndex(null);
    
    // On mobile, show the notes list after saving
    if (window.innerWidth < 768) {
      setNotesListOpen(true);
    }
  };

  const handleEditNote = (index) => {
    const noteToEdit = notes[index];
    setCurrentNote(noteToEdit.content);
    setTitle(noteToEdit.title);
    setEditIndex(index);
    setActiveSection(noteToEdit.section);
    
    // On mobile, focus on the editor after selecting a note
    if (window.innerWidth < 768) {
      setNotesListOpen(false);
    }
  };

  const handleDeleteNote = (id) => {
    if (confirm('Are you sure you want to delete this note?')) {
      setNotes(notes.filter(note => note.id !== id));
      
      // If we're editing this note, reset the form
      if (editIndex !== null && notes[editIndex].id === id) {
        setCurrentNote('');
        setTitle('');
        setEditIndex(null);
      }
    }
  };

  const handleAddSection = () => {
    if (newSection && !sections.includes(newSection)) {
      setSections([...sections, newSection]);
      setNewSection('');
    }
  };

  const filteredNotes = activeSection === 'all' 
    ? notes 
    : notes.filter(note => note.section === activeSection);

  return (
    <div className="flex flex-col min-h-screen bg-[#e3e3dc]">
      <header className="bg-green-800 text-white p-4 my-11 h-[15vh] flex align-middle justify-center items-center shadow-md">
        <div className="flex justify-between items-center max-w-screen-2xl mx-auto">
          <div className="flex items-center space-x-4 justify-center">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded hover:bg-green-900"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-3xl font-bold">𝑺𝒕𝒂𝒓𝒕 𝑾𝒓𝒊𝒕𝒊𝒏𝒈…</h1>
          </div>
          
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => {
                setNotesListOpen(!notesListOpen);
                if (window.innerWidth < 768) {
                  setSidebarOpen(false);
                }
              }}
              className="p-2 rounded hover:bg-green-900"
            >
              {notesListOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden max-w-screen-2xl mx-auto w-full">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'block' : 'hidden'} lg:block absolute lg:static z-10 w-64 lg:w-72 xl:w-80 bg-white rounded-2xl text-black  border-r shadow-lg lg:shadow-none h-[calc(100vh-64px)] lg:h-auto`}>
          <div className="p-4 flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Sections</h2>
              <button 
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1 rounded-full hover:bg-gray-800"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex items-center mb-4">
              <input
                type="text"
                value={newSection}
                onChange={(e) => setNewSection(e.target.value)}
                placeholder="New section"
                className="border p-2 text-sm rounded flex-1 mr-2 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
              <button 
                onClick={handleAddSection}
                className="bg-green-700 text-white p-2 rounded text-sm hover:bg-green-600"
              >
                Add
              </button>
            </div>
            
            <ul className="space-y-1 flex-1 overflow-y-auto">
              <li>
                <button
                  onClick={() => {
                    setActiveSection('all');
                    if (window.innerWidth < 1024) {
                      setSidebarOpen(false);
                      setNotesListOpen(true);
                    }
                  }}
                  className={`w-full text-left p-2 rounded ${activeSection === 'all' ? 'bg-green-800 text-white' : 'hover:bg-gray-800'}`}
                >
                  All Notes
                </button>
              </li>
              {sections.map((section) => (
                <li key={section}>
                  <button
                    onClick={() => {
                      setActiveSection(section);
                      if (window.innerWidth < 1024) {
                        setSidebarOpen(false);
                        setNotesListOpen(true);
                      }
                    }}
                    className={`w-full text-left p-2 rounded ${activeSection === section ? 'bg-green-800 text-white' : 'hover:bg-gray-800'}`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Notes List */}
          <div className={`${notesListOpen ? 'block' : 'hidden'} lg:block lg:w-1/3 xl:w-1/4 2xl:w-1/5 border-r overflow-y-auto absolute lg:static z-5 bg-[#e3e3dc] lg:bg-transparent w-full lg:w-auto h-[calc(100vh-64px)] lg:h-auto`}>
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-black">
                  {activeSection === 'all' 
                    ? 'All Notes' 
                    : `${activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Notes`
                  }
                </h2>
                <button 
                  onClick={() => setNotesListOpen(false)}
                  className="lg:hidden p-1 rounded-full hover:bg-gray-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {filteredNotes.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  </svg>
                  <p className="text-gray-600">No notes found</p>
                  <button 
                    onClick={() => {
                      setNotesListOpen(false);
                      setTitle('');
                      setCurrentNote('');
                      setEditIndex(null);
                    }}
                    className="mt-2 text-green-700 hover:text-green-900 text-sm font-medium"
                  >
                    Create your first note
                  </button>
                </div>
              ) : (
                <ul className="space-y-2">
                  {filteredNotes.map((note, index) => (
                    <li 
                      key={note.id} 
                      className={`border rounded p-3 cursor-pointer hover:bg-gray-200 transition duration-150 ${editIndex === notes.indexOf(note) ? 'border-green-500 bg-green-50' : 'bg-white'}`}
                    >
                      <div className="flex justify-between items-start">
                        <h3 
                          className="font-medium truncate flex-1" 
                          onClick={() => handleEditNote(notes.indexOf(note))}
                        >
                          {note.title}
                        </h3>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteNote(note.id);
                          }}
                          className="text-red-500 hover:text-red-700 ml-2"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                      <p 
                        className="text-sm text-gray-600 truncate mt-1" 
                        onClick={() => handleEditNote(notes.indexOf(note))}
                      >
                        {note.content.length > 100 ? note.content.substring(0, 100) + '...' : note.content}
                      </p>
                      <div className="flex justify-between mt-2 text-xs text-gray-500">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full">{note.section}</span>
                        <span>{new Date(note.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Note Editor */}
          <div className={`${!notesListOpen || window.innerWidth >= 1024 ? 'block' : 'hidden'} lg:block flex-1 p-4 overflow-y-auto`}>
            <div className="max-w-4xl mx-auto">
              <div className="mb-6 bg-white p-6 rounded-lg shadow-sm text-black">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Note Title"
                  className="w-full border p-3 rounded-lg mb-4 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                
                <div className="flex flex-col sm:flex-row sm:items-center mb-4 gap-2">
                  <label className="text-gray-700 text-sm font-medium">Section:</label>
                  <select
                    value={activeSection === 'all' ? (editIndex !== null ? notes[editIndex].section : 'personal') : activeSection}
                    onChange={(e) => setActiveSection(e.target.value)}
                    className="flex-1 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    disabled={activeSection !== 'all' && editIndex === null}
                  >
                    {sections.map(section => (
                      <option key={section} value={section}>
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                
                <textarea
                  value={currentNote}
                  onChange={(e) => setCurrentNote(e.target.value)}
                  placeholder="Write your note here..."
                  className="w-full border p-3 rounded-lg h-64 md:h-96 resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex justify-between">
                <button
                  onClick={() => {
                    setNotesListOpen(true);
                    if (window.innerWidth < 768) {
                      setCurrentNote('');
                      setTitle('');
                      setEditIndex(null);
                    }
                  }}
                  className="lg:hidden border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                
                <button
                  onClick={handleSaveNote}
                  className="ml-auto bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800 transition duration-150 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  {editIndex !== null ? 'Update Note' : 'Save Note'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}