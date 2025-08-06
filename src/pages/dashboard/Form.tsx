import React, {useState} from "react";
import {
    Box,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    Radio,
    RadioGroup,
    FormLabel,
    FormControl,
    Select,
    MenuItem,
    Switch,
    Typography, Grid, Autocomplete
} from "@mui/material";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider, DatePicker} from "@mui/x-date-pickers";
import {Dayjs} from "dayjs";

export default function Form() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        gender: "male",
        country: "",
        agree: false,
        subscribe: false,
        birthDate: null as Dayjs | null,
        file: null as File | null
    });

    const handleChange = (field: string, value: any) => {
        setFormData({...formData, [field]: value});
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Data:", formData);
    };
    const countries = [
        { code: "bd", label: "Bangladesh" },
        { code: "us", label: "United States" },
        { code: "uk", label: "United Kingdom" },
    ];
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box>
                <Typography variant="h4" component="h1" gutterBottom>
                    Dashboard Form
                </Typography>
            </Box>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{p: 3, maxWidth: 600, margin: "auto", border: "1px solid #ddd", borderRadius: 2}}
            >
                <Typography variant="h5" gutterBottom>
                    Form
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        {/* Name */}
                        <TextField
                            fullWidth
                            label="Name"
                            margin="normal"
                            value={formData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        {/* Email */}
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            margin="normal"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        {/* Email */}
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            margin="normal"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                    {/* Password */}
                    <TextField
                        label="Password"
                        type="password"
                        margin="normal"
                        value={formData.password}
                        onChange={(e) => handleChange("password", e.target.value)}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    {/* Gender Radio */}
                    <FormControl fullWidth>
                        <FormLabel>Gender</FormLabel>
                        <RadioGroup
                            row
                            value={formData.gender}
                            onChange={(e) => handleChange("gender", e.target.value)}
                        >
                            <FormControlLabel value="male" control={<Radio/>} label="Male"/>
                            <FormControlLabel value="female" control={<Radio/>} label="Female"/>
                        </RadioGroup>
                    </FormControl>
                    </Grid>
                    {/* Country Select */}
                    <Autocomplete
                        fullWidth
                        options={countries}
                        getOptionLabel={(option) => option.label}
                        value={countries.find((c) => c.code === formData.country) || null}
                        onChange={(e, newValue) => handleChange("country", newValue ? newValue.code : "")}
                        renderInput={(params) => (
                            <TextField {...params} label="Country" margin="normal" fullWidth />
                        )}
                    />
                    {/*<FormControl fullWidth>
                        <Select
                            value={formData.country}
                            onChange={(e) => handleChange("country", e.target.value)}
                            displayEmpty
                        >
                            <MenuItem value="">Select Country</MenuItem>
                            <MenuItem value="bd">Bangladesh</MenuItem>
                            <MenuItem value="us">United States</MenuItem>
                            <MenuItem value="uk">United Kingdom</MenuItem>
                        </Select>
                    </FormControl>*/}
                    <Grid item xs={6}>
                    {/* Date Picker */}
                    <DatePicker
                        label="Birth Date"
                        value={formData.birthDate}
                        onChange={(newValue) => handleChange("birthDate", newValue)}
                    />
                    </Grid>
                    <Grid item xs={6}>
                    {/* File Upload */}
                    <Button
                        variant="outlined"
                        component="label"
                        fullWidth
                        sx={{mt: 2}}
                    >
                        Upload File
                        <input
                            type="file"
                            hidden
                            onChange={(e) =>
                                handleChange("file", e.target.files ? e.target.files[0] : null)
                            }
                        />
                    </Button>
                    </Grid>
                    <Grid item xs={6}>
                    {/* Checkbox */}
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={formData.agree}
                                onChange={(e) => handleChange("agree", e.target.checked)}
                            />
                        }
                        label="I agree to the terms"
                    />
                    </Grid>
                    {/* Switch */}
                    <FormControlLabel
                        control={
                            <Switch
                                checked={formData.subscribe}
                                onChange={(e) => handleChange("subscribe", e.target.checked)}
                            />
                        }
                        label="Subscribe to newsletter"
                    />

                    {/* Submit */}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{mt: 2}}
                    >
                        Submit
                    </Button>
                </Grid>
            </Box>
        </LocalizationProvider>
    );
}

