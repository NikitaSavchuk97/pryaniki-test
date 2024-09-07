import style from './ModalConfirm.module.scss';

import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { getData } from '../../redux/actions/getData';
import { deleteData } from '../../redux/actions/deleteData';
import { setThisDocument } from '../../redux/slices/dataSlice';
import { useDispatch, useSelector } from '../../hooks/useReduxToolkit';

const ModalConfirm: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { dataToEditOrRemove } = useSelector((state) => state.dataSlice);

  const handleClick = async () => {
    if (dataToEditOrRemove) {
      navigate(-1);
      const idToRemove = dataToEditOrRemove.id;
      await dispatch(deleteData({ idToRemove }));
      dispatch(setThisDocument(null));
      await dispatch(getData());
    }
  };

  return (
    <div className={style.modal_confirm}>
      <Typography
        style={{
          lineHeight: '20px',
          color: 'white',
          textAlign: 'center',
          marginTop: '10px',
        }}
        className={style.header_title}
        variant='h6'
        component='p'
      >
        Вы уверены?
      </Typography>

      <Button
        fullWidth
        type='button'
        onClick={() => handleClick()}
        variant='contained'
        color='success'
        style={{
          lineHeight: '20px',
          color: 'white',
          textAlign: 'center',
          marginTop: '15px',
          backgroundColor: 'red',
        }}
      >
        Да, удалить
      </Button>
    </div>
  );
};

export default ModalConfirm;
