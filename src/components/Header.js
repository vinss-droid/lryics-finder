import ImgHeader from "../img/header.jpg";

const Header = () => {

    const windowScroll = (x, y) => {
        window.scrollTo(x, y);
    }

    return (
        <div className="container">
            <div className="row justify-content-center margin-header">
                <div className="col-sm-12 col-md-12 col-lg-7 d-lg-none">
                    <img src={ImgHeader} alt="header.jpg" width="90%" className="rounded-4 shadow d-block ms-auto me-auto"/>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-5">
                    <h1 className="fw-bold padding-header-text text-responsive-center">
                        Search for any lyrics you want now!
                    </h1>
                    <button className="btn btn-primary btn-responsive-center mt-4 shadow" onClick={() => windowScroll(0, 600)}>
                        <i className="fa-solid fa-magnifying-glass"></i> Search Now!
                    </button>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-7 d-responsive-none">
                    <img src={ImgHeader} alt="header.jpg" width="90%" className="rounded-4 shadow"/>
                </div>
            </div>
        </div>
    );
};

export default Header;