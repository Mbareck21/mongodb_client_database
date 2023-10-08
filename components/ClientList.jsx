'use client';

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
	GridRowModes,
	DataGrid,
	GridToolbarContainer,
	GridActionsCellItem,
	GridRowEditStopReasons,
} from "@mui/x-data-grid";
import columns from './columns'
// import { useState } from "react";

const getClients = async () => {
	try {
		const res = await fetch("http://localhost:3000/api/clients", {
			cache: "no-store"
		})
		if (!res.ok) {
			throw new Error('Failed to fetch Data!')
		}
		return res.json()
	} catch (error) {
		console.log(error);
	}
}
export default function ClientsList() { // remove the async keyword
const [rows, setRows]= useState([])
	 

React.useEffect(() => {
  clientGetter(); // call the clientGetter function
}, []); // pass an empty dependency array to run only once

const clientGetter = async () => {
  // get the response from the api
  const response = await getClients();
  // initialize the clients variable to an empty array
  let clients = [];
  // check if the response has a clients property
  if (response) {
    // assign the clients property to the clients variable
    clients = response;
  }
  console.log(clients);
  // map over the clients array
  clients.map((c) => {
    return { ...c, id: c._id };
  });
  setRows(clients);
};
const getRowId = (row) => {
  return row._id;
};
	
	console.log(rows);
	return (
		<Box
			sx={{
				height: 500,
				width: "100%",
				"& .actions": {
					color: "text.secondary",
				},
				"& .textPrimary": {
					color: "text.primary",
				},
			}}>
			<DataGrid
				rows={rows}
				getRowId={getRowId}
				columns={columns()}
			
			/>
		</Box>
	);
}
