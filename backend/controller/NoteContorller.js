import Note from "../model/NoteModel.js";

export const getNotes = async (req, res) => {
    try {
        const response = await Note.findAll();
        res.status(200).json(response);
            }
            catch(error){
                console.log(error.message);
            }
}

export const getNoteById = async (req, res) => {      
    try {
        const response = await Note.findOne({
            where:{id : req.params.id}
        });
        res.status(200).json(response);
            }
            catch(error){
                console.log(error.message);
            }
}

export const CreateNote = async (req, res) => {      
    try {
    await Note.create(req.body);
    res.status(201).json({ msg: "Note Created" });
  } 
  catch (error) {
    console.log(error.message);
            }
}

export const UpdateNote = async (req, res) => {      
    try {
    await Note.update(req.body,
        {where:{id : req.params.id}}
    );
    res.status(200).json({ msg: "Note Updated" });
  } 
  catch (error) {
    console.log(error.message);
            }
}

export const DeleteNote = async (req, res) => {      
    try {
    await Note.destroy(
        {where:{id : req.params.id}}
    );
    res.status(200).json({ msg: "Note Deleted" });
  } 
  catch (error) {
    console.log(error.message);
            }
}