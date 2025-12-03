from pydantic import BaseModel

class PlaylistCreate(BaseModel):
    name: str
    description: str | None = None
    user_id: int

class PlaylistAddSong(BaseModel):
    playlist_id: int
    song_id: int
