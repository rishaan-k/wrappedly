import './HomeNavBar.css';
import { useState } from "react";
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LogoutIcon from '@mui/icons-material/Logout';
import logo from './images/logo.png';

function HomeNavBar({ onLogout }) {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const navLinks = [
        { label: 'home', path: '/' },
        { label: 'recommendations', path: '/recommendations' },
        { label: 'about', path: '/about' }
    ];

    return (
        <AppBar 
            position="static" 
            elevation={2}
            className="navbar-container"
            sx={{ 
                backgroundColor: '#479454',
                fontFamily: 'Helvetica, Arial, sans-serif'
            }}
        > 
            <Toolbar className="navbar-toolbar">
                {/* Mobile Menu Button */}
                <IconButton 
                    edge="start" 
                    aria-label="menu" 
                    onClick={toggleDrawer(true)}
                    className="mobile-menu-button"
                    sx={{ 
                        display: { xs: 'block', md: 'none' },
                        color: '#ffffff'
                    }} 
                >
                    <MenuIcon />
                </IconButton>

                {/* Brand Logo */}
                <Link to="/" className="brand-link">
                    <img src={logo} alt="Wrappedly Logo" className="brand-logo" />
                    <div className="brand-text">wrappedly</div>
                </Link>

                {/* Desktop Navigation */}
                <Box 
                    className="desktop-nav"
                    sx={{ 
                        display: { xs: 'none', md: 'flex' },
                        alignItems: 'center',
                        gap: 1
                    }}
                >
                    {navLinks.map((link) => (
                        <Link key={link.label} to={link.path} className="nav-link">
                            <Button
                                className="nav-button"
                                sx={{
                                    color: '#ffffff',
                                    fontFamily: 'Helvetica, Arial, sans-serif',
                                    fontSize: '16px',
                                    fontWeight: '500',
                                    textTransform: 'none',
                                    padding: '8px 16px',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        color: '#ffffff'
                                    },
                                }}
                            >
                                {link.label}
                            </Button>
                        </Link>
                    ))}
                    
                    {/* Logout Button */}
                    <Button
                        onClick={onLogout}
                        className="logout-button"
                        startIcon={<LogoutIcon />}
                        sx={{
                            color: '#ffffff',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            fontSize: '16px',
                            fontWeight: '500',
                            textTransform: 'none',
                            padding: '8px 16px',
                            marginLeft: 2,
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                color: '#ffcccb'
                            },
                        }}
                    >
                        logout
                    </Button>
                </Box>
            </Toolbar>

            {/* Mobile Drawer */}
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                className="mobile-drawer"
                sx={{ 
                    '& .MuiDrawer-paper': {
                        backgroundColor: '#479454',
                        color: '#ffffff',
                        width: '280px',
                        fontFamily: 'Helvetica, Arial, sans-serif'
                    } 
                }}
            >
                <div className="drawer-header">
                    <div className="drawer-brand">
                        <img src={logo} alt="Wrappedly Logo" className="drawer-logo" />
                        <span>wrappedly</span>
                    </div>
                </div>
                
                <List className="drawer-list">
                    {navLinks.map((link) => (
                        <ListItem 
                            key={link.label} 
                            onClick={toggleDrawer(false)}
                            className="drawer-item"
                            sx={{
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                                }
                            }}
                        >
                            <Link to={link.path} className="drawer-link">
                                <ListItemText 
                                    primary={link.label}
                                    sx={{
                                        '& .MuiTypography-root': {
                                            fontFamily: 'Helvetica, Arial, sans-serif',
                                            fontSize: '16px',
                                            fontWeight: '500'
                                        }
                                    }}
                                />
                            </Link>
                        </ListItem>
                    ))}
                    
                    <ListItem 
                        onClick={() => {
                            onLogout();
                            setDrawerOpen(false);
                        }}
                        className="drawer-item logout-item"
                        sx={{
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)'
                            }
                        }}
                    >
                        <ListItemText 
                            primary="logout"
                            sx={{
                                '& .MuiTypography-root': {
                                    fontFamily: 'Helvetica, Arial, sans-serif',
                                    fontSize: '16px',
                                    fontWeight: '500',
                                    color: '#ffcccb'
                                }
                            }}
                        />
                    </ListItem>
                </List>
            </Drawer>
        </AppBar>
    );
}

export default HomeNavBar;