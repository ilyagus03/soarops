// FAAAKEEE ahh

export const theaters = [
  { id: '1', theater_number: 1, capacity: 87, status: 'OPERATIONAL', last_maintenance_date: '2023-05-10T08:00:00Z' },
  { id: '2', theater_number: 2, capacity: 87, status: 'OPERATIONAL', last_maintenance_date: '2023-05-03T08:00:00Z' },
  { id: '3', theater_number: 3, capacity: 87, status: 'MAINTENANCE', last_maintenance_date: '2023-04-26T08:00:00Z' }
];

export const staffMembers = [
  { id: '1', employee_id: 'CM00001', name: 'John Smith', position: 'Lead', hire_date: '2022-01-15', certification_level: 5, is_trainer: true, is_active: true },
  { id: '2', employee_id: 'CM00002', name: 'Sarah Johnson', position: 'Console', hire_date: '2022-03-22', certification_level: 4, is_trainer: true, is_active: true },
  { id: '3', employee_id: 'CM00003', name: 'Michael Brown', position: 'Loader', hire_date: '2022-06-10', certification_level: 3, is_trainer: false, is_active: true },
  { id: '4', employee_id: 'CM00004', name: 'Emily Davis', position: 'Greeter', hire_date: '2022-08-05', certification_level: 2, is_trainer: false, is_active: true },
  { id: '5', employee_id: 'CM00005', name: 'David Wilson', position: 'Grouper', hire_date: '2022-09-15', certification_level: 2, is_trainer: false, is_active: true },
  { id: '6', employee_id: 'CM00006', name: 'Jessica Taylor', position: 'Unloader', hire_date: '2022-11-20', certification_level: 2, is_trainer: false, is_active: true },
  { id: '7', employee_id: 'CM00007', name: 'Daniel Miller', position: 'Loader', hire_date: '2023-01-10', certification_level: 1, is_trainer: false, is_active: true },
  { id: '8', employee_id: 'CM00008', name: 'Lisa Anderson', position: 'Unloader', hire_date: '2023-02-28', certification_level: 1, is_trainer: false, is_active: true }
];

export const staffAssignments = [
  { id: '1', operation_day_id: '1', staff_id: '1', position: 'Lead', theater_id: null, shift_start_time: '08:00', shift_end_time: '16:00', break_start_time: '12:00', break_end_time: '12:45', rotation_group: null },
  { id: '2', operation_day_id: '1', staff_id: '2', position: 'Console', theater_id: '1', shift_start_time: '08:00', shift_end_time: '16:00', break_start_time: '12:00', break_end_time: '12:45', rotation_group: 1 },
  { id: '3', operation_day_id: '1', staff_id: '3', position: 'Loader', theater_id: '1', shift_start_time: '08:00', shift_end_time: '16:00', break_start_time: '12:45', break_end_time: '13:30', rotation_group: 1 },
  { id: '4', operation_day_id: '1', staff_id: '4', position: 'Greeter', theater_id: '1', shift_start_time: '08:00', shift_end_time: '16:00', break_start_time: '13:30', break_end_time: '14:15', rotation_group: 1 },
  { id: '5', operation_day_id: '1', staff_id: '5', position: 'Grouper', theater_id: '2', shift_start_time: '08:00', shift_end_time: '16:00', break_start_time: '11:15', break_end_time: '12:00', rotation_group: 2 },
  { id: '6', operation_day_id: '1', staff_id: '6', position: 'Unloader', theater_id: '2', shift_start_time: '08:00', shift_end_time: '16:00', break_start_time: '11:15', break_end_time: '12:00', rotation_group: 2 },
  { id: '7', operation_day_id: '1', staff_id: '7', position: 'Loader', theater_id: '2', shift_start_time: '08:00', shift_end_time: '16:00', break_start_time: '11:15', break_end_time: '12:00', rotation_group: 2 },
  { id: '8', operation_day_id: '1', staff_id: '8', position: 'Unloader', theater_id: '2', shift_start_time: '08:00', shift_end_time: '16:00', break_start_time: '11:15', break_end_time: '12:00', rotation_group: 2 }
];

