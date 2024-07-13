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
  const [newAlien, setNewAlien] = useState<PartialAlien>({ type: "warrior" });
  const [error, setError] = useState("");
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
      setError("Name is required");
      return;
    }
    if (!newAlien.commanderId && newAlien.type !== "chief_commander") {
      setError("Commander is required");
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
      className="fixed top-0 left-0 right-0 z-50 items-center justify-center flex w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative w-full max-w-2xl max-h-full">
        <form
          className="relative bg-white rounded-lg shadow"
          onSubmit={handleSubmit}
        >
          <div className="flex items-start justify-between p-4 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">
              Add New Alien
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
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
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="Alien Name"
                  required
                  value={newAlien.name || ""}
                  onChange={(e) =>
                    setNewAlien({ ...newAlien, name: e.target.value })
                  }
                />
                {error && !newAlien.name && (
                  <p className="text-red-500 text-sm mt-1">{error}</p>
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
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
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
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    value={newAlien.weapon || Weapon.WATER_GUN}
                    onChange={(e) =>
                      setNewAlien({
                        ...newAlien,
                        weapon: e.target.value as Weapon,
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
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    value={newAlien.vehicle || Vehicle.BIRD_SCOOTER}
                    onChange={(e) =>
                      setNewAlien({
                        ...newAlien,
                        vehicle: e.target.value as Vehicle,
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
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
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

                  {error && !newAlien.commanderId && (
                    <p className="text-red-500 text-sm mt-1">{error}</p>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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
