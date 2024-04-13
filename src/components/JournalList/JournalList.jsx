import {useContext, useMemo} from 'react';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';
import styles from './JournalList.module.css';
import {UserContext} from '../../context/user.context';

const JournalList = ({items, setItem}) => {
	const {userId} = useContext(UserContext);
	const sortItems = (a, b) => {
		if (a.date < b.data) {
			return 1;
		} else {
			return -1;
		}
	};
	const filteredItems = useMemo(
		() => items.filter((elem) => elem.userId === userId).sort(sortItems),
		[items, userId]
	);

	if (items.length === 0) return <p>Записей пока нет, добавьте первую</p>;

	return (
		<div className={styles['journal-list']}>
			{filteredItems.map((item) => (
				<CardButton key={item.id} onClick={() => setItem(item)}>
					<JournalItem title={item.title} post={item.post} date={item.date} />
				</CardButton>
			))}
		</div>
	);
};

export default JournalList;
