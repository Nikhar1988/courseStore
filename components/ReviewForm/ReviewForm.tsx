import { ReviewFormProps } from './ReviewForm.props';
import styles from './ReviewForm.module.css';
import cn from 'classnames';
import { Button, Input, Rating, Textarea } from '..';
import CloseIcon from './close.svg';
import {useForm, Controller} from 'react-hook-form';
import {IReviewForm, IReviewResponse} from './ReviewForm.interface';
import axios from 'axios';
import { API } from '../../helpers/api';
import { useState } from 'react';
 
export const ReviewForm = ({productId, className, ...props}:ReviewFormProps):JSX.Element => {
    const {register , control, handleSubmit, formState: {errors}, reset } = useForm<IReviewForm>();
    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    const [error, setError] = useState<string>()
     
    const onSubmit = async (formData:IReviewForm) => {
        console.log(formData,productId)
        try {
            const { data }= await axios.post<IReviewResponse>(API.review.createDemo,{...formData, productId})
            console.log(data)
            if(data.message) {
                setIsSuccess(true);
                reset();
            } else {
                setError('Что-то пошло не так!')
            }
        }catch (e) {
             setError((e as Error).message)   
        }
    };
   
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={cn(styles.reviewForm, className)}
                {...props}
            >
                <Input 
                
                    {...register('name', {required:{value:true, message:'Введите имя'}})} 
                    placeholder='Имя'
                    error ={errors.name}
                />
                <Input 
                    {...register('title',{required:{value:true, message:'Введите заголовок'}})} 
                    placeholder='Заголовок отзыва' 
                    className={styles.title}
                    error ={errors.title}
                />
                <div className={styles.rating}>
                    <span>Оценка:</span>
                    <Controller
                        control={control}
                        name='rating'
                        rules={{required:{value:true, message:'Укажите рейтинг'}}}
                        render={({field})=> (
                            <Rating error={errors.rating} isEditable rating={field.value} ref={field.ref} setRating={field.onChange}/>
                        )}
                    /> 
                </div>
                <Textarea 
                    {...register('description',{required:{value:true, message:'Введите отзыв'}})} 
                    placeholder='Текст отзыва' 
                    className={styles.description}
                    error={errors.description}
                    
                />
                <div className={styles.submit}>
                    <Button appearance="primary">Отправить</Button>
                    <span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
                </div>
            </div> 
           { isSuccess && <div className={cn(styles.success, styles.panel)}>
                <div className={styles.successTitle}>Ваш отзыв отправлен</div>
                <div>Спасибо, ваш отзыв будет опубликован после проверки.</div>
                <CloseIcon className={styles.close} onClick={()=> setIsSuccess(false) }/>
            </div>}

            {error && <div className={cn(styles.error, styles.panel)}>
                 Что-то пошло не так попробуйте обновить страницу
                <CloseIcon onClick={()=> setError('') } className={styles.close}/>
            </div>} 
            
        </form>
        

    );
};
