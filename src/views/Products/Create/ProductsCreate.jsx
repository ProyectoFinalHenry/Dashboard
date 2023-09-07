import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useForm } from "react-hook-form"
import { ToastContainer } from 'react-toastify';
import { notifySuccess } from '../../../functions/toastify'
import NavigationBar from '../../../components/NavBar/NavigationBar';
import BreadCum from "../../../components/BreadCum/BreadCum";
import { Card, CardBody } from "@nextui-org/react";
import { Input, Textarea, Select, SelectSection, SelectItem } from "@nextui-org/react";
import 'react-toastify/dist/ReactToastify.css';
import './ProductsCreate.css'

const ProductsCreate = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [types, setTypes] = useState([{}]);
    const [roasts, setRoasts] = useState([{}]);
    const [origins, setOrigins] = useState([{}]);
    const [urlImage, setUrlImage] = useState(null);
    const [postObject, setPostObject] = useState(null);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const nameInput = watch("name");
    const descriptionInput = watch("description");
    const fileInput = watch("file");
    const priceInput = (watch("price"));
    const stockInput = watch("stock");
    const typeInput = watch("typeOfCoffee");
    const roastInput = watch("roastingProfile");
    const originInput = watch("origin");
    const TYPE_GET_VALUE = "TypeOfCoffee";
    const ROAST_GET_VALUE = "RoastingProfile";
    const ORIGIN_GET_VALUE = "Origin";
    let url = '';

    const breadCumItems = [
        'Productos',
        'Crear'
    ];

    useEffect(() => {
        getAllTypesCoffee();
        getAllRoastsCoffee();
        getAllOriginsCoffee();
    }, []);

    const getAllTypesCoffee = async () => {
        try {
            const { data } = await axios.get(`category/${TYPE_GET_VALUE}`);
            setTypes(data);
        } catch (error) {
            console.log("error:", error);
        }
    }
    const getAllRoastsCoffee = async () => {
        try {
            const { data } = await axios.get(`category/${ROAST_GET_VALUE}`);
            setRoasts(data);
        } catch (error) {
            console.log("error:", error);
        }
    }
    const getAllOriginsCoffee = async () => {
        try {
            const { data } = await axios.get(`category/${ORIGIN_GET_VALUE}`);
            setOrigins(data);
        } catch (error) {
            console.log("error:", error);
        }
    }

    const handleFileChange = (file) => {
        setSelectedFile(file);
    }
    const setPostCoffeeObject = (obj) => {
        obj.image = url;
        return obj;
    }
    const handleUploadFile = async () => {
        if (selectedFile) {
            const { name } = selectedFile;
            const reader = new FileReader();

            reader.onload = async () => {
                const base64data = 'data:image/png;base64,' + reader.result.split(',')[1];

                try {
                    const { data } = await axios.post('coffee/upload', { file: base64data, fname: name });
                    const { message, imageUrl } = data;
                    console.log(message);
                    setUrlImage(imageUrl);
                    url = imageUrl;
                } catch (error) {
                    console.error('Error al subir archivo:', error);
                }
            };

            reader.readAsDataURL(selectedFile);
        }
    }

    const handleChange = (e) => {
        const { name } = e.target;
        if (name === "file") {
            const file = e.target.files[0];
            handleFileChange(file);
        }
    }

    const handlePostCoffee = async (postData) => {
        try {
            const auth_token = localStorage.getItem("auth_token")
            const { data } = await axios.post('coffee', postData, { headers: { auth_token } });
            const { status } = data;
            if (status) {
                notifySuccess("¡Producto creado con exito!");
                setTimeout(() => {
                    window.location.href = '/products';
                }, 1 * 3000);
            }

        } catch (error) {
            console.log(error.message);
        }
    }

    const typeSelects = types.map((item, i) => {
        const { type } = item;
        return <SelectItem key={type} value={type}>
            {type}
        </SelectItem>
    });
    const roastSelects = roasts.map((item, i) => {
        const { profile } = item;
        return <SelectItem key={profile} value={profile}>
            {profile}
        </SelectItem>
    });
    const originSelects = origins.map((item, i) => {
        const { origin } = item;
        return <SelectItem key={origin} value={origin}>
            {origin}
        </SelectItem>
    });

    return (
        <div className="form-create-container">
            <NavigationBar />
            <BreadCum items={breadCumItems} />
            <div>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <Card className="form-create-card">
                    <CardBody>
                        <form className="form-create" onSubmit={handleSubmit((data) => {
                            handleUploadFile();
                            setTimeout(() => {
                                const coffeeObject = setPostCoffeeObject(data);
                                setPostObject(coffeeObject);
                                handlePostCoffee(coffeeObject);

                            }, 1 * 3000);
                        })}>
                            <div>
                                <Input
                                    {...register("name", { required: "* Este campo es requerido. Ingresa un valor." })}
                                    id="ncafe"
                                    type="text"
                                    variant="bordered"
                                    label="Nombre de café"
                                    placeholder="Introduce un nombre.."
                                />
                                <p>{(!nameInput) ? "* Este campo es requerido. Ingresa un valor." : errors.name?.message}</p>
                            </div>
                            <div>
                                <Textarea
                                    {...register("description", { required: "* Este campo es requerido. Ingresa un valor." })}
                                    id="dcafe"
                                    variant="bordered"
                                    label="Description"
                                    // labelPlacement="outside"
                                    placeholder="Introduce una descripción.."
                                    className="col-span-12 md:col-span-6 mb-6 md:mb-0"
                                />
                                <p>{(!descriptionInput) ? "* Este campo es requerido. Ingresa un valor." : errors.description?.message}</p>
                            </div>
                            <div>
                                <Input
                                    {...register("file", { required: "* Este campo es requerido. Ingresa un valor." })}
                                    id="icafe"
                                    type="file"
                                    variant="bordered"
                                    label="Image"
                                    placeholder="Selecciona una imagen.."
                                    onChange={handleChange}
                                />
                                <p>{(!fileInput) ? "* Este campo es requerido. Ingresa un valor." : errors.file?.message}</p>
                            </div>
                            <div>
                                <Input
                                    {...register("price", { required: "* Este campo es requerido. Ingresa un valor." })}
                                    id="pcafe"
                                    type="number"
                                    variant="bordered"
                                    label="Price"
                                    placeholder="Establece precio.."
                                />
                                <p>{(!priceInput) ? "* Este campo es requerido. Ingresa un valor." : (priceInput < 1) ? "El valor minimo permitido es 1" : errors.price?.message}</p>
                            </div>
                            <div>
                                <Input
                                    {...register("stock",
                                        {
                                            required: "* Este campo es requerido. Ingresa un valor.",
                                            min: { value: 1, message: "El valor minimo permitido es 1" }
                                        })
                                    }
                                    id="scafe"
                                    type="number"
                                    variant="bordered"
                                    label="Stock"
                                    placeholder="Establece stock.."
                                />
                                <p>{(!stockInput) ? "* Este campo es requerido. Ingresa un valor." : (stockInput < 1) ? "El valor minimo permitido es 1" : errors.stock?.message}</p>
                            </div>
                            <div>
                                <Select
                                    {...register("typeOfCoffee", { required: "* Este campo es requerido. Ingresa un valor." })}
                                    variant="bordered"
                                    label="Selecciona tipo de café.."
                                    className="max-w-xs"
                                    id="tcafe"
                                >
                                    {typeSelects}
                                </Select>
                                <p>{(!typeInput) ? "* Este campo es requerido. Ingresa un valor." : errors.typeOfCoffee?.message}</p>
                            </div>
                            <div>
                                <Select
                                    {...register("roastingProfile", { required: "* Este campo es requerido. Ingresa un valor." })}
                                    variant="bordered"
                                    label="Selecciona tipo de tostado.."
                                    className="max-w-xs"
                                    id="rcafe"
                                >
                                    {roastSelects}
                                </Select>
                                <p>{(!roastInput) ? "* Este campo es requerido. Ingresa un valor." : errors.roastingProfile?.message}</p>
                            </div>
                            <div>
                                <Select
                                    {...register("origin", { required: "* Este campo es requerido. Ingresa un valor." })}
                                    variant="bordered"
                                    label="Selecciona origen.."
                                    className="max-w-xs"
                                    id="ocafe"
                                >
                                    {originSelects}
                                </Select>
                                <p>{(!originInput) ? "* Este campo es requerido. Ingresa un valor." : errors.origin?.message}</p>
                            </div>
                            <div>
                                <input type="submit" value="Registrar" className="form-submit-button" />
                            </div>
                        </form>
                    </CardBody>
                </Card>

            </div>
        </div>
    )
}

export default ProductsCreate;
