import React from 'react'
import { useAuth } from '../context/AuthContextProvider';

const User = () => {
    const { state, dispatch } = useAuth();
	const logoutHandler = (e) => {
		e.preventDefault();
		dispatch({ type: 'LOGOUT' });
	};

    return (
        <div>
            <div className='user-div'>
				{/* <button className='nav-btn' onClick={toggleDisplaySidebar}>⏎</button> */}
				<i class="fas fa-user-circle fa-2x"></i>
				<span className='email-user-div'>{state.user.email}</span>
				<button className='logout-btn' onClick={(e) => logoutHandler(e)}>Logout</button>
			</div>
        </div>
    )
}

export default User
