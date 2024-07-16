import { User, Course } from "@/types/displayList";
import { GridColDef } from "@mui/x-data-grid";

export const getRows = (pathName: string, data: any): any[] => {
  let rows: any[] = [];

  if (pathName === "/admin/users" || pathName === "/admin/users/search") {
    rows = data.map((user: User) => {
      const addressParts = [
        user.address.houseNumber,
        user.address.street,
        user.address.suburb,
        user.address.city,
        user.address.state,
        user.address.country,
        user.address.postalCode,
      ].filter(Boolean); // 过滤掉任何假值，例如空字符串或 null
      const dob = new Date(user.dob);
      const age = new Date().getFullYear() - dob.getFullYear();
      return {
        id: user.id,
        firstName: user.name.firstName,
        lastName: user.name.lastName,
        age: age,
        email: user.contact.email,
        phone: user.contact.phone,
        address: addressParts.join(", "),
        account: user.account,
        role: user.role.userType,
      };
    });
  }

  if (pathName === "/admin/courses") {
    rows = data.map((course: Course) => {
      const instructorFirstName = course?.instructor?.name?.firstName || "";
      const instructorLastName = course?.instructor?.name?.lastName || "";
      const instructorName = `${instructorFirstName} ${instructorLastName}`;

      return {
        id: course._id,
        name: course.name,
        description: course.description,
        instructor: instructorName,
        studentClasses: course?.studentClasses[0]?.className || "",
        classroom: course?.classroom || "",
        dayOfWeek: course?.courseSchedule?.dayOfWeek || "",
        startDate:
          course?.courseSchedule?.courseDate?.startDate.split("T")[0] || "",
        endDate:
          course?.courseSchedule?.courseDate?.endDate.split("T")[0] || "",
        startTime: course?.courseSchedule?.courseTime?.startTime || "",
        endTime: course?.courseSchedule?.courseTime?.endTime || "",
      };
    });
  }

  // console.log("rows:", rows);

  return rows;
};

export const getColumns = (pathName: string) => {
  const setColumns = (pathName: string) => {
    let columns: GridColDef[] = [];

    if (pathName === "/admin/users" || pathName === "/admin/users/search") {
      columns = [
        { field: "firstName", headerName: "First name", width: 100 },
        { field: "lastName", headerName: "Last name", width: 100 },
        {
          field: "age",
          headerName: "Age",
          type: "number",
          width: 80,
          renderCell: (params) => (
            <div style={{ textAlign: "center", width: "100%" }}>
              {params.value}
            </div>
          ),
        },
        {
          field: "fullName",
          headerName: "Full name",
          description: "This column has a value getter and is not sortable.",
          sortable: false,
          width: 130,
          valueGetter: (value, row) =>
            `${row.firstName || ""} ${row.lastName || ""}`,
        },
        {
          field: "account",
          headerName: "Account",
          width: 100,
        },
        {
          field: "role",
          headerName: "Role",
          width: 100,
        },
        {
          field: "email",
          headerName: "Email",
          width: 230,
        },
        {
          field: "phone",
          headerName: "Phone",
          width: 140,
        },
        {
          field: "address",
          headerName: "Address",
          width: 400,
        },
      ];
    }
    // console.log("columns:", columns);
    return columns;
  };

  return setColumns(pathName);
};

// if (pathName === "courses") {
//   columns = [
//     { field: "name", headerName: "Course Name", width: 150 },
//     { field: "instructor", headerName: "Instructor", width: 110 },
//     { field: "classroom", headerName: "Classroom", width: 100 },
//     { field: "dayOfWeek", headerName: "Week", width: 110 },
//     { field: "startDate", headerName: "Start Date", width: 100 },
//     { field: "endDate", headerName: "End Date", width: 100 },
//     { field: "startTime", headerName: "Start Time", width: 100 },
//     { field: "endTime", headerName: "End Time", width: 100 },
//     { field: "studentClasses", headerName: "Classes", width: 100 },
//     {
//       field: "description",
//       headerName: "Description",
//       width: 300,
//       renderCell: (params) => (
//         <div
//           style={{
//             whiteSpace: "normal",
//             wordBreak: "break-word",
//             display: "inline-block",
//             lineHeight: "1.5",
//           }}
//         >
//           {params.value}
//         </div>
//       ),
//     },
//   ];
// }
