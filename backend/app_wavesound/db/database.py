from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.exc import SQLAlchemyError

# Cambia los datos de conexión según tu configuración
DATABASE_URL = "mysql+pymysql://root:admin@localhost:3315/wavesound"

# Crea el motor de conexión
engine = create_engine(
    DATABASE_URL,
    echo=True,  # Muestra en consola las sentencias SQL (puedes poner False en producción)
    future=True
)

# Crea una clase SessionLocal para abrir sesiones
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False, future=True)

# Clase base para los modelos
BASE = declarative_base()

# Dependencia para FastAPI: inyecta la sesión en cada endpoint
def get_db():
    db = SessionLocal()
    try:
        yield db
    except SQLAlchemyError as e:
        print(f"Error en DB: {e}")
        db.rollback()
        raise
    finally:
        db.close()
