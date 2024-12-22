import React,{useState,useEffect} from 'react';
import { Box, Typography, Grid2, TextField, Avatar, Card, CardContent, Button } from "@mui/material";
import { useNavigate ,useParams} from 'react-router-dom';
import PageLoader from "../../ui/PageLoader";
import ErrorMessage from "../../ui/ErroMessage";
import { ContactService } from "../../services/contact-service";
import {GroupService} from "../../services/group-service.js";
import Grid from "@mui/material/Grid2"

const ViewContact = () => {
    const {contactId} = useParams();
    const navigate = useNavigate();

    const [groupsMap, setGroupsMap] = useState({});

    const [state, setState] = useState({
        loading: false,
        contact: [],
        error: null,
      });

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
        const getContactData = async () => {
          setState({ ...state, loading: true });
          try {
            const response = await ContactService.getContact(contactId);
            console.log(response);
            setState({
              ...state,
              loading: false,
              contact: response.data,
            });
          } catch (error) {
            setState({
              ...state,
              loading: false,
              error: error.message,
            });
          }
        };
        getContactData();
      }, []);
    
      const { loading, contact, error } = state;

  return (
   <>
   {
    loading && <PageLoader/>
   }
   {
    !loading && error && <ErrorMessage message={error.message}/>
   }
      <Box sx={{ minHeight: "100vh", p: 3 }}>
      <Grid container spacing={2} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        {/* Left Section: Image */}
        <Grid  size={{ xs: 12, sm: 6, lg: 6 }}>
          {/* <Avatar
            src={contact.imageUrl}
            alt={contact.name}
            sx={{ width: "70%", height: "100%", borderRadius: 2}}
            variant="square"
          /> */}
          <img src={contact.imageUrl}
            alt={contact.name} width="100%" height="60%" />
        </Grid>

        {/* Right Section: Details */}
        <Grid size={{ xs: 12, sm: 6, lg: 6}} >
          <Card sx={{ p: 3 ,mt:20}}>
            <CardContent>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {contact.name}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                <strong>Company:</strong> {contact.company}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                <strong>Email:</strong> {contact.email}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                <strong>Title:</strong> {contact.title}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                <strong>Mobile:</strong> {contact.mobile}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                <strong>Group:</strong> {groupsMap[contact.groupId]}
              </Typography>
              <Button
                    onClick = {() => navigate("/show-contact")}
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Back to Contacts
                </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
   </>
  )
}

export default ViewContact
