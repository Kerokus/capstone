/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("missions").del();
  await knex("missions").insert([
    {
      id: 1,
      start_date: "2022-12-16",
      end_date: "2022-12-15",
      location: {
        city_base: "Fort Bragg",
        country: "USA",
        mgrs: "17SPU8144990538",
      },
      name: "Operation Thunder Buddies",
      description: "Example Description 1",
      status: "pending",
      purpose: "Conduct meeting with source to gather information ...",
      authority: "COL Ownens",
      end_state: "mission accomplished",
      transportation_methods: "NTV",
      timeline: {
        sp: "start location",
        departure: "1200",
        cp1: "checkpoint location",
        destination_arrival: "1300",
        destination_departure: "1500",
        cp2: "checkpoint location",
        rtb: "1600",
        eom: "1630",
        total_time: "4hrs 30min",
      },
      pace: { P: "Micro Yell", A: "Government Cell", C: "Signal", E: "Runner" },
      risks: {
        mission: "Weather, Vehicle Maintenence, VEO, VBIED",
        force: "Vehicle Accident, Wildlife",
      },
      decision_point: "2023-01-01",
      is_archived: false,
      team_id: 17,
    },
    {
      id: 2,
<<<<<<< HEAD
      start_date: "2022-12-17",
      end_date: "2022-12-26",
=======
      start_date: "2022-12-16",
      end_date: "2022-12-15",
>>>>>>> main
      location: {
        city_base: "Camp Arifjan",
        country: "Kuwait",
        mgrs: "39RTM2402698035",
      },
      name: "Operation Strike Hard",
      description: "Example Description 2",
      status: "pending",
      purpose: "Conduct meeting with source to gather information ...",
      authority: "COL Ownens",
      end_state: "mission accomplished",
      transportation_methods: "NTV",
      timeline: {
        sp: "start location",
        departure: "1200",
        cp1: "checkpoint location",
        destination_arrival: "1300",
        destination_departure: "1500",
        cp2: "checkpoint location",
        rtb: "1600",
        eom: "1630",
        total_time: "4hrs 30min",
      },
      pace: { P: "Micro Yell", A: "Government Cell", C: "Signal", E: "Runner" },
      risks: {
        mission: "Weather, Vehicle Maintenence, VEO, VBIED",
        force: "Vehicle Accident, Wildlife",
      },
      decision_point: "2023-02-14",
      is_archived: false,
      team_id: 17,
    },
    {
      id: 3,
      start_date: "2022-12-30",
      end_date: "2022-01-05",
      location: {
        city_base: "Camp Arifjan",
        country: "Kuwait",
        mgrs: "39RTM2402698035",
      },
      name: "Operation Cobra K",
      description: "Example Description 3",
      status: "complete",
      purpose: "Conduct meeting with source to gather information ...",
      authority: "COL Ownens",
      end_state: "mission accomplished",
      transportation_methods: "NTV",
      timeline: {
        sp: "start location",
        departure: "1200",
        cp1: "checkpoint location",
        destination_arrival: "1300",
        destination_departure: "1500",
        cp2: "checkpoint location",
        rtb: "1600",
        eom: "1630",
        total_time: "4hrs 30min",
      },
      pace: { P: "Micro Yell", A: "Government Cell", C: "Signal", E: "Runner" },
      risks: {
        mission: "Weather, Vehicle Maintenence, VEO, VBIED",
        force: "Vehicle Accident, Wildlife",
      },
      decision_point: "2023-02-01",
      is_archived: false,
      team_id: 3,
    },
    {
      id: 4,
      start_date: "2022-12-08",
      end_date: "2022-12-12",
      location: {
        city_base: "Camp Partriot Army Base",
        country: "Kuwait",
        mgrs: "39RTM1655066132",
      },
      name: "Operation Wild Kilo",
      description: "Example Description 4",
      status: "active",
      purpose: "Conduct meeting with source to gather information ...",
      authority: "COL Ownens",
      end_state: "mission accomplished",
      transportation_methods: "NTV",
      timeline: {
        sp: "start location",
        departure: "1200",
        cp1: "checkpoint location",
        destination_arrival: "1300",
        destination_departure: "1500",
        cp2: "checkpoint location",
        rtb: "1600",
        eom: "1630",
        total_time: "4hrs 30min",
      },
      pace: { P: "Micro Yell", A: "Government Cell", C: "Signal", E: "Runner" },
      risks: {
        mission: "Weather, Vehicle Maintenence, VEO, VBIED",
        force: "Vehicle Accident, Wildlife",
      },
      decision_point: "2023-01-06",
      is_archived: false,
      team_id: 4,
    },
    {
      id: 5,
      start_date: "2022-12-14",
      end_date: "2022-12-15",
      location: {
        city_base: "King Abdullah II Air Base",
        country: "Jordan",
        mgrs: "37SBR3732344546",
      },
      name: "Operation Match Spark",
      description: "Example Description 5",
      status: "active",
      purpose: "Conduct meeting with source to gather information ...",
      authority: "COL Ownens",
      end_state: "mission accomplished",
      transportation_methods: "NTV",
      timeline: {
        sp: "start location",
        departure: "1200",
        cp1: "checkpoint location",
        destination_arrival: "1300",
        destination_departure: "1500",
        cp2: "checkpoint location",
        rtb: "1600",
        eom: "1630",
        total_time: "4hrs 30min",
      },
      pace: { P: "Micro Yell", A: "Government Cell", C: "Signal", E: "Runner" },
      risks: {
        mission: "Weather, Vehicle Maintenence, VEO, VBIED",
        force: "Vehicle Accident, Wildlife",
      },
      decision_point: "2023-01-16",
      is_archived: false,
      team_id: 5,
    },
    {
      id: 6,
      start_date: "2022-12-03",
      end_date: "2022-12-05",
      location: {
        city_base: "Al-Udeid Air Base",
        country: "Qatar",
        mgrs: "39RWH3376979004",
      },
      name: "Operation Zane Scorch",
      description: "Example Description 6",
      status: "active",
      purpose: "Conduct meeting with source to gather information ...",
      authority: "COL Ownens",
      end_state: "mission accomplished",
      transportation_methods: "NTV",
      timeline: {
        sp: "start location",
        departure: "1200",
        cp1: "checkpoint location",
        destination_arrival: "1300",
        destination_departure: "1500",
        cp2: "checkpoint location",
        rtb: "1600",
        eom: "1630",
        total_time: "4hrs 30min",
      },
      pace: { P: "Micro Yell", A: "Government Cell", C: "Signal", E: "Runner" },
      risks: {
        mission: "Weather, Vehicle Maintenence, VEO, VBIED",
        force: "Vehicle Accident, Wildlife",
      },
      decision_point: "2023-01-24",
      is_archived: false,
      team_id: 6,
    },
    {
      id: 7,
      start_date: "2022-12-17",
      end_date: "2022-12-20",
      location: {
        city_base: "Kuwait City",
        country: "Kuwait",
        mgrs: "38RQT90775200",
      },
      name: "Operation Updog",
      description: "Go forth and do a lot of things",
      status: "active",
      purpose: "Conduct meeting with source to gather information ...",
      authority: "OPORD 007",
      end_state: "mission accomplished",
      transportation_methods: "NTV",
      timeline: {
        sp: "start location",
        departure: "1200",
        cp1: "checkpoint location",
        destination_arrival: "1300",
        destination_departure: "1500",
        cp2: "checkpoint location",
        rtb: "1600",
        eom: "1630",
        total_time: "4hrs 30min",
      },
      pace: { P: "Micro Yell", A: "Government Cell", C: "Signal", E: "Runner" },
      risks: {
        mission: "Weather, Vehicle Maintenence, VEO, VBIED",
        force: "Vehicle Accident, Wildlife",
      },
      decision_point: "2022-12-10",
      is_archived: false,
      team_id: 6,
    },
  ]);
};
