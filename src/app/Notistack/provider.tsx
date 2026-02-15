import { forwardRef, type FC, type ReactNode } from 'react';
import { closeSnackbar, type CustomContentProps, SnackbarContent, SnackbarProvider } from 'notistack';
import { Toast } from '../../shared/ui';

interface INotistackProviderProps {
  children: ReactNode;
}

const BaseContent = forwardRef<HTMLDivElement, CustomContentProps>((props, ref) => {
  const {
    id,
    message,
    variant,
    ...other
  } = props

  return (
    <SnackbarContent ref={ref} role="alert" {...other}>
      <Toast
        message={message}
        type={variant}
        onClose={() => closeSnackbar(id)}
      />
    </SnackbarContent>
  )
});

export const NotistackProvider: FC<INotistackProviderProps> = ({
  children
}) => {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      autoHideDuration={5000}
      Components={{
        success: BaseContent,
        warning: BaseContent,
        error: BaseContent
      }}
    >
      {children}
    </SnackbarProvider>
  )
}
