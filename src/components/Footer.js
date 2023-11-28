import React from 'react';
import Link from '@mui/material/Link';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
  return (
    <BottomNavigation
      showLabels
      sx={{
        marginTop: 'auto',
        backgroundColor: '#1976d2',
        textAlign: 'center',
        position: 'sticky',
        bottom: 0,
        zIndex: 1000,
        width: { xs: '100%', md: '900px' },
      }}
    >
      <BottomNavigationAction
        label="&copy; SphereHub"
        sx={{ color: 'white' }}
      />
      <BottomNavigationAction
        label="Crafted with ❤️ by Yaswanth"
        component={Link}
        href="https://github.com/Yashu-777"
        target="_blank"
        rel="noopener noreferrer"
        sx={{ color: 'white' }}
      />
      <BottomNavigationAction
        label="GitHub"
        icon={<GitHubIcon />}
        component={Link}
        href="https://github.com/Yashu-777"
        target="_blank"
        rel="noopener noreferrer"
        sx={{ color: 'white' }}
      />
    </BottomNavigation>
  );
};

export default Footer;
