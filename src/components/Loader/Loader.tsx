import { CircularProgress } from '@mui/material';
import { FC } from 'react';

import style from './Loader.module.scss';
const Loader: FC = () => {
  return (
    <div className={style.loader}>
      <CircularProgress disableShrink />
    </div>
  );
};

export default Loader;
