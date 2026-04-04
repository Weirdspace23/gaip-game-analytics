from fastapi import FastAPI
import joblib
import pandas as pd
import os
app = FastAPI()
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
model = joblib.load(os.path.join(BASE_DIR, "models", "player_model.pkl"))

@app.get("/")
def root():
    return {"message" : "GAIP Python Service is running"}

@app.get("/predict/{player_name}")
def predict_player(player_name:str,kdRatio: float,winRate: float):
   features=pd.DataFrame({
       'kdRatio':[kdRatio],
       'winRate':[winRate],
   })

   prediction = model.predict(features)[0]
   confidence= model.predict_proba(features).max()
   return {"playerName": player_name,
           "predictionTier":prediction,
           "confidence":round(float(confidence),2)}
