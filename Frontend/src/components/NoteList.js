import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../NoteList.css"; // Import the new layout CSS file
import { BASE_URL } from "../utils";

const ListNote = () => {
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Component mounted");
    getNotes();
  }, []);

  const getNotes = async () => {
    try {
      const token = localStorage.getItem("accessToken"); // ambil token dari localStorage
      if (!token) {
        console.warn("No access token found, please login.");
        return;
      }
      const response = await axios.get(`${BASE_URL}/notes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes(response.data);
    } catch (error) {
      console.error("Gagal mengambil catatan:", error);
    }
  };

  const deleteNote = async (id) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`${BASE_URL}/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes(notes.filter((note) => note.id !== id));
      if (selectedNote && selectedNote.id === id) {
        setSelectedNote(null);
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const openModal = (note = null) => {
    setSelectedNote(note);
    setJudul(note ? note.Judul : "");
    setDeskripsi(note ? note.Deskripsi : "");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNote(null);
    setJudul("");
    setDeskripsi("");
  };

  const saveNote = async (e) => {
    e.preventDefault();
    try {
       const token = localStorage.getItem("accessToken");
      await axios.post(`${BASE_URL}/notes`, {
        Judul: judul,
        Deskripsi: deskripsi,
      },
       {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
    );
      closeModal();
      getNotes();
      navigate("/");
    } catch (error) {
      console.log("Gagal menyimpan catatan:", error);
    }
  };

  const updateNote = async (e) => {
    e.preventDefault();
    try {
       const token = localStorage.getItem("accessToken");
      await axios.patch(`${BASE_URL}/notes/${selectedNote.id}`, {
        Judul: judul,
        Deskripsi: deskripsi,
      },
       {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
    );
      closeModal();
      getNotes();
      navigate("/");
    } catch (error) {
      console.log("Gagal memperbarui catatan:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`);
      navigate("/login");
    } catch (error) {
      console.error("Gagal logout:", error);
      navigate("/login"); // Tetap arahkan ke login jika gagal
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h2 className="title">Daftar Catatan</h2>
        <button className="btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="header">
        <h5 className="total-notes">Total Catatan: {notes.length}</h5>
        <button className="btn-add" onClick={() => openModal()}>
          + Tambah Catatan
        </button>
      </div>
      <div className="note-list">
        {notes.length > 0 ? (
          notes.map((note) => (
            <div key={note.id} className="note-card">
              <h3 className="note-title">{note.Judul}</h3>
              <p className="note-description">{note.Deskripsi}</p>
              <div className="note-actions">
                <button onClick={() => openModal(note)} className="btn-edit">
                  Edit
                </button>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="btn-delete"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-data">Tidak ada catatan tersedia</p>
        )}
      </div>

      {/* MODAL FORM */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{selectedNote ? "Edit Catatan" : "Tambah Catatan"}</h3>
            <form onSubmit={selectedNote ? updateNote : saveNote}>
              <input
                type="text"
                name="Judul"
                placeholder="Judul"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                required
              />
              <textarea
                name="Deskripsi"
                placeholder="Deskripsi"
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                required
              ></textarea>
              <div className="modal-actions">
                <button type="submit" className="btn-save">
                  Simpan
                </button>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListNote;