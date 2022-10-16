import React from "react";
import "./description.css";
import {FaArrowDown, FaArrowUp, FaWind} from "react-icons/fa"
import {BiHappy} from "react-icons/bi"
import {MdCompress, MdOutlineWaterDrop} from "react-icons/md"

const description = ({weather}) => {

    const cards = [
        {
            id: 1,
            icon: <FaArrowDown/>,
            title: "min",
            data: weather.temp_minUnit
        },
        
        {
            id: 2,
            icon: <FaArrowUp/>,
            title: "max",
            data: weather.temp_maxUnit
        },

        {
            id: 3,
            icon: <BiHappy/>,
            title: "feels like",
            data: weather.feels_likeUnit
        },

        {
            id: 4,
            icon: <MdCompress/>,
            title: "pressure",
            data: weather.pressureUnit
        },

        {
            id: 5,
            icon: <MdOutlineWaterDrop/>,
            title: "humidity",
            data: weather.humidityUnit
        },

        {
            id: 6,
            icon: <FaWind/>,
            title: "wind speed",
            data: weather.speedUnit
        }

    ]
    return (
        <div className="section section__description">
            {cards.map(({id, title, icon, data }) => ( 
                <div key = {id}  className="card">
                    <div className="card__icon-description">
                        {icon}
                        <small>{title}</small>
                    </div>
                    <h3>{data}</h3>
             </div>
            ) )}
           
        </div>

    )
}

export default description;