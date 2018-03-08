import React, { Component } from 'react';

class BottomNav extends Component {
  openContactMenu() {
    document.getElementById('contact_list').classList.add('show');
    document.getElementById('contact_open_link').classList.add('hidden');
  }
  closeContactMenu() {
    document.getElementById('contact_list').classList.remove('show');
    document.getElementById('contact_open_link').classList.remove('hidden');
  }

  render() {
    return (
      <div id={'bottom_nav'} className={'nav bottom_nav'}>
        <span className={'copywrite nav_bottom_left'}>&copy; 2018</span>
        <ul
          id={'contact_list'}
          className={'contact nav_bottom_right'}
          onMouseEnter={this.openContactMenu}
          onMouseLeave={this.closeContactMenu}
        >
          <li className={'hidden'}>
            <a href="">Email</a>
          </li>
          <li className={'hidden'}>
            <a href="">LinkedIn</a>
          </li>
          <li className={'hidden'}>
            <a href="">Instagram</a>
          </li>
          <li>
            <a href="" id={'contact_open_link'} className={'contact_link'}>
              Connect
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default BottomNav;
