import {useState, useEffect} from "react";
import axios from "axios";
import Image from '../img/header.jpg'
import SearchSongs from "./SearchSongs";

const Songs = () => {

    const [dataSongs, setDataSongs] = useState(null);
    const [isNull, setIsNull] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isLimit, setIsLimit] = useState(false);
    const [searchValue, setSearchValue] = useState("")

    const searchSongs = (search) => {

        setIsNull(false)
        setIsLoading(true)

        if (search.length != 0) {

            axios.get('https://spotify23.p.rapidapi.com/search/', {

                params: {q: search, type: 'tracks', offset: '0', limit: '10', numberOfTopResults: '5'},
                headers: {
                    'X-RapidAPI-Key': process.env.REACT_APP_X_RapidAPI_Key,
                    'X-RapidAPI-Host': process.env.REACT_APP_X_RapidAPI_Host
                }

            }).then((res) => {
                setDataSongs(res.data.tracks.items)
                setIsLoading(false)
                setIsLimit(false)
            }).catch((err) => {
                if (err.response.status == 429) {
                    setIsLimit(true)
                } else {
                    setIsLoading(false)
                    setIsNull(true)
                    setIsError(true)
                }
            })

        } else {
            setIsNull(true)
            setIsError(false)
            setIsLimit(false)
        }

    }


    return (
        <div className="container">
            <hr className="mt-5"/>
            <div className="row justify-content-center mt-5">
                <div className="col-sm-12 col-md-12 col-lg-10">
                    <div className="row justify-content-between">
                        <div className="col-sm-12 col-md-12 col-lg-4 user-select-none">
                            <h4>
                                Search Music
                            </h4>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-4">
                            <div className="d-flex gap-2">
                                <input type="search" className="form-control ms-auto" placeholder="Enter a music" onChange={(e) => setSearchValue(e.target.value)} onKeyPress={(e) => {
                                    if (e.key == 'Enter') {
                                        searchSongs(e.target.value)
                                    }
                                }
                                }/>
                                <button type="submit" className="btn btn-primary" onClick={() => searchSongs(searchValue)}>
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid top-songs">
                        <div className="row justify-content-center">
                            <div className="card bg-transparent my-3 shadow">
                                <div className="card-body">
                                    <div className="container">
                                        <div className="songs">
                                            {isLimit ? (
                                                <div>
                                                    <hr/>
                                                    <div className="d-flex justify-content-center">
                                                        <span className="user-select-none text-center">
                                                            The request limit per month is full. <br/>
                                                            Please try again next month or upgrade your API plan. <br/>
                                                            Please get in touch with the developer below : <br/>
                                                            <a href="https://github.com/vinss-droid" className="text-decoration-none" target="_blank">
                                                                <i className="fa-brands fa-github"></i> vinss-droid
                                                            </a>
                                                        </span>
                                                    </div>
                                                    <hr/>
                                                </div>
                                            ) : (
                                                <div>
                                                    {isError ? (
                                                        <div>
                                                            <hr/>
                                                            <div className="d-flex justify-content-center">
                                                                <span className="user-select-none"> Error in fetching data...</span>
                                                            </div>
                                                            <hr/>
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <div className="row justify-content-center user-select-none">
                                                                <div className="col-sm-2 col-md-2 col-lg-2">
                                                                </div>
                                                                <div className="col-sm-4 col-md-4 col-lg-4">
                                                                    <p className="text-white text-responsive-none">Singer Name</p>
                                                                </div>
                                                                <div className="col-sm-4 col-md-4 col-lg-4">
                                                                    <p className="text-center text-white text-responsive-none">Song Name</p>
                                                                </div>
                                                                <div className="col-sm-2 col-md-2 col-lg-2"></div>
                                                            </div>
                                                            {!isLoading ? (
                                                                <div>
                                                                    {dataSongs.map((dataSong) => (
                                                                        <SearchSongs dataSong={dataSong}></SearchSongs>
                                                                    ))}
                                                                </div>
                                                            ) : (
                                                                <div>
                                                                    {isNull ? (
                                                                        <div>
                                                                            <hr/>
                                                                            <div>
                                                                                <p className="text-center user-select-none">
                                                                                    Please search music first.
                                                                                </p>
                                                                            </div>
                                                                            <hr/>
                                                                        </div>
                                                                    ) : (
                                                                        <div>
                                                                            <hr/>
                                                                            <div className="d-flex justify-content-center">
                                                                                <div className="spinner-border" role="status">
                                                                                    <span className="visually-hidden">Loading...</span>
                                                                                </div>
                                                                            </div>
                                                                            <hr/>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Songs;