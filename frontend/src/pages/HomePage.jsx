import React, { useEffect, useState } from 'react'
import Navbar from "../components/Navbar";
import RateLimit from "../components/RateLimit";
import api from "../lib/axios";
import toast from "react-hot-toast"
import NoteCard from '../components/NoteCard';
import NotesNotFound from '../components/NotesNotFound';


const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false); //rate limit message
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes") // We send a GET request 
        console.log(res.data)
        setNotes(res.data)
        setIsRateLimited(false)

      } catch (error) {
        console.log("Error fetching NOTES");
        console.log(error);
        if(error.response?.status === 429){
          setIsRateLimited(true)
        } else {
          toast.error("Failed to load notes")
        }
      } finally {
        setLoading(false)
      } 
    };

    fetchNotes();
  }, [])

  return (
    <div className="min-h-screen">
      <Navbar />

      {isRateLimited && <RateLimit/>}

      <div className="max-w-7xl mx-auto p-4 mt-6" >
        {loading && <div className="text-center text-primary py-10">Loading notes...</div>}

        {notes.length === 0 && !isRateLimited && <NotesNotFound/>}

        {notes.length > 0 && !isRateLimited && (
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-center justify-center">
            <img src="/public/diddy.jpg" alt="diddy baby"  />
            </div>
            {notes.map(note => (
              <NoteCard key={note._id} note={note} setNotes={setNotes}/>
            ))} 
             
          </div>          
        )}
      </div>
      
    </div>
  )
};

export default HomePage