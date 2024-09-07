import useForm from '../../hooks/useForm';
import style from './EditOrAddDocument.module.scss';
import EditOrAddForm from '../EditOrAddForm/EditOrAddForm';

import { FC, FormEvent } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getData } from '../../redux/actions/getData';
import { postData } from '../../redux/actions/postData';
import { patchData } from '../../redux/actions/patchData';
import { setThisDocument } from '../../redux/slices/dataSlice';
import { useDispatch, useSelector } from '../../hooks/useReduxToolkit';

const EditOrAddDocument: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { dataToEditOrRemove } = useSelector((state) => state.dataSlice);
  const { values, handleChange } = useForm(
    dataToEditOrRemove
      ? {
          docId: dataToEditOrRemove.id,
          docName: dataToEditOrRemove.documentName,
          docStatus: dataToEditOrRemove.documentStatus,
          docType: dataToEditOrRemove.documentType,
          docNumber: dataToEditOrRemove.employeeNumber,
          docCompanyName: dataToEditOrRemove.companySignatureName,
        }
      : {
          docName: '',
          docStatus: '',
          docType: '',
          docNumber: '',
          docCompanyName: '',
        },
  );

  const docId = values.docId;
  const docName = values.docName;
  const docStatus = values.docStatus;
  const docType = values.docType;
  const docNumber = values.docNumber;
  const docCompanyName = values.docCompanyName;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(-1);
    if (dataToEditOrRemove) {
      await dispatch(patchData({ docId, docName, docStatus, docType, docNumber, docCompanyName }));
      dispatch(setThisDocument(null));
      await dispatch(getData());
    } else {
      await dispatch(postData({ docName, docStatus, docType, docNumber, docCompanyName }));
      dispatch(setThisDocument(null));
      await dispatch(getData());
    }
  };

  return (
    <form className={style.document} onSubmit={handleSubmit}>
      <EditOrAddForm handleChange={handleChange} values={values} />
      <Button type='submit' variant='contained' color='success'>
        Добавить
      </Button>
    </form>
  );
};

export default EditOrAddDocument;
