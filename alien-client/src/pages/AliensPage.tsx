import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

import { Alien, Vehicle, Weapon } from "../types/Alien";
import AddNewAlienModal from "../components/AddNewAlienModal";
import AlienList from "../components/AlienList";

const AliensPage: React.FC = () => {
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
          weapon: Weapon[newAlien.weapon as Weapon],
          vehicle: Vehicle[newAlien.vehicle as Vehicle],
        }
      );
      const updatedAliens = [...aliens, data];
      setAliens(updatedAliens);
      window.localStorage.setItem("aliens", JSON.stringify(updatedAliens));
      setIsModalOpen(false);
      fetchAliens();
    } catch (error) {
      if (
        (error as AxiosError).response &&
        (error as AxiosError).response?.status === 400
      ) {
        alert((error as AxiosError).response?.data);
      } else {
        alert("Error adding alien: Please try again later");
      }
    }
  };

  return (
    <div className="grid grid-rows-3 grid-flow-col">
      {/* header */}
      <div className="row-span-1 col-span-2 pt-8 pb-2">
        <h1 className="text-2xl font-[Poppins]">Alien List</h1>
      </div>
      <div
        className={`${
          isModalOpen ? "filter blur-sm" : ""
        } col-span-2 row-span-2 items-center space-y-2  w-fit`}
      >
        <button
          className=" bg-cyan-500 border text-white font-[Poppins] px-4 py-2 ml-auto"
          onClick={() => setIsModalOpen(true)}
        >
          +
        </button>

        <AlienList aliens={aliens} />
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

export default AliensPage;
