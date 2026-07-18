import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { colors, fonts } from '../constants';

export type ToastContextType = (msg: string) => void;

export const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [message, setMessage] = React.useState<string>('');
  const [visible, setVisible] = React.useState(false);

  const showToast = React.useCallback((msg: string) => {
    setMessage(msg);
    setVisible(true);
  }, []);

  const onDismissSnackBar = () => {
    setVisible(false);
  };

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration={2000}
        style={styles.snackbar}
        wrapperStyle={styles.wrapper}
        theme={{
          colors: {
            onSurface: colors.white
          }
        }}
      >
        {message}
      </Snackbar>
    </ToastContext.Provider>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    bottom: 50,
    left: 0,
    position: 'absolute',
    right: 0,
    zIndex: 9999
  },
  snackbar: {
    backgroundColor: '#1b1822',
    borderColor: colors.categoryBorder,
    borderRadius: 8,
    borderWidth: 1.5,
    alignSelf: 'center'
  }
});
