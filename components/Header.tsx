import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useSession } from "next-auth/react";
import { handleSignOut } from "@/src/services/authentication";
import Modal from "./Modal";

interface IUserSettings {
  label: string;
  isDisable: boolean;
  action: () => void;
}
function Header() {
  const settings: IUserSettings[] = [
    {
      label: "Profile",
      isDisable: true,
      action: () => handleViewProfile(),
    },
    {
      label: "Logout",
      isDisable: true,
      action: () => handleSignOut(),
    },
  ];
  const { data: session } = useSession();

  const [open, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<IUser | null>(null);
  const [userSettings, setUserSettings] = useState(settings);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleViewProfile = () => {
    setOpen(true);
  };

  const closeViewProfile = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (session) {
      setUserSettings((currentSettings) =>
        currentSettings.map((setting) => ({
          ...setting,
          isDisable: false,
        }))
      );
      const user: IUser = {
        email: session.user?.email!,
        avatar: session.user?.image!,
        first_name: session.user?.name!,
      };
      setUserInfo(user);
    }
  }, [session]);

  return (
    <AppBar position="static">
      <div className="px-3">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: "flex",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                data-testid={`avatar`}
                onClick={handleOpenUserMenu}
                sx={{ p: 0 }}
              >
                <Avatar
                  alt={session?.user?.name || ""}
                  src={session?.user?.image || ""}
                />
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
              {userSettings.map((setting) => (
                <MenuItem
                  key={setting.label}
                  onClick={() => {
                    handleCloseUserMenu();
                    if (!setting.isDisable) {
                      setting.action();
                    }
                  }}
                  disabled={setting.isDisable}
                >
                  <Typography textAlign="center">{setting.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </div>
      <Modal open={open} onClose={closeViewProfile} user={userInfo} />
    </AppBar>
  );
}
export default Header;
