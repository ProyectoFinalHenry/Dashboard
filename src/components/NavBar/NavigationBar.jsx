import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Input,
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    Avatar
} from "@nextui-org/react";
import { NavBarLogo } from "./NavBarLogo/NavBarLogo.jsx";
import { SearchIcon } from "./SearchIcon.jsx";
import { useState, useEffect } from "react";
const NavigationBar = () => {
    const [user, setUser] = useState([]);
    const auth_token = localStorage.getItem("auth_token");
    const navigate = useNavigate();
    async function getUsers() {
        try {
          const { data } = await axios.get("/user", {
            headers: { auth_token },
          });
          setUser(data);
        } catch (error) {
          console.error("Error al obtener la lista de usuarios", error);
        }
      }
    
      useEffect(() => {
        getUsers();
      }, []);
    const logOut = () => {
        localStorage.removeItem('auth_token')
        navigate('/')
    }
    return (
        <div>
            <Navbar isBordered>
                <NavbarContent justify="start">
                    <NavbarBrand className="mr-4">
                        <NavBarLogo />
                    </NavbarBrand>
                    <NavbarContent className="hidden sm:flex gap-3">
                        <NavbarItem>
                            <Link color="foreground" href="/panel">
                                Panel
                            </Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Link color="foreground" href="/users">
                                Usuarios
                            </Link>
                        </NavbarItem>
                        <NavbarItem >
                            <Link href="/sales" color="foreground">
                                Ventas
                            </Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Link color="foreground" href="/products">
                                Productos
                            </Link>
                        </NavbarItem>
                    </NavbarContent>
                </NavbarContent>

                <NavbarContent as="div" className="items-center" justify="end">
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                as="button"
                                className="transition-transform"
                                color="secondary"
                                name="Jason Hughes"
                                size="sm"
                                src={user.image}
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-semibold">Hola</p>
                                <p className="font-semibold">{user.email}</p>
                            </DropdownItem>
                            <DropdownItem key="logout" color="danger" onClick={()=>logOut()}>
                                Salir
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent>
            </Navbar>
        </div>
    )
}

export default NavigationBar;