import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';
import styles from './JournalList.module.css';

const JournalList = ({items}) => {
	if (items.length === 0) return <p>Записей пока нет, добавьте первую</p>;
	const sortItems = (a, b) => {
		if (a.date < b.data) {
			return 1;
		} else {
			return -1;
		}
	};

	const list = items.sort(sortItems).map((item) => (
		<CardButton key={item.id}>
			<JournalItem title={item.title} text={item.text} date={item.date} />
		</CardButton>
	));
	return <div className={styles['journal-list']}>{list}</div>;
};

export default JournalList;
