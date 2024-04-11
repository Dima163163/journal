import {useState} from 'react';
import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import cn from 'classnames';

const JournalForm = ({addItem}) => {
	const [formValidState, setFormValidState] = useState({
		title: true,
		post: true,
		date: true
	});

	const addJournalItem = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const formProps = Object.fromEntries(formData);
		console.log('formProps: ', formProps);
		let isFormValid = true;
		if (!formProps.title?.trim().length) {
			setFormValidState((state) => ({...state, title: false}));
			isFormValid = false;
		} else {
			setFormValidState((state) => ({...state, title: true}));
		}
		if (!formProps.post?.trim().length) {
			setFormValidState((state) => ({...state, post: false}));
			isFormValid = false;
		} else {
			setFormValidState((state) => ({...state, post: true}));
		}
		if (!formProps.date) {
			setFormValidState((state) => ({...state, date: false}));
			isFormValid = false;
		} else {
			setFormValidState((state) => ({...state, date: true}));
		}
		if (!isFormValid) {
			return;
		}
		addItem(formProps);
	};

	return (
		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<div>
				<input
					type="text"
					name="title"
					className={cn(styles['input-title'], {
						[styles['invalid']]: !formValidState.title
					})}
				/>
			</div>
			<div className={styles['form-row']}>
				<label className={styles['form-lable']} htmlFor="date">
					<img src="/calendar.svg" alt="Иконка календаря" />
					<span>Дата</span>
				</label>
				<input
					type="date"
					name="date"
					id="date"
					className={cn(styles['input'], {
						[styles['invalid']]: !formValidState.date
					})}
				/>
			</div>
			<div className={styles['form-row']}>
				<label className={styles['form-lable']} htmlFor="tag">
					<img src="/folder.svg" alt="Иконка папки" />
					<span>Метки</span>
				</label>
				<input type="text" name="tag" id="tag" className={styles['input']} />
			</div>

			<textarea
				name="post"
				id=""
				className={cn(styles['input'], {
					[styles['invalid']]: !formValidState.post
				})}
			/>
			<Button className={styles.btn} text="Сохранить" />
		</form>
	);
};

export default JournalForm;
