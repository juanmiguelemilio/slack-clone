import React, { useEffect, useState, useRef } from 'react'
import { useAuth } from '../context/AuthContextProvider'
import { useUsers } from '../context/UsersContextProvider'
import { getChannelDetail } from '../api/slack-api';
import { useParams } from 'react-router-dom';

const Channels = () => {
    const params = useParams();
	const { state } = useAuth()
	const [channelData, setChannelData] = useState({})
	const users = useUsers()
	const [message, setMessage] = useState('')

    let spanRef = useRef();
	const inputRef = useRef();

    useEffect(() => {
		(async () => {
			const data = await getChannelDetail(state.headers, params.id);
			setChannelData(data);
		})();
		// inputRef.current.focus();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params.id, state.headers]);

    return (
        <div>
            <p><strong>Channels</strong></p>
            <p>Channel 1</p>
            <button>Add channel</button>
        </div>
    )
}

export default Channels
