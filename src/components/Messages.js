import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { fetcher, getUser, sendMessage } from '../api/slack-api';
import { useAuth } from '../context/AuthContextProvider';
import { useUsers } from '../context/UsersContextProvider';
import _ from 'lodash';

const API_URL = 'https://slackapi.avionschool.com/api/v1'
const Messages = () => {
	const params = useParams();
	const { state } = useAuth();
	const [user, setUser] = useState({});
	const users = useUsers();
	const [message, setMessage] = useState('');
	const spanRef = useRef();
	const inputRef = useRef();

	// useEffect(() => {
	// 	(async () => {
	// 		const data = await getChannelDetail(state.headers, params.id);
	// 		setChannelData(data);
	// 	})();
	// 	inputRef.current.focus();
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [params.id, state.headers]);

	const { data: messages, error } = useSWR(
		[
			`${API_URL}/messages?receiver_id=${params.id}&receiver_class=User`,
			state.headers,
		],
		fetcher,
		{ refreshInterval: 1000 }
	);

	useEffect(() => {
		let mounted = true;
		if (mounted) {
			spanRef.current.scrollIntoView({
				// behavior: 'smooth',
			});
		}

		return () => (mounted = false);
	}, [messages]);

	useEffect(() => {
		(async () => {
			const u = await getUser(users, params.id);
			setUser(u);
		})();
	}, [params.id, users]);

	const handleSend = async (e) => {
		e.preventDefault();
		if (message === '') {
			alert('nah');
		} else {
			await sendMessage(state.headers, params.id, 'User', message);
			setMessage('');
		}
	};
	return (
		<>
			<div className=''>
				<div className=''>
					{!_.isEmpty(user) && (
						<span className=''>
							{user.email}
						</span>
					)}
				</div>
				<div className=''>
					<div className=''>
						{messages &&
							messages.map((msg, index) => (
								<div
									key={msg.id}
									className={`${
										msg.sender.id ===
										state.user.id
											? 'self-end'
											: 'self-start'
									}`}
								>
									<span className=''>
										{msg.sender.email ===
										state.user.email ? (
											<span>You</span>
										) : (
											<span>
												{msg.sender.email}
											</span>
										)}
									</span>
									<div className=''>
										{msg.body}
									</div>
								</div>
							))}
						<span ref={spanRef}></span>
					</div>
				</div>
				<form onSubmit={(e) => handleSend(e)}>
					<div className=''>
						<textarea
							name=''
							className=''
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							ref={inputRef}
						></textarea>
						<button className='' type='submit'>
							Send
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default Messages;
