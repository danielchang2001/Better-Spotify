import React from "react"
import './Dashboard.css'

export default function TrackSearchResult({ track, chooseTrack }) {
  function handlePlay() {
    chooseTrack(track)
  }

  return (
    <div className="trackListElement"> 
      <div
        className="d-flex m-2 align-items-center bg-dark rounded"
        style={{ cursor: "pointer" }}
        onClick={handlePlay}
      >
        <img src={track.albumUrl} style={{ height: "64px", width: "64px" }} />
        <div className="ml-3">
          <div className="text-white font-weight-bold">{track.title}</div>
          <div className="text-light">{track.artist}</div>
        </div>
      </div>
    </div>

  )
}
