import {
  TextField,
  Box,
  Typography,
  Paper,
  Autocomplete,
  Stack,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState, useEffect } from "react";
import getAddress from "../../../api/getAddress";
import Button from "@mui/material/Button";
import putUser from "@/app/api/putUser";
import getUsersData from "@/app/api/getUsersData";
import { useSelector, useDispatch } from "react-redux";
import { setUsersData } from "@/app/redux/usersData";
import { RootState } from "@/app/redux/store";
import getUsersDataById from "@/app/api/getUserDataById";

interface NewAddUserFormProps {
  handleClose: () => void;
}

const EditAddUserForm: React.FC<NewAddUserFormProps> = ({ handleClose }) => {
  const [role, setRole] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [inputValue, setInputValue] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [addressDetails, setAddressDetails] = useState<any>({});
  const [userData, setUserData] = useState<any>([]);
  const dispatch = useDispatch();
  const [selectedDataId, setSelectedDataId] = useState<string>("");

  const selectedDataInfo = useSelector(
    (state: RootState) => state.selectedDataInfo.selectedDataInfo
  );

  console.log("selectedDataInfo in Edit user form:", selectedDataInfo);

  useEffect(() => {
    if (selectedDataInfo.length > 0) {
      const selectedDataId = selectedDataInfo.map((data) => data._id);
      setSelectedDataId(selectedDataId[0]);
    }
  }, [selectedDataInfo]);

  console.log("selectedDataIds in edit:", selectedDataId);

  console.log("userData in edit:", userData);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await getUsersDataById(selectedDataId);
        console.log("response in edit:", response);
        setUserData(response);
      } catch (err) {
        console.error(err);
      }
    };
    getUserInfo();
  }, [selectedDataInfo, selectedDataId]);

  useEffect(() => {
    if (userData) {
      setRole(userData.message?.role?.userType || "");
      setFirstName(userData.message?.name?.firstName || "");
      setLastName(userData.message?.name?.lastName || "");
      setDob(
        userData.message?.dob
          ? new Date(userData.message.dob).toISOString().split("T")[0]
          : ""
      );
      setAccountNumber(userData.message?.account || "");
      setPhoneNumber(userData.message?.contact?.phone || "");
      setEmail(userData.message?.contact?.email || "");

      const addressArray = [
        userData.message?.address?.houseNumber || "",
        userData.message?.address?.street || "",
        userData.message?.address?.suburb || "",
        userData.message?.address?.city || "",
        userData.message?.address?.state || "",
        userData.message?.address?.country || "",
        userData.message?.address?.postalCode || "",
      ].filter(Boolean);

      // 需要确保 houseNumber 和后续部分之间没有多余的逗号，可以这样写：
      let formattedAddress = "";
      if (addressArray.length > 1) {
        formattedAddress = `${addressArray[0]} ${addressArray
          .slice(1)
          .join(", ")}`;
      } else if (addressArray.length === 1) {
        formattedAddress = addressArray[0];
      }

      setAddress(formattedAddress);
      setInputValue(formattedAddress);
    }
  }, [userData]);

  const handleRoleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value);
  };

  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleDobChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDob(event.target.value);
  };

  const handleAccountNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAccountNumber(event.target.value);
  };

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPhoneNumber(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleInputChange = async (
    event: React.SyntheticEvent,
    newInputValue: string
  ) => {
    setInputValue(newInputValue);
    setAddress(newInputValue); // 同步更新 address
    if (newInputValue) {
      setAddress(""); // 清空输入框的值
      setOptions([]); // 清空选项
      const addressData = await getAddress(newInputValue);
      const { formatted, addressDetails } = addressData;
      console.log("addressData: ", addressData);
      console.log("formatted: ", formatted);
      console.log("addressDetails: ", addressDetails);
      setOptions(formatted);
      setAddressDetails(addressDetails);
    } else {
      setOptions([]);
      setAddressDetails([]);
    }
  };

  //一旦 address 发生变化，就会重新获取地址信息
  useEffect(() => {
    const fetchAddress = async () => {
      if (address) {
        const addressData = await getAddress(address);
        const { formatted, addressDetails } = addressData;
        setOptions(formatted);
        setAddressDetails(addressDetails);
      }
    };
    fetchAddress();
  }, [address]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newUser = {
      name: {
        firstName: firstName,
        lastName: lastName,
      },
      dob: dob.split("T")[0],
      account: accountNumber,
      role: {
        userType: role,
      },
      contact: {
        phone: phoneNumber,
        email: email,
      },
      address: {
        houseNumber: addressDetails.housenumber
          ? addressDetails.housenumber
          : undefined,
        street: addressDetails.street
          ? addressDetails.street.charAt(0).toUpperCase() +
            addressDetails.street.slice(1)
          : undefined,
        suburb: addressDetails.suburb
          ? addressDetails.suburb.charAt(0).toUpperCase() +
            addressDetails.suburb.slice(1)
          : undefined,
        city: addressDetails.city
          ? addressDetails.city.charAt(0).toUpperCase() +
            addressDetails.city.slice(1)
          : undefined,
        state: addressDetails.state
          ? addressDetails.state.toUpperCase()
          : undefined,
        country: addressDetails.country
          ? addressDetails.country.charAt(0).toUpperCase() +
            addressDetails.country.slice(1)
          : undefined,
        postalCode: addressDetails.postcode
          ? addressDetails.postcode
          : undefined,
      },
    };
    try {
      await putUser(selectedDataId, newUser);
      const response = await getUsersData({
        condition: "All Users",
        inputValue: "",
      });
      dispatch(setUsersData(response?.data?.message ?? []));
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { width: "100%" },
      }}
      className="w-[60rem]"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Basic Information
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
          <TextField
            id="outlined-read-only-input"
            required
            label="First Name"
            variant="outlined"
            fullWidth
            onChange={handleFirstNameChange}
            value={firstName}
            InputProps={{
              readOnly: true,
              sx: {
                backgroundColor: "#fff9c4", // 只读时的背景颜色
              },
            }}
          />
          <TextField
            id="outlined-read-only-input"
            required
            label="Last Name"
            variant="outlined"
            fullWidth
            onChange={handleLastNameChange}
            value={lastName}
            InputProps={{
              readOnly: true,
              sx: {
                backgroundColor: "#fff9c4",
              },
            }}
          />
          <TextField
            required
            label="Date of Birth"
            type="date"
            variant="outlined"
            onChange={handleDobChange}
            value={dob}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Account Information
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
          <Box className="flex items-center" sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={role}
                label="Role"
                onChange={handleRoleChange}
                inputProps={{
                  readOnly: true,
                  sx: {
                    backgroundColor: "#fff9c4",
                  },
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"student"}>Student</MenuItem>
                <MenuItem value={"teacher"}>Teacher</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <TextField
            required
            label="Account Number"
            variant="outlined"
            fullWidth
            onChange={handleAccountNumberChange}
            value={accountNumber}
            InputProps={{
              readOnly: true,
              sx: {
                backgroundColor: "#fff9c4",
              },
            }}
          />
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Contact Information
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
          }}
        >
          <TextField
            required
            helperText="Starts with 0 or +61"
            label="Phone Number"
            variant="outlined"
            fullWidth
            onChange={handlePhoneNumberChange}
            value={phoneNumber}
          />
          <TextField
            required
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            onChange={handleEmailChange}
            value={email}
          />
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Address Information
        </Typography>
        <Box className="flex items-center justify-center gap-2">
          <Stack spacing={2} sx={{ width: "100%" }}>
            <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              fullWidth
              options={options}
              inputValue={inputValue}
              value={address}
              onInputChange={handleInputChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search Address or Postal Code"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                  fullWidth
                  value={address}
                />
              )}
            />
          </Stack>
        </Box>
      </Paper>
      <Box className="flex gap-4 justify-end" sx={{ "& button": { m: 1 } }}>
        <Button variant="contained" size="medium" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" size="medium" type="submit">
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default EditAddUserForm;
