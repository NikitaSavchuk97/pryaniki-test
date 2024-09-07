import { ReactNode } from 'react';

export interface ModalPropTypes {
  title: string | null | undefined;
  children: ReactNode;
}

export interface ModalOverlayPropTypes {
  closeModal: () => void;
}

export interface UseFormPropTypes {
  [key: string]: string;
}

export interface UserPropTypes {
  name: string;
  email: string;
}

export interface DeleteDataPropTypes {
  idToRemove: string;
}

export interface PostDataPropTypes {
  docName: string;
  docStatus: string;
  docType: string;
  docNumber: string;
  docCompanyName: string;
  docId?: string;
}

export interface DocumentDataPropTypes {
  id: string;
  documentStatus: string;
  employeeNumber: string;
  documentType: string;
  documentName: string;
  companySignatureName: string;
  employeeSignatureName: string;
  employeeSigDate: string;
  companySigDate: string; 
}

export interface DocumentProps {
  key: string;
  document: DocumentDataPropTypes;
}

export interface DataSlicePropTypes {
  dataStatus: string;
  dataLoadedIn: boolean;
  dataCurrent: DocumentDataPropTypes[] | null;
  dataToEditOrRemove: DocumentDataPropTypes | null;
}

export interface UserSlicePropTypes {
  userStatus: string;
  userLoggedIn: boolean;
  userCurrent: { name: string; email: string } | null;
}

export interface ProtectedRoutePropTypes {
  element: ReactNode;
  anonymous?: boolean;
}

export interface GetDataPropTypes {
  error_code: number;
  error_text: string;
  data: any | null;
  profiling: string;
  timings: any | null;
}

export interface PostUserValuesPropTypes {
  loginValue: string;
  passValue: string;
}

export interface PostUserDataPropTypes {
  error_code: number;
  error_message: string;
  data: {
    token: string;
  };
  profiling: string;
  timings: any;
}
