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
import { Typography, AppBar, Toolbar } from '@mui/material';
import { SettingsContext } from '../App';
import { useContext } from 'react';
import { Select, MenuItem } from '@mui/material';

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
    const newRecord = { 
      nameFirst: 'First Name', 
      nameMiddle: 'Middle Name', 
      nameLast: 'Last Name', 
      birthdate: new Date().toISOString().split('T')[0], 
      sex: 'MALE', 
      civilStatus: 'SINGLE', 
      hospitalNumber: '', 
      contact: '', 
      email: 'tempmail@temp.com', 
      facebookName: 'Facebook Name', 
      address: 'Address'
    };

    /*console.log(
      'First Name:', newRecord.nameFirst,
      'Middle Name:', newRecord.nameMiddle,
      'Last Name:', newRecord.nameLast,
      'Birthdate:', newRecord.birthdate,
      'Sex:', newRecord.sex,
      'Civil Status:', newRecord.civilStatus,
      'Hospital Number:', newRecord.hospitalNumber,
      'Contact:', newRecord.contact,
      'Email:', newRecord.email,
      'Facebook Name:', newRecord.facebookName,
      'Address:', newRecord.address
    ); */ // used for debugging
    
    axios.post('http://localhost:8000/api/patients/', newRecord)
      .then(response => {
        const newRecordWithId = response.data;
        setRows((oldRows) => [...oldRows, newRecordWithId]);
        setRowModesModel((oldModel) => ({
          ...oldModel,
          [newRecordWithId.id]: { mode: GridRowModes.Edit, fieldToFocus: 'nameFirst' },
        }));
      })
      .catch(error => {
        console.error(error.response.data); 
        console.error('There was an error!', error);
      }); 

  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

function SexDropdown(props) {
  const [value, setValue] = useState(props.value);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  if (!props.isEditable) {
    return value;
  }

  return (
    <Select value={value} onChange={handleChange}>
      <MenuItem value="MALE">MALE</MenuItem>
      <MenuItem value="FEMALE">FEMALE</MenuItem>
    </Select>
  );
}

function CivilStatusDropdown(props) {
  const [value, setValue] = useState(props.value);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Select value={value} onChange={handleChange}>
      <MenuItem value="SINGLE">SINGLE</MenuItem>
      <MenuItem value="MARRIED">MARRIED</MenuItem>
      <MenuItem value="WIDOWED">WIDOWED</MenuItem>
      <MenuItem value="SEPARATED">SEPARATED</MenuItem>
    </Select>
  );
}

export default function FullFeaturedCrudGrid() {
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [originalRows, setOriginalRows] = useState([]);
  const { checkedPatientDeletion } = useContext(SettingsContext);

  useEffect(() => {
    axios.get('http://localhost:8000/api/patients/')
      .then(response => {
        setRows(response.data);
        console.log(response.data);
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
    setOriginalRows(prevRows => [...prevRows, rows.find((row) => row.id === id)]);
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const fetchPatients = () => {
    axios.get('http://localhost:8000/api/patients/')
      .then(response => {
        setRows(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };
  
  useEffect(() => {
    fetchPatients();
  }, []);

  const handleSaveClick = (id) => () => {
    const row = rows.find((row) => row.id === id);
    const confirmSave = window.confirm('Are you sure you want to edit this entry?');

    if (confirmSave) {
      const updatedRow = processRowUpdate(row);
      
      axios.put(`http://localhost:8000/api/patients/${id}/`, updatedRow)
        .then(response => {
          setRows(prevRows => prevRows.map((row) => row.id === id ? response.data : row));
          setRowModesModel(prevRowModesModel => ({ ...prevRowModesModel, [id]: { mode: GridRowModes.View } }));
          fetchPatients();
        })
        .catch(error => {

          console.error(error.request.response.substr(2, 8));

          if (error.request.response.substr(2, 7) === 'contact') {
            alert('Entry not edited. Contact number must be 11 digits long.');
          }

          else if (error.request.response.substr(2, 5) === 'email') {
            alert('Entry not edited. Please ensure proper email format.');
          }

          else if (error.request.response.substr(2, 9) === 'birthdate') {
            alert('Entry not edited. Please ensure proper birthdate format.');
          }

          setRowModesModel(prevRowModesModel => ({ ...prevRowModesModel, [id]: { mode: GridRowModes.View } }));
          fetchPatients();
          console.error('There was an error!', error);
        });
    }
  };

  const handleDeleteClick = (id) => () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this record?');
    if (confirmDelete) {
      axios.delete(`http://localhost:8000/api/patients/${id}/`)
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

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
      sticky: true,

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
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
        ];

        if (checkedPatientDeletion) {
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
    
    
    { field: 'id', headerName: 'ID', width: 90, editable: false},
    { field: 'nameFirst', headerName: 'First Name', width: 130, editable: true },
    { field: 'nameMiddle', headerName: 'Middle Name', width: 130, editable: true },
    { field: 'nameLast', headerName: 'Last Name', width: 130, editable: true },
    { field: 'birthdate', headerName: 'Birthdate', width: 130, editable: true },
    { field: 'age', headerName: 'Age', width: 90, editable: false },
    /*{
      field: 'sex',
      headerName: 'Sex',
      width: 90,
      editable: true,
      renderCell: (params) => <SexDropdown value={params.value} isEditable={params.isEditable} />,
    },
    {
      field: 'civilStatus',
      headerName: 'Civil Status',
      width: 130,
      editable: true,
      renderCell: (params) => <CivilStatusDropdown value={params.value} />,
    }, */
    {
      field: 'sex',
      headerName: 'Sex',
      width: 90,
      editable: true,
    },
    {
      field: 'civilStatus',
      headerName: 'Civil Status',
      width: 130,
      editable: true,
    },
    { field: 'hospitalNumber', headerName: 'Hospital Number', width: 180, editable: true },
    { field: 'contact', headerName: 'Contact', width: 130, editable: true },
    { field: 'email', headerName: 'Email', width: 200, editable: true },
    { field: 'facebookName', headerName: 'Facebook Name', width: 200, editable: true },
    { field: 'address', headerName: 'Address', width: 300, editable: true }, 
  ];

  return (
    <>
    
    <Box
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
        isCellEditable={(params) => params.row.id !== 0}
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