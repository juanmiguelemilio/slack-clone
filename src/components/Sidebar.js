import React, { useEffect, useState } from 'react';
import { FaAngleRight } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';

import { useAuth } from '../context/AuthContextProvider';

import { useChannels } from '../context/ChannelContextProvider';
import { useUsers } from '../context/UsersContextProvider';

import CustomLink from './CustomLink';

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
		<div className=''>
			<div className=''>
				<div>
					<span className=''>{state.user.email}</span>
					<button className='logout-btn' onClick={(e) => logoutHandler(e)}>Logout</button>
				</div>
				<div className=''>
					<hr className='' />
				</div>

				<div className=''>
					<CustomLink to=''>Create Channel</CustomLink>
				</div>
				{/* DROPDOWN */}
				<div
					className=''
					onClick={() => setChannelToggle((t) => !t)}
				>
					<div>
						<span className=''>Channels</span>
					</div>
					<div
						className={`${
							channelToggle ? 'rotate-90' : ''
						} transition-transform p-2 hover:bg-slate-500`}
					>
						<FaAngleRight />
					</div>
				</div>
				{channelToggle && (
					<ul className=''>
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
					</ul>
				)}

				<div
					className=''
					onClick={() => setMsgToggle((t) => !t)}
				>
					<div>
						<span className=''>Direct Messages</span>
					</div>
					<div
						className={`${
							msgToggle ? 'rotate-90' : ''
						} transition-all`}
					>
						<FaAngleRight />
					</div>
				</div>
				{msgToggle && (
					<ul className=''>
						<input
							type='text'
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder='Search...'
							className='input'
						/>
						{filteredNames.map((user) => (
							<li
								key={user.id}
								className=''
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
