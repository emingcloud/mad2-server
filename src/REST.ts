export namespace REST {
  export namespace GET {
    export interface Tenant {
      name: string;
      email: string;
      password: string;
    }
    export interface Batch {
      id: string;
      name: string;
      quantity: number;
      unit_price: number;
      mfg: Date;
      exp: Date;
      status: string;
    }
  }
  export namespace POST {
    export interface Signup {
      name: string;
      email: string;
      password: string;
    }
    export interface Login {
      email: string;
      password: string;
    }
    export interface Batch {
      name: string;
      quantity: number;
      unit_price: number;
      mfg: Date;
      exp: Date;
    }
  }
}
