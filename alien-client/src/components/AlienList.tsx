import React from "react";
import AlienRow from "./AlienRow";
import { Alien } from "../types/Alien";

interface AlienListProps {
  aliens: Alien[];
}

const findAlienComanderName = (aliens: Alien[], alien: Alien) => {  
  return aliens.find((a) => a.id === alien.commanderId)?.name;
}

const AlienList: React.FC<AlienListProps> = ({ aliens }) => {
  return (
    <table className="shadow-2xl font-[Poppins] border-2 border-cyan-200 min-w-fit overflow-hidden">
      <thead className="bg-gray-100 text-white text-sm font-semibold">
        <tr>
          <th className="py-3 bg-cyan-800"></th>
          <th className="py-3 bg-cyan-800">Type</th>
          <th className="py-3 bg-cyan-800">Name</th>
          <th className="py-3 bg-cyan-800">Commander</th>
          <th className="py-3 bg-cyan-800">Weapon/Vehicle</th>
        </tr>
      </thead>
      <tbody className="text-cyan-900 text-left">
        {aliens?.sort((a, b) => a.type.localeCompare(b.type)).map((data, index) => (
          <AlienRow key={index} data={data} commanderName={findAlienComanderName(aliens, data)} />
        ))}
      </tbody>
    </table>
  );
};

export default AlienList;
