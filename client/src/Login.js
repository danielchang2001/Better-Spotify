import React from "react"
import { Container } from "react-bootstrap"
import './Login.css'

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=f4e7fa397aab487c9b0f37079d268b5c&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

export default function Login() {
  return ([
    <div class="loginText">
      <h2>A simple web application that uses Spotify's API to showcase lyrics while listening.</h2>
      <h3>Built with React and Node.</h3>
      </div>,
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <a className="btn btn-success btn-lg font-weight-bold" href={AUTH_URL}>
        Login With Spotify
      </a>
    </Container>
  ])
}
