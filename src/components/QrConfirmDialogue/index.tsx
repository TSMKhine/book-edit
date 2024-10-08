import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useAtom } from 'jotai';
import { showQrImageAtom } from '@/stores/ui';
export default function QrConfrimDialogue() {
  const [showQrImage, setShowQrImage] = useAtom(showQrImageAtom);

  const handleClose = () => {
    setShowQrImage(false);
  };

  const handleAgree = () => {
    window.open('https://www.example.com', '_blank');
    setShowQrImage(false);
  };
  return (
    <Dialog
      open={showQrImage}
      // onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Use Google's location service?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={handleAgree} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}
