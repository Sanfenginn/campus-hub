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

export type Course = {
  _id: string;
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
