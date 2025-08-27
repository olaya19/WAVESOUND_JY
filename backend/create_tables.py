from app_wavesound.db.database import engine, BASE
from app_wavesound.models import models

BASE.metadata.create_all(bind=engine)
