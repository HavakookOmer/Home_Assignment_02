import React, { useState, useEffect } from "react";
import { Alien, Weapon, Vehicle, PartialAlien } from "../types/Alien";

interface AddNewAlienModalProps {
  addAlien: (newAlien: PartialAlien) => void;
  closeModal: () => void;
  aliens: Alien[];
}

const AddNewAlienModal: React.FC<AddNewAlienModalProps> = ({
  addAlien,
  closeModal,
  aliens,
}) => {
  const [newAlien, setNewAlien] = useState<PartialAlien>({ type: "warrior" , weapon: Weapon.WATER_GUN, vehicle: Vehicle.BIRD_SCOOTER });
  const [commanderError, setCommanderError] = useState("");
  const [nameError, setNameError] = useState("");
  const [commanders, setCommanders] = useState<Alien[]>([]);

  useEffect(() => {
    const commanderList = aliens.filter(
      (alien) => alien.type === "commander" || alien.type === "chief_commander"
    );
    setCommanders(commanderList);
  }, [aliens]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlien.name) {
      setNameError("Name is required");
      return;
    }
    if (!newAlien.commanderId && newAlien.type !== "chief_commander") {
      setCommanderError("Commander is required");
      return;
    }

    addAlien(newAlien);
    setNewAlien({ type: "warrior" });
    closeModal();
  };

  return (
    <div
      id="addNewAlienModal"
      aria-hidden="true"
      className="modal"
    >
      <div className="relative w-full max-w-2xl max-h-full">
        <form
          className="form"
          onSubmit={handleSubmit}
        >
          <div className="flex items-start justify-between p-4">
            <h3 className="text-xl font-semibold text-gray-900">
              Add New Alien
            </h3>
            <button
              type="button"
              className="text-cyan-500 bg-transparent hover:text-cyan-300 text-sm w-8 h-8"
              onClick={closeModal}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="alien-name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Alien Name
                </label>
                <input
                  type="text"
                  name="alien-name"
                  id="alien-name"
                  className="shadow-sm bg-cyan-50 border border-cyan-300 text-gray-900 text-sm focus:ring-cyan-700 focus:border-cyan-700 block w-full p-2.5"
                  placeholder="Alien Name"
                  value={newAlien.name || ""}
                  onChange={(e) =>
                    setNewAlien({ ...newAlien, name: e.target.value })
                  }
                />
                {nameError && !newAlien.name && (
                  <p className="text-red-500 text-sm mt-1">{nameError}</p>
                )}
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="alien-type"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Alien Type
                </label>
                <select
                  name="alien-type"
                  id="alien-type"
                  className="shadow-sm bg-cyan-50 border border-cyan-300 text-gray-900 text-sm focus:ring-cyan-700 focus:border-cyan-700 block w-full p-2.5"
                  value={newAlien.type || "warrior"}
                  onChange={(e) =>
                    setNewAlien({ ...newAlien, type: e.target.value })
                  }
                >
                  <option value="warrior">Warrior</option>
                  <option value="commander">Commander</option>
                  <option value="chief_commander">Chief Commander</option>
                </select>
              </div>
              {newAlien.type === "warrior" && (
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="alien-weapon"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Weapon
                  </label>
                  <select
                    name="alien-weapon"
                    id="alien-weapon"
                    className="shadow-sm bg-cyan-50 border border-cyan-300 text-gray-900 text-sm focus:ring-cyan-700 focus:border-cyan-700 block w-full p-2.5"
                    value={newAlien.weapon || Weapon.WATER_GUN}
                    onChange={(e) =>
                      setNewAlien({
                        ...newAlien,
                        weapon: e.target.value as unknown as Weapon,
                      })
                    }
                  >
                    <option value={Weapon.WATER_GUN}>Water Gun</option>
                    <option value={Weapon.PEPPER_SPRAY}>Pepper Spray</option>
                    <option value={Weapon.CHOPSTICKS}>Chopsticks</option>
                  </select>
                </div>
              )}
              {newAlien.type !== "warrior" && (
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="alien-vehicle"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Vehicle
                  </label>
                  <select
                    name="alien-vehicle"
                    id="alien-vehicle"
                    className="shadow-sm bg-cyan-50 border border-cyan-300 text-gray-900 text-sm focus:ring-cyan-700 focus:border-cyan-700 block w-full p-2.5"
                    value={newAlien.vehicle || Vehicle.BIRD_SCOOTER}
                    onChange={(e) =>
                      setNewAlien({
                        ...newAlien,
                        vehicle: e.target.value as unknown as Vehicle,
                      })
                    }
                  >
                    <option value={Vehicle.BIRD_SCOOTER}>Bird Scooter</option>
                    <option value={Vehicle.MERKAVA_TANK}>Merkava Tank</option>
                    <option value={Vehicle.EGGED_BUS}>Egged Bus</option>
                  </select>
                </div>
              )}
              {newAlien.type !== "chief_commander" && (
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="alien-commanderId"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Commander
                  </label>
                  <select
                    name="alien-commanderId"
                    id="alien-commanderId"
                    className="shadow-sm bg-cyan-50 border border-cyan-300 text-gray-900 text-sm focus:ring-cyan-700 focus:border-cyan-700 block w-full p-2.5"
                    value={newAlien.commanderId || ""}
                    onChange={(e) =>
                      setNewAlien({
                        ...newAlien,
                        commanderId: parseInt(e.target.value, 10),
                      })
                    }
                  >
                    <option value="" disabled>
                      Select Commander
                    </option>
                    {commanders.map((commander) => (
                      <option key={commander.id} value={commander.id}>
                        {commander.name}
                      </option>
                    ))}
                  </select>
                  {commanderError && !newAlien.commanderId && (
                    <p className="text-red-500 text-sm mt-1">
                      {commanderError}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse rounded-b">
            <button
              type="submit"
              className=" bg-cyan-500 border text-white font-[Poppins] hover:bg-cyan-300 px-4 py-2 ml-auto"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewAlienModal;
