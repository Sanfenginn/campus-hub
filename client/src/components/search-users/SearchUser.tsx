"use client";
import InputBox from "../common/InputBox";
import SelectBox from "../common/SelectBox";
import { useState } from "react";
import UsersList from "../common/DisplayList";
import EditUsersButtons from "./EditUsersButtons";

const SearchUsers: React.FC = () => {
  const [condition, setCondition] = useState("");
  const conditions = ["Role", "Name", "Account", "Dept/Class"];

  return (
    <div className="flex flex-col h-full w-full">
      <div className=" flex items-center ">
        <div className="">
          <SelectBox
            setConditionForInputBox={setCondition}
            conditions={conditions}
          />
        </div>
        <div className="ml-2 h-full flex-grow ">
          <InputBox condition={condition} />
        </div>
      </div>
      {/* <div className=" flex justify-end">
        <EditUsersButtons />
      </div>*/}
      <div className="w-full h-[500px] flex-grow overflow-scroll">
        <UsersList />
      </div>
    </div>
  );
};

export default SearchUsers;
