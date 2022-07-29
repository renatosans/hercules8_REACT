import React from 'react'
import ReactDom from 'react-dom'
import ClubForm from './ClubForm'


export default function ClickableField({ rowId, label, parentRef }) {

	const handleClick = () => {
        const root = ReactDom.createRoot(document.getElementById('panel'));

        const clubForm = React.createElement(ClubForm, { rowId, parentRef }, null);
		root.render(clubForm);
	}

	return (
		<button onClick={handleClick} style={{ color: 'darkblue', background: 'none', border: 'none' }} >
			<b><u>{label}</u></b>
		</button>
	)
}
