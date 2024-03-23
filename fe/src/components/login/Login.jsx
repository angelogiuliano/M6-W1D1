import React from 'react'

const Login = () => {
    return (
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-md-4">
                    <h2 className="text-center text-dark mt-5">
                        Epibooks Login
                    </h2>
                    <div className="card my-5">
                        <form className="card-body cardbody-color p-lg-5">
                            <div className="text-center">
                                <img
                                    src="https://picsum.photos/340/340"
                                    className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                                    width="200px"
                                    alt="profile"
                                />
                            </div>

                            <div className="mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    aria-describedby="emailHelp"
                                    placeholder="Inserisci la tua email..."
                                />
                            </div>

                            <div className="mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Inserisci la tua password"
                                />
                            </div>

                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="btn btn-primary px-5 mb-5 w-100"
                                >
                                    Login
                                </button>
                            </div>

                            <div
                                id="emailHelp"
                                className="form-text text-center mb-5 text-dark"
                            >
                                Non sei registrato?
                                <a href="#" className="text-dark fw-bold ms-1">
                                    Registrati ora!
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
