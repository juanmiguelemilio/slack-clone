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
		<div className=''>
			<div className=''>
				<div className=''>
					<div className=''>
						Channel Members
					</div>
					<ul className=''>
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
