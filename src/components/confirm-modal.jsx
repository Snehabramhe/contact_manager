import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const ConfirmModal = ({open,setOpen,confirmDeleteContact})=> {
  
    const handleClose = () => {
      setOpen(false);
    };
  

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    Are you sure to delete a contact!
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        This option will delete contact from the server permanently!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={confirmDeleteContact}>OK Delete!</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};
export default ConfirmModal;