import { FC } from 'react';
import { DocumentProps } from '../../utils/types';
import { Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from '../../hooks/useReduxToolkit';
import { setThisDocument } from '../../redux/slices/dataSlice';

import EditIcon from '@mui/icons-material/Edit';
import style from './Document.module.scss';
import useFormattedDateTime from '../../hooks/useFormattedDateTime';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Document: FC<DocumentProps> = ({ document }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  return (
    <div className={style.document}>
      <Typography style={{ fontSize: '8px' }} variant='subtitle1' gutterBottom>
        id: {document.id}
      </Typography>
      <Link
        to='/remove-document'
        className={style.document_remove}
        state={{ background: location }}
        onClick={() => dispatch(setThisDocument(document))}
      >
        <DeleteForeverIcon style={{ color: 'white' }} />
      </Link>
      <Link
        to='/edit-document'
        className={style.document_edit}
        state={{ background: location }}
        onClick={() => dispatch(setThisDocument(document))}
      >
        <EditIcon style={{ color: 'white' }} />
      </Link>
      <div>
        <Typography fontSize={'small'} variant='subtitle1' gutterBottom>
          Имя документа: {document.documentName}
        </Typography>
        <Typography fontSize={'small'} variant='subtitle1' gutterBottom>
          Статус документа: {document.documentStatus}
        </Typography>
        <Typography fontSize={'small'} variant='subtitle1' gutterBottom>
          Тип документа: {document.documentType}
        </Typography>
        <Typography fontSize={'small'} variant='subtitle1' gutterBottom>
          Номер сотрудника: {document.employeeNumber}
        </Typography>
        <Typography fontSize={'small'} variant='subtitle1' gutterBottom>
          Дата подписи сотрудника:<br></br>
          {useFormattedDateTime(document.employeeSigDate)}
        </Typography>
        <Typography fontSize={'small'} variant='subtitle1' gutterBottom>
          Дата подписи компании:<br></br>
          {useFormattedDateTime(document.companySigDate)}
        </Typography>
      </div>
    </div>
  );
};

export default Document;
