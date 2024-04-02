import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';
import { SettingsContext } from '../App';
import { useContext } from 'react';


import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const newRecord = { name: '', age: '', hospitalNumber: '', isNew: true };

    axios.post('http://localhost:8000/api/appointments/', newRecord)
      .then(response => {
        const newRecordWithId = response.data;
        setRows((oldRows) => [...oldRows, newRecordWithId]);
        setRowModesModel((oldModel) => ({
          ...oldModel,
          [newRecordWithId.id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }));
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  return (
    <GridToolbarContainer>
      {/* 
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
      */}
    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid() {
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const { checkedAppointmentDeletion, checkedAppointmentReschedule } = useContext(SettingsContext);

  useEffect(() => {
      axios.get('http://localhost:8000/api/appointments/')
        .then(response => {
          const dataWithHospitalNumber = response.data.map(item => ({
            ...item,
            hospitalNumber: item.patient.hospitalNumber
          }));
          setRows(dataWithHospitalNumber);
          console.log(dataWithHospitalNumber);
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
    }, []);

   const handleRowEditStop = (params, event) => {
      if (params.reason === GridRowEditStopReasons.rowFocusOut) {
        event.defaultMuiPrevented = true;
      }
    };

  const handleEditClick = (id) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

  const handleSaveClick = (id) => () => {
    const row = rows.find((row) => row.id === id);
    const confirmSave = window.confirm('Are you sure you want to edit this entry?');

    if (confirmSave) {
      const updatedRow = processRowUpdate(row);
      
      axios.put(`http://localhost:8000/api/appointments/${id}/`, updatedRow)
        .then(response => {
          setRows(prevRows => prevRows.map((row) => row.id === id ? response.data : row));
          setRowModesModel(prevRowModesModel => ({ ...prevRowModesModel, [id]: { mode: GridRowModes.View } }));
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
    }
  };

  const handleDeleteClick = (id) => () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this record?');
    if (confirmDelete) {
      axios.delete(`http://localhost:8000/api/appointments/${id}/`)
        .then(response => {
          setRows(rows.filter((row) => row.id !== id));
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
    }
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

  const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(prevRows => prevRows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    // { field: 'id', headerName: 'id', width: 180, editable: true },
    { field: 'appointmentNumber', headerName: 'Appointment Number', width: 180, editable: true },
    { field: 'label', headerName: 'Patient Name', width: 130, editable: true },
    { field: 'hospitalNumber', headerName: 'Hospital Number', width: 180, editable: true },
    /* { field: 'patient.nameMiddle', headerName: 'Middle Name', width: 130, editable: true },
    { field: 'patient.nameLast', headerName: 'Last Name', width: 130, editable: true },
    { field: 'patient.birthdate', headerName: 'Birthdate', width: 130, editable: true },
    { field: 'patient.age', headerName: 'Age', width: 90, editable: true },
    { field: 'patient.sex', headerName: 'Sex', width: 90, editable: true },
    { field: 'patient.civilStatus', headerName: 'Civil Status', width: 130, editable: true },
    { field: 'patient.hospitalNumber', headerName: 'Hospital Number', width: 180, editable: true },
    { field: 'patient.contact', headerName: 'Contact', width: 130, editable: true },
    { field: 'patient.email', headerName: 'Email', width: 200, editable: true },
    { field: 'patient.facebookName', headerName: 'Facebook Name', width: 200, editable: true },
    { field: 'patient.address', headerName: 'Address', width: 300, editable: true }, */
    { field: 'date', headerName: 'Date', width: 130, editable: true },
    { field: 'time', headerName: 'Time', width: 130, editable: true },
    { field: 'remarks', headerName: 'Remarks', width: 300, editable: true },
    { field: 'followup', headerName: 'Follow Up', width: 130, editable: true },
    { field: 'referralDoctor', headerName: 'Referral Doctor', width: 200, editable: true },
    { field: 'newPatient', headerName: 'New Patient', width: 130, editable: true },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',

      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        const actions = [
          <GridActionsCellItem
            icon={<SaveIcon />}
            label="Save"
            sx={{
              color: 'primary.main',
            }}
            onClick={handleSaveClick(id)}
          />,
        ];

        if (checkedAppointmentReschedule) {
          actions.push(
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={handleEditClick(id)}
              color="inherit"
            />
          );
        }

        if (checkedAppointmentDeletion) {
          actions.push(
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={handleDeleteClick(id)}
              color="inherit"
            />
          );
        }

        return actions;
      },
    },
  ];

  return (
    <><Box
      sx={{
        height: 600,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        isCellEditable={(params) => {
          if (params.field === 'id' || params.field === 'appointmentNumber') {
            return false;
          }
          if (!checkedAppointmentReschedule && (params.field === 'date' || params.field === 'time')) {
            return false;
          }
          return params.row.id !== 0;
        }}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }} />
    </Box>

    <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Arial', fontSize: '1.5rem', marginLeft: '20px', fontWeight: 'bold'}}>
        To edit a record:
      </Typography>
      <Typography variant="body2" sx={{ fontFamily: 'Arial', fontSize: '1.25rem', marginLeft: '20px'  }}>
        <ul>
          <li>Double click the field.</li>
          <li>Type in the changes.</li>
          <li> Repeat for all fields to edit. </li>
          <li>Hit enter.</li>
          <li>Click the pencil icon on the Actions column.</li>
          <li>Click the Save icon.</li>
        </ul>
      </Typography>

        
    </>
       
    
  );
}