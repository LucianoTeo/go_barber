import React, { useEffect } from 'react';

import {
  FiAlertCircle,
  FiXCircle,
  FiCheckCircle,
  FiInfo,
} from 'react-icons/fi';

import { ToastMessage, useToast } from '../../../hooks/toast';

import { Container } from './styles';

interface Message {
  message: ToastMessage;
  style: object;
}

const icons = {
  success: <FiCheckCircle size={24} />,
  error: <FiAlertCircle size={24} />,
  info: <FiInfo size={24} />,
};

const Toast: React.FC<Message> = ({ message, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, message]);

  return (
    <Container
      type={message.type}
      hasdescription={!!message.description}
      style={style}
    >
      {icons[message.type]}

      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>

      <button onClick={() => removeToast(message.id)} type="button">
        <FiXCircle size={22} />
      </button>
    </Container>
  );
};

export default Toast;
