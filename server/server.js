const express = require('express');
const cors = require("cors")
const bodyParser = require('body-parser')
const spotifyWebApi = require('spotify-web-api-node');

const app = express();
app.use(cors())
app.use(express.json())

app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken
    console.log("hi")
    const spotifyApi = new spotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId:'f4e7fa397aab487c9b0f37079d268b5c',
        clientSecret:'00502b1dfd654b2da8a1d59165a0c8db',
        refreshToken
    })

    spotifyApi
        .refreshAccessToken()
        .then(data => {
            res.json({
                accessToken: data.body.access_token,
                expiresIn: data.body.expires_in
            })
        }).catch(err => {
            console.log(err)
            res.sendStatus(400)
        })
})

app.post('/login', (req, res) => {
    const code = req.body.code
    const spotifyApi = new spotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId:'f4e7fa397aab487c9b0f37079d268b5c',
        clientSecret:'00502b1dfd654b2da8a1d59165a0c8db'
    })

    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    }).catch((err) => {
        console.log(err)
        res.sendStatus(400)
    })
})

app.listen(3001)