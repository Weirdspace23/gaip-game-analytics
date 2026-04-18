import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import PlayerForm from "./PlayerForm";
import MatchForm from "./MatchForm";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function App() {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/api/players")
      .then(res => res.json())
      .then(data => setPlayers(data))
      .catch(err => console.error("Error fetching players:", err));
  }, []);

  const handlePlayerClick = async (player) => {
    setLoading(true);
    setSelectedPlayer(player);
    setPrediction(null);
    try {
      const predRes = await fetch(
        `http://localhost:8080/api/players/${player.name}/predict`
      );
      const predData = await predRes.json();
      setPrediction(predData);
    } catch (err) {
      console.error("Error fetching prediction:", err);
    }
    setLoading(false);
  };

  const chartData = selectedPlayer ? {
    labels: ['KD Ratio', 'Win Rate'],
    datasets: [{
      label: selectedPlayer.name,
      data: [selectedPlayer.kdRatio, selectedPlayer.winRate],
      backgroundColor: ['#00d4ff', '#f5a623'],
      borderRadius: 8
    }]
  } : null;

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: 'white' }
      }
    },
    scales: {
      x: {
        ticks: { color: 'white' },
        grid: { color: '#333' }
      },
      y: {
        ticks: { color: 'white' },
        grid: { color: '#333' }
      }
    }
  };


  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎮 GAIP — Game Analytics Intelligence Platform</h1>
      <PlayerForm onPlayerAdded={() => {
        fetch("http://localhost:8080/api/players")
          .then(res => res.json())
          .then(data => setPlayers(data));
          }} />

      <div style={styles.grid}>
        {players.map(player => (
          <div
            key={player.id}
            style={{
              ...styles.card,
              border: selectedPlayer?.id === player.id
                ? '1px solid #00d4ff'
                : '1px solid #333'
            }}
            onClick={() => handlePlayerClick(player)}
          >
            <h2 style={styles.playerName}>{player.name}</h2>
            <p style={styles.game}>{player.game}</p>
            <div style={styles.stats}>
              <div style={styles.stat}>
                <span style={styles.statLabel}>KD Ratio</span>
                <span style={styles.statValue}>{player.kdRatio}</span>
              </div>
              <div style={styles.stat}>
                <span style={styles.statLabel}>Win Rate</span>
                <span style={styles.statValue}>
                  {(player.winRate * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedPlayer && (
        <div style={styles.predictionBox}>
          <h2 style={styles.predictionTitle}>
            📊 {selectedPlayer.name} — {selectedPlayer.game}
          </h2>

          {loading ? (
            <p style={styles.loading}>Analysing player...</p>
          ) : prediction ? (
            <>
              <div style={styles.predictionStats}>
                <div style={styles.predictionStat}>
                  <span style={styles.predictionLabel}>Predicted Tier</span>
                  <span style={styles.tier}>{prediction.predictionTier}</span>
                </div>
                <div style={styles.predictionStat}>
                  <span style={styles.predictionLabel}>Confidence</span>
                  <span style={styles.confidence}>
                    {(prediction.confidence * 100).toFixed(0)}%
                  </span>
                </div>
              </div>

              <div style={styles.chartContainer}>
                <Bar data={chartData} options={chartOptions} />
              </div>
               {/* ADD MATCH FORM HERE */}
        <MatchForm
          player={selectedPlayer}
          onMatchRecorded={() => {
            fetch("http://localhost:8080/api/players")
              .then(res => res.json())
              .then(data => {
                setPlayers(data);
                const updated = data.find(p => p.id === selectedPlayer.id);
                if (updated) setSelectedPlayer(updated);
              });
          }}
        />
            </>
          ) : null}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#0f0f1a',
    minHeight: '100vh',
    color: 'white'
  },
  title: {
    textAlign: 'center',
    color: '#00d4ff',
    marginBottom: '30px',
    fontSize: '28px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  },
  card: {
    backgroundColor: '#1a1a2e',
    borderRadius: '12px',
    padding: '20px',
    cursor: 'pointer'
  },
  playerName: {
    color: '#00d4ff',
    margin: '0 0 5px 0',
    fontSize: '18px'
  },
  game: {
    color: '#888',
    margin: '0 0 15px 0',
    fontSize: '13px'
  },
  stats: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  stat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  statLabel: {
    color: '#888',
    fontSize: '11px'
  },
  statValue: {
    color: 'white',
    fontSize: '18px',
    fontWeight: 'bold'
  },
  predictionBox: {
    backgroundColor: '#1a1a2e',
    borderRadius: '12px',
    padding: '24px',
    border: '1px solid #00d4ff'
  },
  predictionTitle: {
    textAlign: 'center',
    color: '#00d4ff',
    marginBottom: '20px'
  },
  predictionStats: {
    display: 'flex',
    justifyContent: 'center',
    gap: '60px',
    marginBottom: '30px'
  },
  predictionStat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px'
  },
  predictionLabel: {
    color: '#888',
    fontSize: '13px'
  },
  tier: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#f5a623'
  },
  confidence: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#00d4ff'
  },
  loading: {
    textAlign: 'center',
    color: '#888'
  },
  chartContainer: {
    maxWidth: '600px',
    margin: '0 auto'
  }
};

export default App;