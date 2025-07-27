import './App.css'
import {BrowserRouter} from 'react-router-dom'
import AppRoutes from "./config/AppRoutes.tsx";

function App() {
    return (

        <BrowserRouter>
            {/*<Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/verify" element={<Verify/>}/>
            </Routes>*/}
            <AppRoutes/>
        </BrowserRouter>
    )
}

export default App;
