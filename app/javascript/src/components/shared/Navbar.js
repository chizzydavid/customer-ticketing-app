import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';

export class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
		}
		this.toggleOpen = this.toggleOpen.bind(this);
	}

	toggleOpen() {
		const { isOpen } = this.state;
		this.setState({
			isOpen: !isOpen
		})
	}

	render() {
		const { isOpen } = this.state;

    const isAuthenticated = false;
		const navbarClassname = () => {
			let classname = 'nav-container';
			classname = this.props.home ? `${classname}` : `page ${classname}`;
			return classname;
		}
    let NavbarLinks = isAuthenticated && !home ? 
    (
      <React.Fragment>
        <Link to="/dashboard">INBOX</Link>
        <Link onClick={this.props.open}>COMPOSE</Link>
        <Link onClick={this.logout}>LOGOUT</Link>         
      </React.Fragment>
    ) : (
		    <React.Fragment>
          <Link to="/">Home</Link>
          <Link to="/sign-up">Sign Up</Link>
          <Link to="/login">Login</Link>            
        </React.Fragment>
		)

		return (
			<header>

				<div className={navbarClassname()} >
					<div className="brand-icon">
						<h3><Link id="logo-nav" to="/">..Supportta.</Link></h3>
					</div>

					<div id="header-menu-trigger" onClick={this.toggleOpen}>
						<span className="header-menu-text">Menu</span>
						<span className="header-menu-icon"></span>
					</div>
				</div>

				<nav id="menu-nav-wrap" className={isOpen ? 'open' : 'nil'}>
					<p 
						className="close-button" 
						title="close"
						onClick={this.toggleOpen}
					>
						<span>Close</span>
					</p>	

					<h3>Support.</h3>
					{NavbarLinks}						

					<ul className="header-social-list">
						<li>
							<a href="#"><i className="fa fa-facebook-square"></i></a>
						</li>
						<li>
							<a href="#"><i className="fa fa-twitter"></i></a>
						</li>
						<li>
							<a href="#"><i className="fa fa-instagram"></i></a>
						</li>        
					</ul>		

				</nav> 
			</header>
		)
	}
}

export default Navbar;
