import { message } from 'antd';
import { useEffect } from 'react';

export const useSuccessMessage = (text: string | null) => {
  useEffect(() => {
    if (text) {
      message.success(text);
    }
  }, [text]);
};
