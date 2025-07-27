import {useState} from "react";
import {Box, Button, CircularProgress, Container, Paper, TextField, Typography} from "@mui/material";
import CryptoJS from "crypto-js";
import {useNavigate} from "react-router-dom";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!username || !password) {
            setError("Username and password are required.");
        } else {
            setError("");
        }
        setError("");
        setLoading(true);
        try {
            window.localStorage.setItem("userType", username);
            if (username === "admin") {
                navigate("/admin");
            } else {
                navigate("/user");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    const getAccessTokenUsingClientId = async () => {
        const response = await fetch("http://localhost:9100/api/v1/auth/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"clientId": username, password})
        });
        if (!response.ok) {
            const errorData = await response.json();
            setError(errorData.message || "Login failed");
        }
        const data = await response.json();
        const body = aesDecrypt(data['body'], 'SaP0769463846@%!');
        const json = JSON.parse(body);
        if (data['status'] == 200) {
            alert("Login successful");
            window.localStorage.setItem("token", json['accessToken']);
            navigateToVerifyPage();
        } else {
            if (!json['accessToken']) {
                await getAccessTokenUsingRefreshToken(json['refreshToken']);
                navigateToVerifyPage();
            } else {
                alert(data['message']);
            }
        }
    }
    const getAccessTokenUsingRefreshToken = async (refreshToken: string) => {
        try {
            const response = await fetch("http://localhost:9100/api/v1/auth/get-new-token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + refreshToken
                },
            });
            const data = await response.json();
            if (data['status'] == 200) {
                alert(data['message']);
                const body = aesDecrypt(data['body'], 'SaP0769463846@%!');
                const json = JSON.parse(body);
                window.localStorage.setItem("token", json['accessToken']);
            }
        } catch (e) {
            console.error("error:", e);
        }
    };
    const aesDecrypt = (ciphertext: string, key: string): string => {
        try {
            // const ciphertextWA = CryptoJS.enc.Hex.parse(ciphertext);

            const keyWA = CryptoJS.enc.Utf8.parse(key);
            const ivWA = CryptoJS.enc.Utf8.parse(key);

            const bytes = CryptoJS.AES.decrypt(
                ciphertext,
                keyWA,
                {iv: ivWA}
            );
            return bytes.toString(CryptoJS.enc.Utf8);
        } catch (e) {
            console.error("Decryption error:", e);
            return '';
        }
    };

    const navigateToVerifyPage = () => navigate('/verify');

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
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                        onClick={handleLogin}
                        sx={{mt: 2}}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} color="inherit"/> : "Login"}
                    </Button>
                </Paper>
            </Container>
        </Box>
    );
}