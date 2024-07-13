// Weapon enum
export enum Weapon {
    WATER_GUN = "Water gun",
    PEPPER_SPRAY = "Pepper spray",
    CHOPSTICKS = "Chopsticks",
  }
  
  // Vehicle enum
  export enum Vehicle {
    BIRD_SCOOTER = "Bird scooter",
    MERKAVA_TANK = "Merkava tank",
    EGGED_BUS = "Egged Bus",
  }
  
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
  