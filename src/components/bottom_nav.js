import React, { Component } from 'react';

class BottomNav extends Component {
  componentDidMount() {
    window.addEventListener('scroll', event => {
      this.closeHiddenMenu(event);
    });
  }

  openHiddenMenu = event => {
    event.preventDefault();
    if (
      event.target.id === 'contact_open_link' ||
      event.target.id === 'contact_open_link_anchor'
    ) {
      document.getElementById('contact_list').classList.add('show');
      document.getElementById('contact_open_link').classList.add('hidden');
    } else if (event.target.id === 'copywrite') {
      event.target.classList.add('show');
    }
  };

  closeHiddenMenu = event => {
    event.preventDefault();
    const contactList = document.getElementById('contact_list');
    const contactLink = document.getElementById('contact_open_link');
    const copywrite = document.getElementById('copywrite');
    if (contactList && contactLink && copywrite) {
      contactList.classList.remove('show');
      contactLink.classList.remove('hidden');
      copywrite.classList.remove('show');
    }
    // document.getElementById('contact_list').classList.remove('show');
    // document.getElementById('contact_open_link').classList.remove('hidden');
    // document.getElementById('copywrite').classList.remove('show');
  };

  render = () => {
    return (
      <div id={'bottom_nav'} className={'nav bottom_nav'}>
        <span
          id="copywrite"
          className={'copywrite nav_bottom_left'}
          onMouseEnter={this.openHiddenMenu.bind(this)}
          onMouseLeave={this.closeHiddenMenu}
        >
          &copy; 2018
          <span className={'hidden'}>
            {' '}
            Anton Schulz - Built by{' '}
            <a
              href="http://jasonpaulsouthwell.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Jason Southwell
            </a>
          </span>
        </span>
        <ul
          id={'contact_list'}
          className={'contact nav_bottom_right'}
          onMouseEnter={this.openHiddenMenu.bind(this)}
          onMouseLeave={this.closeHiddenMenu.bind(this)}
        >
          <li className={'hidden'}>
            <a
              href="https://www.instagram.com/antonschulz"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </li>
          <li className={'hidden'}>
            <a
              href="https://www.linkedin.com/in/antonschulz"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </li>
          <li className={'hidden'}>
            <a href="mailto:hello@antonschulz.com">Email</a>
          </li>

          <li
            id={'contact_open_link'}
            className={'contact_link'}
            onClick={event => this.openHiddenMenu(event)}
          >
            <a href="#none" id={'contact_open_link_anchor'}>
              Connect
            </a>
          </li>
        </ul>
      </div>
    );
  };
}

export default BottomNav;
