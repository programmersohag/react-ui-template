import {Controller, useForm} from "react-hook-form";
import {Button, TextField} from "@mui/material";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

interface FormData {
    name: string;
    email: string;
}

const schema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
});

interface FormProps {
    initialValues?: FormData;  // for update mode
    onSubmit: (data: FormData) => void;
}

export const InstituteBranch = ({initialValues, onSubmit}: FormProps) => {

    const {control, handleSubmit} = useForm<FormData>({
        defaultValues: {name: "", email: ""},
        resolver: yupResolver(schema),
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="name"
                control={control}
                rules={{required: "Name is required"}}
                render={({field, fieldState}) => (
                    <TextField
                        {...field}
                        label="Name"
                        fullWidth
                        margin="normal"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                    />
                )}
            />

            <Controller
                name="email"
                control={control}
                rules={{required: "Email is required"}}
                render={({field, fieldState}) => (
                    <TextField
                        {...field}
                        label="Email"
                        fullWidth
                        margin="normal"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                    />
                )}
            />

            <Button type="submit" variant="contained">
                {initialValues ? "Update" : "Save"}
            </Button>
        </form>
    );

}