from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base

#var
MARIADB_URL= "mysql+pymysql://root:admin@127.0.0.1:3315/wavesound"
#crear ob de conect

engine = create_engine(MARIADB_URL)
#plantila para modelos
BASE = declarative_base()