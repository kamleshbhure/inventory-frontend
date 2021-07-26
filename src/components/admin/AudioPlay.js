import React from 'react';
import ReactAudioPlayer from 'react-audio-player';

function AudioPlay(props) {
    return (
        <div className="col-sm mt-4">
            <div className="row">
                <div className="col-sm-10">
                    <h2>Audio Play</h2>
                </div>
            </div>
            <div>
            <ReactAudioPlayer
                src="http://localhost:8080/media/audio/ogg/music_2mg"
                controls
                />
            </div>
            
        </div>
    );
}

export default AudioPlay;