// import {
//   TextField,
//   Box,
//   Typography,
//   Paper,
//   Autocomplete,
//   Stack,
// } from "@mui/material";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select, { SelectChangeEvent } from "@mui/material/Select";
// import { useState } from "react";
// import getAddress from "../../../api/getAddress";
// import Button from "@mui/material/Button";
// import postUser from "../../../api/postUser";
// import getUsersData from "@/app/api/getUsersData";
// import { useDispatch } from "react-redux";
// import { setUsersData } from "@/app/redux/usersData";

// interface NewAddUserFormProps {
//   handleClose: () => void;
// }

// const NewAddUserForm: React.FC<NewAddUserFormProps> = ({ handleClose }) => {
//   const [role, setRole] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [dob, setDob] = useState("");
//   const [accountNumber, setAccountNumber] = useState("");
//   const [password, setPassword] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [email, setEmail] = useState("");
//   const [address, setAddress] = useState("");
//   const [inputValue, setInputValue] = useState<string>("");
//   const [options, setOptions] = useState<string[]>([]);
//   const [addressDetails, setAddressDetails] = useState<any>({});
//   const dispatch = useDispatch();

//   const handleRoleChange = (event: SelectChangeEvent) => {
//     setRole(event.target.value);
//   };

//   const handleFirstNameChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setFirstName(event.target.value);
//   };

//   const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setLastName(event.target.value);
//   };

//   const handleDobChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setDob(event.target.value);
//   };

//   const handleAccountNumberChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setAccountNumber(event.target.value);
//   };

//   const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setPassword(event.target.value);
//   };

//   const handlePhoneNumberChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setPhoneNumber(event.target.value);
//   };

//   const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setEmail(event.target.value);
//   };

//   const handleInputChange = async (
//     event: React.SyntheticEvent,
//     newInputValue: string
//   ) => {
//     setInputValue(newInputValue);

//     if (newInputValue) {
//       const addressData = await getAddress(newInputValue);
//       const { formatted, addressDetails } = addressData;
//       console.log("addressData: ", addressData);
//       console.log("formatted: ", formatted);
//       console.log("addressDetails: ", addressDetails);
//       setOptions(formatted);
//       setAddressDetails(addressDetails);
//     } else {
//       setOptions([]);
//       setAddressDetails([]);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const newUser = [
//       {
//         name: {
//           firstName: firstName,
//           lastName: lastName,
//         },
//         dob: dob.split("T")[0],
//         account: accountNumber,
//         password: password,
//         role: {
//           userType: role,
//         },
//         contact: {
//           phone: phoneNumber,
//           email: email,
//         },
//         address: {
//           houseNumber: addressDetails.housenumber
//             ? addressDetails.housenumber
//             : undefined,
//           street: addressDetails.street
//             ? addressDetails.street.charAt(0).toUpperCase() +
//               addressDetails.street.slice(1)
//             : undefined,
//           suburb: addressDetails.suburb
//             ? addressDetails.suburb.charAt(0).toUpperCase() +
//               addressDetails.suburb.slice(1)
//             : undefined,
//           city: addressDetails.city
//             ? addressDetails.city.charAt(0).toUpperCase() +
//               addressDetails.city.slice(1)
//             : undefined,
//           state: addressDetails.state
//             ? addressDetails.state.toUpperCase()
//             : undefined,
//           country: addressDetails.country
//             ? addressDetails.country.charAt(0).toUpperCase() +
//               addressDetails.country.slice(1)
//             : undefined,
//           postalCode: addressDetails.postcode
//             ? addressDetails.postcode
//             : undefined,
//         },
//       },
//     ];
//     try {
//       await postUser(newUser);
//       const response = await getUsersData({
//         condition: "All Users",
//         inputValue: "",
//       });
//       dispatch(setUsersData(response?.data?.message ?? []));
//       handleClose();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <Box
//       component="form"
//       sx={{
//         "& .MuiTextField-root": { width: "100%" },
//       }}
//       className="w-[60rem]"
//       noValidate
//       autoComplete="off"
//       onSubmit={handleSubmit}
//     >
//       <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
//         <Typography variant="h6" gutterBottom>
//           Basic Information
//         </Typography>
//         <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
//           <TextField
//             id="outlined-read-only-input"
//             required
//             label="First Name"
//             variant="outlined"
//             fullWidth
//             onChange={handleFirstNameChange}
//             value={firstName}
//             InputProps={{
//               readOnly: false,
//             }}
//           />
//           <TextField
//             id="outlined-read-only-input"
//             required
//             label="Last Name"
//             variant="outlined"
//             fullWidth
//             onChange={handleLastNameChange}
//             value={lastName}
//             InputProps={{
//               readOnly: false,
//             }}
//           />
//           <TextField
//             required
//             label="Date of Birth"
//             type="date"
//             variant="outlined"
//             onChange={handleDobChange}
//             value={dob}
//             InputLabelProps={{
//               shrink: true,
//             }}
//             fullWidth
//           />
//         </Box>
//       </Paper>

