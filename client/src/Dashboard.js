import { useState, useEffect } from "react"
import useAuth from "./useAuth"
import Player from "./Player"
import TrackSearchResult from "./TrackSearchResult"
import { Container, Form } from "react-bootstrap"
import SpotifyWebApi from "spotify-web-api-node"
import axios from "axios"
import './Dashboard.css'

document.body.style.backgroundColor = "#333";

const spotifyApi = new SpotifyWebApi({
  clientId: "8b945ef10ea24755b83ac50cede405a0",
})

export default function Dashboard({ code }) {
  const accessToken = useAuth(code)
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [playingTrack, setPlayingTrack] = useState()
  const [lyrics, setLyrics] = useState("")
  const [title, setTitle] = useState("")

  function chooseTrack(track) {
    setPlayingTrack(track)
    setSearch("")
    setLyrics("")
  }

  useEffect(() => {
    if (!playingTrack) return

    axios
      .get("http://localhost:3001/lyrics", {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      })
      .then(res => {
        setLyrics(res.data.lyrics)
      })
  }, [playingTrack])

  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  useEffect(() => {
    if (!search) return setSearchResults([])
    if (!accessToken) return

    let cancel = false
    spotifyApi.searchTracks(search).then(res => {
      if (cancel) return
      setSearchResults(
        res.body.tracks.items.map(track => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image
              return smallest
            },
            track.album.images[0]
          )

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          }
        })
      )
    })

    return () => (cancel = true)
  }, [search, accessToken])

  return (
    <div className="wrapper1">
      <div className = "wrapper">
        <div className="lyricsWrap">
          <div className="headerImage">
            <img src="/images/findlyrics2.png" alt=""/>
          </div>
          <Container className="lyricsContainer border rounded d-flex flex-column py-2 bg-secondary" style={{height: "100vh" }}>
            <div class="topSearch"></div>
            <Form.Control
              className="font-weight-bold bg-dark text-white"
              type="search"
              placeholder="Search Songs/Artists"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
              {searchResults.map(track => (
                <TrackSearchResult
                  track={track}
                  key={track.uri}
                  chooseTrack={chooseTrack}
                />
              ))}
              {searchResults.length === 0 && (
                <div className="text-lowercase text-center text-white font-weight-bold" style={{ whiteSpace: "pre" }}>
                  {lyrics}
                </div>
              )}
            </div>
            <div className="player">
              <Player class="player" accessToken={accessToken} trackUri={playingTrack?.uri} />
            </div>
          </Container>
        </div>
        <div className="secondDiv">

        </div>
      </div>
    </div>


  )
}
