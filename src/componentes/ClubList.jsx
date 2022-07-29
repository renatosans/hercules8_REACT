import axios from 'axios';
import ReactDom from 'react-dom';
import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import toast, { Toaster } from "react-hot-toast";
import { api, notification } from '../config/defaults'
import ClubForm from './ClubForm';
import ClickableField from './ClickableField';
import ConfirmationDialog from './ConfirmationDialog';


export default function ClubList() {

	const [clubes, setClubes] = useState([]);

	const getClubes = async () => {
	  const { data: clubes } = await api.get('/clubes')  //  axios.get('./mock_data/clubes.json')
	  setClubes(clubes)
	}
  
	useEffect(() => {
	  getClubes();
	}, []);
  
    const columns = [
		{ field: 'id', headerName: 'id', width: 80 },
		{ field: 'pais', headerName: 'País', width: 120 },
		{ field: 'nome', headerName: 'Nome', width: 120, renderCell: (params) => 
			<ClickableField rowId={params.row.id} label={params.row.nome} parentRef={{ getClubes }}></ClickableField> },
		{ field: 'email', headerName: 'E-mail', width: 120 },
		{ field: 'telefone', headerName: 'Telefone', width: 80 },
		{ field: 'fax', headerName: 'Fax', width: 80 },
		{ field: 'imagem', headerName: 'Imagem', width: 80 }
	]

	function insertClub() {
        const root = ReactDom.createRoot(document.getElementById('panel'));

        const clubForm = React.createElement(ClubForm, {id: undefined, parentRef: { getClubes } }, null);
		root.render(clubForm);
	}

	function deleteClub() {
		const root = ReactDom.createRoot(document.getElementById('panel'));

		if (selectionModel.length < 1){
            toast.error("Favor selecionar os registros para exclusão.", notification.options);
            return;
		}

		const message = 'Deseja realmente excluir estes registros ?';
        const confirmationDialog = React.createElement(ConfirmationDialog, {message, handleResult}, null);
		root.render(confirmationDialog);
	}

	const handleResult = (result) => {
        // apos confirmação exlcui os registros
		if (result) {
			const promises = selectionModel.map(async (id) => { await api.delete(`/clubes/${id}`) } );
			Promise.all(promises)
				.then(() => { getClubes() } )  // Refresh da lista de clubes
				.catch((error) => { toast.error(error.message) })
		}		
	}

	const [selectionModel, setSelectionModel] = useState([]);

	return (
		<>
            <Toaster />

			<Button variant="outlined" startIcon={<DeleteIcon />} onClick={deleteClub} >Excluir</Button>
			<Button variant="outlined" startIcon={<AddCircleIcon />} onClick={insertClub} >Novo</Button>

			<DataGrid columns={columns} rows={clubes} pageSize={5} rowsPerPageOptions={[5]} checkboxSelection
                onSelectionModelChange={setSelectionModel} selectionModel={selectionModel} />
		</>
	)
}
