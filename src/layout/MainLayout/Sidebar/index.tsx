import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Drawer, useMediaQuery } from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';
import { BrowserView, MobileView } from 'react-device-detect';

// project imports
import MenuList from './MenuList';
import LogoSection from '../LogoSection';
import MenuCard from './MenuCard';
import { drawerWidth } from '../../../store/constant';
import commonAxios from 'utils/commonAxios';
import {useEffect, useState} from 'react';
// ==============================|| SIDEBAR DRAWER ||============================== //

const Sidebar = ({ drawerOpen, drawerToggle, window }:any) => {
    const theme = useTheme();
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
    const [menus, setMenus] = useState([]);

    useEffect(() => {


        (async () => {
            await commonAxios.get("/member/menu/list").then((response:any) => {
                console.log("sidebar init = [" + JSON.stringify(response.data) + "]");
                let data = response.data;

                const idMapping = data.reduce((acc:any, el:any, i:number) => {
                    acc[el.id] = i;
                    return acc;
                  }, {});

                let root:any = [];
                data.forEach((element:any,index:number) => {
                    // Handle the root element
                    console.log(element);
                    if (element.parentMenu === null) {
                        root.push(element);
                      return;
                    }
                    // Use our mapping to locate the parent element in our data array
                    const parentEl = data[idMapping[element.parentMenu]];
                    // Add our current el to its parent's `children` array
                    parentEl.children = [...(parentEl.children || []), element];
                  });
                
                console.log("root [" +JSON.stringify(root));
                setMenus(root);
                console.log("menus [" + JSON.stringify(menus));
            });
        })();
    }, []);

    const drawer = (
        <>
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <Box sx={{ display: 'flex', p: 2, mx: 'auto' }}>
                    <LogoSection />
                </Box>
            </Box>
            <BrowserView>
                <PerfectScrollbar
                    component="div"
                    style={{
                        height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
                        paddingLeft: '16px',
                        paddingRight: '16px'
                    }}
                >
                    <MenuList menu={menus} />
                    <MenuList />
                    <MenuCard />
                </PerfectScrollbar>
            </BrowserView>
            <MobileView>
                <Box sx={{ px: 2 }}>
                    {/*<MenuList />*/}
                    <MenuCard />
                </Box>
            </MobileView>
        </>
    );

    const container = window !== undefined ? () => window.document.body : undefined;

    return (
        <Box component="nav" sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : 'auto' }} aria-label="mailbox folders">
            <Drawer
                container={container}
                variant={matchUpMd ? 'persistent' : 'temporary'}
                anchor="left"
                open={drawerOpen}
                onClose={drawerToggle}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        background: theme.palette.background.default,
                        color: theme.palette.text.primary,
                        borderRight: 'none',
                        [theme.breakpoints.up('md')]: {
                            top: '88px'
                        }
                    }
                }}
                ModalProps={{ keepMounted: true }}
                color="inherit"
            >
                {drawer}
            </Drawer>
        </Box>
    );
};

Sidebar.propTypes = {
    drawerOpen: PropTypes.bool,
    drawerToggle: PropTypes.func,
    window: PropTypes.object
};

export default Sidebar;
