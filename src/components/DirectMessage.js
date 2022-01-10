import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { getUserMessages, sendMessage } from '../api/slack-api';
import { useAuth } from '../context/AuthContextProvider';
import { useUsers } from '../context/UsersContextProvider';

const DirectMessage = () => {
	const [email, setEmail] = useState('');
	const [toggleSearch, setToggleSearch] = useState(false);
	const [filteredEmails, setFilteredEmails] = useState([]);
	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState('');
	const [user, setUser] = useState({});
	const { state } = useAuth();
	const users = useUsers();
	const spanRef = useRef();

	useEffect(() => {
		if (email === '') {
			setToggleSearch(false);
		} else {
			setToggleSearch(true);
			setFilteredEmails(
				users.filter((user) => {
					return user.email
						.toLowerCase()
						.includes(email.toLowerCase());
				})
			);
		}
	}, [users, email]);

	useEffect(() => {
		if (!_.isEmpty(user)) {
			(async () => {
				const data = await getUserMessages(state.headers, user.id);
				console.log('data', data);
				setMessages((s) => data);
				console.log('messages', messages);
				spanRef.current.scrollIntoView({ behavior: 'smooth' });
			})();
		}
	}, [user]);

	const handleSet = (u) => {
		setToggleSearch(false);
		setEmail(u.email);
		setUser(u);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (email === '' && message === '') {
			alert('Please enter an email or message');
		} else {
			await sendMessage(state.headers, user.id, 'User', message);
			setMessage('');
		}
	};
	return (
		<div className=''>
			<div className=''>
				<div className=''>
					<div className=''>
						<input
							type='text'
							className=''
							placeholder='Email..'
							// onFocus={handleFocus}
							value={email}
							onChange={(e) =>
								setEmail((s) => e.target.value)
							}
						/>
					</div>
					{toggleSearch && (
						<ul className=''>
							{filteredEmails &&
								filteredEmails.map((user) => (
									<li
										key={user.id}
										className=''
										onClick={() =>
											handleSet(user)
										}
									>
										{user.email}
									</li>
								))}
						</ul>
					)}
				</div>
			</div>
			<div className='direct-message-div'>
				<div className=''>
					{messages.map((msg, index) => (
						<div
							key={msg.id}
							className={`${
								msg.sender.id === state.user.id
									? 'self-end'
									: 'self-start'
							}`}
						>
							<span className=''>
								{msg.sender.email}
							</span>
							<div
								className=''
								ref={
									messages.length - 1 === index
										? spanRef
										: null
								}
							>
								{msg.body}
							</div>
						</div>
					))}
					<span ref={spanRef}></span>
				</div>
			</div>
			<form onSubmit={(e) => handleSubmit(e)}>
				<div className=''>
					<textarea
						name=''
						className=''
						value={message}
						onChange={(e) => setMessage(e.target.value)}
					></textarea>
					<button className='' type='submit'>
						Send
					</button>
				</div>
			</form>
		</div>
	);
};

export default DirectMessage;
