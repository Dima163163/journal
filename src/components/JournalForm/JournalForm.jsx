import {useContext, useEffect, useReducer, useRef} from 'react';
import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import cn from 'classnames';
import {formReducer, INITIAL_STATE} from './JournalForm.state';
import Input from '../Input/Input';
import {UserContext} from '../../context/user.context';

const JournalForm = ({addItem, data, onDelete}) => {
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const {isValid, isFormReadyToSubmit, values} = formState;
	const titleRef = useRef();
	const dateRef = useRef();
	const postRef = useRef();
	const {userId, setUserId} = useContext(UserContext);

	const focusError = (isValid) => {
		switch (true) {
			case !isValid.title:
				titleRef.current.focus();
				break;
			case !isValid.date:
				dateRef.current.focus();
				break;
			case !isValid.post:
				postRef.current.focus();
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		if (!data) {
			dispatchForm({type: 'CLEAR'});
			dispatchForm({
				type: 'SET_VALUE',
				payload: {userId: userId}
			});
		}
		dispatchForm({type: 'SET_VALUE', payload: {...data}});
	}, [data]);

	useEffect(() => {
		let timerId;
		if (!isValid.date || !isValid.post || !isValid.title) {
			focusError(isValid);
			timerId = setTimeout(() => {
				dispatchForm({type: 'RESET_VALIDITY'});
			}, 2000);
		}
		return () => {
			clearTimeout(timerId);
		};
	}, [isValid]);

	useEffect(() => {
		if (isFormReadyToSubmit) {
			addItem(values);
			dispatchForm({type: 'CLEAR'});
			dispatchForm({
				type: 'SET_VALUE',
				payload: {userId: userId}
			});
		}
	}, [isFormReadyToSubmit, values, addItem, userId]);

	useEffect(() => {
		dispatchForm({
			type: 'SET_VALUE',
			payload: {userId: userId}
		});
	}, [userId]);

	const onChange = (e) => {
		dispatchForm({
			type: 'SET_VALUE',
			payload: {[e.target.name]: e.target.value}
		});
	};

	const addJournalItem = (e) => {
		e.preventDefault();
		// const formData = new FormData(e.target);
		// const formProps = Object.fromEntries(formData);
		// console.log('formProps: ', formProps);
		dispatchForm({type: 'SUBMIT'});
	};

	const deleteJournalItem = () => {
		onDelete(data.id);
		dispatchForm({type: 'CLEAR'});
		dispatchForm({
			type: 'SET_VALUE',
			payload: {userId: userId}
		});
	};

	return (
		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<div className={styles['form-row']}>
				<Input
					type="text"
					name="title"
					ref={titleRef}
					value={values.title}
					onChange={onChange}
					appearence="title"
					isValid={!isValid.title}
				/>
				{data?.id && (
					<button
						className={styles.delete}
						type="button"
						onClick={deleteJournalItem}
					>
						<img src="/archive.svg" alt="Кнопка удалить" />
					</button>
				)}
			</div>
			<div className={styles['form-row']}>
				<label className={styles['form-lable']} htmlFor="date">
					<img src="/calendar.svg" alt="Иконка календаря" />
					<span>Дата</span>
				</label>
				<Input
					type="date"
					name="date"
					ref={dateRef}
					id="date"
					value={
						values.date ? new Date(values.date).toISOString().slice(0, 10) : ''
					}
					onChange={onChange}
					isValid={!isValid.date}
				/>
			</div>
			<div className={styles['form-row']}>
				<label className={styles['form-lable']} htmlFor="tag">
					<img src="/folder.svg" alt="Иконка папки" />
					<span>Метки</span>
				</label>
				<Input
					type="text"
					name="tag"
					id="tag"
					value={values.tag}
					onChange={onChange}
				/>
			</div>

			<textarea
				name="post"
				id="post"
				ref={postRef}
				value={values.post}
				onChange={onChange}
				appearence="text"
				className={cn(styles['input'], {
					[styles['invalid']]: !isValid.post
				})}
				rows="20"
			/>
			<Button className={styles.btn}>Сохранить</Button>
		</form>
	);
};

export default JournalForm;
