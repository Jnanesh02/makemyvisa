
import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import Logo from "../../assets/images/logo.png";
import googlereview from "../../assets/images/review.png";
import { Link, useLocation } from "react-router-dom";
import avatar from "../../assets/images/avatar.png";

import axios from "axios";


function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const onLoginPage = location.pathname === "/login";
  const onSignupPage = location.pathname === "/registration";
  const onHomePage = location.pathname === "/";
  const [countriesData, setCountriesData] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/getcountries`
        );
        if (Array.isArray(response.data.message)) {
          setCountriesData(response.data.message);
        } else {
          setCountriesData([]);
        }
      } catch (error) {
        alert(error.message);
      }
    };

    fetchCountries();
  }, []);
  const Login = () => {
    // setIsLoggedIn(true);
    return (
      <Link className="dropdown-item" to="/login">
        Login
      </Link>
    );
  };
  const Logout = () => {
    // setIsLoggedIn(false);
    return (
      <Link className="dropdown-item" to="/logout">
        Logout
      </Link>
    );
  };

  const Signup = () => {
    return (
      <Link className="dropdown-item" to="/registration">
        signup
      </Link>
    );
  };

  const HomeLink = () => {
    return (
      <Link className="dropdown-item" to="/">
        Home
      </Link>
    );
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "white", borderBottom: '1px solid #F5F5F5' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Poppins",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "black",
              textDecoration: "none",
            }}
          >
            <img className="header-logo" src={Logo} alt="Logo" />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="black"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Button
                  component={Link}
                  to="/visa"
                  style={{
                    my: 2,
                    color: "black",
                    display: "block",
                    textDecoration: "none",
                  }}
                >
                  Visa
                </Button>
              </MenuItem>
              <MenuItem>
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  Countries
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  {countriesData.map((country, index) => (
                    <MenuItem key={index}>
                      <Link
                        to={`/countries/${country.countryName.replace(
                          /\s/g,
                          "-"
                        )}`}
                        className="dropdown-item"
                      >
                        {country.countryName}
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Button
                  component={Link}
                  to="/services/TravelHealthInsurance"
                  style={{
                    my: 2,
                    color: "black",
                    display: "block",
                    textDecoration: "none",
                  }}
                >
                  Travel ItineraryInsurance
                </Button>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Button
                  component={Link}
                  to="/aa"
                  style={{
                    my: 2,
                    color: "black",
                    display: "block",
                    textDecoration: "none",
                  }}
                >
                  Apostille & Attestation
                </Button>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Button
                  component={Link}
                  to="/study"
                  style={{
                    my: 2,
                    color: "black",
                    display: "block",
                    textDecoration: "none",
                  }}
                >
                  Study/Admission
                </Button>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Button
                  component={Link}
                  to="/contactus"
                  style={{
                    my: 2,
                    color: "black",
                    display: "block",
                    textDecoration: "none",
                  }}
                >
                  Contact Us
                </Button>
              </MenuItem>
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "Poppins",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img className="header-logo" src={Logo} alt="Logo" />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex", gap: '25px' } }}>
            <Button component={Link} to="/visa" style={{ my: 2, color: "black", display: "block", textDecoration: "none" }}>
              Visa
            </Button>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{ color: "black" }}
            >
              Countries
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {countriesData.map((country, index) => (
                <MenuItem onClick={handleClose} key={index}>
                  <Link
                    to={`/countries/${country.countryName.replace(/\s/g, "-")}`}
                    className="dropdown-item"
                  >
                    {country.countryName}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
            <Button component={Link} to="/services/TravelHealthInsurance" style={{ my: 2, color: "black", display: "block", textDecoration: "none" }}>
              Travel ItineraryInsurance
            </Button>
            <Button component={Link} to="/aa" style={{ my: 2, color: "black", display: "block", textDecoration: "none" }}>
              Apostille & Attestation
            </Button>
            <Button component={Link} to="/study" style={{ my: 2, color: "black", display: "block", textDecoration: "none" }}>
              Study/Admission
            </Button>
            <Button component={Link} to="/contactus" style={{ my: 2, color: "black", display: "block", textDecoration: "none" }}>
              Contact Us
            </Button>
          </Box>
          <IconButton sx={{ p: 0 }}>
            <Link to="https://www.google.com/search?q=makemyvisa+bengaluru+office&sz=0&biw=1223&bih=601&sxsrf=APwXEdfOY3HgsgzHxLH3PfoTtx5JH8mu7g%3A1682505920799&ei=wABJZNevMOSfseMPi9SN-Ak&ved=0ahUKEwjXj_f9rsf-AhXkT2wGHQtqA58Q4dUDCBA&uact=5&oq=makemyvisa+bengaluru+office&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAzIECCMQJzoHCCMQsAMQJzoCCCZKBAhBGAFQugVYggxg8Q1oAHAAeACAAeUBiAGUCpIBBTAuNy4xmAEAoAEByAEBwAEB&sclient=gws-wiz-serp#lrd=0x3bae13c0e4d75019:0x343d6bccc4336492,1,,,,">
              <img
                alt="Remy Sharp"
                src={googlereview}
                style={{ width: "150px", height: "50px" }} // Specify your desired width and height here
              />
            </Link>
          </IconButton>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={avatar} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <div onClick={handleCloseUserMenu} style={{ padding: '10px' }}>
                {onLoginPage && (
                  <>
                    <HomeLink></HomeLink><br />
                    <Signup></Signup>
                  </>
                )}
                {onSignupPage && (
                  <>
                    <HomeLink></HomeLink><br />
                    {isLoggedIn ? <Logout></Logout> : <Login></Login>}
                  </>
                )}
                {onHomePage && (
                  <>
                    <Signup></Signup><br />
                    <Login></Login>
                  </>
                )}
              </div>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;

