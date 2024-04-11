import CardButton from '../CardButton/CardButton';
import './JournalAddButton.css';

const JournalAddButton = () => {
	return (
		<CardButton className="journal-add">
			<img src="/add.svg" alt="Иконка добавить" />
			Новое воспоминание
		</CardButton>
	);
};

export default JournalAddButton;
