export type User = {
  id: string;
  name: {
    firstName: string;
    lastName: string;
  };
  dob: Date;
  contact: {
    email: string;
    phone: string;
  };
  address: {
    houseNumber: string;
    street: string;
    suburb: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  account: string;
  role: {
    userType: string;
  };
};

export const emptyUser: User = {
  id: "",
  name: {
    firstName: "",
    lastName: "",
  },
  dob: new Date(),
  contact: {
    email: "",
    phone: "",
  },
  address: {
    houseNumber: "",
    street: "",
    suburb: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  },
  account: "",
  role: {
    userType: "",
  },
};

export type Course = {
  id: string;
  name: string;
  description: string;
  instructor: {
    name: {
      firstName: string;
      lastName: string;
    };
  };
  studentClasses: [
    {
      className: string;
    }
  ];
  classroom: string;
  courseSchedule: {
    dayOfWeek: string;
    courseDate: {
      startDate: string;
      endDate: string;
    };
    courseTime: {
      startTime: string;
      endTime: string;
    };
  };
};

export interface UserDeletedResponse {
  userDeleted: {
    message: string;
    errors: string[];
    results: {
      id: string;
      dob: string;
      account: string;
      name: {
        firstName: string;
        lastName: string;
      };
      role: {
        userType: string;
        userId: string;
      };
      address: {
        houseNumber: string;
        street: string;
        suburb: string;
        city: string;
        state: string;
        country: string;
        postalCode: string;
      };
      contact: {
        email: string;
        phone: string;
      };
    }[];
  };
}