export const maintenanceLogs = [
  {
    id: '1',
    theater_id: '1',
    theater_number: 1,
    maintenance_type: 'PREVENTATIVE',
    technician_name: 'Lisa Thompson',
    start_time: '2023-05-10T08:00:00Z',
    end_time: '2023-05-10T11:30:00Z',
    description: 'Scheduled 30-day preventative maintenance. Performed system diagnostics, calibration of motion system, and inspection of all guest restraint systems.',
    parts_replaced: null,
    maintenance_result: 'COMPLETED',
    next_maintenance_due: '2023-06-09',
    notes: 'All systems operating within normal parameters. No issues found.'
  },
  {
    id: '2',
    theater_id: '2',
    theater_number: 2,
    maintenance_type: 'PREVENTATIVE',
    technician_name: 'Lisa Thompson',
    start_time: '2023-05-03T08:00:00Z',
    end_time: '2023-05-03T12:00:00Z',
    description: 'Scheduled 30-day preventative maintenance. Performed system diagnostics, calibration of motion system, and inspection of all guest restraint systems. Replaced air filters in ventilation system.',
    parts_replaced: 'HVAC air filters, lubrication oil for motion base',
    maintenance_result: 'COMPLETED',
    next_maintenance_due: '2023-06-02',
    notes: 'Noticed slight vibration in secondary actuator during extension. Within tolerances but should be monitored during next maintenance cycle.'
  },
  {
    id: '3',
    theater_id: '3',
    theater_number: 3,
    maintenance_type: 'CORRECTIVE',
    technician_name: 'Mike Johnson',
    start_time: '2023-05-17T14:00:00Z',
    end_time: '2023-05-17T16:45:00Z',
    description: 'Diagnosed irregular motion base operation. Found worn hydraulic seals causing pressure fluctuations in the motion control system.',
    parts_replaced: 'Hydraulic seals on primary motion actuator, pressure regulator valve',
    maintenance_result: 'COMPLETED',
    next_maintenance_due: '2023-06-16',
    notes: 'Recommend full hydraulic system flush during next preventative maintenance window.'
  },
  {
    id: '4',
    theater_id: '3',
    theater_number: 3,
    maintenance_type: 'EMERGENCY',
    technician_name: 'Robert Davis',
    start_time: '2023-04-03T10:00:00Z',
    end_time: '2023-04-03T18:00:00Z',
    description: 'Emergency response to guest-reported loud bang during operation. Investigation revealed failure of main support bracket for motion base actuator.',
    parts_replaced: 'Motion base primary support bracket, mounting hardware, hydraulic connectors',
    maintenance_result: 'COMPLETED',
    next_maintenance_due: '2023-04-26',
    notes: 'Complete teardown of motion system required. Parts expedited from warehouse. Unit stress tested after repair before returning to service.'
  }
];

export const waitTimeData = {
  avg_posted_wait: 45,
  avg_actual_wait: 47,
  wait_time_accuracy: 0.96,
  hourly_wait_times: [
    { hour: 8, avg_posted_wait: 30, avg_actual_wait: 28, count: 12 },
    { hour: 9, avg_posted_wait: 35, avg_actual_wait: 37, count: 12 },
    { hour: 10, avg_posted_wait: 50, avg_actual_wait: 48, count: 12 },
    { hour: 11, avg_posted_wait: 65, avg_actual_wait: 63, count: 12 },
    { hour: 12, avg_posted_wait: 70, avg_actual_wait: 75, count: 12 },
    { hour: 13, avg_posted_wait: 55, avg_actual_wait: 60, count: 12 },
    { hour: 14, avg_posted_wait: 45, avg_actual_wait: 43, count: 12 },
    { hour: 15, avg_posted_wait: 40, avg_actual_wait: 38, count: 12 },
    { hour: 16, avg_posted_wait: 35, avg_actual_wait: 34, count: 12 },
    { hour: 17, avg_posted_wait: 40, avg_actual_wait: 42, count: 12 },
    { hour: 18, avg_posted_wait: 30, avg_actual_wait: 32, count: 12 },
    { hour: 19, avg_posted_wait: 25, avg_actual_wait: 22, count: 12 }
  ]
};

