import ReactDom from 'react-dom';
import React, { useState, useEffect } from 'react';
// import { navigation } from '@react-navigation/web';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import toast, { Toaster } from "react-hot-toast";
import { api, notification } from '../config/defaults'
import ClubForm from './ClubForm';
import ClickableField from './ClickableField';
import ConfirmationDialog from './ConfirmationDialog';


export default function ClubList({ clubs, navigation }) {

    const columns = [
		{ field: 'id', headerName: 'id', width: 80 },
		{ field: 'pais', headerName: 'País', width: 120 },
		{ field: 'nome', headerName: 'Nome', width: 120, renderCell: (params) => 
			<ClickableField route={`/clubes/?id=${params.row.id}`} label={params.row.nome} dialogRef={{ open, setOpen }}></ClickableField> },
		{ field: 'email', headerName: 'E-mail', width: 120 },
		{ field: 'telefone', headerName: 'Telefone', width: 80 },
		{ field: 'fax', headerName: 'Fax', width: 80 },
		{ field: 'imagem', headerName: 'Imagem', width: 80 }
	]

	const [open, setOpen] = useState(false);

	function insertClub() {
		navigation.navigate('/')
		    .then(() => { setOpen(true) } )
		    .catch((error) => { toast.error(error.message) } )
	}

    const toggle = () => {
		// limpa a seleção e muda o estado do dialogo
		setSelectionModel([]);
        setOpen(current => !current);
    }

	const [selectionModel, setSelectionModel] = useState([]);

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
				.then(() => { navigation.navigate('/') } )
				.catch((error) => { toast.error(error.message) })
		}		
	}

	return (
		<>
            <Toaster />

            <Dialog open={open} onClose={toggle} >
                <ClubForm dialogRef={{ toggle }} />
			</Dialog>

			<Button variant="outlined" startIcon={<DeleteIcon />} onClick={deleteClub} >Excluir</Button>
			<Button variant="outlined" startIcon={<AddCircleIcon />} onClick={insertClub} >Novo</Button>

			<DataGrid columns={columns} rows={clubs} pageSize={5} rowsPerPageOptions={[5]} checkboxSelection
                onSelectionModelChange={setSelectionModel} selectionModel={selectionModel} />
		</>
	)
}
