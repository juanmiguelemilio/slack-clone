import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useUsers } from '../context/UsersContextProvider';
import _ from 'lodash';
import { addMemberChannel } from '../api/slack-api';
import { useAuth } from '../context/AuthContextProvider';

const AddMemberModal = ({ setToggleAddMemberModal, channelId }) => {
	const users = useUsers();
	const [toggleUserList, setToggleUserList] = useState(false);
	const [search, setSearch] = useState('');
	const [filteredEmails, setFilteredEmails] = useState([]);
	const [user, setUser] = useState({});
	const { state } = useAuth();

	const handleFocus = () => {
		setToggleUserList((t) => !t);
	};

	const handleAdd = (u) => {
		// u = userObject
		setUser((user) => u);
		setToggleUserList((t) => !t);
	};

	const handleRemoveUser = () => {
		setUser({});
	};

	const closeModal = () => {
		setToggleAddMemberModal((t) => !t);
	};

	const handleAddMember = async () => {
		if (_.isEmpty(user)) {
			alert('You need to add a member!');
		} else {
			const status = await addMemberChannel(
				state.headers,
				channelId,
				user.id
			);
			if (status === 200) {
				alert(`Added ${user.email}!`);
				setToggleAddMemberModal((t) => !t);
			}
		}
	};

	useEffect(() => {
		if (search === '') {
			setFilteredEmails(users);
		} else {
			setFilteredEmails(
				users.filter((user) => {
					return user.email
						.toLowerCase()
						.includes(search.toLowerCase());
				})
			);
		}
	}, [search, users]);

	return ReactDOM.createPortal(
		<div className='add-mem-container'>
			<div className='add-mem-inner'>
				<div className='add-mem-header'>
					<h3 className=''>Add Member</h3>
					<hr></hr>
				</div>
				<br></br>
				<input
							type='text'
							className='search-user-input'
							placeholder='Search user...'
							onFocus={handleFocus}
							value={search}
							onChange={(e) =>
								setSearch((s) => e.target.value)
							}
						/>
				<div className='add-mem-search-overflow'>
					<div className=''>
						{/* <input
							type='text'
							className=''
							placeholder='Search User...'
							onFocus={handleFocus}
							value={search}
							onChange={(e) =>
								setSearch((s) => e.target.value)
							}
						/> */}
						
					</div>
					{toggleUserList && (
						<ul className=''>
							{filteredEmails &&
								filteredEmails.map((user) => (
									<li
										key={user.id}
										className=''
										onClick={() =>
											handleAdd(user)
										}
									>
										{user.email}
									</li>
								))}
						</ul>
					)}
				</div>
				{!_.isEmpty(user) && (
					<div className=''>
						<div className='text-lg'>{user.email}</div>
						<div>
							<button
								className=''
								onClick={handleRemoveUser}
							>
								<i class="fas fa-backspace"></i>
							</button>
						</div>
					</div>
				)}
				<br></br>
				<br></br>
				<div className='add-mem-btn'>
					<button
						className='add-mem-btn-close'
						onClick={closeModal}
					>
						Close
					</button>
					<button
						className='add-mem-btn-add'
						onClick={handleAddMember}
					>
						Add
					</button>
				</div>
			</div>
		</div>,
		document.getElementById('portal')
	);
};

export default AddMemberModal;
