import {useTranslation} from "react-i18next";
import {FormControl, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import i18n from "i18next";

export default function HomePage() {
    const {t} = useTranslation("page");

    return (
        <>
            <FormControl sx={{minWidth: 120}}>
                <InputLabel>{t("language")}</InputLabel>
                <Select
                    value={i18n.language}
                    onChange={(e) => i18n.changeLanguage(e.target.value)}
                >
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="bn">বাংলা</MenuItem>
                </Select>
            </FormControl>
            <Typography variant="h4">{t("welcome")}</Typography>
            <Typography variant="body1">{t("description")}</Typography>
        </>
    );
}
