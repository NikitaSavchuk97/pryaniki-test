import style from './Content.module.scss';
import Document from '../Document/Document';

import { FC } from 'react';
import { Typography, Button } from '@mui/material';
import { useSelector } from '../../hooks/useReduxToolkit';
import { DocumentDataPropTypes } from '../../utils/types';
import { Link, useLocation } from 'react-router-dom';

const Content: FC = () => {
  const location = useLocation();
  const { dataCurrent } = useSelector((state) => state.dataSlice);
  return (
    <main className={style.main}>
      <div className={style.main_wrapper}>
        <Typography
          style={{ color: 'white', fontSize: '20px', margin: '0' }}
          variant='subtitle1'
          gutterBottom
        >
          Документы:
        </Typography>

        <Button
          className={style.main_button}
          //onClick={() => handleLogout()}
          style={{ color: 'white', height: '30px' }}
          variant='outlined'
          size='small'
        >
          <Link
            className={style.main_link}
            to='/new-document'
            style={{ color: 'white', height: '40px', textDecoration: 'none' }}
            state={{ background: location }}
          >
            Добавить
          </Link>
        </Button>
      </div>

      <div className={style.main_grid}>
        {dataCurrent?.map((item: DocumentDataPropTypes) => {
          return <Document key={item.id} document={item} />;
        })}
      </div>
    </main>
  );
};

export default Content;
