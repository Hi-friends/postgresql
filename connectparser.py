import pandas as pd
import psycopg2 as pg2
from sqlalchemy import create_engine

engine = create_engine('postgresql://postgres@18.191.153.227:5432/postgres')

code_df = pd.read_html('https://finance.naver.com/marketindex/exchangeList.nhn', header=0)[0]
code_df.to_sql('postgres', engine, if_exists='replace') 

a = pd.read_sql_query('select * from postgres', con=engine)

print(a)
