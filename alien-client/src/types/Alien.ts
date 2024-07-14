// Weapon enum
export enum Weapon {
    WATER_GUN,
    PEPPER_SPRAY, 
    CHOPSTICKS
  }
  
  // Vehicle enum
  export enum Vehicle {
    BIRD_SCOOTER,
    MERKAVA_TANK,
    EGGED_BUS 
  }

  // Mappings
export const WeaponDisplayNames: Record<string, string> = {
  "WATER_GUN": "Water Gun",
  "PEPPER_SPRAY": "Pepper Spray",
  "CHOPSTICKS": "Chopsticks"
};

export const VehicleDisplayNames: Record<string, string> = {
  "BIRD_SCOOTER": "Bird Scooter",
  "MERKAVA_TANK": "Merkava Tank",
  "EGGED_BUS": "Egged Bus"
};
  
  // Alien interface
  export interface Alien {
    id: number;
    name: string;
    type: string;
    weapon?: Weapon;
    vehicle?: Vehicle;
    commanderId?: number;
    subordinates?: Alien[];
  }

  export interface PartialAlien {
    name?: string;
    type?: string;
    weapon?: Weapon;
    vehicle?: Vehicle;
    commanderId?: number;
    subordinates?: Alien[];
  }
  