import style from './Modal.module.scss';
import CloseIcon from '@mui/icons-material/Close';
import ModalOverlay from '../ModalOverlay/ModalOverlay';

import { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ModalPropTypes } from '../../utils/types';
import { useDispatch } from '../../hooks/useReduxToolkit';
import { setThisDocument } from '../../redux/slices/dataSlice';

const modalRoot = document.getElementById('root-modal');

const Modal: FC<ModalPropTypes> = ({ title, children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    navigate(-1);
    dispatch(setThisDocument(null));
  };

  const handleButtonCloseModal = (event: KeyboardEvent) => {
    if (event.code === 'Escape') handleCloseModal();
  };

  useEffect(() => {
    document.addEventListener('keydown', handleButtonCloseModal);
    return () => {
      document.removeEventListener('keydown', handleButtonCloseModal);
    };
  }, [handleButtonCloseModal]);

  return (
    modalRoot &&
    createPortal(
      <>
        <ModalOverlay closeModal={handleCloseModal} />

        <section className={style.container}>
          <Typography className={style.container__title} variant='h5' component='p'>
            {title}
          </Typography>

          <button
            className={style.container__button}
            id='close-modal-button'
            type='button'
            onClick={handleCloseModal}
          >
            <CloseIcon style={{ color: 'white' }} type='primary' />
          </button>

          {children}
        </section>
      </>,
      modalRoot,
    )
  );
};

export default Modal;
