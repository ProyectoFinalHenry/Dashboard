import React from "react";
import { TbSlash } from "react-icons/tb";
import './BreadCum.css';

const BreadCum = () => {
    return (
        <div className='page-breadcum-cont'>
            <ol className='page-breadcum'>
                <li>Grano de Oro</li>
                &nbsp;<TbSlash />&nbsp;
                <li>Dashboard</li>
            </ol>
        </div>
    )
}

export default BreadCum;