import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../../actions/auth';


class Navbar extends Component {
    render() {
        return (
            <div className="custom-navbar">
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                    <div className="container">
                        <Link className="navbar-brand" to="/dashboard">DevYab</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="mobile-nav">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/developers"> Developers</Link>
                                </li>
                            </ul>

                            <ul className="navbar-nav ml-auto">
                                {!this.props.isAuthenticated && <li className="nav-item"><Link className="nav-link" to="/register">Sign Up</Link></li>}
                                {!this.props.isAuthenticated && <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>}
                                {this.props.isAuthenticated && <li className="nav-item"> <a className="nav-link" href="/dashboard" onClick={this.props.logout}><img className="rounded-circle" src="../img/default-profile1.png" alt="default profile" style={{ width: '25px', height: '25px', marginRight: '5px' }} /> Logout </a> </li>}
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}//END


const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => { dispatch(startLogout()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);