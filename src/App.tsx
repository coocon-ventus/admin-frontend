import { useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from './routes';

// defaultTheme
import themes from './themes';

// project imports
import NavigationScroll from './layout/NavigationScroll';
import {BrowserRouter} from "react-router-dom";
import AxiosNavigation from 'utils/AxiosNavigation';
import { useEffect} from 'react'

function App() {
    // @ts-ignore
    const customization = useSelector((state) => state.customization);
    useEffect(() => {
      console.log('maybe is execute when refresh');
    }, []);
    
  return (
      <StyledEngineProvider injectFirst>
          <ThemeProvider theme={themes(customization)}>
              <CssBaseline />
              <BrowserRouter>
                <AxiosNavigation/>
                  <NavigationScroll>
                        <Routes/>
                   </NavigationScroll>
              </BrowserRouter>
          </ThemeProvider>
      </StyledEngineProvider>
  );
}


export default App;
