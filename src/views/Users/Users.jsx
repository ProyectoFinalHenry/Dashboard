import NavigationBar from "../../components/NavBar/NavigationBar";
import TableUserBan from "../../components/TableUserBan/TableUserBan";
import { useState, useEffect } from "react";
import BreadCum from "../../components/BreadCum/BreadCum";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const breadcumItems = ['Usuarios'];
  async function getUsers() {
    try {
      const { data } = await axios.get("http://localhost:3001/management/user");
      setUsers(data);
    } catch (error) {
      console.error("Error al obtener la lista de usuarios", error);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);



  const columns = [
    {
      key: "name",
      label: "NOMBRE DE USUARIO",
    },
    {
      key: "email",
      label: "EMAIL",
    },
    {
      key: "isActive",
      label: "ESTADO",
    },
    {
      key: "actions",
      label: "ACCIONES",
    },
  ];

  const handleActivateDeactivate = async (userId, action, getUsers) => {
    try {
      const actionUrl = `http://localhost:3001/management/user/status/${userId}`;

      await axios.put(actionUrl, {
        action: action,
      });

      getUsers();
    } catch (error) {
      console.error("Error al activar o desactivar usuario", error);
    }
  };

  return (
    <div>
      <NavigationBar />
      <BreadCum items={breadcumItems} />
      <TableUserBan
        columns={columns}
        data={users}
        getUsers={getUsers}
        handleActivateDeactivate={(userId, action) =>
          handleActivateDeactivate(userId, action, getUsers)
        }
      />
    </div>
  );
};

export default Users;

