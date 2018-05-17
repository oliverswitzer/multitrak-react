import React, {Component} from 'react'
import $ from "jquery"
import * as ExternalWaveformPlaylist from 'waveform-playlist'
import firebase from 'firebase'

firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: `${process.env.REACT_APP_PROJECT_ID}.firebaseapp.com`,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    storageBucket: process.env.REACT_APP_BUCKET,
})
const storage = firebase.storage()
const storageRef = storage.ref()

export default class WaveformPlaylist extends Component {
    componentDidMount() {
        const myStemNames = [
            'Audio11_1.wav',
            'Audio12_1.wav',
            'Audio13_1.wav',
            'BrooklynKit_1.wav',
            'Brooklyn_1.wav',
            'Chorusaurus_1.wav',
            'EndlessSummer.wav',
            'EndlessSummer_1.wav',
            'EndlessSummer_3.wav',
            'EndlessSummer_4.wav',
            'EndlessSummer_5.wav',
            'VintageSynthStrings.wav',
            'VintageSynthStrings_2.wav',
            'VintageSynthStrings_3.wav'
        ]

        const getDownloadUrlPromises = myStemNames.map(stemName => storageRef.child(stemName).getDownloadURL())

        Promise.all(getDownloadUrlPromises).then(resolvedUrls => {
            const stemMapping = myStemNames.map((stemName, i) => {
                return {name: stemName, src: resolvedUrls[i]}
            })

            renderWaveformPlaylist(stemMapping)
        })
    }

    render() {
        return (<div>
            <h1>Your song</h1>

            <div id="top-bar" className="playlist-top-bar">
                <div className="playlist-toolbar">
                    <div className="btn-group">
                        <span className="btn-pause btn btn-warning"><i className="fa fa-pause"></i></span>
                        <span className="btn-play btn btn-success"><i className="fa fa-play"></i></span>
                        <span className="btn-stop btn btn-danger"><i className="fa fa-stop"></i></span>
                        <span className="btn-rewind btn btn-success"><i className="fa fa-fast-backward"></i></span>
                        <span className="btn-fast-forward btn btn-success"><i className="fa fa-fast-forward"></i></span>
                    </div>
                    <span className="audio-pos"></span>
                </div>
            </div>

            <div id="playlist"></div>
        </div>)
    }
}

function renderWaveformPlaylist(stemUrls) {
    const playlist = ExternalWaveformPlaylist.init({
        samplesPerPixel: 3000,
        mono: true,
        waveHeight: 70,
        container: document.getElementById('playlist'),
        state: 'cursor',
        colors: {
            waveOutlineColor: '#E0EFF1',
            timeColor: 'grey',
            fadeColor: 'black'
        },
        controls: {
            show: true,
            width: 400
        },
        zoomLevels: [500, 1000, 3000, 5000]
    })

    playlist.load(stemUrls)

    const ee = playlist.getEventEmitter()
    const $container = $("body")

    $container.on("click", ".btn-play", () => {
        ee.emit("play")
    })
    $container.on("click", ".btn-stop", () => {
        ee.emit("stop")
    })
}

