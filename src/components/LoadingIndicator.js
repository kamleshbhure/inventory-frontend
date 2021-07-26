import React from 'react';

export default function LoadingIndicator(props) {
    return (
        // <div className="loading-indicator" style={{display: 'block', textAlign: 'center', marginTop: '30px'}}>
            <div className="progress">
                <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width: '75%'}}></div>
            </div>
        // </div>
    );
}