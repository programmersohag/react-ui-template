import {Box, Typography} from "@mui/material";
import React from "react";

const SettingsPage: React.FC = () => {
    return (
        <Box>
            <Typography variant="h4" component="h1" gutterBottom>
                Settings
            </Typography>
            <Typography>
                Manage your application settings.
            </Typography>
        </Box>
    );
};

export default SettingsPage;