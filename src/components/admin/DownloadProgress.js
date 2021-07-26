import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState } from 'react';
import Alert from 'react-s-alert';

function DownloadProgress(props) {
    const [percentage, setPercentage] = useState(0);
    const [progress,   setProgress] = useState(null);

    const thumb = "https://images.unsplash.com/photo-1604263439201-171fb8c0fddc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=427&q=80 427w"
    const download = (currentProgress) => {
        if (currentProgress === 'finished') {
            return ;
        }
        const documentStyles = document.documentElement.style;
        let progress = 0;
        setProgress('in-progress');
        Alert.success("Download Starting...");
    
        axios.get('https://assets.imgix.net/unsplash/citystreet.jpg?rnd='+Math.random(), {
            crossDomain: true,
            responseType: "blob",
            onDownloadProgress(progressEvent) {
                progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                setPercentage(progress);
                documentStyles.setProperty('--progress', `${progress}%`);
            }
        }).then(response => {
            setProgress('finished');
            const url = window.URL.createObjectURL(
                new Blob([response.data], {
                  type: response.headers["content-type"],
                })
            );
        
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", 'download.jpg');
            document.body.appendChild(link);
            link.click();
            Alert.success("Download Completed !!!");
            setTimeout(() => {
                setPercentage(0);
                setProgress(null);
            }, 1000);
        }).catch((error) => {
            Alert.error("Downloading Failed!!");
        });

        
    };
    return (
        <div className="col-sm mt-4">
            <div className="row">
                <div className="col-sm-10">
                    <h2>Downalod Progress</h2>
                </div>
            </div>
            

            <div class="card " style={{width: '18rem'}}>
                <img src={thumb}  class="card-img-top" alt="Halloween Pumpkin"/>
                <div class={`card-body ${progress}`}>
                    <h5 class="card-title">Halloween Pumpkin</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    {progress !== 'in-progress'?
                        <a href="#" class="btn btn-primary download-button" onClick={(progress) => download(progress)}>
                            {progress === 'finished' ? 'Done' : 'Download '}
                            {progress === 'finished' ? '' : <FontAwesomeIcon icon={faDownload} />}</a>
                        : 
                        <div className="progress">
                            <div className="progress-bar progress-bar-striped progress-bar-animated" 
                                role="progressbar" aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100"
                                style={{width: `${percentage}%`}}>
                                    {percentage}%
                            </div>
                        </div>
                    }

                    
                </div>
            </div>
        </div>
    );
}

export default DownloadProgress;