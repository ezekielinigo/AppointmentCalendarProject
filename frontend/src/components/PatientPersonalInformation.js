import React from "react";
import PatientTable from "./PatientTable";
import PatientNavs from "./PatientNavs";
import NavBar from "./PatientNavBar";
import { FormGroup, FormLabel, FormControl, FormSelect } from "react-bootstrap";
import "./PatientPersonalInformation.css";
import { Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";

const PatientPersonalInformation = () => {

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

	return (
		<>
		<NavBar />
        <PatientNavs/>
		<div class = 'container'>
			<FormGroup> 

			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<div style={{ width: '45%' }}>
				<FormLabel>First Name</FormLabel>
				<FormControl id = 'nameFirst' type="text" readOnly/>

				<FormLabel>Middle Name</FormLabel>
				<FormControl id = 'nameMiddle' type="text" readOnly/>

				<FormLabel>Last Name</FormLabel>
				<FormControl id = 'nameLast' type="text" readOnly/>

				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<div style={{ width: '60%' }}>
						<FormLabel>Birthdate</FormLabel>
						<FormControl id='birthdate' type='date' readOnly onChange={(e) => setBirthdate(e.target.value)} />
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
						<FormControl as="select" id='civilStatus'>
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
					<FormControl id='hospitalNumber' type="number" readOnly/>

					<FormLabel>Email</FormLabel>
					<FormControl id='email' type="text" />

					<FormLabel>Facebook Name</FormLabel>
					<FormControl id='facebookName' type="text" />

					<FormLabel>Contact No.</FormLabel>
					<FormControl id='contactNumber' type='number' style={{ 
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
					<FormControl id='address' as='textarea' rows='3' />
				</div>
			</div>
				
			</FormGroup>
		</div></>
	);
};

export default PatientPersonalInformation;
