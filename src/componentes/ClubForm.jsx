import { Dialog } from '@mui/material'
import { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { api, notification } from '../config/defaults'


export default function ClubForm({id, parentRef}) {
	const [open, setOpen] = useState(true);

	const close = () => {
		setOpen(false);
	}

	const [clube, setClube] = useState({
        "pais": "",
        "nome": "",
        "email": "",
        "telefone": "",
        "fax": "",
        "imagem": ""
	})

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (clube.nome === "" || clube.email === "" || clube.telefone === "") {
			toast.error('Alguns campos obrigatórios não foram preenchidos!', notification.options);
			return;
		}

		try {
			if (id === undefined) {
				await api.post("/clubes", {
					...clube,
				})
			} else {
				await api.put("/clubes/" + id, {
					...clube,
				})
			}
		} catch (error) {
			toast.error(error.message, notification.options);
			return;
		}

		toast.success('Clube salvo com sucesso', notification.options);
		parentRef.getClubes(); // Refresh da lista de clubes
		close();
	}

	const onChange = (e) => {
		setClube({
			...clube,
			[e.target.name]: e.target.value,
		});
	};

	useEffect(() => {
		const getClube = async (id) => {
			const { data: clube } = await api.get("/clubes/" + id);
			setClube(clube);
		};

		if (id !== undefined) getClube(id);
	}, []);

	return (
	<>
		<Toaster />

		<Dialog open={open} onClose={close} >
			<form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
				<div className="mb-4">
					<label htmlFor="nome" className="block text-gray-700 text-sm font-bold md-2">
						Nome
					</label>
					<input type="text"
						name="nome"
						value={clube.nome}
						className="shadow appearance  border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						onChange={onChange}
					/>
				</div>

				<div className="mb-4">
					<label htmlFor="email" className="block text-gray-700 text-sm font-bold md-2">
						E-mail
					</label>
					<input type="text"
						name="email"
						value={clube.email}
						className="shadow appearance  border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						onChange={onChange}
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="telefone" className="block text-gray-700 text-sm font-bold md-2">
						Telefone
					</label>
					<textarea
						name="telefone"
						value={clube.telefone}
						className="shadow appearance  border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						onChange={onChange} >
					</textarea>
				</div>
				<div className="mb-4">
					<label htmlFor="imagem" className="block text-gray-700 text-sm font-bold md-2">
						Imagem
					</label>
					<input type="text"
						name="imagem"
						value={clube.imagem}
						className="shadow appearance  border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						onChange={onChange}
					/>
				</div>
				<button type="submit" className="bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded focus:outline-none focus:shadow-outline text-white font-bold">
					Salvar
				</button>
			</form>
		</Dialog>
	</>
	)
}
