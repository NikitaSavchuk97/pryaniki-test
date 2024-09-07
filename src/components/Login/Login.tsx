import style from './Login.module.scss';
import useForm from '../../hooks/useForm';

import {
  TextField,
  ThemeProvider,
  Typography,
  Theme,
  createTheme,
  useTheme,
  Button,
} from '@mui/material';
import { ChangeEvent, FC, FormEvent } from 'react';
import { postUser } from '../../redux/actions/postUser';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { useDispatch, useSelector } from '../../hooks/useReduxToolkit';

const Login: FC = () => {
  const dispatch = useDispatch();
  const outerTheme = useTheme();
  const { userStatus } = useSelector((state) => state.userSlice);
  const { values, handleChange } = useForm({ login: '', password: '' });
  const loginValue = values.login;
  const passValue = values.password;
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(postUser({ loginValue, passValue }));
  };

  return (
    <form className={style.login} onSubmit={handleSubmit}>
      <Typography variant='h4' component='h3'>
        Авторизация
      </Typography>
      <br />
      <br />
      <ThemeProvider theme={customTheme(outerTheme)}>
        <TextField
          error={userStatus === 'error' ? true : false}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
          name='login'
          value={values.login}
          label='Логин'
          slotProps={{
            inputLabel: {
              style: { color: '#fff' },
            },
          }}
        />
        <br />
        <TextField
          error={userStatus === 'error' ? true : false}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
          name='password'
          value={values.password}
          label='Пароль'
          id='outlined-password-input'
          type='password'
          autoComplete='current-password'
          slotProps={{
            inputLabel: {
              style: { color: '#fff' },
            },
          }}
        />
      </ThemeProvider>
      <br></br>

      <Button type='submit' style={{ color: 'white' }} variant='outlined' size='medium'>
        Вход
      </Button>
    </form>
  );
};

export default Login;

const customTheme = (outerTheme: Theme) => {
  return createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '--TextField-brandBorderColor': '#2595fd',
            '--TextField-brandBorderHoverColor': '#0071db',
            '--TextField-brandBorderFocusedColor': '#0071db',
            '& label.Mui-focused': {
              color: 'var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: 'var(--TextField-brandBorderColor)',
          },
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--TextField-brandBorderHoverColor)',
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--TextField-brandBorderFocusedColor)',
            },
            '& input': {
              color: 'white',
            },
          },
        },
      },
    },
  });
};
