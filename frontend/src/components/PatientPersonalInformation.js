import React from "react";
import PatientNavs from "./PatientNavs";
import NavBar from "./PatientNavBar";
import { FormGroup, FormLabel, FormControl, FormSelect } from "react-bootstrap";
import "./PatientPersonalInformation.css";
import { useState, useEffect, useContext } from "react";
import Button from '@mui/material/Button';
import { PatientContext } from "../App";
import axios from 'axios';


const PatientPersonalInformation = () => {

	const { firstName, 
        middleName, 
        lastName,
        hospitalNumber,
        birthDate } = useContext(PatientContext);

		const [formValues, setFormValues] = useState({
			nameFirst: firstName,
			nameMiddle: middleName,
			nameLast: lastName,
			hospitalNumber: hospitalNumber,
			birthdate: birthDate,
			email: '',
			facebookName: '',
			contactNumber: '',
			address: '',
			sex: '',
			civilStatus: ''
		});

	useEffect(() => {
		setPersonalInformation();
	}, []);

	const setPersonalInformation = async () => {
		
		document.getElementById('nameFirst').value = firstName;
		document.getElementById('nameMiddle').value = middleName;
		document.getElementById('nameLast').value = lastName;
		document.getElementById('hospitalNumber').value = hospitalNumber;
		document.getElementById('birthdate').value = birthDate;

	}


	const retrievePersonalInformation = async () => {
		try {
			const response = await axios.get('http://localhost:8000/api/patients', {
				params: {
					nameFirst: formValues.nameFirst,
					nameMiddle: formValues.nameMiddle,
					nameLast: formValues.nameLast,
					hospitalNumber: formValues.hospitalNumber,
					birthdate: formValues.birthdate
				}
			});
	
			if (response.data.length > 0) {
				// If the response contains data, it means a patient with the given parameters was found.
				// You can now update the state with the retrieved data.
				const patientData = response.data[0];
				setFormValues({
					...formValues,
					email: patientData.email,
					facebookName: patientData.facebookName,
					contactNumber: patientData.contactNumber,
					address: patientData.address,
					sex: patientData.sex,
					civilStatus: patientData.civilStatus
				});
			} else {
				// If the response does not contain any data, it means no patient with the given parameters was found.
				console.log('No patient found with the given parameters.');
			}
		} catch (error) {
			console.error('Error retrieving patient information:', error);
		}
	};

	// Call the retrievePersonalInformation function when the component mounts.
	useEffect(() => {
		retrievePersonalInformation();
	}, []);


	// birthdate to age func
	const [birthdate, setBirthdate] = useState(null);
    const [age, setAge] = useState(null);

    useEffect(() => {
        if (birthdate) {
            const calculatedAge = calculateAge(birthdate);
            setAge(calculatedAge);
        }
    }, [birthdate]);

    const calculateAge = (birthdate) => {
        const today = new Date();
        const birthDate = new Date(birthdate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

	const handleSave = async () => {
	
	}
	
	return (
		<>
		<NavBar />
        <PatientNavs/>
		<div class = 'container'>
			<FormGroup> 

			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<div style={{ width: '45%' }}>
				<FormLabel>First Name</FormLabel>
				<FormControl id = 'nameFirst' type="text" readOnly value={formValues.nameFirst}/>

				<FormLabel>Middle Name</FormLabel>
				<FormControl id = 'nameMiddle' type="text" readOnly value={formValues.nameMiddle}/>

				<FormLabel>Last Name</FormLabel>
				<FormControl id = 'nameLast' type="text" readOnly value={formValues.nameLast}/>

				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<div style={{ width: '60%' }}>
						<FormLabel>Birthdate</FormLabel>
						<FormControl id='birthdate' type='date' readOnly value={formValues.birthdate} onChange={(e) => setBirthdate(e.target.value)} />
					</div>
					<div style={{ width: '35%' }}>
						<FormLabel>Age</FormLabel>
						<FormControl id='age' type='number' value={age} readOnly />
					</div>
				</div>

				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<div style={{ width: '45%' }}>
						<FormLabel>Sex</FormLabel>
						<FormControl as="select" id='sex'>
							<option value=''>Select...</option>
							<option value='MALE'>MALE</option>
							<option value='FEMALE'>FEMALE</option>
						</FormControl>
					</div>
					<div style={{ width: '45%' }}>
						<FormLabel>Civil Status</FormLabel>
						<FormControl as="select" id='civilStatus' value={formValues.civilStatus}>
							<option value=''>Select...</option>
							<option value='SINGLE'>SINGLE</option>
							<option value='MARRIED'>MARRIED</option>
							<option value='WIDOWED'>WIDOWED</option>
							<option value='SEPARATED'>SEPARATED</option>
						</FormControl>
					</div>
				</div>
				</div>
				<div style={{ width: '45%' }}>
					<FormLabel>Hospital Number</FormLabel>
					<FormControl id='hospitalNumber' type="number" readOnly value={formValues.hospitalNumber}/>

					<FormLabel>Email</FormLabel>
					<FormControl id='email' type="text" value={formValues.email}/>

					<FormLabel>Facebook Name</FormLabel>
					<FormControl id='facebookName' type="text" value={formValues.facebookName}/>

					<FormLabel>Contact No.</FormLabel>
					<FormControl id='contactNumber' type='number' value={formValues.contactNumber} style={{ 
						'-moz-appearance': 'textfield', 
						'appearance': 'textfield' 
					}} onWheel={(e) => e.preventDefault()} />
					<style jsx>{`
						input::-webkit-outer-spin-button,
						input::-webkit-inner-spin-button {
							-webkit-appearance: none;
							margin: 0;
					`}</style>
					<FormLabel>Address</FormLabel>
					<FormControl id='address' as='textarea' rows='3' value={formValues.address} />
				</div>
			</div>
				
			</FormGroup>
			<Button onclick = {handleSave} class = 'nav-buttons2' size = 'large'>SAVE CHANGES</Button>
		</div></>
	);
};

export default PatientPersonalInformation;
