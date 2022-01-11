import React, { useEffect, useState } from 'react';
import { FaAngleRight } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';

import { useAuth } from '../context/AuthContextProvider';

import { useChannels } from '../context/ChannelContextProvider';
import { useUsers } from '../context/UsersContextProvider';

import CustomLink from './CustomLink';

import User from './User'

const Sidebar = () => {
	const [channelToggle, setChannelToggle] = useState(false);
	const [msgToggle, setMsgToggle] = useState(false);
	const users = useUsers();
	const [search, setSearch] = useState('');
	const [filteredNames, setFilteredNames] = useState([]);

	const { state, dispatch } = useAuth();
	const logoutHandler = (e) => {
		e.preventDefault();
		dispatch({ type: 'LOGOUT' });
	};

	const { state: channelState } = useChannels();

	useEffect(() => {
		if (search === '') {
			setFilteredNames(users);
		} else {
			setFilteredNames(
				users.filter((user) => {
					return user.email.toLowerCase().includes(search);
				})
			);
		}
	}, [search, users]);

	return (
		<div className='sidebar-container'>
			<User />
			<div className='sidebar-div'>
				{/* <div className='user-div'>
					<i class="fas fa-user-circle fa-2x"></i>
					<span className=''>{state.user.email}</span>
					<button className='logout-btn' onClick={(e) => logoutHandler(e)}>Logout</button>
				</div>
				<div className=''>
					<hr className='' />
				</div> */}

				{/* DROPDOWN */}
				<div
					className='channel-div'
					onClick={() => setChannelToggle((t) => !t)}
				>
					<div>
						<i class="fas fa-satellite-dish"></i>
						<span className=''> Channels </span>
						<FaAngleRight />
					</div>
					<div
						className={`${
							channelToggle ? 'rotate-90' : ''
						} transition-transform p-2 hover:bg-slate-500`}
					>
						
						
					</div>
				</div>
				{channelToggle && (
					<ul className='channel-list'>
						{channelState.channels.map((channel) => (
							<div>
								<li
									key={channel.id}
									className=''
								>
									<CustomLink
										to={`/dashboard/channels/${channel.id}`}
									>
										{channel.name}
									</CustomLink>
								</li>
							</div>
						))}
						<CustomLink to=''>Add channels</CustomLink>
					</ul>
				)}

				<div
					className='direct-message-div'
					onClick={() => setMsgToggle((t) => !t)}
				>
					<div className=''>
						<i class="fas fa-comment-alt"></i>
						<span className=''> Direct Messages</span> <FaAngleRight />
					</div>
					<div
						className={`${
							msgToggle ? 'rotate-90' : ''
						} transition-all`}
					>
						
					</div>
				</div>
				{msgToggle && (
					<ul className=''>
						<input
							type='text'
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder='Search...'
							className='search-input'
						/>
						{filteredNames.map((user) => (
							<li
								key={user.id}
								className='user-list'
							>
								<CustomLink
									to={`/dashboard/messages/${user.id}`}
								>
									{user.email}
								</CustomLink>
							</li>
						))}
					</ul>
				)}
				{/* <div className='flex flex-col'>
					<Link to='/dashboard/messages/'>Send Message</Link>
				</div> */}
				
			</div>
		</div>
	);
};

export default Sidebar;
