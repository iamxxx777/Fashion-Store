import React from 'react'
import { Link } from 'react-router-dom'

import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

import '../../styles/MiniNav.scss'

const MiniNav = () => {
  return (
        <div className='mini_nav'>
            <div className="container mini_container">
                <div className="mini_logo">
                    <h2>Gstore</h2>
                </div>
                <div className="mini_contact">
                    <div>
                        <LocalPhoneOutlinedIcon />
                        <a href="tel:+2348166179988">+23408166179988</a>
                    </div>

                    <div>
                        <EmailOutlinedIcon />
                        <a href="mailto:hopetomiwa13@gmail.com">hopetomiwa13@gmail.com</a>
                    </div>
                </div>
                <div className="mini_links">
                    <Link href="/">Terms</Link>
                    <Link href="/">FAQ</Link>
                    <Link href="/">FAQ</Link>
              </div>
            </div>
        </div>
    )
};

export default MiniNav;
