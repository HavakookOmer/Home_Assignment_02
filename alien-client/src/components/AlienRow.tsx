import { Alien, VehicleDisplayNames, WeaponDisplayNames } from "../types/Alien";
import ChiefLogo from "../icons/chief-commander.png";
import CommanderLogo from "../icons/commander.png";
import WarriorLogo from "../icons/alien.png";

const getIconPath = (type: string) => {
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

const AlienRow: React.FC<{ data: Alien, commanderName: string | undefined }> = ({ data , commanderName }) => {
  return (
    <>
      <tr className="bg-cyan-200 hover:bg-cyan-100 hover:scale-105 cursor-pointer duration-300">
        <td className="px-6 py-3">
          <img
            src={getIconPath(data.type)}
            alt={data.type}
            className="w-6 h-6 rounded-full mr-2"
          />
        </td>
        <td className="px-6 py-3">
          <div>{data?.type}</div>
        </td>
        <td className="px-6 py-3">{data?.name}</td>
        <td className="px-6 py-3">
          {commanderName || "-"}
        </td>
        <td className="px-6 py-3">
          {data.weapon
            ? WeaponDisplayNames[data.weapon]
            : data.vehicle
            ? VehicleDisplayNames[data.vehicle]
            : "N/A"}
        </td>
      </tr>
    </>
  );
};

export default AlienRow;
