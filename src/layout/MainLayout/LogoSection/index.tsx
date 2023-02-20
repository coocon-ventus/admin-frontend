import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase } from '@mui/material';

// project imports
import config from '../../../config';
import Logo from '../../../ui-component/Logo';
import cooconLogo from 'assets/images/coocon_logo.png';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
    <ButtonBase disableRipple component={Link} to={config.defaultPath}>
        {/*<Logo />*/}
        <img src={cooconLogo} alt='coocon_logo'/>
    </ButtonBase>
);

export default LogoSection;
