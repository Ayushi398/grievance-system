import React, { useState, useEffect } from "react";

function Dashboard() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Academic"
  });

  const [grievances, setGrievances] = useState([]);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // CREATE grievance
  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/api/grievances", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify(form)
    });

    fetchGrievances();
  };

  // GET grievances
  const fetchGrievances = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/grievances", {
        headers: {
          Authorization: token
        }
      });

      const data = await res.json();

      if (res.ok) {
        setGrievances(data);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // DELETE grievance
  const deleteGrievance = async (id) => {
    await fetch(`http://localhost:5000/api/grievances/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token
      }
    });

    fetchGrievances();
  };

  // SEARCH grievance
  const searchGrievance = async () => {
    const res = await fetch(
      `http://localhost:5000/api/grievances/search?title=${search}`,
      {
        headers: {
          Authorization: token
        }
      }
    );

    const data = await res.json();
    setGrievances(data);
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    alert("Logged out");
  };

  useEffect(() => {
    if (token) {
      fetchGrievances();
    }
  }, [token]);

  return (
    <div>
      <h2>Dashboard</h2>

      <button onClick={logout}>Logout</button>

      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" onChange={handleChange} /><br />
        <input name="description" placeholder="Description" onChange={handleChange} /><br />

        <select name="category" onChange={handleChange}>
          <option>Academic</option>
          <option>Hostel</option>
          <option>Transport</option>
          <option>Other</option>
        </select><br />

        <button type="submit">Submit Grievance</button>
      </form>

      <h3>Search</h3>
      <input
        placeholder="Search by title"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={searchGrievance}>Search</button>

      <h3>All Grievances</h3>
      {grievances.map((g) => (
        <div key={g._id}>
          <p><b>{g.title}</b> - {g.description}</p>
          <p>{g.category} | {g.status}</p>

          <button onClick={() => deleteGrievance(g._id)}>Delete</button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default Dashboard;