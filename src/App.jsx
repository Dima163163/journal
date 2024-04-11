import {useState} from 'react';
import './App.css';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import JournalList from './components/JournalList/JournalList';
import Body from './layouts/Body/Body';
import LeftPanel from './layouts/LeftPanel/LeftPanel';

function App() {
	const INITIAL_DATA = [
		// {
		// 	id: 1,
		// 	title: 'Подготовка к обновлению курсов',
		// 	date: new Date(),
		// 	text: 'Горные породы открывают удивительный ландшафт'
		// },
		// {
		// 	id: 2,
		// 	title: 'Поход в горы',
		// 	date: new Date(),
		// 	text: 'Думал, что очень много времени'
		// }
	];
	const [items, setItems] = useState(INITIAL_DATA);

	const addItem = (item) => {
		setItems((oldItems) => [
			...oldItems,
			{
				title: item.title,
				date: new Date(item.date),
				text: item.post,
				tag: item.tag,
				id: oldItems > 0 ? Math.max(...oldItems.map((i) => i.id)) + 1 : 1
			}
		]);
	};

	return (
		<div className="app">
			<LeftPanel>
				<Header />
				<JournalAddButton />
				<JournalList items={items}></JournalList>
			</LeftPanel>
			<Body>
				<JournalForm addItem={addItem} />
			</Body>
		</div>
	);
}

export default App;
