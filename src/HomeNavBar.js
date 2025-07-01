import './Home.css';
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

function Home({ onLogout }) {
    const [token, setToken] = useState("");
    const [drawerOpen, setDrawerOpen] = useState(false);

    const logout = () => {
        setToken("");
        window.localStorage.removeItem("token");
        window.location.reload();
    };

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const navLinks = [
        { label: 'Home', path: '/' },
        { label: 'Recommendations', path: '/recommendations' },
        { label: 'About', path: '/about' },
        { label: 'Logout', path: '/', action: logout }
    ];

    return (
        <div className='Home'>
            <link rel="stylesheet" href="https://use.typekit.net/lll4eml.css"></link>
            <AppBar position="static" sx={{ backgroundColor: '#479454' }}> 
                <Toolbar>
                    <IconButton 
                        edge="start" 
                        color="inherit" 
                        aria-label="menu" 
                        onClick={toggleDrawer(true)}
                        sx={{ display: { xs: 'block', md: 'none' } }} 
                    >
                        <MenuIcon />
                    </IconButton>
                    <Link to="/" className="link" style={{ flexGrow: 1 }}>
                        <p className='navBarItem'>TrackTheSpot</p>
                    </Link>
                    <div className="desktopNav" sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {navLinks.map((link) => (
                            <Link key={link.label} to={link.path} className="link">
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: 'black',
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: '#333', 
                                        },
                                    }}
                                    onClick={link.action}
                                >
                                    {link.label}
                                </Button>
                            </Link>
                        ))}
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                sx={{ 
                    '& .MuiDrawer-paper': {
                        backgroundColor: '#479454', 
                        color: 'white',
                    } 
                }}
            >
                <List>
                    {navLinks.map((link) => (
                        <ListItem button key={link.label} onClick={link.action || toggleDrawer(false)}>
                            <Link to={link.path} className="link">
                                <ListItemText primary={link.label} />
                            </Link>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </div>
    );
}

export default Home;