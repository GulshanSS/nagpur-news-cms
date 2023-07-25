import { useState } from "react";
import { useDeleteUserMutation } from "../../redux/api/userApi";
import Status from "../Status";
import ActionButton from "../ActionButton";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Modal from "../Modal";
import { User } from "../../redux/api/types";
import ViewUser from "./ViewUser";

type Props = {
  user: Pick<User, "id" | "email" | "name" | "active" | "verified">;
};

const UserCard = ({ user }: Props) => {
  const [close, setClose] = useState<boolean>(false);

  const [deleteUser] = useDeleteUserMutation();

  return (
    <>
      <div className="w-80 rounded-md bg-custom-50 border border-custom-600 text-custom-800 px-2.5 py-3 hover:cursor-pointer hover:shadow-lg transition-shadow ease-in-out duration-300">
        <h1 className="text-xl font-bold mb-2">{user.name}</h1>
        <h1 className="text-sm font-bold mb-6">{user.email}</h1>
        <div className="flex justify-between items-center">
          <div className="flex gap-1">
            <Status
              label="Active"
              colorVariant={user.active ? "green" : "slate"}
            />
            <Status
              label="Verified"
              colorVariant={user.verified ? "green" : "slate"}
            />
          </div>
          <div className="flex gap-1">
            <ActionButton
              onClick={() => setClose(true)}
              Icon={<FaEye />}
              color="slate"
            />
            <ActionButton
              onClick={() => deleteUser(user.id)}
              Icon={<MdDelete />}
              color="red"
            />
          </div>
        </div>
      </div>
      <Modal id="categoryDetails" close={close} setClose={setClose}>
        <ViewUser id={user.id} />
      </Modal>
    </>
  );
};

export default UserCard;
