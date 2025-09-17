import './App.css'
import {BrowserRouter} from 'react-router-dom'
import AppRoutes from "./config/AppRoutes.tsx";
import {ThemeProvider} from "@mui/material";
import defaultTheme from "./themes/defaultTheme.ts";

function App() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <BrowserRouter>
                <AppRoutes/>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App;
