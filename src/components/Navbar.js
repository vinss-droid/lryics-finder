import { NavLink } from "react-router-dom";

const Navbar = () => {

    const windowScroll = (x, y) => {
        window.scrollTo(x, y);
    }

    return (
        <nav className="navbar navbar-expand-lg bg-nav-dark navbar-dark shadow user-select-none">
            <div className="container">
                <NavLink to={'/'} className="navbar-brand fw-bold font-poppins-500 user-select-none">
                    LYRICS FINDER
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to={'/'} className="nav-link active cursor-pointer" aria-current="page" onClick={() => windowScroll(0, 0)}>
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link cursor-pointer" onClick={() => windowScroll(0, 600)}>Search</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;