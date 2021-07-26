import axios, { CancelToken, isCancel } from "axios";
import { Form, Modal, ProgressBar } from 'react-bootstrap';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import '../../css/videoplayer.css'

function VideoPlay(props) {
    const [files, setFiles] = useState([])
    const [show, setShow] = useState(false)
    const [videoName, setVideoName] = useState('')
    const [videoUrl, setVideoUrl] = useState('')
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const cancelFileUpload = useRef(null);

    useEffect(() => {
        axios.get("http://localhost:8080/media/files").then(response => {
            setFiles(response.data)
        }).catch(error => {
            console.log(error);
        });
    }, []);

    const uploadFile = ({ target: { files } }) => {
        let data = new FormData();
        data.append("file", files[0]);

        const options = {
            onUploadProgress: progressEvent => {
                const { loaded, total } = progressEvent;
                let percent = Math.floor((loaded * 100) / total);
                if (percent < 100) {
                    setUploadPercentage(percent);
                }
            },
            cancelToken: new CancelToken(
                cancel => (cancelFileUpload.current = cancel)
            )
        };

        axios.post(
                "http://localhost:8080/media/upload",
                data,
                options
            )
            .then(response => {
                setUploadPercentage(100);
                const responseData = response.data;
                setFiles(prevState => {
                    // Object.assign would also work
                    return [...prevState, responseData];
                });
                document.getElementById('fileUpload').value = "";
                setTimeout(() => {
                    setUploadPercentage(0);
                }, 1000);
            })
            .catch(err => {
                console.log(err);

                if (isCancel(err)) {
                    alert(err.message);
                }
                setUploadPercentage(0);
            });
    }

    const cancelUpload = () => {
        if (cancelFileUpload.current)
            cancelFileUpload.current("User has canceled the file upload.");
    }

    const handleVideoClick = (file) => {
        setVideoName(file.name)
        setVideoUrl(file.url)
        setShow(true)
    }
    const onClose = () => {
        setShow(false)
    }
    return (
        <div className="col-sm mt-4">
            <div className="row">
                <div className="col-sm-10">
                    <h2>Video Library</h2>
                </div>
            </div>
            <div className="col-sm-10 mb-3">
                <div>
                    <label htmlFor="fileUpload" className="form-label">Upload Video</label>
                    <input className="form-control form-control-lg" 
                        id="fileUpload" accept="video/*" type="file" onChange={uploadFile}/>
                </div>
                {uploadPercentage > 0 && (
                    <div className="row mt-3">
                        <div className="col pt-1">
                            <ProgressBar
                                now={uploadPercentage}
                                striped={true}
                                label={`${uploadPercentage}%`}
                            />
                        </div>
                        <div className="col-auto">
                            <span
                                className="text-primary cursor-pointer"
                                onClick={() => cancelUpload()}
                            >
                                Cancel
                            </span>
                        </div>
                    </div>
                )}
            </div>
            <section className="">
                <section className="">
                    <div className="row">
                        {files && files.map(file => (
                            <div key={file.name} className="col-lg-4 col-md-12 mb-4 mb-lg-0 wrapper" onClick={() => handleVideoClick(file)}>
                                <div 
                                className="bg-image hover-overlay ripple shadow-1-strong rounded video-thumb"
                                data-ripple-color="light" style={{cursor: "pointer"}}>
                                <img
                                    src={`http://localhost:8080/images/${file.name.replace("mp4", "jpg")}`}
                                    className="w-100"
                                />
                                </div>
                                <span className="playicon"/>
                                
                            </div>)
                        )}
                    </div>
                </section>
            </section>

            <Modal show={show}>
                <Modal.Header closeButton onClick={(e) => onClose(e)}>
                    <Modal.Title>{`Playing ${videoName}`}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="w100">
                    <ReactPlayer width="100%" width="100%" controls url={videoUrl} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                        <Button variant="secondary" onClick={(e) => onClose(e)}>
                            Close
                        </Button>
                </Modal.Footer>
            </Modal>
            
        </div>
    );
}

export default VideoPlay;