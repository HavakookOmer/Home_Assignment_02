import React, { useState, useEffect } from "react";
import axios from "axios";
import ChiefLogo from "../icons/chief-commander.png";
import CommanderLogo from "../icons/commander.png";
import WarriorLogo from "../icons/alien.png";
import AddNewAlienModal from "./AddNewAlienModal";
import { Alien, Vehicle, Weapon } from "../types/Alien";

const AlienList: React.FC = () => {
  const [aliens, setAliens] = useState<Alien[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchAliens();
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === "aliens") {
      const updatedAliens = JSON.parse(event.newValue || "[]");
      setAliens(updatedAliens);
    }
  };

  const fetchAliens = async () => {
    try {
      console.log("Fetching aliens...");
      const response = await axios.get("http://localhost:8080/api/getAll");
      setAliens(response.data);
      window.localStorage.setItem("aliens", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching aliens:", error);
      if ((error as any).response && (error as any).response.status === 400) {
        alert("Error fetching aliens: Bad request");
      }
    }
  };

  const addAlien = async (newAlien: Partial<Alien>) => {
    try {
      const { data } = await axios.post<Alien>(
        "http://localhost:8080/api/newAlien",
        {
          ...newAlien,
          weapon: newAlien.weapon
            ? (Weapon[
                newAlien.weapon as unknown as keyof typeof Weapon
              ] as Weapon)
            : undefined,
          vehicle: newAlien.vehicle
            ? (Vehicle[
                newAlien.vehicle as unknown as keyof typeof Vehicle
              ] as Vehicle)
            : undefined,
        }
      );
      const updatedAliens = [...aliens, data];
      setAliens(updatedAliens);
      window.localStorage.setItem("aliens", JSON.stringify(updatedAliens));
      setIsModalOpen(false);
      fetchAliens();
    } catch (error) {
      console.error("Error adding alien:", error);
      if ((error as any).response && (error as any).response.status === 400) {
        alert("Error adding alien: Bad request");
      } else {
        alert("Error adding alien: Please try again later");
      }
    }
  };

  const getIconPath = (type: string) => {
    console.log(type);

    switch (type) {
      case "chief_commander":
        return ChiefLogo;
      case "commander":
        return CommanderLogo;
      case "warrior":
        return WarriorLogo;
      default:
        return WarriorLogo;
    }
  };

  const TableRows: React.FC<{ data: Alien }> = ({ data }) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <tr className="cursor-pointer">
          <td className="py-4 px-2 text-base font-normal flex items-center justify-center border-t">
            {data?.subordinates && data.subordinates.length > 0 && (
              <svg
                className={`text-black w-6 h-6 z-40 ${
                  open ? "rotate-90" : "rotate-0"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                onClick={() => setOpen(!open)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19l7-7-7-7"
                />
              </svg>
            )}
          </td>
          <td className="py-2 px-0 font-normal text-base border-t whitespace-nowrap">
            <div className="flex justify-left">
              <img
                src={getIconPath(data.type)}
                alt={data.type}
                className="w-6 h-6 rounded-full mr-2"
              />
              {data?.type}
            </div>
          </td>
          <td className="py-2 px-3 font-normal text-base border-t whitespace-nowrap">
            {data?.name}
          </td>
          <td className="py-2 px-3 text-base font-normal border-t whitespace-nowrap">
            {data?.weapon || data?.vehicle || "N/A"}
          </td>
        </tr>
        <td colSpan={4} className="pl-20 w-[48rem]">
          {data?.subordinates && data.subordinates.length > 0 ? (
            <td className={`${open ? "block" : "hidden"} `}>
              {data?.subordinates?.map((subordinate, key) => (
                <TableRows key={key} data={subordinate} />
              ))}
            </td>
          ) : (
            <div
              className={`${
                open ? "block" : "hidden"
              } py-4 text-center text-gray-500`}
            >
              No Subordinates
            </div>
          )}
        </td>
      </>
    );
  };

  return (
    <div className="h-full bg-white flex flex-col items-center py-10">
      <div className="w-full max-w-6xl px-2">
        <div
          className={`flex justify-between mb-4 ${
            isModalOpen ? "filter blur-sm" : ""
          }`}
        >
          <h1 className="text-2xl font-medium mb-4">Alien List</h1>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={() => setIsModalOpen(true)}
          >
            Add New Alien
          </button>
        </div>
        <div
          className={`w-full overflow-x-auto ${
            isModalOpen ? "filter blur-sm" : ""
          }`}
        >
          <table className="table-auto w-full text-left font-inter border-separate border-spacing-y-0 border">
            <thead className="bg-gray-50 text-gray-700 text-sm font-semibold">
              <tr>
                <th></th>
                <th className="py-3 px-3">Type</th>
                <th className="py-3 px-3">Name</th>
                <th className="py-3 px-3">Weapon/Vehicle</th>
              </tr>
            </thead>
            <tbody>
              {aliens
                ?.filter((alien) => !alien.commanderId)
                .map((data, index) => (
                  <TableRows key={index} data={data} />
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && (
        <div className="absolute inset-0 flex items-center justify-center">
          <AddNewAlienModal
            aliens={aliens}
            addAlien={addAlien}
            closeModal={() => setIsModalOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

export default AlienList;
