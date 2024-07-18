// import { TextField, TextFieldProps } from "@mui/material";

// const CustomTextField: React.FC<TextFieldProps> = (props) => {
//   return <TextField margin="normal" required fullWidth {...props} />;
// };

// export default CustomTextField;

import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

const CustomTextField: React.FC<TextFieldProps> = (props) => {
  const { InputProps, ...rest } = props;

  return (
    <TextField
      margin="normal"
      required
      fullWidth
      InputProps={{
        ...InputProps,
        readOnly: InputProps?.readOnly ?? false,
        sx: {
          ...(InputProps?.sx || {}),
          backgroundColor: InputProps?.readOnly ? "#fff9c4" : undefined, // 只读时的背景颜色
        },
      }}
      {...rest}
    />
  );
};

export default CustomTextField;
