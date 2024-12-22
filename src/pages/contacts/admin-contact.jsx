import React, {useEffect, useState} from 'react';
import {Container, Grid2} from "@mui/material";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Avatar,
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {ContactService} from "../../services/contact-service.js";
import ConfirmModal from '../../components/confirm-modal.jsx';
import { GroupService } from '../../services/group-service.js';
// import ConfirmModal from "../../components/confirm-modal.jsx";

const AdminContact = () => {
    const navigate = useNavigate();

    const [groupsMap, setGroupsMap] = useState({});
    const [contactIdToDelete, setContactIdToDelete] = useState(null);
    const [open, setOpen] = useState(false);

    const [state, setState] = useState({
        loading : false,
        contacts:  [],
        error : null
    });

    const getAllContactsData = async () => {
        setState({...state, loading: true});
        try {
            const response = await ContactService.getAllContacts();
            setState({...state, contacts: response.data, loading: false});
        }
        catch (e) {
            setState({...state, error: e.message, loading: false});
        }
    }

    useEffect(() => {
        const getGroupData = async () => {
            try {
                const response = await GroupService.getAllGroups();
                const groupsMap = response.data.reduce((map,item)=>{
                    map[item.id] = item.name;
                    return map;
                },{});
                setGroupsMap(groupsMap);
            }catch (e) {
                console.error(e.message);
            }
        }
        getGroupData();
    }, [])

    useEffect(() => {
        getAllContactsData();
    }, []);

    const {loading, contacts, error} = state;


    const clickDeleteButton = (contactId) => {
        setContactIdToDelete(contactId);
        setOpen(true); // to open the modal
    }

    const confirmDeleteContact = async () => {
        setOpen(false); // closes the modal
        if(contactIdToDelete){
            try {
                const response = await ContactService.deleteContact(contactIdToDelete);
                if(response){
                    await getAllContactsData(); // get fresh contacts data from server
                }
            }
            catch (e) {
                console.log(e.message);
            }
        }
    };

    const Actions = ({ id }) => (
        <>
            <Button
                onClick={() => navigate(`/edit-contact/${id}`)}
                variant="contained"
                color="primary"
                size="small"
                style={{ marginRight: 8 }}
            >
                Edit
            </Button>
            <Button
                onClick={() => clickDeleteButton(id)}
                variant="outlined"
                color="error"
                size="small"
            >
                Delete
            </Button>
        </>
    );

    return (
        <>
            {open && <ConfirmModal open={open} setOpen={setOpen} confirmDeleteContact={confirmDeleteContact}/>}
            <Grid2>
               
                <Container maxWidth="xl">
                    <h3>Contacts Admin &nbsp;
                        <Button onClick={() => navigate("/add-contact")} variant="contained" color="success">New</Button>
                    </h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, dolorum neque. Ad consectetur consequuntur deserunt ea hic illo minus molestiae mollitia, obcaecati odio officia pariatur perferendis ratione similique velit vero.</p>
                </Container>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Image</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Company</TableCell>
                                <TableCell>Mobile</TableCell>
                                <TableCell>Group</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {contacts.map((row, index) => (
                                <TableRow key={row.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>
                                        <Avatar src={row.imageUrl} alt={row.name} />
                                    </TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{row.company}</TableCell>
                                    <TableCell>{row.mobile}</TableCell>
                                    <TableCell>
                                            {groupsMap[row.groupId]}
                                    </TableCell>
                                    <TableCell>
                                        <Actions id={row.id} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid2>
        </>
    )
};
export default AdminContact;