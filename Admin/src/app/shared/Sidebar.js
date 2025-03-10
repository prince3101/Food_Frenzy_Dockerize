import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Trans } from 'react-i18next';

class Sidebar extends Component {

  state = {};

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({[menuState] : false});
    } else if(Object.keys(this.state).length === 0) {
      this.setState({[menuState] : true});
    } else {
      Object.keys(this.state).forEach(i => {
        this.setState({[i]: false});
      });
      this.setState({[menuState] : true});
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector('#sidebar').classList.remove('active');
    Object.keys(this.state).forEach(i => {
      this.setState({[i]: false});
    });

    const dropdownPaths = [
      {path:'/apps', state: 'appsMenuOpen'},
      {path:'/basic-ui', state: 'basicUiMenuOpen'},
      {path:'/advanced-ui', state: 'advancedUiMenuOpen'},
      {path:'/form-elements', state: 'formElementsMenuOpen'},
      {path:'/tables', state: 'tablesMenuOpen'},
      {path:'/maps', state: 'mapsMenuOpen'},
      {path:'/icons', state: 'iconsMenuOpen'},
      {path:'/charts', state: 'chartsMenuOpen'},
      {path:'/user-pages', state: 'userPagesMenuOpen'},
      {path:'/error-pages', state: 'errorPagesMenuOpen'},
      {path:'/general-pages', state: 'generalPagesMenuOpen'},
      {path:'/ecommerce', state: 'ecommercePagesMenuOpen'},
    ];

    dropdownPaths.forEach((obj => {
      if (this.isPathActive(obj.path)) {
        this.setState({[obj.state] : true})
      }
    }));
 
  }

  render () {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          <li className="nav-item nav-profile">
            <a href="!#" className="nav-link" onClick={evt =>evt.preventDefault()}>
              <div className="nav-profile-image">
                <img src={ require("../../assets/images/faces/prince2.jpeg") } alt="profile" />
                <span className="login-status online"></span> {/* change to offline or busy as needed */}
              </div>
              <div className="nav-profile-text">
                <span className="font-weight-bold mb-2"><Trans>Admin</Trans></span>
                <span className="text-secondary text-small"><Trans>Manager</Trans></span>
              </div>
              <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
            </a>
          </li>
          <li className={ this.isPathActive('/dashboard') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/dashboard">
              <span className="menu-title"><Trans>Dashboard</Trans></span>
              <i className="mdi mdi-home menu-icon"></i>
            </Link>
          </li>
          <li className={ this.isPathActive('/category') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/category">
              <span className="menu-title"><Trans>Category</Trans></span>
              <i className="mdi mdi-format-list-bulleted menu-icon"></i>
            </Link>
          </li>
          <li className={ this.isPathActive('/service') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/service">
              <span className="menu-title"><Trans>Inventory</Trans></span>
              <i className="mdi mdi-nail menu-icon"></i>
            </Link>
          </li>
          <li className={ this.isPathActive('/appointment') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/appointment">
              <span className="menu-title"><Trans>Bills</Trans></span>
              <i className="mdi mdi-calendar-clock menu-icon"></i>
            </Link>
          </li>
          <li className={ this.isPathActive('/employee') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/employee">
              <span className="menu-title"><Trans>Users</Trans></span>
              <i className="mdi mdi-contacts menu-icon"></i>
            </Link>
          </li>
          {/* <li className={ this.isPathActive('/slots') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/slots">
              <span className="menu-title"><Trans>Employee Slots</Trans></span>
              <i className="mdi mdi-calendar-clock menu-icon"></i>
            </Link>
          </li>
          <li className={ this.isPathActive('/users') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/users">
              <span className="menu-title"><Trans>Users</Trans></span>
              <i className="mdi mdi-contacts menu-icon"></i>
            </Link>
          </li> */}
          {/* <li className={ this.isPathActive('/portfolio') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/portfolio">
              <span className="menu-title"><Trans>Portfolio</Trans></span>
              <i className="mdi mdi-plus-box-multiple menu-icon"></i>
            </Link>
          </li> */}
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {
      
      el.addEventListener('mouseover', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

}

export default withRouter(Sidebar);