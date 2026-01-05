import Note from "../models/Note.js"



// GET 
export async function getAllNotes(_, res) {
    try {
      const notes = await Note.find().sort({createdAt: -1}); // newest first
      res.status(200).json(notes);

    } catch (error) {

      console.error("ERROR in getAllNotes controller", error);
      res.status(500).json({message: "INTERNAL server error"});
    }
}


// GET 2
export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id)
    if(!note) return res.status(404).json({message: "Note not found"})
      res.json(note);
  } catch (error) {
    console.error("ERROR in getNoteById controller", error);
    res.status(500).json({message: "INTERNAL server error"});
  }
}


// POST to create a note or post 
export async function createNote(req, res) {
    try {
      const {title, content} = req.body
      const note = new Note ({title, content})

      const savedNote = await note.save()
      res.status(201).json(savedNote)
        
    } catch (error) {

      console.error("ERROR in createNote controller", error);
      res.status(500).json({message: "INTERNAL server error"});
    }
}   



// PUT to update a note
export async function updateNote(req, res) {
  try {
    const {title, content} = req.body
    const updateNote = await Note.findByIdAndUpdate(
      req.params.id, 
      {title, content},
      {
      new: true
      }
    );

    if (!updateNote) return res.status(404).json({message: "Note not found!"});
 

    res.status(200).json(updateNote);
  } catch (error) {

    console.error("ERROR in updateNote controller", error);
    res.status(500).json({message: "INTERNAL server error"});
  }
}



// DELETE 
export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id)
    if(!deletedNote) return res.status(404).json({message: "Note not found!"})
    res.status(200).json({message: "Note deleted sucessfully"});  

  } catch (error) {

    console.error("ERROR in deleteNote controller", error);
    res.status(500).json({message: "INTERNAL server error"});
  }
}