import React from "react";
import {Accordion, Button, Card, Col} from "react-bootstrap";

const GameList = ({game}) => {

    const reformatDate = (date) =>
    {
        if(date) {
            let dArr = date.split("-");
            return dArr[2]+ "/" +dArr[1]+ "/" +dArr[0].substring(2);
        } else {
            return "TBA";
        }
    }

    return (
        <tr>
            <td className="border border-solid border-l-0 border-r-0 border-blueGray-100 px-6 align-middle text-lg whitespace-nowrap p-3">
                {game.name}
            </td>
            <td className="border border-solid border-l-0 border-r-0 border-blueGray-100 px-6 align-middle whitespace-nowrap p-3">
                <strong>Release : </strong>{reformatDate(game.released)}
            </td>
            <td className="border border-solid border-l-0 border-r-0 border-blueGray-100 px-6 align-middle text-lg whitespace-nowrap p-3">
                <button className="bg-purple-500 text-white active:bg-purple-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                    <i className="fas fa-plus">
                    </i>
                </button>
            </td>
        </tr>
    )

}

export default GameList;