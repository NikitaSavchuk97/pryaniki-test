import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../hooks/useReduxToolkit';
import { ProtectedRoutePropTypes } from '../../utils/types';

const ProtectedRoute: FC<ProtectedRoutePropTypes> = ({ element, anonymous = false }) => {
  const location = useLocation();
  const from = location.state?.from || '/';
  const { userLoggedIn } = useSelector((state) => state.userSlice);

  // Если разрешен неавторизованный доступ, а пользователь авторизован...
  if (anonymous && userLoggedIn) {
    // ...то отправляем его на предыдущую страницу
    return <Navigate to={from} />;
  }

  // Если требуется авторизация, а пользователь не авторизован...
  if (!anonymous && !userLoggedIn) {
    // ...то отправляем его на страницу логин
    return <Navigate to='/login' state={{ from: location }} />;
  }

  // Если все ок, то рендерим внутреннее содержимое
  return <>{element}</>;
};

export default ProtectedRoute;
