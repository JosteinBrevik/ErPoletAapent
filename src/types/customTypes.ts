export interface IStore {
  storeName: String;
  distanceFromUser?: Number;
  storeId: string;
  status: string;
  address: {
    street: string;
    postalCode: string;
    city: string;
    gpsCoord: string;
    globalLocationNumber: string;
    organisationNumber: string;
  };
  telephone: string;
  email: string;
  category: string;
  openingHours: {
    regularHours: [
      {
        dayOfTheWeek: string;
        openingTime: string;
        closingTime: string;
        closed: true;
      }
    ];
    exceptionHours: [
      {
        date: string;
        openingTime: string;
        closingTime: string;
        message: string;
      }
    ];
  };
  lastChanged: {
    date: string;
    time: string;
  };
}
