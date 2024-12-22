import React, { useState } from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect } from "react";
import { ContactService } from "../../services/contact-service";
import { useNavigate } from "react-router-dom";
import PageLoader from "../../ui/PageLoader";
import ErrorMessage from "../../ui/ErroMessage";

const ShowContact = () => {
    const navigate = useNavigate();
  const [state, setState] = useState({
    loading: false,
    contacts: [],
    error: null,
  });

  useEffect(() => {
    const getAllContactsData = async () => {
      setState({ ...state, loading: true });
      try {
        let response = await ContactService.getAllContacts();
        setState({
          ...state,
          loading: false,
          contacts: response.data,
        });
      } catch (error) {
        setState({
          ...state,
          loading: false,
          error: error.message,
        });
      }
    };
    getAllContactsData();
  }, []);

  const { loading, contacts, error } = state;
  return (
    <>
    {
        loading  && <PageLoader/>
    }
    {
        !loading  && error && <ErrorMessage message={error.message}/>
    }
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>
          {!loading && !error && contacts.length > 0 && contacts.map((person) => (
            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={person.id}>
              <Card onClick={() => navigate(`/view-contact/${person.id}`)}
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  padding: 2,
                  height: "80%",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    height: 100,
                    width: 100,
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                  image={person.imageUrl}
                  alt={person.name}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {person.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Email: {person.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Phone: {person.mobile}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default ShowContact;
