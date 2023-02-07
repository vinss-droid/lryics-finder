import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import SearchSongs from "./SearchSongs";
import ReactPlayer from "react-player";

const Lyrics = () => {

    const params = useParams();
    const [track, setTrack] = useState(null);
    const [lyrics, setLyrics] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false)
    const [isLimit, setIsLimit] = useState(false)

    const getTrack = () => {

        setIsLimit(false)

        axios.get('https://spotify23.p.rapidapi.com/tracks/', {

            params: {ids: params.id},
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_X_RapidAPI_Key,
                'X-RapidAPI-Host': process.env.REACT_APP_X_RapidAPI_Host
            }

        }).then((res) => {
            // document.title = `Lyrics Finder - ${res.data.track[0].name}`
            setTrack(res.data.tracks[0])
            getLyrics();
        }).catch((err) => {
            console.log(err)
        })

    }


    const getLyrics = () => {

        axios.get('https://spotify23.p.rapidapi.com/track_lyrics/', {

            params: {id: params.id},
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_X_RapidAPI_Key,
                'X-RapidAPI-Host': process.env.REACT_APP_X_RapidAPI_Host
            }

        }).then((res) => {
            setLyrics(res.data.lyrics.lines)
            setIsLoading(false)
        }).catch((err) => setIsError(true));

    }

    useEffect(() => {

        getTrack()

    }, [])

    return (
        <div className="container">
            <div className="row justify-content-center my-5">
                <div className="col-sm-12 col-md-12 col-lg-8">
                    <div className="card shadow">
                        <div className="card-body">
                            {isLimit ? (
                                <div>
                                    <hr/>
                                    <div className="d-flex justify-content-center">
                                        <span className="user-select-none text-center">
                                            The request limit per month is full. <br/>
                                            Please try again next month or upgrade your API plan. <br/>
                                            Please get in touch with the developer below : <br/>
                                            <a href="https://github.com/vinss-droid" className="text-decoration-none" target="_blank" rel="noreferrer">
                                                <i className="fa-brands fa-github"></i> vinss-droid
                                            </a>
                                        </span>
                                    </div>
                                    <hr/>
                                </div>
                            ) : (
                                <div>
                                    {!isError ? (
                                        <div>
                                            {!isLoading && (
                                                <div key={track.id}>
                                                    <div className="header">
                                                        <img src={track.album.images[0].url} className="d-block ms-auto me-auto rounded-2 shadow" width="30%" />
                                                    </div>
                                                    <hr/>
                                                    <div className="lyrics">
                                                        <h5 className="text-center">
                                                            {track.album.artists[0].name} | {track.name}
                                                        </h5>
                                                        <hr/>
                                                        <a href={track.external_urls.spotify} className="btn btn-primary d-block" target="_blank" rel="noreferrer">
                                                            <i className="fa-brands fa-spotify"></i> Play on Spotify
                                                        </a>
                                                        <hr/>
                                                        <div className="container">
                                                            {!isLoading && (
                                                                <div>
                                                                    {lyrics.map((data) => (
                                                                        <p className="text-center">{data.words} <br/></p>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="alert alert-danger text-center user-select-none" role="alert">
                                            Error in fetching data...
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Lyrics;