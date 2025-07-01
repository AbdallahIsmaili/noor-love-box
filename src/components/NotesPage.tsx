import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, 
  Save, 
  Plus, 
  Heart, 
  Trash2, 
  Bold, 
  Italic, 
  Underline, 
  Heading, 
  Code,
  Smile,
  Sparkles,
  Calendar,
  Edit3,
  Loader2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

// Firebase imports
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore'
import { db } from '../firebase'

interface Note {
  id: string
  title: string
  content: string
  date: string
  sticker: string
  color: string
  createdAt?: any
}

interface NotesPageProps {
  userName: string
  onBack: () => void
}

const stickers = ['💕', '💖', '💝', '🌟', '🌈', '🦋', '🌸', '🎀', '✨', '🌹', '💫', '🔮']
const noteColors = [
  'from-pink-100 to-rose-100',
  'from-purple-100 to-pink-100', 
  'from-blue-100 to-purple-100',
  'from-yellow-100 to-orange-100',
  'from-green-100 to-blue-100',
  'from-rose-100 to-pink-100'
]

const emojis = ['😘', '🥰', '😍', '💋', '🤗', '😊', '💕', '💖', '💝', '🌟', '✨', '🦋', '🌸', '🌹', '💐', '🎀']

export default function NotesPage({ userName, onBack }: NotesPageProps) {
  const [notes, setNotes] = useState<Note[]>([])
  const [isWriting, setIsWriting] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newNote, setNewNote] = useState({ title: '', content: '', sticker: '💕', color: noteColors[0] })
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Collection reference
  const notesCollection = collection(db, 'loveNotes')

  // Real-time listener for notes
  useEffect(() => {
    const q = query(notesCollection, orderBy('createdAt', 'desc'))
    
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const fetchedNotes = snapshot.docs.map(doc => {
          const data = doc.data()
          return {
            id: doc.id,
            ...data,
            date: data.createdAt?.toDate ? 
              data.createdAt.toDate().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              }) : 
              data.date || 'Unknown date'
          } as Note
        })
        setNotes(fetchedNotes)
        setLoading(false)
      },
      (error) => {
        console.error('Error fetching notes:', error)
        setLoading(false)
        // Fallback to localStorage if Firebase fails
        const savedNotes = localStorage.getItem('loveNotes')
        if (savedNotes) {
          setNotes(JSON.parse(savedNotes))
        }
      }
    )

    return () => unsubscribe()
  }, [])

  const formatText = (command: string) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = textarea.value.substring(start, end)
    const beforeText = textarea.value.substring(0, start)
    const afterText = textarea.value.substring(end)

    let formattedText = ''
    switch (command) {
      case 'bold':
        formattedText = `**${selectedText || 'bold text'}**`
        break
      case 'italic':
        formattedText = `*${selectedText || 'italic text'}*`
        break
      case 'underline':
        formattedText = `__${selectedText || 'underlined text'}__`
        break
      case 'heading':
        formattedText = `### ${selectedText || 'Heading'}`
        break
      case 'code':
        formattedText = `\`${selectedText || 'code'}\``
        break
    }

    const newContent = beforeText + formattedText + afterText
    setNewNote(prev => ({ ...prev, content: newContent }))
    
    setTimeout(() => {
      textarea.focus()
      const newCursorPos = start + formattedText.length
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  const insertEmoji = (emoji: string) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const beforeText = textarea.value.substring(0, start)
    const afterText = textarea.value.substring(end)
    
    const newContent = beforeText + emoji + afterText
    setNewNote(prev => ({ ...prev, content: newContent }))
    setShowEmojiPicker(false)
    
    setTimeout(() => {
      textarea.focus()
      const newCursorPos = start + emoji.length
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  const saveNote = async () => {
    if (!newNote.title.trim() || !newNote.content.trim()) {
      alert('Please add both a title and content for your note! 💕')
      return
    }

    setSaving(true)

    try {
      const noteData = {
        title: newNote.title,
        content: newNote.content,
        sticker: newNote.sticker,
        color: newNote.color,
        createdAt: serverTimestamp(),
        date: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      }

      if (editingId) {
        // Update existing note
        const noteRef = doc(db, 'loveNotes', editingId)
        await updateDoc(noteRef, {
          ...noteData,
          updatedAt: serverTimestamp()
        })
        setEditingId(null)
      } else {
        // Add new note
        await addDoc(notesCollection, noteData)
      }

      setNewNote({ title: '', content: '', sticker: '💕', color: noteColors[0] })
      setIsWriting(false)
      
    } catch (error) {
      console.error('Error saving note:', error)
      alert('Failed to save note. Please try again! 😔')
      
      // Fallback to localStorage
      const noteToSave: Note = {
        id: editingId || Date.now().toString(),
        title: newNote.title,
        content: newNote.content,
        date: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        sticker: newNote.sticker,
        color: newNote.color
      }

      if (editingId) {
        setNotes(prev => prev.map(note => note.id === editingId ? noteToSave : note))
        setEditingId(null)
      } else {
        setNotes(prev => [noteToSave, ...prev])
      }

      // Save to localStorage as backup
      const updatedNotes = editingId 
        ? notes.map(note => note.id === editingId ? noteToSave : note)
        : [noteToSave, ...notes]
      localStorage.setItem('loveNotes', JSON.stringify(updatedNotes))

      setNewNote({ title: '', content: '', sticker: '💕', color: noteColors[0] })
      setIsWriting(false)
    } finally {
      setSaving(false)
    }
  }

  const deleteNote = async (id: string) => {
    if (!confirm('Are you sure you want to delete this note? 🥺')) return

    try {
      await deleteDoc(doc(db, 'loveNotes', id))
    } catch (error) {
      console.error('Error deleting note:', error)
      alert('Failed to delete note. Please try again! 😔')
      
      // Fallback to local state update
      setNotes(prev => prev.filter(note => note.id !== id))
      localStorage.setItem('loveNotes', JSON.stringify(notes.filter(note => note.id !== id)))
    }
  }

  const editNote = (note: Note) => {
    setNewNote({
      title: note.title,
      content: note.content,
      sticker: note.sticker,
      color: note.color
    })
    setEditingId(note.id)
    setIsWriting(true)
  }

  const renderFormattedContent = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/__(.*?)__/g, '<u>$1</u>')
      .replace(/### (.*?)(?=\n|$)/g, '<h3 class="text-lg font-bold text-pink-600 mb-2">$1</h3>')
      .replace(/`(.*?)`/g, '<code class="bg-pink-100 px-2 py-1 rounded text-sm font-mono">$1</code>')
      .replace(/\n/g, '<br>')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-pink-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading your love notes... 💕</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto relative z-10"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              onClick={onBack}
              variant="outline"
              className="rounded-full p-3 hover:scale-105 transition-transform bg-white/80 backdrop-blur-sm border-2 border-pink-200 hover:border-pink-400"
            >
              <ArrowLeft className="w-5 h-5 text-pink-600" />
            </Button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Love Notes for {userName} 💌
            </h1>
          </div>
          
          <Button
            onClick={() => setIsWriting(true)}
            className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition-all"
          >
            <Plus className="w-5 h-5 mr-2" />
            Write Note
          </Button>
        </div>

        {/* Writing Interface */}
        <AnimatePresence>
          {isWriting && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8"
            >
              <Card className="bg-white/95 backdrop-blur-sm border-2 border-pink-200 shadow-xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-pink-600 flex items-center gap-2">
                      <Edit3 className="w-5 h-5" />
                      {editingId ? 'Edit Note' : 'Write a New Note'}
                    </h2>
                    <Button
                      onClick={() => {
                        setIsWriting(false)
                        setEditingId(null)
                        setNewNote({ title: '', content: '', sticker: '💕', color: noteColors[0] })
                      }}
                      variant="ghost"
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Title Input */}
                  <Input
                    placeholder="Give your note a title... 💕"
                    value={newNote.title}
                    onChange={(e) => setNewNote(prev => ({ ...prev, title: e.target.value }))}
                    className="text-lg font-medium border-2 border-pink-200 focus:border-pink-400"
                  />

                  {/* Formatting Toolbar */}
                  <div className="flex flex-wrap gap-2 p-3 bg-pink-50 rounded-lg border space-y-2">
                    <Button
                      onClick={() => formatText('bold')}
                      variant="outline"
                      size="sm"
                      className="hover:bg-pink-100"
                    >
                      <Bold className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => formatText('italic')}
                      variant="outline"
                      size="sm"
                      className="hover:bg-pink-100"
                    >
                      <Italic className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => formatText('underline')}
                      variant="outline"
                      size="sm"
                      className="hover:bg-pink-100"
                    >
                      <Underline className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => formatText('heading')}
                      variant="outline"
                      size="sm"
                      className="hover:bg-pink-100"
                    >
                      <Heading className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => formatText('code')}
                      variant="outline"
                      size="sm"
                      className="hover:bg-pink-100"
                    >
                      <Code className="w-4 h-4" />
                    </Button>
                    
                    <div className="relative inline-block">
                      <Button
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        variant="outline"
                        size="sm"
                        className="hover:bg-pink-100"
                      >
                        <Smile className="w-4 h-4" />
                      </Button>

                      {showEmojiPicker && (
                        <div className="absolute left-0 mt-2 p-3 bg-white border border-pink-200 rounded-xl shadow-lg z-50 w-[260px] grid grid-cols-6 gap-2">
                          {emojis.map((emoji, index) => (
                            <button
                              key={index}
                              onClick={() => insertEmoji(emoji)}
                              className="text-lg hover:bg-pink-100 rounded transition-transform hover:scale-125 p-1"
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content Textarea */}
                  <textarea
                    ref={textareaRef}
                    placeholder="Write your heart out... Use **bold**, *italic*, __underline__, ### headings, or `code` 💖"
                    value={newNote.content}
                    onChange={(e) => setNewNote(prev => ({ ...prev, content: e.target.value }))}
                    className="w-full h-40 p-4 border-2 border-pink-200 focus:border-pink-400 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-pink-200"
                  />

                  {/* Customization Options */}
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-600">Sticker:</span>
                      <div className="flex gap-1">
                        {stickers.map((sticker, index) => (
                          <button
                            key={index}
                            onClick={() => setNewNote(prev => ({ ...prev, sticker }))}
                            className={`p-2 rounded-lg text-xl transition-all ${
                              newNote.sticker === sticker 
                                ? 'bg-pink-200 scale-110' 
                                : 'hover:bg-pink-100'
                            }`}
                          >
                            {sticker}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-600">Color:</span>
                      <div className="flex gap-1">
                        {noteColors.map((color, index) => (
                          <button
                            key={index}
                            onClick={() => setNewNote(prev => ({ ...prev, color }))}
                            className={`w-8 h-8 rounded-full bg-gradient-to-br ${color} border-2 transition-all ${
                              newNote.color === color 
                                ? 'border-pink-400 scale-110' 
                                : 'border-gray-200 hover:border-pink-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Save Button */}
                  <Button
                    onClick={saveNote}
                    disabled={saving}
                    className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-3 rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5 mr-2" />
                        {editingId ? 'Update Note' : 'Save Note'} 💕
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {notes.map((note) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.02 }}
                className="relative group"
              >
                <Card className={`bg-gradient-to-br ${note.color} border-2 border-white/50 shadow-lg hover:shadow-xl transition-all overflow-hidden`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{note.sticker}</span>
                        <h3 className="font-bold text-gray-800 text-lg leading-tight">
                          {note.title}
                        </h3>
                      </div>
                      
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          onClick={() => editNote(note)}
                          variant="ghost"
                          size="sm"
                          className="hover:bg-white/50 p-1"
                        >
                          <Edit3 className="w-4 h-4 text-gray-600" />
                        </Button>
                        <Button
                          onClick={() => deleteNote(note.id)}
                          variant="ghost"
                          size="sm"
                          className="hover:bg-red-100 p-1"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div 
                      className="text-gray-700 mb-4 leading-relaxed"
                      dangerouslySetInnerHTML={{ 
                        __html: renderFormattedContent(note.content) 
                      }}
                    />
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {note.date}
                    </div>
                  </CardContent>
                  
                  {/* Floating hearts decoration */}
                  <div className="absolute -top-2 -right-2 opacity-20">
                    <Heart className="w-8 h-8 text-pink-400" fill="currentColor" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {notes.length === 0 && !isWriting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-8xl mb-4">💌</div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">No notes yet!</h3>
            <p className="text-gray-500 mb-6">Start writing beautiful notes for {userName}</p>
            <Button
              onClick={() => setIsWriting(true)}
              className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              <Plus className="w-5 h-5 mr-2" />
              Write First Note
            </Button>
          </motion.div>
        )}
      </motion.div>

      {/* Floating background hearts */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-200/30"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: typeof window !== 'undefined' ? window.innerHeight + 50 : 850,
              scale: 0,
              rotate: 0
            }}
            animate={{
              y: -50,
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 12 + Math.random() * 6,
              delay: i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Heart className="w-6 h-6" fill="currentColor" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}