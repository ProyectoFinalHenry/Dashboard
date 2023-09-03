import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useForm } from "react-hook-form"
import { ToastContainer } from 'react-toastify';
import { notifySuccess, notifyInfo } from '../../../functions/toastify';
import { Button, image } from "@nextui-org/react";
import { FaPen, FaEye, FaTrash } from "react-icons/fa";
import NavigationBar from '../../../components/NavBar/NavigationBar';
import { useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './ProductsUpdate.css'
import BreadCum from "../../../components/BreadCum/BreadCum";

const ProductsUpdate = () => {
    const { id } = useParams();
    const [selectedFile, setSelectedFile] = useState(null);
    const [types, setTypes] = useState([{}]);
    const [roasts, setRoasts] = useState([{}]);
    const [origins, setOrigins] = useState([{}]);
    const [coffee, setCoffee] = useState([{}]);
    const [urlImage, setUrlImage] = useState(null);
    const [putObject, setPutObject] = useState(null);
    let submitable = []
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({});
    /* const nameInput = watch("name");
     const descriptionInput = watch("description");
     const fileInput = watch("file");
     const priceInput = (watch("price"));
     const stockInput = watch("stock");
     const typeInput = watch("typeOfCoffee");
     const roastInput = watch("roastingProfile");
     const originInput = watch("origin");*/
    const TYPE_GET_VALUE = "TypeOfCoffee";
    const ROAST_GET_VALUE = "RoastingProfile";
    const ORIGIN_GET_VALUE = "Origin";
    let url = '';

    useEffect(() => {
        getCoffeeDetail();
        getAllTypesCoffee();
        getAllRoastsCoffee();
        getAllOriginsCoffee();
    }, []);

    const setDefaultInputsValues = (data) => {
        const { name, description, image, price, stock, TypeOfCoffee, RoastingProfile, Origin } = data;
        setValue('name', name);
        setValue('description', description);
        setValue('file', image);
        setValue('price', price);
        setValue('stock', stock);
        setValue('roastingProfile', RoastingProfile?.profile);
        setValue('typeOfCoffee', TypeOfCoffee?.type);
        setValue('origin', Origin?.origin);
    }
    const getCoffeeDetail = async () => {
        try {
            const { data } = await axios.get(`coffee/${id}`);
            setCoffee(data);
            setDefaultInputsValues(data);
        } catch (error) {
            console.log(error);
        }
    }

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
    const setPutCoffeeObject = (obj) => {
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
    const setPutData = (data) => {
        const {
            image,
            file,
            name,
            description,
            price,
            stock,
            typeOfCoffee,
            roastingProfile,
            origin
        } = data;

        return {
            categoryCoffee: {
                origin,
                typeOfCoffee,
                roastingProfile
            },
            defaultCoffee: {
                image: (image === "") ? file : image,
                name,
                description,
                price,
                stock
            }
        }

    }
    const handlePutCoffee = async (putData) => {
        const updateData = setPutData(putData);
        try {
            const { data } = await axios.put(`coffee/${coffee?.id}`, {
                data: updateData
            });
            const { status } = data;
            if (status) {
                notifySuccess("¡Producto actualizado con exito!");
                setTimeout(() => {
                    window.location.href = '/products';
                }, 1 * 3000);
            }

        } catch (error) {
            console.log(error);
        }
    }

    const typeSelects = types.map((item, i) => {
        const { type } = item;
        return <option value={type} key={i} selected={(coffee.TypeOfCoffee?.type === type) ? true : ''}>{type}</option>
    });
    const roastSelects = roasts.map((item, i) => {
        const { profile } = item;
        return <option value={profile} key={i} selected={(coffee.RoastingProfile?.profile === profile) ? true : ''}>{profile}</option>
    });
    const originSelects = origins.map((item, i) => {
        const { origin } = item;
        return <option value={origin} key={i} selected={(coffee.Origin?.origin === origin) ? true : ''}>{origin}</option>
    });

    return (
        <div className="form-create-container">
            <NavigationBar />
            <BreadCum />
            <div>
                <div>
                    <h1 className="form-header-text">Formulario de actualización de productos</h1>
                </div>
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
                <form className="form-create" onSubmit={handleSubmit((data) => {
                    if (!submitable.length) {
                        notifyInfo("Edita al menos un campo para enviar el formulario.");
                    } else {
                        handleUploadFile();
                        setTimeout(() => {
                            const coffeeObject = setPutCoffeeObject(data);
                            setPutObject(coffeeObject);
                            handlePutCoffee(coffeeObject);
                        }, 1 * 3000);
                    }
                })}>
                    <div>
                        <div>
                            <label htmlFor="icafe" className="form-label">Imagen del Café</label>
                            <input
                                {...register("file")}
                                type="file"
                                className="form-control"
                                id="icafe"
                                onChange={handleChange}
                                disabled
                            />
                            <Button
                                size="sm"
                                onClick={() => {
                                    const inputImage = document.getElementById('icafe');
                                    if (inputImage.disabled) {
                                        inputImage.disabled = false
                                        submitable.push(true);
                                    } else {
                                        inputImage.disabled = true;
                                        submitable.pop();
                                    }

                                }}
                            ><FaPen /></Button>
                        </div>
                        {/**<p>{errors.file?.message}</p> */}
                    </div>
                    <div>
                        <label htmlFor="ncafe" className="form-label">Nombre del Café</label>
                        <input
                            {...register("name", {
                                required: "* Este campo es requerido. Ingresa un valor."
                            })}
                            type="text"
                            className="form-control"
                            id="ncafe"
                            placeholder="introduce nombre del café..."
                            disabled
                        />
                        <Button
                            size="sm"
                            onClick={() => {
                                const inputName = document.getElementById('ncafe');
                                if (inputName.disabled) {
                                    inputName.disabled = false
                                    submitable.push(true);
                                } else {
                                    inputName.disabled = true;
                                    submitable.pop();
                                }

                            }}
                        ><FaPen /></Button>
                        <p>{errors.name?.message}</p>
                    </div>
                    <div>
                        <label htmlFor="dcafe" className="form-label">Descripción del Café</label>
                        <textarea
                            {...register("description", { required: "* Este campo es requerido. Ingresa un valor." })}
                            className="form-control"
                            id="dcafe"
                            rows="3"
                            defaultValue={coffee?.description}
                            disabled></textarea>
                        <Button
                            size="sm"
                            onClick={() => {
                                const inputName = document.getElementById('dcafe');
                                if (inputName.disabled) {
                                    inputName.disabled = false
                                    submitable.push(true);
                                } else {
                                    inputName.disabled = true;
                                    submitable.pop();
                                }

                            }}
                        ><FaPen /></Button>
                        <p>{errors.description?.message}</p>
                    </div>

                    <div>
                        <label htmlFor="pcafe" className="form-label">Precio del Café</label>
                        <input
                            {...register("price",
                                {
                                    required: "* Este campo es requerido. Ingresa un valor.",
                                    min: { value: 1, message: "El valor minimo permitido es 1" }
                                }
                            )}
                            type="number"
                            className="form-control"
                            defaultValue={coffee?.price}
                            id="pcafe"
                            disabled />
                        <Button
                            size="sm"
                            onClick={() => {
                                const inputName = document.getElementById('pcafe');
                                if (inputName.disabled) {
                                    inputName.disabled = false;
                                    submitable.push(true);
                                } else {
                                    inputName.disabled = true;
                                    submitable.pop(false);
                                }

                            }}
                        ><FaPen /></Button>
                        <p>{errors.price?.message}</p>
                    </div>
                    <div>
                        <label htmlFor="scafe" className="form-label">Stock del Café</label>
                        <input
                            {...register("stock",
                                {
                                    required: "* Este campo es requerido. Ingresa un valor.",
                                    min: { value: 1, message: "El valor minimo permitido es 1" }
                                })
                            }
                            type="number"
                            className="form-control"
                            defaultValue={coffee?.stock}
                            id="scafe"
                            disabled />
                        <Button
                            size="sm"
                            onClick={() => {
                                const inputName = document.getElementById('scafe');
                                if (inputName.disabled) {
                                    inputName.disabled = false;
                                    submitable.push(true);
                                } else {
                                    inputName.disabled = true;
                                    submitable.pop();
                                }

                            }}
                        ><FaPen /></Button>
                        <p>{errors.stock?.message}</p>
                    </div>
                    <div>
                        <label htmlFor="tcafe" className="form-label">Tipo de Café</label>
                        <select
                            {...register("typeOfCoffee", { required: "* Este campo es requerido. Ingresa un valor." })}
                            className="form-control"
                            id="tcafe"
                            disabled>
                            {typeSelects}
                        </select>
                        <Button
                            size="sm"
                            onClick={() => {
                                const inputName = document.getElementById('tcafe');
                                if (inputName.disabled) {
                                    inputName.disabled = false;
                                    submitable.push(true);
                                } else {
                                    inputName.disabled = true;
                                    submitable.pop();
                                }

                            }}
                        ><FaPen /></Button>
                        <p>{errors.typeOfCoffee?.message}</p>
                    </div>
                    <div>
                        <label htmlFor="rcafe" className="form-label">Tostado de Café</label>
                        <select
                            {...register("roastingProfile", { required: "* Este campo es requerido. Ingresa un valor." })}
                            className="form-control"
                            id="rcafe"
                            disabled>
                            {roastSelects}
                        </select>
                        <Button
                            size="sm"
                            onClick={() => {
                                const inputName = document.getElementById('rcafe');
                                if (inputName.disabled) {
                                    inputName.disabled = false;
                                    submitable.push(true);
                                } else {
                                    inputName.disabled = true;
                                    submitable.pop();
                                }

                            }}
                        ><FaPen /></Button>
                        <p>{errors.roastingProfile?.message}</p>
                    </div>
                    <div>
                        <label htmlFor="ocafe" className="form-label">Origen de Café</label>
                        <select
                            {...register("origin", { required: "* Este campo es requerido. Ingresa un valor." })}
                            className="form-control"
                            id="ocafe"
                            disabled>
                            {originSelects}
                        </select>
                        <Button
                            size="sm"
                            onClick={() => {
                                const inputName = document.getElementById('ocafe');
                                if (inputName.disabled) {
                                    inputName.disabled = false;
                                    submitable.push(true);
                                } else {
                                    inputName.disabled = true;
                                    submitable.pop();
                                }

                            }}
                        ><FaPen /></Button>
                        <p>{errors.origin?.message}</p>
                    </div>
                    <div>
                        <input type="submit" value="Actualizar" className="form-submit-button" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProductsUpdate;
