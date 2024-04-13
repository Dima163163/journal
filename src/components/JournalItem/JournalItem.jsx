import styles from './JournalItem.module.css';

const JournalItem = ({title, date, post}) => {
	const formatedDate = new Intl.DateTimeFormat('ru-Ru').format(date);
	return (
		<>
			<h2 className={styles['journal-item__header']}>{title}</h2>
			<div className={styles['journal-item__body']}>
				<div className={styles['journal-item__date']}>{formatedDate}</div>
				<div className={styles['journal-item__text']}>{post}</div>
			</div>
		</>
	);
};

export default JournalItem;
