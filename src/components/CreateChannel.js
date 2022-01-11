import React, { useEffect, useState } from 'react';
import { createChannel, getUsers } from '../api/slack-api';
import { useAuth } from '../context/AuthContextProvider';
import { useChannels } from '../context/ChannelContextProvider';
import { FaPlusSquare } from 'react-icons/fa';

const CreateChannel = (props) => {
	const [channelName, setChannelName] = useState('');
	const [toggleAddUser, setToggleAddUser] = useState(false);
	const [userList, setUserList] = useState([]);
	const [toggleUserList, setToggleUserList] = useState(false);
	const [filteredEmails, setFilteredEmails] = useState([]);
	const [search, setSearch] = useState('');

	const [users, setUsers] = useState([]);
	const { state } = useAuth();
	const { dispatch: channelDispatch } = useChannels();
	useEffect(() => {
		(async () => {
			const data = await getUsers(state.headers);
			setUserList(data);
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (search === '') {
			setFilteredEmails(userList);
		} else {
			setFilteredEmails(
				userList.filter((user) => {
					return user.email
						.toLowerCase()
						.includes(search.toLowerCase());
				})
			);
		}
	}, [search, userList]);

	const handleAdd = (e, user) => {
		e.preventDefault();
		if (!users.some((u) => u === user)) {
			setUsers([...users, user]);
		}
		setToggleUserList((t) => !t);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const [data, status] = await createChannel(
			users,
			channelName,
			state.headers
		);
		if (status === 200) {
			alert('You created a new channel!');
			channelDispatch({ type: 'ADD_CHANNEL', payload: data });
		}
	};

	const toggleUser = (e) => {
		setToggleAddUser((toggle) => !toggle);
	};
	return (
		<div className='create-channel-container'>
			<div className='create-channel-inner'>
			<h2 className=''>Create Channel</h2>
				<div className=''>
					
					<input
						type='text'
						className='channel-name-input'
						placeholder='Channel Name'
						value={channelName}
						onChange={(e) =>
							setChannelName((c) => e.target.value)
						}/>
					
				</div>
				<div className=''>
					<div className='' onClick={(e) => toggleUser(e)}>
					{/* <span className=''>
						Add Members <i class="fas fa-plus"></i>
					</span> */}
					</div>
				</div>
				{/* {toggleAddUser && ( */}
					<div className=''>
						<div className=''>
							<input
								type='text'
								className='search-user-input'
								placeholder='Search member to add...'
								onClick={() =>
									setToggleUserList((t) => !t)
								}
								value={search}
								onChange={(e) =>
									setSearch((s) => e.target.value)
								}
							/>
							{/* <i class="fas fa-search"></i> */}
						</div>
						{toggleUserList && (
							<ul className=''>
								{filteredEmails &&
									filteredEmails.map((user) => (
										<li
											key={user.id}
											className=''
											onClick={(e) =>
												handleAdd(e, user)
											}
										>
											{user.email}
										</li>
									))}
							</ul>
						)}
						<ul className=''>
							{users &&
								users.map((user) => (
									<li
										key={user.id}
										className=''
									>
										<span>{user.email}</span>
										<button
											className='add-user-btn'
											onClick={() =>
												setUsers(
													users.filter(
														(u) =>
															u.id !==
															user.id
													)
												)
											}
										>
											<i class="fas fa-backspace"></i>
										</button>
									</li>
								))}
						</ul>
					</div>
				{/* )} */}

				<div className=''>
					<button
						className=''
						onClick={(e) => handleSubmit(e)}
					>
						Submit
					</button>
				</div>
			</div>
		</div>
	);
};

export default CreateChannel;
