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
		<div className=''>
			<div className=''>
				<div className=''>
					<h1 className=''>Create Channel</h1>
				</div>
				<div className=''>
					<input
						type='text'
						className=''
						placeholder='Channel Name'
						value={channelName}
						onChange={(e) =>
							setChannelName((c) => e.target.value)
						}
					/>
				</div>
				<div className=''>
					<span className=''>
						Add Members
					</span>
					<div
						style={{ color: 'green' }}
						className=''
						onClick={(e) => toggleUser(e)}
					>
						<FaPlusSquare size={26} />
					</div>
				</div>
				{toggleAddUser && (
					<div className=''>
						<div className=''>
							<input
								type='text'
								className=''
								placeholder='search...'
								onClick={() =>
									setToggleUserList((t) => !t)
								}
								value={search}
								onChange={(e) =>
									setSearch((s) => e.target.value)
								}
							/>
							<svg
								className=''
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
								/>
							</svg>
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
											className=''
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
											Remove
										</button>
									</li>
								))}
						</ul>
					</div>
				)}

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
