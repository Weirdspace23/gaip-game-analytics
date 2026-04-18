import { useState } from "react";

function PlayerForm({ onPlayerAdded }) {
  const [name, setName] = useState("");
  const [game, setGame] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!name || !game) {
      setMessage("Name and game are required.");
      return;
    }

    const response = await fetch("http://localhost:8080/api/players", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, game, kdRatio: 0, winRate: 0 })
    });

    if (response.ok) {
      setMessage(`${name} added successfully!`);
      setName("");
      setGame("");
      onPlayerAdded();
    } else {
      setMessage("Error adding player.");
    }
  };

  return (
    <div style={styles.form}>
      <h2 style={styles.title}>Add New Player</h2>
      <input
        style={styles.input}
        placeholder="Player name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        style={styles.input}
        placeholder="Game (e.g. Valorant, PUBG)"
        value={game}
        onChange={e => setGame(e.target.value)}
      />
      <button style={styles.button} onClick={handleSubmit}>
        Add Player
      </button>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

const styles = {
  form: {
    backgroundColor: '#1a1a2e',
    borderRadius: '12px',
    padding: '24px',
    border: '1px solid #333',
    marginBottom: '30px'
  },
  title: {
    color: '#00d4ff',
    marginBottom: '16px'
  },
  input: {
    display: 'block',
    width: '100%',
    padding: '10px',
    marginBottom: '12px',
    borderRadius: '8px',
    border: '1px solid #333',
    backgroundColor: '#0f0f1a',
    color: 'white',
    fontSize: '14px',
    boxSizing: 'border-box'
  },
  button: {
    padding: '10px 24px',
    backgroundColor: '#00d4ff',
    color: '#0f0f1a',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px'
  },
  message: {
    marginTop: '12px',
    color: '#f5a623'
  }
};

export default PlayerForm;