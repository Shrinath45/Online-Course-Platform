import React from 'react'
import '../Home/Landing/Landing.css'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import { IconButton } from '@mui/material';

function Footer() {
  return (
    <div className="footer">
        <div className="leftPart">
          <div className="title">
            <img src="/src/Pages/Images/logo.svg" width={60} alt="" />
            <div>
              <h1>SkillForge</h1>
            <h1>Copyright  © 2025</h1>
            </div>
          </div>
        </div>
        <div className="rightPart icons">
          <div style={{ display: 'flex', gap: '10px' }}>
      <IconButton
        component="a"
        href="https://www.linkedin.com/in/shrinathadhav45"
        target="_blank"
        rel="noopener noreferrer"
      >
        <LinkedInIcon fontSize="large" />
      </IconButton>

      <IconButton
        component="a"
        href="https://github.com/Shrinath45"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GitHubIcon fontSize="large" />
      </IconButton>

      <IconButton
        component="a"
        href="https://www.instagram.com/shrinath_adhav_45/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <InstagramIcon fontSize="large" />
      </IconButton>

      <IconButton
        component="a"
        href="https://www.facebook.com/share/178Q4FdJVr/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FacebookIcon fontSize="large" />
      </IconButton>
    </div>
        </div>
      </div>
  )
}

export default Footer