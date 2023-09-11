import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  getAuth,
} from 'firebase/auth';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
} from '@mui/material';
import { AuthContext } from '../../providers/auth';
import { auth } from '../../firebase';

const provider = new GoogleAuthProvider();

export const Login = (): JSX.Element => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(result => {
        const user = result.user;
        if (user && setUser) {
          setUser(user);
          navigate('/');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <Card>
      <CardContent sx={{ '& .MuiTextField-root': { mb: 2 } }}></CardContent>
      <CardActions>
        <Button variant="text" onClick={signInWithGoogle}>
          Login with Google
        </Button>
      </CardActions>
    </Card>
  );
};
