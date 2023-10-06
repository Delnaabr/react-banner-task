import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import "./header.css";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  return (
    <AppBar position="static" className="header-component">
      <Toolbar>
        <MenuIcon className="typo-class" />
        <Typography variant="h6" component="div" className="typo-class">
          SPC Dashboard | Banner-ads
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
