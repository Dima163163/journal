import SelectUser from '../SelectUser/SelectUser';
import styles from './Header.module.css';
import Logo from '../Logo/Logo';

const Header = () => {
	return (
		<>
			<Logo image="/logo.svg" />
			<SelectUser />
		</>
	);
};

export default Header;
