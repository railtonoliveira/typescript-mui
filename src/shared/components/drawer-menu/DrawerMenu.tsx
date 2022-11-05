import { 
  Avatar, 
  Box, 
  Divider, 
  Drawer, 
  Icon, 
  List, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  useMediaQuery, 
  useTheme 
} from '@mui/material';
import { useState } from 'react';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import { useAppThemeContext, useDrawerContext } from '../../contexts';
import AvatarImage from '../../../assets/images/avatar.png';

interface IDrawerMenuProps {
    children: React.ReactNode;
}

interface IListItemLinkProps {
    to: string;
    icon: string;
    label: string;
    onClick: (() => void) | undefined;
}

const ListItemLink: React.FC<IListItemLinkProps> = ({ to, icon, label, onClick }) => {
  const navigate = useNavigate();
  const resolvePath = useResolvedPath(to);
  const match = useMatch({ path: resolvePath.pathname, end: false });

  const handleClick = () => {
    onClick?.();
    navigate(to);
  };

  return (
    <ListItemButton selected={!!match} onClick={handleClick}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

export const DrawerMenu: React.FC<IDrawerMenuProps> = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();
  const { toggleTheme } = useAppThemeContext();

  const handleChangeTheme = () => {
    toggleTheme();
    setDarkMode(!darkMode);
  };

  return (
    <>
      <Drawer 
        open={isDrawerOpen} 
        variant={smDown ? 'temporary' : 'permanent'}
        onClose={toggleDrawerOpen}
      >
        <Box 
          width={theme.spacing(28)} 
          height="100%"
          display="flex" 
          flexDirection="column">
          <Box 
            width="100%"
            height={theme.spacing(20)}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Avatar
              sx={{ height: theme.spacing(12), width: theme.spacing(12) }} 
              src={AvatarImage} 
            />
          </Box>

          <Divider />

          <Box flex={1}>
            <List component="nav">
              {drawerOptions.map(drawerOption => (
                <ListItemLink 
                  key={drawerOption.path}
                  icon={drawerOption.icon}
                  to={drawerOption.path}
                  label={drawerOption.label}
                  onClick={smDown ? toggleDrawerOpen : undefined}
                />
              ))}
            </List>
          </Box>
          
          <Box>
            <List component="nav">
              <ListItemButton onClick={handleChangeTheme}>
                <ListItemIcon>
                  {darkMode ? (
                    <Icon>light_mode</Icon>
                  ) : (
                    <Icon>nightlight</Icon>
                  )}
                </ListItemIcon>
                <ListItemText primary={darkMode ? 'Light mode' : 'Dark mode'} />
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>

      <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
        { children } 
      </Box>
    </>
  );
}; 