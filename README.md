# GAIP — Game Analytics Intelligence Platform

A full-stack gaming analytics platform that tracks player performance,
records match statistics, and predicts player tiers using machine learning.

## Tech Stack

- **Backend:** Java Spring Boot, PostgreSQL, JPA/Hibernate
- **ML Service:** Python FastAPI, Scikit-learn, Pandas, Jupyter
- **Dashboard:** Voila, ipywidgets, Matplotlib, Seaborn
- **Tools:** Postman, pgAdmin, Maven

## Features

- Player management with full CRUD operations
- Match recording with auto-calculated KD ratio and win rate
- Machine learning tier prediction using Random Forest
- Interactive Jupyter dashboard with player search
- REST API tested with Postman

## How to Run

### Spring Boot
```bash
cd gameanalytics
./mvnw spring-boot:run
```

### Python FastAPI
```bash
cd gaip-python
python -m uvicorn api.app:app --reload --port 5000
```

### Jupyter Dashboard
```bash
cd gaip-python
python -m voila notebooks/dashboard.ipynb --port=8888
```

## API Endpoints

| Method | URL | Description |
|---|---|---|
| GET | /api/players | Get all players |
| GET | /api/players/{name} | Get player by name |
| POST | /api/players | Create player |
| GET | /api/players/{name}/predict | ML tier prediction |
| POST | /api/matches/player/{id} | Record match |
| GET | /api/matches/player/{id} | Get match history |
