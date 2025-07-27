import {useEffect, useState} from "react";
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Paper
} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {DatePicker} from "@mui/x-date-pickers";

export default function Verify() {
    const [message, setMessage] = useState('');
    const [ubrn, setUbrn] = useState('');
    const [nameEn, setNameEn] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [inputError, setInputError] = useState({"isUbrnValid": true, "isDobValid": true, "isNameValid": true});

    useEffect(() => {
        if (selectedDate != null && selectedDate && dayjs(selectedDate).isValid()) {
            console.log(dayjs(selectedDate).format("DD/MM/YYYY"));
        }
    }, [selectedDate]);

    const handleSearch = async () => {
        const isNameValid = nameEn !== '';
        const isUbrnValid = ubrn.trim().length === 17;
        const isDateValid = selectedDate != null && selectedDate && dayjs(selectedDate).isValid();
        setInputError({
            ...inputError, // Copy the old fields
            isUbrnValid: isUbrnValid, isDobValid: isDateValid, isNameValid
        });
        if (isUbrnValid && isDateValid && isNameValid) {
            const dob = dayjs(selectedDate).format("YYYY-MM-DD");
            const obj = await verify(ubrn, dob, nameEn);
            console.log(obj);
            setMessage("Information matched");
        }
    };

    const verify = async (birthRegId: string, dob: string, nameEn: string) => {
        try {
            const token = window.localStorage.getItem("token");
            const response = await fetch("http://localhost:9100/api/v1/bri/verify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify({birthRegId, dob, nameEn})
            });
            const data = await response.json();
            if (data['status'] == 200) {
                alert(data['message']);
                return data;
            }
            return null;
        } catch (e) {
            console.error("error:", e);
            return null;
        }
    };

    return (
        <Container maxWidth="sm" sx={{mt: 5}}>
            <Paper elevation={4} sx={{p: 3}}>
                <Typography variant="h4" gutterBottom>
                    Verify Information
                </Typography>
                <Box display="flex" gap={2} mb={2}>
                    <TextField
                        label="Birth Register Number"
                        variant="outlined"
                        value={ubrn}
                        onChange={(e) => setUbrn(e.target.value)}
                        fullWidth
                        error={!inputError.isUbrnValid}
                        helperText={!inputError.isUbrnValid ? "Birth Register Number must be exactly 17 digit" : ""}
                    />
                </Box>
                <Box display="flex" gap={2} mb={2}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Birth Date"
                            value={selectedDate}
                            format="DD/MM/YYYY"
                            onChange={(newValue) => setSelectedDate(newValue)}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    error: !inputError.isDobValid,
                                    helperText: !inputError.isDobValid ? "Birth Date is required" : "",
                                },
                            }}
                        />
                    </LocalizationProvider>
                </Box>
                <Box display="flex" gap={2} mb={2}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        value={nameEn}
                        onChange={(e) => setNameEn(e.target.value)}
                        fullWidth
                        error={!inputError.isNameValid}
                        helperText={!inputError.isNameValid ? "Person Name (English) is required" : ""}
                    />
                </Box>
                <Box mt={2} display="flex" justifyContent="flex-end">
                    <Button variant="contained" onClick={handleSearch}>
                        Search
                    </Button>
                </Box>
                <Box>
                    {message}
                </Box>
                {/*               <List sx={{ mt: 2 }}>
                    {tasks.map((task, index) => (
                        <ListItem
                            key={index}
                            secondaryAction={
                                <IconButton edge="end" onClick={() => handleDeleteTask(index)}>
                                    <DeleteIcon />
                                </IconButton>
                            }
                        >
                            <ListItemText primary={task} />
                        </ListItem>
                    ))}
                </List>*/}
            </Paper>
        </Container>
    );
}