import style from './Header.module.scss';

import { FC } from 'react';
import { Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from '../../hooks/useReduxToolkit';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../redux/slices/userSlice';
import { setEmptyData } from '../../redux/slices/dataSlice';

const Header: FC = () => {
  const navigate = useNavigate();
  const { userLoggedIn, userCurrent } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(setEmptyData());
    navigate('/login');
  };

  return (
    <header className={style.header}>
      <Typography variant='h3' component='h1'>
        Пряники
      </Typography>

      {userLoggedIn && (
        <div className={style.header_wrapper}>
          <div>
            <Typography
              style={{ lineHeight: '20px' }}
              className={style.header_title}
              variant='subtitle1'
              component='h6'
            >
              логин: <span style={{ color: 'white' }}>{userCurrent?.name}</span>
            </Typography>
            <Typography
              style={{ lineHeight: '20px' }}
              className={style.header_title}
              variant='subtitle1'
              component='h6'
            >
              имейл: <span style={{ color: 'white' }}>{userCurrent?.email}</span>
            </Typography>
          </div>

          <Button
            onClick={() => handleLogout()}
            style={{ color: 'white', height: '40px', width: '93px' }}
            variant='outlined'
            size='medium'
          >
            Выход
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
