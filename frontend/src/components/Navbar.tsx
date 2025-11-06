import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAuth } from "../context/Auth/AuthContext";
import Grid from "@mui/material/Grid";
import { Badge, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/Cart/CartContext";
function Navbar() {
  const navigate = useNavigate();
  const { username, isAuthenticated, logout } = useAuth();
  const { cartItems } = useCart();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Button
              variant="text"
              sx={{ color: "white" }}
              onClick={() => navigate("/")}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <AdbIcon sx={{ display: "flex", mr: 1 }} />
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  sx={{
                    mr: 2,
                    cursor: "pointer",

                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    color: "black",
                    textDecoration: "none",
                  }}
                >
                  Black shop
                </Typography>
              </Box>
            </Button>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              gap={2}
              justifyContent="center"
            >
              <IconButton aria-label="cart" onClick={() => navigate("/cart")}>
                <Badge badgeContent={cartItems.length} color="secondary">
                  <ShoppingCartIcon sx={{ color: "white" }} />
                </Badge>
              </IconButton>
              {isAuthenticated ? (
                <>
                  <Tooltip title="Open settings">
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="center"
                      spacing={2}
                      // gap={2}
                    >
                      <Grid>
                        <Typography>{username}</Typography>
                      </Grid>
                      <Grid>
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                          <Avatar
                            alt={username || ""}
                            src="/static/images/avatar/2.jpg"
                          />
                        </IconButton>
                      </Grid>
                    </Grid>
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
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography sx={{ textAlign: "center" }}>
                        My Orders
                      </Typography>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <Typography sx={{ textAlign: "center" }}>
                        Logout
                      </Typography>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
              )}
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
