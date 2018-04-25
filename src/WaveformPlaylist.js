import React, { Component } from 'react';
import $ from "jquery"
import * as ExternalWaveformPlaylist from 'waveform-playlist'

export default class WaveformPlaylist extends Component {
    componentDidMount() {
        setTimeout(() => {
            ExternalWaveformPlaylist.init(
                {
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
                }
            );

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

            playlist.load([
                {
                    src: 'assets/media/vermont-stems/Audio11_1.wav',
                    name: 'Audio11_1',
                    gain: 0.5,
                },
                {
                    src: 'assets/media/vermont-stems/Audio12_1.wav',
                    name: 'Audio12_1',
                    gain: 0.5,
                },
                {
                    src: 'assets/media/vermont-stems/Audio13_1.wav',
                    name: 'Audio13_1',
                    gain: 0.5,
                },
                {
                    src: 'assets/media/vermont-stems/BrooklynKit_1.wav',
                    name: 'BrooklynKit_1',
                    gain: 0.5,
                },
                {
                    src: 'assets/media/vermont-stems/Brooklyn_1.wav',
                    name: 'Brooklyn_1',
                    gain: 0.5,
                },
                {
                    src: 'assets/media/vermont-stems/Chorusaurus_1.wav',
                    name: 'Chorusaurus_1',
                    gain: 0.5,
                },
                {
                    src: 'assets/media/vermont-stems/EndlessSummer.wav',
                    name: 'EndlessSummer',
                    gain: 0.5,
                },
                {
                    src: 'assets/media/vermont-stems/EndlessSummer_1.wav',
                    name: 'EndlessSummer_1',
                    gain: 0.5,
                },
                {
                    src: 'assets/media/vermont-stems/EndlessSummer_3.wav',
                    name: 'EndlessSummer_3',
                    gain: 0.5,
                },
                {
                    src: 'assets/media/vermont-stems/EndlessSummer_4.wav',
                    name: 'EndlessSummer_4',
                    gain: 0.5,
                },
                {
                    src: 'assets/media/vermont-stems/EndlessSummer_5.wav',
                    name: 'EndlessSummer_5',
                    gain: 0.5,
                },
                {
                    src: 'assets/media/vermont-stems/VintageSynthStrings.wav',
                    name: 'VintageSynthStrings',
                    gain: 0.5,
                },
                {
                    src: 'assets/media/vermont-stems/VintageSynthStrings_2.wav',
                    name: 'VintageSynthStrings_2',
                    gain: 0.5,
                },
                {
                    src: 'assets/media/vermont-stems/VintageSynthStrings_3.wav',
                    name: 'VintageSynthStrings_3',
                    gain: 0.5,
                }
            ])

            const ee = playlist.getEventEmitter()
            const $container = $("body")

            $container.on("click", ".btn-play", () => {
                // console.log("YOYO")
                ee.emit("play")
            })
            $container.on("click", ".btn-stop", () => {
                // console.log("YOYO")
                ee.emit("stop")
            })
        }, 500)
    }
    render() {
        return (<div>
            <h1>Your song</h1>
            <div className="btn-play">Play</div>
            <div className="btn-stop">Stop</div>
            <div id="playlist"></div>
        </div>)
    }
}

