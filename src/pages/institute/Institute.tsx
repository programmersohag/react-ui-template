import {apiClient} from "../../utils/apiClient.ts";
import type {InstituteDto} from "../../dto/InstituteDto.ts";
import type {ApiError} from "../../dto/ApiError.ts";
import {Box, Button, CircularProgress, Container, Paper, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export const Institute = () => {
    const [institute, setInstitute] = useState<InstituteDto>();
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const saveInstitute = async () => {
        try {
            const institute = await apiClient<InstituteDto>("/api/user/1");
            console.log(institute.instituteId);
        } catch (err) {
            const e = err as ApiError;
            console.error(e.status, e.data);
        }
    }

    return (
        <Box
            minHeight="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{backgroundColor: "#f5f5f5"}}
        >
            <Container maxWidth="xs">
                <Paper elevation={4} sx={{padding: 4}}>
                    <Typography variant="h5" align="center" gutterBottom>
                        Login
                    </Typography>
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={institute?.instituteId}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && (
                        <Typography color="error" variant="body2">
                            {error}
                        </Typography>
                    )}
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={saveInstitute}
                        sx={{mt: 2}}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} color="inherit"/> : "Submit"}
                    </Button>
                </Paper>
            </Container>
        </Box>
    )

}