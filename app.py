import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, desc
from flask import Flask, jsonify
import json
import numpy as np
import os


engine = create_engine("sqlite:///westnile_1.sqlite")

Base = automap_base()
Base.prepare(engine, reflect=True)

Disease_Data = Base.classes.disease_data 

session = Session(engine)

app = Flask(__name__)

@app.route("/")
def home():
	return(
		f"Welcome to the West Nile Virus Case Report API <br>"
		f"Available routes: <br>"
		f"/api/v1.0/Cases_per_year_2010_2017 <br>"
		f"/api/v1.0/case_totals <br>"
		f"/api/v1.0/json_combined <br>")


@app.route("/api/v1.0/Cases_per_year_2010_2017")
def cases_2010_2017():

	column_list = Disease_Data.__table__.columns.keys()
	results_10 = session.query(Disease_Data).all()
	json_list=[]
	for result in results_10:
		temp_dict={}
		
		for col in column_list:

			temp_dict[col] = getattr(result,col)
		json_list.append(temp_dict)
	json2010 = json.dumps(json_list)


	return jsonify(json2010)


@app.route("/api/v1.0/case_totals")
def totals():
	response = session.query(Disease_Data.State, Disease_Data.TotalByState).all()
	stats = list(np.ravel(response))
	return jsonify (stats)


if __name__ == "__main__":
	app.run(debug=True)












