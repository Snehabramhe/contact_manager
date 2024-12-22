import React, {useEffect, useState} from 'react';
import {
    Box,
    TextField,
    Button,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Typography, Avatar, Grid2, ImageListItem,
} from "@mui/material";
import {GroupService} from "../../services/group-service.js";
import {ContactService} from "../../services/contact-service.js";
import {useNavigate} from "react-router-dom";

const AddContact = () => {
    const navigate = useNavigate();
    const [groups, setGroups] = useState([]);
    const [contact, setContact] = useState({
        name : "",
        email :"",
        company : "",
        title : "",
        mobile : "",
        imageUrl : "",
        groupId : ""
    });

    useEffect(() => {
        const getGroupData = async () => {
            try {
                const response = await GroupService.getAllGroups();
                setGroups(response.data);
            }catch (e) {
                console.error(e.message);
            }
        }
        getGroupData();
    }, [])


    const handleChange = (e) => {
        setContact({
            ...contact,
            [e.target.name]: e.target.value
        })
    };

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const response = await ContactService.addContact(contact);
            if(response){
                navigate("/admin-contact");
            }
        }
        catch (e) {
            console.error(e.message);
        }
    };

    return (
        <>
        {/* <pre>{JSON.stringify(contact)}</pre> */}
            <Grid2 container={true} spacing={2}>
                <Box
                    sx={{
                        mt : 2 ,
                        maxWidth: 500,
                        padding: 2,
                        boxShadow: 3,
                        borderRadius: 2,
                    }}
                >
                    <Typography color={'primary'} variant="h5" sx={{ mb: 2, textAlign: "center" }}>
                        Add New Contact
                    </Typography>
                    <form onSubmit={submitForm}>
                        <TextField
                            required
                            fullWidth
                            label="Name"
                            name="name"
                            value={contact.name}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            required
                            fullWidth
                            label="Image URL"
                            name="imageUrl"
                            value={contact.imageUrl}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            required
                            fullWidth
                            label="Company"
                            name="company"
                            value={contact.company}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            required
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={contact.email}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            required
                            fullWidth
                            label="Title"
                            name="title"
                            value={contact.title}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            required
                            fullWidth
                            label="Mobile"
                            name="mobile"
                            type="tel"
                            value={contact.mobile}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="group-label">Group</InputLabel>
                            <Select
                                required
                                labelId="group-label"
                                name="groupId"
                                value={contact.groupId}
                                onChange={handleChange}
                            >
                                {groups.map((group, index) => (
                                    <MenuItem key={index} value={group.id}>
                                        {group.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Add Contact
                        </Button>
                    </form>
                </Box>
                <Box sx={{mt : 2}}>
                    <img src={contact.imageUrl} alt={contact.name} width={200} height={200}/>
                </Box>
            </Grid2>

            {/*<pre>{JSON.stringify(contact)}</pre>*/}


        </>
    )
};
export default AddContact;