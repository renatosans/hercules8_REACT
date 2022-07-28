import { useState } from 'react';


export default function ClickableField({ route, label, dialogRef }) {
	// const router = useRouter();

	const handleClick = () => {
		router.push(route, undefined, { shallow: true })
		    .then(() => { dialogRef.setOpen(true) } )
			.catch((error) => { throw new Error('Erro ao definir rota' + error.message) } );
	}

	return (
		<button onClick={handleClick} style={{ color: 'darkblue', background: 'none', border: 'none' }} >
			<b><u>{label}</u></b>
		</button>
	)
}
