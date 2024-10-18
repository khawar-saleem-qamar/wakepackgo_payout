import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();
  const navigate = useNavigate();

  // state data
  const [emailValue, setEmailValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const authState = localStorage.getItem('authState');
    if (authState) {
      localStorage.removeItem('authState');
    }
  }, []);

  // event handlers
  const handleClick = () => {
      const baseUrl=import.meta.env.VITE_WACKPACKGO_BACKEND_URL;
      fetch(`${baseUrl}/user/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailValue })
      })
      .then(response => response.json())
      .then(json => {
        if (json.status === "FAILURE") {
            alert(json.message);
            return;
        }
        setData(json);
        json["body"]["email"] = emailValue;
        console.log(json);
        navigate('/validate-otp', {state: json});
      })
      .catch(error => {
        console.error(error);
        alert(error);
      });
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" value={emailValue} onChange={(event) => setEmailValue(event.target.value)}/>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        style={{ backgroundColor: "#122b3d" }}
        onClick={handleClick}
        sx={{mt: 3}}
      >
        Send OTP
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Sign in to WakePackGo Portal</Typography>

          <Divider sx={{ my: 3 }}>
          </Divider>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
