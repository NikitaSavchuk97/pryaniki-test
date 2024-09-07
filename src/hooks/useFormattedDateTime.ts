import { useState, useEffect } from 'react';

const useFormattedDateTime = (dateString: string) => {
  const [formattedDateTime, setFormattedDateTime] = useState<string>('');
  useEffect(() => {
    if (dateString) {
      const cleanedDateString = dateString.trim();
      const date = new Date(cleanedDateString);
      const formatted = date.toLocaleString('ru-RU');
      setFormattedDateTime(formatted);
    }
  }, [dateString]);
  return formattedDateTime;
};

export default useFormattedDateTime;
