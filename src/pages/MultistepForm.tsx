import {useState} from "react";
import {
    Box,
    Button,
    Step,
    StepLabel,
    Stepper,
    Typography,
    TextField,
} from "@mui/material";
import {useForm, type SubmitHandler, Controller} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

const getAge = (dob: Date) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};
// Step titles
const steps = ["Personal Info", "Contact Info", "Review"];
const schema = yup.object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup
        .string()
        .matches(/^[0-9]{10,15}$/, "Phone must be 10–15 digits")
        .required("Phone is required"),
    dob: yup
        .date()
        .transform((value, originalValue) => (originalValue === "" ? null : value))
        .required("Date of Birth is required"),
    motherName: yup.string().when("dob", {
        is: (dob: Date) => getAge(new Date(dob)) <= 20, // condition
        then: (schema) => schema.required("Mother name is required"), // validation if condition met
        otherwise: (schema) => schema.notRequired(), // optional if age > 20
    }),
});
/*// Validation schemas
const personalInfoSchema = yup.object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
});

const contactInfoSchema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup
        .string()
        .matches(/^[0-9]{10,15}$/, "Phone must be 10–15 digits")
        .required("Phone is required"),
});
// Combined schema for final submit
const fullSchema = personalInfoSchema.concat(contactInfoSchema);*/

// Infer type from full schema
type FormData = yup.InferType<typeof schema>;
const stepFields: Record<number, (keyof FormData)[]> = {
    0: ["firstName", "lastName"],
    1: ["email", "phone"],
};

export default function MultiStepForm() {
    const [activeStep, setActiveStep] = useState(0);
    const {
        register,
        handleSubmit,
        control,
        watch,
        trigger,
        formState: {errors},
        getValues,
    } = useForm<FormData>({
        resolver: yupResolver(schema),
        mode: "onBlur",
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            dob: undefined,
            motherName: "",
        },
    });

    // 👇 validate only the current step's fields
    const handleNext = async () => {
        const fieldsToValidate = stepFields[activeStep] ?? [];
        const valid = await trigger(fieldsToValidate);
        if (!valid) return;
        setActiveStep((prev) => prev + 1);
    };

    const handleBack = () => setActiveStep((prev) => prev - 1);

    const handleSave = async () => {
        const fieldsToValidate = stepFields[activeStep] ?? [];
        const valid = await trigger(fieldsToValidate);
        if (!valid) {
            console.log("Cannot save: step has errors");
            return;
        }
        const stepData = getValues(); // get all form data
        console.log("Saving step data:", stepData);
        // 🔹 Example API call
        // await fetch("/api/saveStep", { method: "POST", body: JSON.stringify(stepData) });
        alert("Step data saved successfully!");
    };


    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log("Final Submitted Data:", data);
    };

    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <>
                        <TextField
                            label="First Name"
                            {...register("firstName")}
                            value={watch("firstName") || ""}
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Last Name"
                            {...register("lastName")}
                            value={watch("lastName") || ""}
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                            fullWidth
                            margin="normal"
                        />
                        <Controller
                            name="dob"
                            control={control}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    label="Date of Birth"
                                    type="date"
                                    fullWidth
                                    margin="normal"
                                    error={!!errors.dob}
                                    helperText={errors.dob?.message}
                                />
                            )}
                        />
                    </>
                );
            case 1:
                return (
                    <>
                        <TextField
                            label="Mother Name"
                            {...register("motherName")}
                            error={!!errors.motherName}
                            helperText={errors.motherName?.message}
                            slotProps={{input: {readOnly: true}}}
                        />
                        <TextField
                            label="Email"
                            {...register("email")}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Phone"
                            {...register("phone")}
                            error={!!errors.phone}
                            helperText={errors.phone?.message}
                            fullWidth
                            margin="normal"
                        />
                    </>
                );
            case 2:
                return (
                    <Box>
                        <Typography variant="h6">Review Data</Typography>
                        <pre>{JSON.stringify(getValues(), null, 2)}</pre>
                    </Box>
                );
            default:
                return "Unknown Step";
        }
    };

    return (
        <Box sx={{width: "100%", p: 3}}>
            <Stepper activeStep={activeStep} sx={{mb: 3}}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            {activeStep === steps.length ? (
                <Typography variant="h5" align="center">
                    🎉 All steps completed — Form submitted
                </Typography>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                    {renderStepContent(activeStep)}

                    <Box sx={{mt: 2}}>
                        <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{mr: 1}}
                        >
                            Back
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleSave}
                            sx={{mr: 1}}
                        >
                            Save
                        </Button>
                        {activeStep < steps.length - 1 ? (
                            <Button variant="contained" onClick={handleNext}>
                                Next
                            </Button>
                        ) : (
                            <Button type="submit" variant="contained">
                                Submit
                            </Button>
                        )}
                    </Box>
                </form>
            )}
        </Box>
    );
}