import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';

import { InputField } from '../../../shared/ui';
import Button from '../../../shared/ui/Button';
import { EyeIcon, EyeOffIcon, LockIcon, SpinnerIcon, UserIcon } from '../../../shared/ui/Icons';
import { Checkbox, Link } from '../../../shared/ui';
import { AuthService } from '../../../shared/api/auth';
import type { User } from '../../../shared/api/users';
import { saveToken } from '../../../shared/utils';
import logo from '../../../assets/logo.svg';

import styles from './Login.module.scss';

type Form = Pick<User, 'username' | 'password'>;

const defaultValues: Partial<Form> = {
  username: '',
  password: '',
}

const LoginPage = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onToggleShowPassword = () => {
    setShowPassword((value) => !value)
  }

  const {
      register,
      reset,
      handleSubmit,
      setValue,
      formState: { errors }
    } = useForm<Form>({
      defaultValues
    });

  const onSubmit = (values: Form) => {
    setIsLoading(true);

    AuthService.login(values)
      .then((result) => {
        if (rememberMe) {
          saveToken({
            accessToken: result.accessToken,
            refreshToken: result.refreshToken
          })
        }
        navigate('/');
      })
      .catch((err) => {
        const error = err instanceof Error ? err.message : 'Ошибка авторизации';
        enqueueSnackbar(error, { variant: 'error' });
      })
      .finally(() => {
        reset();
        setIsLoading(false);
      })
  };

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <img src={logo} />
        </div>
        <h1 className={styles.title}>Добро пожаловать!</h1>
        <p className={styles.text}>Пожалуйста, авторизируйтесь</p>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <InputField
            id="username"
            label="Логин"
            placeholder="Введите логин"
            renderBefore={<UserIcon />}
            {...register("username", { required: "Обязательное поле. Введите логин" })}
            error={errors.username?.message}
            onClear={() => setValue('username', '')}
          />
          <InputField
            id="password"
            label="Пароль"
            placeholder="Введите пароль"
            type={showPassword ? 'text' : 'password'}
            {...register("password", { required: "Обязательное поле. Введите пароль" })}
            error={errors.password?.message}
            rootClassName={styles.password}
            renderBefore={<LockIcon />}
            renderAfter={showPassword ? <EyeIcon onClick={onToggleShowPassword} /> : <EyeOffIcon onClick={onToggleShowPassword} />}
          />
          <Checkbox
            rootClassName={styles.checkbox}
            label='Запомнить данные'
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            disabled={isLoading}
          />
          <Button
            type="submit"
            fullWidth
            disabled={isLoading}
            className={styles.btn}
            renderBefore={isLoading && <SpinnerIcon />}
          >
            Войти
          </Button>
        </form>
        <div className={styles.or}>или</div>
        <p className={styles.notAccount}>Нет аккаунта? <Link to="/">Создать</Link></p>
      </div>
    </div>
  );
};

export default LoginPage;
