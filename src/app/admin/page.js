"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/css/Admin.module.css";

export default function Admin() {
  const [school, setSchool] = useState(null);
  const [editMode, setEditMode] = useState(false); 
  const [formData, setFormData] = useState({ name: "", description: "", contact: "" });
  const router = useRouter();

  async function fetchData() {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const subdomain = window.location.hostname.split(".")[0];
 

    if (subdomain === "school1" || subdomain === "school2") {
      const res = await fetch("/api/school", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setSchool(data);
      setFormData({ subdomain: data.subdomain, name: data.name, description: data.description, contact: data.contact });
    }
  }

  useEffect(() => {
    fetchData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("http://localhost:3001");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/school/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedSchool = await response.json();
        setSchool(updatedSchool);
        setEditMode(false);
        fetchData();
      } else {
        console.error("Failed to update school data.");
      }
    } catch (error) {
      console.error("Error updating school:", error);
    }
  };

  return (
    <div className={styles.container}>
      {school ? (
        <>
          <h1 className={styles.title}>Welcome, Admin to {school.name}</h1>

          <table className={styles.schoolTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{school.name}</td>
                <td>{school.description}</td>
                <td>{school.contact}</td>
              </tr>
            </tbody>
          </table>

          <div className={styles.buttonContainer}>
            <button className={styles.editBtn} onClick={() => setEditMode(true)}>
              Edit School
            </button>
            <button className={styles.logoutBtn} onClick={handleLogout}>
              Logout
            </button>
          </div>

          {editMode && (
            <div className={styles.modalOverlay}>
              <div className={styles.modal}>
                <h2>Edit School Details</h2>
                <form onSubmit={handleUpdate}>
                  <label>Name:</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                  <label>Description:</label>
                  <input name="description" value={formData.description} onChange={handleChange} required />

                  <label>Contact:</label>
                  <input type="text" name="contact" value={formData.contact} onChange={handleChange} required />

                  <div className={styles.buttonContainer}>
                    <button type="submit" className={styles.saveBtn}>
                      Save Changes
                    </button>
                    <button type="button" className={styles.cancelBtn} onClick={() => setEditMode(false)}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      ) : (
        <p className={styles.loading}>Loading...</p>
      )}
    </div>
  );
}
