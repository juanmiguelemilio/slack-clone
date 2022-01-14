import React, { useEffect, useState, useRef } from 'react'
import { useAuth } from '../context/AuthContextProvider'
import { useUsers } from '../context/UsersContextProvider'
import { getChannelDetail, getChannelMessages, fetcher, sendMessage, } from '../api/slack-api'
import { useParams } from 'react-router-dom'
import AddMemberModal from './AddMemberModal'
import ChannelMemberModal from './ChannelMemberModal'
import useSWR from 'swr'

const API_URL = 'https://slackapi.avionschool.com/api/v1'

const Channels = () => {
    const params = useParams();
	const { state } = useAuth();
	const [channelData, setChannelData] = useState({});
	const [toggleAddMemberModal, setToggleAddMemberModal] = useState(false);
	const [toggleChannelMemberModal, setToggleChannelMemberModal] =
		useState(false);
	const users = useUsers();
	const [message, setMessage] = useState('');

	let spanRef = useRef();
	const inputRef = useRef();

	useEffect(() => {
		(async () => {
			const data = await getChannelDetail(state.headers, params.id);
			setChannelData(data);
		})();
		inputRef.current.focus();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params.id, state.headers]);

	let { data: messages, error } = useSWR(
		[
			`${API_URL}/messages?receiver_id=${params.id}&receiver_class=Channel`,
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

	const toggleAddMember = () => {
		// toggles Add member modal
		setToggleAddMemberModal((t) => !t);
	};

	const toggleMember = () => {
		// toggles Member modal
		setToggleChannelMemberModal((t) => !t);
	};

	const getDay = (date) => {
		const d = new Date(date);
		const today = new Date();
		if (d.getDate() === today.getDate()) {
			return <span className='text-sm font-bold'>today</span>;
		} else {
			return (
				<span className='text-sm font-bold'>
					{d.toDateString()}
				</span>
			);
		}
	};

	const getMembers = () => {
		let arr = [];
		const channelMembers = channelData.channel_members;
		for (let i = 0; i < channelData.channel_members.length; i++) {
			users.forEach((user) => {
				if (user.id === channelMembers[i].user_id) {
					arr.push(user);
				}
			});
		}

		return arr;
	};

	const handleSend = async (e) => {
		e.preventDefault();
		if (message === '') {
			alert('nah');
		} else {
			await sendMessage(
				state.headers,
				channelData.id,
				'Channel',
				message
			);
			setMessage('');
		}
	};
    return (
        <>
			<div className='channel-container'>
				<div className='channel-top-container'>
					<div className='channel-top-div'>
						<div className='channel-inner-top-div'>
							<button
								className=''
								onClick={toggleMember}
							>
								Members
							</button>
						</div>
						<div className=''>
							{channelData.name}
						</div>
						<div>
							<button
								className=''
								onClick={toggleAddMember}
							>
								Add member
							</button>
						</div>
					</div>
				</div>
				<div className='channel-message-div'>
					<div className='channel-message-overflow'>
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
									<div className='message-sent-date'>
										{getDay(msg.created_at)}
										<span className='sent-by-user'>
											{msg.sender.email ===
											state.user.email ? (
												<span className=''> You</span>
											) : (
												<span> 
													{
														msg.sender
															.email
													}
												</span>
											)}
										</span>
									</div>
									<div
										className='message-body-container'
										// 	ref={
										// 		// messages.length - 1 ===
										// 		// index
										// 		// 	? spanRef
										// 		// 	: null
										// 	}
									>
										{msg.body}
									</div>
								</div>
							))}
						<span ref={spanRef}></span>
					</div>
				</div>
				<form onSubmit={(e) => handleSend(e)}>
					<div className='write-message-div'>
						<textarea
							placeholder='Write something...'
							name=''
							className='write-message-box'
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

			{toggleAddMemberModal && (
				<AddMemberModal
					setToggleAddMemberModal={setToggleAddMemberModal}
					channelId={params.id}
				/>
			)}
			{toggleChannelMemberModal && (
				<ChannelMemberModal
					getMembers={getMembers}
					setToggleChannelMemberModal={
						setToggleChannelMemberModal
					}
				/>
			)}
		</>
    )
}

export default Channels
