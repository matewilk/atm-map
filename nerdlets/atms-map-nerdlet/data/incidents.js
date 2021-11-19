// State:
// 1 - available
// 2 - malfunction
// 3 - in service
// 9 - unavailable

const incidents = [
  {
    MANUFACTURER_ID: "DNI",
    PROCESS_STATE: "A",
    state: "9",
    TASK_CHIPCARD: 135,
    TASK_PAYIN: 27,
    TASK_PAYOUT: 104,
    TASK_SERVICE: 59,
    TASK_STATEMENT: 78,
    TERMINAL_ID: "24888",
    ZIPCODE: "24937",
    lat: "54.7937",
    long: "9.447",
    name: "Flensburg",
    region: "North",
    timestamp: 1637331047074,
  },
  {
    MANUFACTURER_ID: "DNI",
    PROCESS_STATE: "A",
    state: "2",
    TASK_CHIPCARD: 53,
    TASK_PAYIN: 104,
    TASK_PAYOUT: 192,
    TASK_SERVICE: 152,
    TASK_STATEMENT: 116,
    TERMINAL_ID: "20893",
    ZIPCODE: "20095",
    lat: 53.5511,
    long: 9.9937,
    name: "Hamburg",
    region: "North",
    timestamp: 1637331047022,
  },
  {
    MANUFACTURER_ID: "DNI",
    PROCESS_STATE: "A",
    state: "9",
    TASK_CHIPCARD: 84,
    TASK_PAYIN: 20,
    TASK_PAYOUT: 51,
    TASK_SERVICE: 48,
    TASK_STATEMENT: 20,
    TERMINAL_ID: "20663",
    ZIPCODE: "20095",
    lat: "53.5511",
    long: "9.9937",
    name: "Hamburg",
    region: "North",
    timestamp: 1637331046973,
  },
];

export default incidents;
