import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import type { Product } from '../../../entities/product';
import { CloseIcon, InputField } from '../../../shared/ui';
import { ProductsService } from '../../../shared/api/products';

import styles from './AddProduct.module.scss';
import Button from '../../../shared/ui/Button';

interface ProductModalProps {
  onClose: () => void;
}

type Form = Pick<Product, 'title' | 'price' | 'brand' | 'sku'>;

const defaultValues: Partial<Form> = {
  title: '',
  price: 0,
  brand: '',
  sku: '',
}

export const AddProduct = ({ onClose }: ProductModalProps) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<Form>({
    defaultValues
  });

  const onSubmit = (values: Form) => {
    ProductsService.addProduct(values)
      .then((result) => {
        enqueueSnackbar(`Товар "${result.title}" успешно добавлен`, { variant: 'success' });
      })
      .catch((err) => {
        const error = err instanceof Error ? err.message : 'Товар не добавлен';
        enqueueSnackbar(error, { variant: 'error' });
      })
      .finally(() => {
        reset();
        onClose();
      })
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Добавить товар</h2>
          <Button onClick={onClose} className={styles.modalClose} variant='outlined'>
            <CloseIcon />
          </Button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.modalForm}>
          <InputField
            label="Наименование"
            placeholder='Введите название товара'
            required
            {...register("title", { required: "Обязательное поле. Введите название товара" })}
            error={errors.title?.message}
          />
          <InputField
            label="Вендор"
            placeholder='Введите производителя'
            {...register("brand")}
          />
          <InputField
            label="Артикул"
            placeholder='Введите артикул'
            required
            {...register("sku", { required: "Обязательное поле. Введите артикул" })}
            error={errors.sku?.message}
          />
          <InputField
            label="Цена"
            type="number"
            step="0.01"
            min="0"
            placeholder='Введите цену'
            {...register("price", {
              required: "Обязательное поле. Введите цену",
              min: { value: 0.01, message: "Цена должна быть больше 0" }
            })}
            error={errors.price?.message}
          />
          <div className={styles.modalActions}>
            <Button type="button" onClick={onClose} variant='outlined'>
              Отмена
            </Button>
            <Button type="submit">
              Добавить
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