//       <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
//         <Typography variant="h6" gutterBottom>
//           Account Information
//         </Typography>
//         <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
//           <Box className="flex items-center" sx={{ minWidth: 120 }}>
//             <FormControl fullWidth>
//               <InputLabel id="demo-simple-select-label">Role</InputLabel>
//               <Select
//                 required
//                 labelId="demo-simple-select-label"
//                 id="demo-simple-select"
//                 value={role}
//                 label="Role"
//                 onChange={handleRoleChange}
//               >
//                 <MenuItem value="">
//                   <em>None</em>
//                 </MenuItem>
//                 <MenuItem value={"student"}>Student</MenuItem>
//                 <MenuItem value={"teacher"}>Teacher</MenuItem>
//               </Select>
//             </FormControl>
//           </Box>

//           <TextField
//             required
//             label="Account Number"
//             variant="outlined"
//             fullWidth
//             onChange={handleAccountNumberChange}
//             value={accountNumber}
//           />
//           <TextField
//             required
//             id="outlined-password-input"
//             label="Password"
//             type="password"
//             autoComplete="current-password"
//             variant="outlined"
//             onChange={handlePasswordChange}
//             value={password}
//           />
//         </Box>
//       </Paper>

//       <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
//         <Typography variant="h6" gutterBottom>
//           Contact Information
//         </Typography>
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "row",
//             gap: 2,
//           }}
//         >
//           <TextField
//             required
//             helperText="Starts with 0 or +61"
//             label="Phone Number"
//             variant="outlined"
//             fullWidth
//             onChange={handlePhoneNumberChange}
//             value={phoneNumber}
//           />
//           <TextField
//             required
//             label="Email"
//             type="email"
//             variant="outlined"
//             fullWidth
//             onChange={handleEmailChange}
//             value={email}
//           />
//         </Box>
//       </Paper>

//       <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
//         <Typography variant="h6" gutterBottom>
//           Address Information
//         </Typography>
//         <Box className="flex items-center justify-center gap-2">
//           <Stack spacing={2} sx={{ width: "100%" }}>
//             <Autocomplete
//               freeSolo
//               id="free-solo-2-demo"
//               disableClearable
//               fullWidth
//               options={options}
//               inputValue={inputValue}
//               onInputChange={handleInputChange}
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   label="Search Address or Postal Code"
//                   InputProps={{
//                     ...params.InputProps,
//                     type: "search",
//                   }}
//                   fullWidth
//                   // onChange={handleAddressChange}
//                   value={address}
//                 />
//               )}
//             />
//           </Stack>
//         </Box>
//       </Paper>
//       <Box className="flex gap-4 justify-end" sx={{ "& button": { m: 1 } }}>
//         <Button variant="contained" size="medium" onClick={handleClose}>
//           Cancel
//         </Button>
//         <Button variant="contained" size="medium" type="submit">
//           Submit
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default NewAddUserForm;
