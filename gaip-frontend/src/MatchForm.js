import { useState } from "react";

function MatchForm({ player, onMatchRecorded }) {
  const [kills, setKills] = useState("");
  const [deaths, setDeaths] = useState("");
  const [won, setWon] = useState(false);
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!kills || !deaths || !date) {
      setMessage("All fields are required.");
      return;
    }

    const response = await fetch(
      `http://localhost:8080/api/matches/player/${player.id}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kills: parseInt(kills),
          deaths: parseInt(deaths),
          won: won,
          matchDate: date
        })
      }
    );

    if (response.ok) {
      setMessage("Match recorded! Stats updated.");
      setKills("");
      setDeaths("");
      setWon(false);
      setDate("");
      onMatchRecorded();
    } else {
      setMessage("Error recording match.");
    }
  };

  return (
    <div style={styles.form}>
      <h3 style={styles.title}>Record Match for {player.name}</h3>
      <input
        style={styles.input}
        type="number"
        placeholder="Kills"
        value={kills}
        onChange={e => setKills(e.target.value)}
      />
      <input
        style={styles.input}
        type="number"
        placeholder="Deaths"
        value={deaths}
        onChange={e => setDeaths(e.target.value)}
      />
      <input
        style={styles.input}
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
      />
      <label style={styles.label}>
        <input
          type="checkbox"
          checked={won}
          onChange={e => setWon(e.target.checked)}
          style={{ marginRight: '8px' }}
        />
        Won this match?
      </label>
      <button style={styles.button} onClick={handleSubmit}>
        Record Match
      </button>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

const styles = {
  form: {
    backgroundColor: '#16213e',
    borderRadius: '12px',
    padding: '20px',
    border: '1px solid #333',
    marginTop: '20px'
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
  label: {
    display: 'block',
    color: 'white',
    marginBottom: '12px',
    fontSize: '14px'
  },
  button: {
    padding: '10px 24px',
    backgroundColor: '#f5a623',
    color: '#0f0f1a',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px'
  },
  message: {
    marginTop: '12px',
    color: '#00d4ff'
  }
};

export default MatchForm;