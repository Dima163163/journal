import CardButton from '../CardButton/CardButton';
import styles from './JournalAddButton.module.css';

const JournalAddButton = ({clearForm}) => {
	return (
		<CardButton className={styles['journal-add']} onClick={clearForm}>
			<img src="/add.svg" alt="Иконка добавить" />
			Новое воспоминание
		</CardButton>
	);
};

export default JournalAddButton;
