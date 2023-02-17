// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import menuItem from '../../../../menu-items';
import { Props } from 'material-ui-popup-state';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = (props:any) => {
    console.log("prop.menu = " + props.menu);
    const menu = (props.menu == null || props.length == 0)? menuItem.items : props.menu;
    //const menu = menuItem.items;

    const navItems = menu.map((item:any) => {
        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item} />;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    return <>{navItems}</>;
};

export default MenuList;
