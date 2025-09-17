import {useState} from "react";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@mui/material";
import {useForm, Controller} from "react-hook-form";

interface User {
    id: number;
    name: string;
    email: string;
}

export default function CrudPage() {
    const [users, setUsers] = useState<User[]>([
        {id: 1, name: "Sohag", email: "sohag@example.com"},
    ]);

    const [open, setOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    const {control, handleSubmit, reset} = useForm<User>({
        defaultValues: {name: "", email: ""},
    });

    const handleOpen = (user?: User) => {
        if (user) {
            setEditingUser(user);
            reset(user); // preload data for edit
        } else {
            setEditingUser(null);
            reset({name: "", email: ""});
        }
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const onSubmit = (data: User) => {
        if (editingUser) {
            // Update
            setUsers((prev) =>
                prev.map((u) => (u.id === editingUser.id ? {...u, ...data} : u))
            );
        } else {
            // Save new
            setUsers((prev) => [...prev, {...data, id: Date.now()}]);
        }
        handleClose();
    };

    return (
        <div>
            <h2>User List</h2>
            <Button variant="contained" onClick={() => handleOpen()}>
                Add User
            </Button>

            <Table sx={{mt: 2}}>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((u) => (
                        <TableRow key={u.id}>
                            <TableCell>{u.name}</TableCell>
                            <TableCell>{u.email}</TableCell>
                            <TableCell>
                                <Button size="small" onClick={() => handleOpen(u)}>
                                    Edit
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Modal */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editingUser ? "Edit User" : "Add User"}</DialogTitle>
                <DialogContent>
                    <form id="user-form" onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="name"
                            control={control}
                            rules={{required: "Name required"}}
                            render={({field, fieldState}) => (
                                <TextField
                                    {...field}
                                    label="Name"
                                    fullWidth
                                    margin="dense"
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />

                        <Controller
                            name="email"
                            control={control}
                            rules={{required: "Email required"}}
                            render={({field, fieldState}) => (
                                <TextField
                                    {...field}
                                    label="Email"
                                    fullWidth
                                    margin="dense"
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" form="user-form" variant="contained">
                        {editingUser ? "Update" : "Save"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
