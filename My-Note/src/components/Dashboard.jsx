import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebaseConfig'
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query } from 'firebase/firestore'
import { PlusIcon, TrashIcon, PencilIcon, CheckIcon } from '@heroicons/react/24/outline'

export default function Dashboard() {
  const [notes, setNotes] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newContent, setNewContent] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editContent, setEditContent] = useState('')

  const fetchNotes = async () => {
    if (!auth.currentUser) return
    const q = query(collection(db, 'notes', auth.currentUser.uid, 'myNotes'))
    const snapshot = await getDocs(q)
    setNotes(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
  }

  const addNote = async () => {
    if (!auth.currentUser || !newTitle || !newContent) return
    await addDoc(collection(db, 'notes', auth.currentUser.uid, 'myNotes'), { title: newTitle, content: newContent })
    setNewTitle('')
    setNewContent('')
    fetchNotes()
  }

  const saveNote = async () => {
    if (!editTitle || !editContent) return
    await updateDoc(doc(db, 'notes', auth.currentUser.uid, 'myNotes', editingId), {
      title: editTitle,
      content: editContent,
    })
    fetchNotes()
    setEditingId(null)
  }

  const deleteNote = async (noteId) => {
    await deleteDoc(doc(db, 'notes', auth.currentUser.uid, 'myNotes', noteId))
    fetchNotes()
  }

  const startEditing = (note) => {
    setEditingId(note.id)
    setEditTitle(note.title)
    setEditContent(note.content)
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">My Notes</h2>
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <input
          type="text"
          placeholder="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder="Add a note"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
        />
        <button
          onClick={addNote}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center justify-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Note
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map(note => (
          <div key={note.id} className="bg-white rounded-lg shadow-md p-6 transform hover:scale-105 transition duration-300">
            {editingId === note.id ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full mb-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                />
                <button
                  onClick={saveNote}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 flex items-center justify-center"
                >
                  <CheckIcon className="h-5 w-5 mr-2" />
                  Save
                </button>
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{note.title}</h3>
                <p className="text-gray-600 mb-4">{note.content}</p>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => startEditing(note)}
                    className="bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-600 transition duration-300"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition duration-300"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
