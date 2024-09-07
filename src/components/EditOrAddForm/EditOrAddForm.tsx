import { ChangeEvent, FC, } from 'react';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { TextField, ThemeProvider, Theme, createTheme, useTheme } from '@mui/material';

const EditOrAddForm: FC<any> = ({ handleChange, values }) => {
  
  const outerTheme = useTheme();
  return (
    <ThemeProvider theme={customTheme(outerTheme)}>
      <TextField
        required
        size='small'
        fullWidth
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
        name='docName'
        value={values.docName}
        label='Имя документа'
        slotProps={{
          inputLabel: {
            style: { color: '#fff' },
          },
        }}
      />
      <TextField
        required
        size='small'
        fullWidth
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
        name='docStatus'
        value={values.docStatus}
        label='Статус документа'
        slotProps={{
          inputLabel: {
            style: { color: '#fff' },
          },
        }}
      />

      <TextField
        required
        size='small'
        fullWidth
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
        name='docType'
        value={values.docType}
        label='Тип документа'
        slotProps={{
          inputLabel: {
            style: { color: '#fff' },
          },
        }}
      />

      <TextField
        required
        size='small'
        fullWidth
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
        name='docNumber'
        value={values.docNumber}
        label='Номер сотрудника'
        slotProps={{
          inputLabel: {
            style: { color: '#fff' },
          },
        }}
      />

      <TextField
        required
        size='small'
        fullWidth
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
        name='docCompanyName'
        value={values.docCompanyName}
        label='Название компании'
        slotProps={{
          inputLabel: {
            style: { color: '#fff' },
          },
        }}
      />
    </ThemeProvider>
  );
};

export default EditOrAddForm;

const customTheme = (outerTheme: Theme) => {
  return createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '--TextField-brandBorderColor': 'rgb(131, 131, 131)',
            '--TextField-brandBorderHoverColor': 'rgb(36, 140, 226)',
            '--TextField-brandBorderFocusedColor': 'rgb(0, 140, 255)',
            '& label.Mui-focused': {
              color: 'var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: 'var(--TextField-brandBorderColor)',
          },
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--TextField-brandBorderHoverColor)',
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--TextField-brandBorderFocusedColor)',
            },
            '& input': {
              color: 'white',
            },
          },
        },
      },
    },
  });
};