export const throughputData = {
  total_guests: 36542,
  total_cycles: 432,
  avg_guests_per_cycle: 84.6,
  avg_load_time: 75, 
  avg_unload_time: 52, 
  hourly_throughput: [
    { hour: 8, guests: 1872, cycles: 24 },
    { hour: 9, guests: 2016, cycles: 24 },
    { hour: 10, guests: 2112, cycles: 24 },
    { hour: 11, guests: 2208, cycles: 24 },
    { hour: 12, guests: 2280, cycles: 24 },
    { hour: 13, guests: 2304, cycles: 24 },
    { hour: 14, guests: 2352, cycles: 24 },
    { hour: 15, guests: 2328, cycles: 24 },
    { hour: 16, guests: 2256, cycles: 24 },
    { hour: 17, guests: 2304, cycles: 24 },
    { hour: 18, guests: 2208, cycles: 24 },
    { hour: 19, guests: 2112, cycles: 24 },
    { hour: 20, guests: 1872, cycles: 24 }
  ],
  theater_throughput: [
    { theater_id: '1', theater_number: 1, guests: 12240, cycles: 144 },
    { theater_id: '2', theater_number: 2, guests: 12168, cycles: 144 },
    { theater_id: '3', theater_number: 3, guests: 12134, cycles: 144 }
  ]
};

export const incidents = [
  {
    id: '1',
    ride_cycle_id: '123',
    incident_time: '2023-05-17T11:30:00Z',
    incident_type: 'MECHANICAL',
    severity: 3,
    theater_id: '3',
    theater_number: 3,
    reported_by: '1',
    reporter_name: 'John Smith',
    description: 'Theater 3 motion base experiencing irregular movement patterns during ride cycle. Guests reported vibration and jerky movements.',
    resolution: 'Maintenance team called. Theater taken offline for diagnostic and repair.',
    downtime_minutes: 45,
    guests_evacuated: 0,
    incident_status: 'RESOLVED'
  },
  {
    id: '2',
    ride_cycle_id: '456',
    incident_time: '2023-05-17T14:15:00Z',
    incident_type: 'GUEST ILLNESS',
    severity: 2,
    theater_id: '1',
    theater_number: 1,
    reported_by: '4',
    reporter_name: 'Emily Davis',
    description: 'Guest reported motion sickness during ride. Cycle paused for guest assistance.',
    resolution: 'Guest provided medical assistance and escorted from theater. Normal operations resumed after brief delay.',
    downtime_minutes: 8,
    guests_evacuated: 0,
    incident_status: 'RESOLVED'
  },
  {
    id: '3',
    ride_cycle_id: '789',
    incident_time: '2023-05-16T16:45:00Z',
    incident_type: 'OTHER',
    severity: 1,
    theater_id: '2',
    theater_number: 2,
    reported_by: '5',
    reporter_name: 'David Wilson',
    description: 'Guest item dropped during ride. Brief pause required for retrieval.',
    resolution: 'Item retrieved safely. Normal operations resumed.',
    downtime_minutes: 5,
    guests_evacuated: 0,
    incident_status: 'RESOLVED'
  }
];

export const operationDays = [
  {
    id: '1',
    date: '2023-05-17',
    park_opening_time: '09:00',
    park_closing_time: '21:00',
    expected_attendance: 35000,
    actual_attendance: 37200,
    special_event: false,
    notes: 'Normal operating day with high attendance',
    weather: {
      temperature_high: 82.5,
      temperature_low: 68.3,
      precipitation: 0.0,
      humidity: 65.0,
      wind_speed: 5.2,
      weather_condition: 'Sunny'
    }
  },
  {
    id: '2',
    date: '2023-05-16',
    park_opening_time: '09:00',
    park_closing_time: '21:00',
    expected_attendance: 30000,
    actual_attendance: 31500,
    special_event: false,
    notes: 'Normal operating day',
    weather: {
      temperature_high: 79.0,
      temperature_low: 65.5,
      precipitation: 0.2,
      humidity: 70.0,
      wind_speed: 8.5,
      weather_condition: 'Partly Cloudy'
    }
  },
  {
    id: '3',
    date: '2023-05-15',
    park_opening_time: '09:00',
    park_closing_time: '21:00',
    expected_attendance: 28000,
    actual_attendance: 27500,
    special_event: false,
    notes: 'Normal operating day',
    weather: {
      temperature_high: 76.0,
      temperature_low: 63.0,
      precipitation: 0.5,
      humidity: 75.0,
      wind_speed: 10.0,
      weather_condition: 'Light Rain'
    }
  }
];

export default {
  theaters,
  staffMembers,
  staffAssignments,
  maintenanceLogs,
  waitTimeData,
  throughputData,
  incidents,
  operationDays
};
