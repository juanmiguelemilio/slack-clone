import React from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';

const ChannelMemberModal = ({ getMembers, setToggleChannelMemberModal }) => {
	const arr = getMembers();
	const closeModal = () => {
		setToggleChannelMemberModal((t) => !t);
	};
	const navigate = useNavigate();
	const nav = (id) => {
		navigate(`/dashboard/messages/${id}`);
	};
	return ReactDOM.createPortal(
		<div className='channel-mem-container'>
			<div className='channel-mem-overflow'>
				<div className='channel-mem-inner'>
					<div className='channel-mem-header'>
						<h3>Channel Members</h3>
						<hr className='hr-line-channel'></hr>
					</div>
					<ul className='channel-mem-list'>
						{arr.map((user) => (
							<li
								key={user.id}
								className=''
								onClick={() => nav(user.id)}
							>
								{user.email}
							</li>
						))}
					</ul>
					<br></br>
					<div className=''>
						<button
							className=''
							onClick={closeModal}
						>
							Close
						</button>
					</div>
				</div>
			</div>
		</div>,
		document.getElementById('portal')
	);
};

export default ChannelMemberModal;
