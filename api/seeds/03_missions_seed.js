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
      start_date: "2022-12-10",
      end_date: "2022-12-15",
      location: {
        city_base: "Kuwait City",
        country: "Kuwait",
        mgrs: "39RTN16304159",
      },
      name: "Operation Tidal Wave",
      description: "Air Vigilance PMCS",
      status: "Complete",
      purpose:
        "Maintenance Team conducts routine Preventative Maintenance Checks and Services (PMCS) on Air Vigilance system.",
      authority: "OPORD 22-007",
      end_state:
        "Mission ends when system mainteance is complete, any issues identified, and any need work orders submitted.",
      transportation_methods: "NTV",
      timeline: {
        sp: "TF HQ",
        departure: "12:00",
        cp1: "checkpoint location",
        destination_arrival: "13:00",
        destination_departure: "15:00",
        cp2: "checkpoint location",
        rtb: "16:00",
        eom: "16:30",
        total_time: "4hrs 30min",
      },
      pace: { P: "Yell Micro", A: "Government Cell", C: "Signal", E: "Runner" },
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
      start_date: "2022-12-19",
      end_date: "2022-12-23",
      location: {
        city_base: "Camp Arifjan",
        country: "Kuwait",
        mgrs: "39RTM2402698035",
      },
      name: "CI Team 1 CIVA",
      description:
        "CI Team 1 conducts CI portion of vulnerabilty assessment on Camp Arifjan",
      status: "Active",
      purpose: "Provide CI Support to Force Protection IAW AR 381-20.",
      authority: "OPORD 22-007",
      end_state:
        "Mission complete once vulnerabilities have been identified and units notified to conduct risk mitigation measures.",
      transportation_methods: "NTV",
      timeline: {
        sp: "start location",
        departure: "12:00",
        cp1: "checkpoint location",
        destination_arrival: "13:00",
        destination_departure: "15:00",
        cp2: "checkpoint location",
        rtb: "16:00",
        eom: "16:30",
        total_time: "4hrs 30min",
      },
      pace: { P: "Yell Micro", A: "Government Cell", C: "Signal", E: "Runner" },
      risks: {
        mission: "Weather, Vehicle Maintenence, VEO, VBIED",
        force: "Vehicle Accident, Wildlife",
      },
      decision_point: "2023-12-05",
      is_archived: false,
      team_id: 2,
    },
    {
      id: 3,
      start_date: "2022-12-23",
      end_date: "2022-12-25",
      location: {
        city_base: "Baghdad",
        country: "Iraq",
        mgrs: "38SMB54899003",
      },
      name: "HUMINT Team 5 Source Meet",
      description:
        "HUMINT Team 5 conducts source meet with NFN-XYZ to follow up on previous reporting in response to an RFI from TF HQ.",
      status: "Pending",
      purpose: "Provide CI Support to Force Protection IAW AR 381-20.",
      authority: "OPORD 22-007",
      end_state: "Mission ends once information has been obtained.",
      transportation_methods: "NTV",
      timeline: {
        sp: "Team CP",
        departure: "12:00",
        cp1: "checkpoint location",
        destination_arrival: "13:00",
        destination_departure: "15:00",
        cp2: "checkpoint location",
        rtb: "16:00",
        eom: "16:30",
        total_time: "4hrs 30min",
      },
      pace: { P: "Yell Micro", A: "Government Cell", C: "Signal", E: "Runner" },
      risks: {
        mission: "Weather, Vehicle Maintenence, VEO, VBIED",
        force: "Vehicle Accident, Wildlife",
      },
      decision_point: "2023-12-05",
      is_archived: false,
      team_id: 2,
    },
    {
      id: 4,
      start_date: "2022-12-20",
      end_date: "2022-12-23",
      location: {
        city_base: "Amman",
        country: "Jordan",
        mgrs: "37RBR17703757",
      },
      name: "Operation Insolence",
      description:
        "SIGINT Team 2 does SIGINT things which we can't get into here on this medium.",
      status: "Pending",
      purpose: "SIGINT stuff. Who knows what those guys do, anyway?",
      authority: "OPORD 22-007",
      end_state:
        "Mission ends once they're satisfied they've done all the things.",
      transportation_methods: "NTV",
      timeline: {
        sp: "CP",
        departure: "12:00",
        cp1: "checkpoint location",
        destination_arrival: "13:00",
        destination_departure: "15:00",
        cp2: "checkpoint location",
        rtb: "16:00",
        eom: "16:30",
        total_time: "4hrs 30min",
      },
      pace: { P: "Yell Micro", A: "Government Cell", C: "Signal", E: "Runner" },
      risks: {
        mission: "Weather, Vehicle Maintenence, VEO, VBIED",
        force: "Vehicle Accident, Wildlife",
      },
      decision_point: "2023-12-10",
      is_archived: false,
      team_id: 7,
    },
    {
      id: 5,
      start_date: "2022-12-24",
      end_date: "2022-12-30",
      location: {
        city_base: "Doha",
        country: "Qatar",
        mgrs: "39RWH55159700",
      },
      name: "CI Team 4 Host Nation Liaison",
      description:
        "CI Team 4 meets with host nation security forces to discuss any security incidents which may have occured during the world cup.",
      status: "Pending",
      purpose: "Provide CI Support to Force Protection IAW 381-20.",
      authority: "OPORD 22-007",
      end_state:
        "Activity ends once all topics have been discussed and rapport built.",
      transportation_methods: "NTV",
      timeline: {
        sp: "Al Udeid Airbase",
        departure: "12:00",
        cp1: "checkpoint location",
        destination_arrival: "13:00",
        destination_departure: "15:00",
        cp2: "checkpoint location",
        rtb: "16:00",
        eom: "16:30",
        total_time: "4hrs 30min",
      },
      pace: { P: "Yell Micro", A: "Government Cell", C: "Signal", E: "Runner" },
      risks: {
        mission: "Weather, Vehicle Maintenence, VEO, VBIED",
        force: "Vehicle Accident, Wildlife",
      },
      decision_point: "2023-12-10",
      is_archived: false,
      team_id: 11,
    },
  ]);
};
