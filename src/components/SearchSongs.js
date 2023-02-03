import { useNavigate } from "react-router-dom";
import Image from "../img/header.jpg";

const SearchSongs = ({dataSong}) => {

    const navigate = useNavigate();
    const Image = dataSong.data.albumOfTrack.coverArt.sources[0]
    const artistName = dataSong.data.artists.items[0]

    return (
        <div key={dataSong.data.id}>
            <hr/>
            <div className="row justify-content-center mt-2">
                <div className="col-sm-2 col-md-2 col-lg-2">
                    <img src={Image.url} alt="" width="70%" className="rounded-3 mg-responsive-center"/>
                </div>
                <div className="col-sm-4 col-md-4 col-lg-4 pt-3">
                    <p className="text-responsive-center d-lg-none">
                        {`${artistName.profile.name} | ${dataSong.data.name}`}
                    </p>
                    <p className="text-responsive-center d-responsive-none">{dataSong.data.name}</p>
                </div>
                <div className="col-sm-4 col-md-4 col-lg-4 pt-3 d-responsive-none">
                    <p className="text-center">{dataSong.data.name}</p>
                </div>
                <div className="col-sm-2 col-md-2 col-lg-2">
                    <p className="user-select-none cursor-pointer text-lg-end text-responsive-center pt-lg-3 text-success-emphasis" onClick={() => navigate(`search/lyrics/${dataSong.data.id}`)}>
                        <i className="fa-solid fa-music"></i> Get Lyrics
                    </p>
                </div>
            </div>
            <hr/>
        </div>
    );
};

export default SearchSongs;