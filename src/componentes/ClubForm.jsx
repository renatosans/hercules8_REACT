import axios from 'axios'
import { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { setApiDefaults, notification } from '../config/defaults'


export default function ClubForm({dialogRef}) {
	// const router = useRouter();

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
			if (!router.query.id) {
				await axios.post("/api/clubes", {
					...product,
				});
			} else {
				await axios.put("/api/clubes/" + router.query.id, {
					...product,
				});
			}
		} catch (error) {
			toast.error(error.message, notification.options);
			return;
		}

		router.push("/");
		toast.success('Clube salvo com sucesso', notification.options);
		dialogRef.toggle();
	};

	const onChange = (e) => {
		setProduct({
			...clube,
			[e.target.name]: e.target.value,
		});
	};

	useEffect(() => {
		const getClube = async (id) => {
			const { data: clube } = await axios.get("/api/clubes/" + id);
			setClube(clube);
		};

		if (router.query.id) {
			getClube(router.query.id);
		}

		setApiDefaults();
	}, []);

	return (
		<div>
			<Toaster />

			<form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
				<div className="mb-4">
					<label htmlFor="nome" className="block text-gray-700 text-sm font-bold md-2">
						Nome
					</label>
					<input type="text"
						name="nome"
						value={product.nome}
						className="shadow appearance  border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						onChange={onChange}
					/>
				</div>

				<div className="mb-4">
					<label htmlFor="preco" className="block text-gray-700 text-sm font-bold md-2">
						Preço
					</label>
					<input type="text"
						name="preco"
						value={product.preco}
						className="shadow appearance  border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						onChange={onChange}
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="descricao" className="block text-gray-700 text-sm font-bold md-2">
						Descrição
					</label>
					<textarea
						name="descricao"
						value={product.descricao}
						className="shadow appearance  border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						onChange={onChange} >
					</textarea>
				</div>
				<div className="mb-4">
					<label htmlFor="foto" className="block text-gray-700 text-sm font-bold md-2">
						Foto
					</label>
					<input type="text"						
						name="foto"
						value={product.foto}
						className="shadow appearance  border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						onChange={onChange}
					/>
				</div>
				<button type="submit" className="bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded focus:outline-none focus:shadow-outline text-white font-bold">
					Salvar
				</button>
			</form>
		</div>
	)
}
