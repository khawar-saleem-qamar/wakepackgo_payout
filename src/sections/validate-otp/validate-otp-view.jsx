import { useState, useEffect, useContext } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import AppContext from 'src/context/AppContext'

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function ValidateOtpView(props) {
  const theme = useTheme();

  const router = useRouter();
  const location = useLocation();
  const navigate =  useNavigate();

  const [userId, setUserId] = useState(null);
  const [email, setEmail] = useState(null);
  const [otpValue, setOtpValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
      if (location.state == null) {
        navigate('/');
      } else {
        setUserId(location.state.body.userId);
        setEmail(location.state.body.email);
      }
  }, []);

  const [data, setData] = useState(null);

  const handleClick = () => {
      const baseUrl=import.meta.env.VITE_WACKPACKGO_BACKEND_URL;
      fetch(`${baseUrl}/user/validate_otp`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              userId: userId,
              otp: otpValue
          })
      })
      .then(response => response.json())
      .then(json => {
          if (json.status === "FAILURE") {
              alert(json.message);
              return;
          }
          const userDto = json.body.userDto;
          console.log(json);
          localStorage.setItem('authState', JSON.stringify(json.body));
          dispatch({type: 'USER_AUTH_DATA', userAuthData: json.body});
          navigate('/payout-information');
      })
      .catch(error => {
          console.error(error);
          alert(error);
      });
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField
          name="password"
          label="OTP"
          value={otpValue}
          onChange={(event) => setOtpValue(event.target.value)}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        style={{ backgroundColor: "#122b3d" }}
        onClick={handleClick}
      >
        Login
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
            maxWidth: 550,
          }}
        >
          <Typography variant="h6">Enter the otp sent on {email}</Typography>

          <Divider sx={{ my: 3 }}>
          </Divider>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
