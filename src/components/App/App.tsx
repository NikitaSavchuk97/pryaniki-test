import Modal from '../Modal/Modal';
import Login from '../Login/Login';
import Header from '../Header/Header';
import Loader from '../Loader/Loader';
import style from './App.module.scss';
import Content from '../Content/Content';
import ModalConfirm from '../ModalConfirm/ModalConfirm';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import EditOrAddDocument from '../EditOrAddDocument/EditOrAddDocument';

import { FC, useEffect } from 'react';
import { getCookie } from '../../utils/getCookie';
import { getData } from '../../redux/actions/getData';
import { setUser } from '../../redux/slices/userSlice';
import { useDispatch, useSelector } from '../../hooks/useReduxToolkit';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

const App: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state && location.state?.background?.pathname;
  const { userLoggedIn, userStatus } = useSelector((state) => state.userSlice);
  const { dataLoadedIn, dataStatus } = useSelector((state) => state.dataSlice);

  useEffect(() => {
    const cookieToken = getCookie('token');
    const handleUserLogin = (token: string) => {
      const match = token.match(/_for_(.+)$/);
      if (match) {
        dispatch(
          setUser({
            name: match[1],
            email: `${match[1]}@pryaniki.ru`,
          }),
        );
      }
    };

    const fetchDataAndNavigate = async () => {
      if (!dataLoadedIn) {
        try {
          await dispatch(getData());
        } catch (error) {
          console.error('Ошибка при загрузке данных:', error);
        }
      }

      if (dataLoadedIn && cookieToken) {
        handleUserLogin(cookieToken);
        navigate('/');
      }
    };

    fetchDataAndNavigate();
  }, [dataLoadedIn, userLoggedIn]);

  return (
    <div className={style.app}>
      <Header />

      {userStatus === 'loading' || dataStatus === 'loading' ? (
        <Loader />
      ) : (
        <>
          <Routes location={background || location}>
            <Route path='/' element={<ProtectedRoute element={<Content />} />} />
            <Route path='/login' element={<Login />} />
          </Routes>
          {background && (
            <Routes>
              <Route
                path='/new-document'
                element={
                  <Modal title='Добавить документ'>
                    <EditOrAddDocument />
                  </Modal>
                }
              />

              <Route
                path='/remove-document'
                element={
                  <Modal title='Удалить документ'>
                    <ModalConfirm />
                  </Modal>
                }
              />

              <Route
                path='/edit-document'
                element={
                  <Modal title='Изменить документ'>
                    <EditOrAddDocument />
                  </Modal>
                }
              />
            </Routes>
          )}
        </>
      )}
    </div>
  );
};

export default App;
