-- Sample seed data for Soarin' Operations Management System

-- Clear existing data
TRUNCATE weather_conditions, theaters, operation_days, ride_cycles, staff_members, staff_assignments, incidents, maintenance_logs CASCADE;

-- Insert Theaters
INSERT INTO theaters (id, theater_number, capacity, status, last_maintenance_date, created_at, updated_at)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 1, 87, 'OPERATIONAL', NOW() - INTERVAL '7 days', NOW(), NOW()),
  ('22222222-2222-2222-2222-222222222222', 2, 87, 'OPERATIONAL', NOW() - INTERVAL '14 days', NOW(), NOW()),
  ('33333333-3333-3333-3333-333333333333', 3, 87, 'MAINTENANCE', NOW() - INTERVAL '21 days', NOW(), NOW());

-- Insert Weather Conditions for a sample day
INSERT INTO weather_conditions (id, date, temperature_high, temperature_low, precipitation, humidity, wind_speed, weather_condition, created_at, updated_at)
VALUES 
  ('44444444-4444-4444-4444-444444444444', CURRENT_DATE, 82.5, 68.3, 0.0, 65.0, 5.2, 'Sunny', NOW(), NOW());

-- Insert Operation Day
INSERT INTO operation_days (id, date, park_opening_time, park_closing_time, expected_attendance, actual_attendance, special_event, weather_id, notes, created_at, updated_at)
VALUES 
  ('55555555-5555-5555-5555-555555555555', CURRENT_DATE, '09:00', '21:00', 35000, 37200, FALSE, '44444444-4444-4444-4444-444444444444', 'Normal operating day with high attendance', NOW(), NOW());

-- Insert Staff Members
INSERT INTO staff_members (id, employee_id, first_name, last_name, position, hire_date, certification_level, is_trainer, is_active, created_at, updated_at)
VALUES 
  ('66666666-6666-6666-6666-666666666666', 'CM00001', 'John', 'Smith', 'Lead', '2022-01-15', 5, TRUE, TRUE, NOW(), NOW()),
  ('77777777-7777-7777-7777-777777777777', 'CM00002', 'Sarah', 'Johnson', 'Console', '2022-03-22', 4, TRUE, TRUE, NOW(), NOW()),
  ('88888888-8888-8888-8888-888888888888', 'CM00003', 'Michael', 'Brown', 'Loader', '2022-06-10', 3, FALSE, TRUE, NOW(), NOW()),
  ('99999999-9999-9999-9999-999999999999', 'CM00004', 'Emily', 'Davis', 'Greeter', '2022-08-05', 2, FALSE, TRUE, NOW(), NOW()),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'CM00005', 'David', 'Wilson', 'Grouper', '2022-09-15', 2, FALSE, TRUE, NOW(), NOW()),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'CM00006', 'Jessica', 'Taylor', 'Unloader', '2022-11-20', 2, FALSE, TRUE, NOW(), NOW()),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'CM00007', 'Daniel', 'Miller', 'Loader', '2023-01-10', 1, FALSE, TRUE, NOW(), NOW()),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'CM00008', 'Lisa', 'Anderson', 'Unloader', '2023-02-28', 1, FALSE, TRUE, NOW(), NOW());

-- Insert Staff Assignments
INSERT INTO staff_assignments (id, operation_day_id, staff_id, position, theater_id, shift_start_time, shift_end_time, break_start_time, break_end_time, rotation_group, created_at, updated_at)
VALUES 
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '55555555-5555-5555-5555-555555555555', '66666666-6666-6666-6666-666666666666', 'Lead', NULL, '08:00', '16:00', '12:00', '12:45', NULL, NOW(), NOW()),
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', '55555555-5555-5555-5555-555555555555', '77777777-7777-7777-7777-777777777777', 'Console', '11111111-1111-1111-1111-111111111111', '08:00', '16:00', '12:00', '12:45', 1, NOW(), NOW()),
  ('11111111-1111-1111-1111-111111111112', '55555555-5555-5555-5555-555555555555', '88888888-8888-8888-8888-888888888888', 'Loader', '11111111-1111-1111-1111-111111111111', '08:00', '16:00', '12:45', '13:30', 1, NOW(), NOW()),
  ('22222222-2222-2222-2222-222222222223', '55555555-5555-5555-5555-555555555555', '99999999-9999-9999-9999-999999999999', 'Greeter', '11111111-1111-1111-1111-111111111111', '08:00', '16:00', '13:30', '14:15', 1, NOW(), NOW()),
  ('33333333-3333-3333-3333-333333333334', '55555555-5555-5555-5555-555555555555', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Grouper', '22222222-2222-2222-2222-222222222222', '08:00', '16:00', '11:15', '12:00', 2, NOW(), NOW()),
  ('44444444-4444-4444-4444-444444444445', '55555555-5555-5555-5555-555555555555', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Unloader', '22222222-2222-2222-2222-222222222222', '08:00', '16:00', '11:15', '12:00', 2, NOW(), NOW()),
  ('55555555-5555-5555-5555-555555555556', '55555555-5555-5555-5555-555555555555', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'Loader', '22222222-2222-2222-2222-222222222222', '08:00', '16:00', '11:15', '12:00', 2, NOW(), NOW()),
  ('66666666-6666-6666-6666-666666666667', '55555555-5555-5555-5555-555555555555', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'Unloader', '22222222-2222-2222-2222-222222222222', '08:00', '16:00', '11:15', '12:00', 2, NOW(), NOW());

-- Insert Ride Cycles (sample for morning hours)
DO $$
DECLARE
  cycle_id uuid;
  cycle_start timestamp;
  cycle_end timestamp;
  guest_count integer;
  wait_time integer := 15; -- Starting wait time
  theater_id uuid;
  theater_counter integer := 0;
BEGIN
  -- Loop through cycles from 9am to 12pm
  FOR hour IN 9..11 LOOP
    FOR minute IN 0..55 BY 5 LOOP -- 5-minute cycle time
      -- Generate a UUID for the cycle
      cycle_id := uuid_generate_v4();
      
      -- Set the start and end times
      cycle_start := (CURRENT_DATE + make_interval(hours => hour, mins => minute))::timestamp;
      cycle_end := cycle_start + interval '5 minutes';
      
      -- Rotate through theaters
      theater_counter := theater_counter + 1;
      IF theater_counter % 3 = 1 THEN
        theater_id := '11111111-1111-1111-1111-111111111111'; -- Theater 1
      ELSIF theater_counter % 3 = 2 THEN
        theater_id := '22222222-2222-2222-2222-222222222222'; -- Theater 2
      ELSE
        theater_id := '33333333-3333-3333-3333-333333333333'; -- Theater 3
        -- Only use Theater 3 before maintenance (until 10:30)
        IF hour >= 10 AND minute >= 30 THEN
          CONTINUE; -- Skip this iteration - Theater 3 in maintenance
        END IF;
      END IF;
      
      -- Randomize guest count (75-87)
      guest_count := 75 + floor(random() * 13)::integer;
      
      -- Adjust wait time (slight changes each cycle)
      IF random() > 0.7 THEN
        wait_time := wait_time + floor(random() * 3)::integer;
      ELSIF random() < 0.3 AND wait_time > 5 THEN
        wait_time := wait_time - floor(random() * 3)::integer;
      END IF;
      
      -- Insert the ride cycle
      INSERT INTO ride_cycles (
        id, theater_id, operation_day_id, cycle_start_time, cycle_end_time,
        guest_count, wheelchair_count, ecv_count, load_time, unload_time,
        cycle_status, wait_time_posted, wait_time_actual, incident_occurred, notes
      ) VALUES (
        cycle_id, theater_id, '55555555-5555-5555-5555-555555555555', 
        cycle_start, cycle_end, guest_count, 
        floor(random() * 3)::integer, -- 0-2 wheelchairs
        floor(random() * 2)::integer, -- 0-1 ECVs
        60 + floor(random() * 30)::integer, -- 60-90 seconds load time
        45 + floor(random() * 20)::integer, -- 45-65 seconds unload time
        'COMPLETED', wait_time, wait_time + floor(random() * 5 - 2)::integer, -- Actual wait time varies slightly
        FALSE, NULL
      );
    END LOOP;
  END LOOP;
END $$;

-- Insert an incident
INSERT INTO incidents (
  id, ride_cycle_id, incident_time, incident_type, severity,
  theater_id, reported_by, description, resolution, downtime_minutes,
  guests_evacuated, incident_status, created_at, updated_at
) VALUES (
  uuid_generate_v4(),
  (SELECT id FROM ride_cycles ORDER BY cycle_start_time DESC LIMIT 1), -- Use the most recent ride cycle
  NOW() - interval '2 hours',
  'MECHANICAL',
  3,
  '33333333-3333-3333-3333-333333333333', -- Theater 3
  '66666666-6666-6666-6666-666666666666', -- John Smith (Lead)
  'Theater 3 motion base experiencing irregular movement patterns during ride cycle. Guests reported vibration and jerky movements.',
  'Maintenance team called. Theater taken offline for diagnostic and repair.',
  45, -- 45 minutes of downtime
  0, -- No guests evacuated
  'RESOLVED',
  NOW(),
  NOW()
);

-- Insert maintenance logs
INSERT INTO maintenance_logs (
  id, theater_id, maintenance_type, technician_name,
  start_time, end_time, description, parts_replaced,
  maintenance_result, next_maintenance_due, notes,
  created_at, updated_at
) VALUES
  (
    uuid_generate_v4(),
    '33333333-3333-3333-3333-333333333333', -- Theater 3
    'CORRECTIVE',
    'Mike Johnson',
    NOW() - interval '2 hours',
    NOW() - interval '1 hour 15 minutes',
    'Diagnosed irregular motion base operation. Found worn hydraulic seals causing pressure fluctuations in the motion control system.',
    'Hydraulic seals on primary motion actuator, pressure regulator valve',
    'COMPLETED',
    CURRENT_DATE + interval '30 days',
    'Recommend full hydraulic system flush during next preventative maintenance window.',
    NOW(),
    NOW()
  ),
  (
    uuid_generate_v4(),
    '11111111-1111-1111-1111-111111111111', -- Theater 1
    'PREVENTATIVE',
    'Lisa Thompson',
    NOW() - interval '7 days',
    NOW() - interval '7 days' + interval '3 hours',
    'Scheduled 30-day preventative maintenance. Performed system diagnostics, calibration of motion system, and inspection of all guest restraint systems.',
    NULL,
    'COMPLETED',
    CURRENT_DATE + interval '23 days',
    'All systems operating within normal parameters. No issues found.',
    NOW() - interval '7 days',
    NOW() - interval '7 days'
  ),
  (
    uuid_generate_v4(),
    '22222222-2222-2222-2222-222222222222', -- Theater 2
    'PREVENTATIVE',
    'Lisa Thompson',
    NOW() - interval '14 days',
    NOW() - interval '14 days' + interval '4 hours',
    'Scheduled 30-day preventative maintenance. Performed system diagnostics, calibration of motion system, and inspection of all guest restraint systems. Replaced air filters in ventilation system.',
    'HVAC air filters, lubrication oil for motion base',
    'COMPLETED',
    CURRENT_DATE + interval '16 days',
    'Noticed slight vibration in secondary actuator during extension. Within tolerances but should be monitored during next maintenance cycle.',
    NOW() - interval '14 days',
    NOW() - interval '14 days'
  ),
  (
    uuid_generate_v4(),
    '33333333-3333-3333-3333-333333333333', -- Theater 3
    'EMERGENCY',
    'Robert Davis',
    NOW() - interval '45 days',
    NOW() - interval '45 days' + interval '8 hours',
    'Emergency response to guest-reported loud bang during operation. Investigation revealed failure of main support bracket for motion base actuator.',
    'Motion base primary support bracket, mounting hardware, hydraulic connectors',
    'COMPLETED',
    NOW() - interval '21 days',
    'Complete teardown of motion system required. Parts expedited from warehouse. Unit stress tested after repair before returning to service.',
    NOW() - interval '45 days',
    NOW() - interval '45 days'
  ),
  (
    uuid_generate_v4(),
    '33333333-3333-3333-3333-333333333333', -- Theater 3
    'PREVENTATIVE',
    'Lisa Thompson',
    NOW() - interval '21 days',
    NOW() - interval '21 days' + interval '5 hours',
    'Scheduled 30-day preventative maintenance with additional focus on motion system following previous emergency repair. Full diagnostic and stress testing of all components.',
    'Backup power system battery, emergency lighting module, several restraint system padding elements showing wear',
    'COMPLETED',
    CURRENT_DATE + interval '9 days',
    'All repairs holding well. Motion system operating within expected parameters. Replaced several worn guest comfort items proactively.',
    NOW() - interval '21 days',
    NOW() - interval '21 days'
  );

-- Add afternoon ride cycles (with higher attendance and wait times)
DO $$
DECLARE
  cycle_id uuid;
  cycle_start timestamp;
  cycle_end timestamp;
  guest_count integer;
  wait_time integer := 35; -- Higher afternoon wait time
  theater_id uuid;
  theater_counter integer := 0;
  incident_chance float;
BEGIN
  -- Loop through cycles from 12pm to 6pm
  FOR hour IN 12..17 LOOP
    FOR minute IN 0..55 BY 5 LOOP -- 5-minute cycle time
      -- Generate a UUID for the cycle
      cycle_id := uuid_generate_v4();
      
      -- Set the start and end times
      cycle_start := (CURRENT_DATE + make_interval(hours => hour, mins => minute))::timestamp;
      cycle_end := cycle_start + interval '5 minutes';
      
      -- Rotate through theaters (Theater 3 back online at 2pm)
      theater_counter := theater_counter + 1;
      IF theater_counter % 3 = 1 THEN
        theater_id := '11111111-1111-1111-1111-111111111111'; -- Theater 1
      ELSIF theater_counter % 3 = 2 THEN
        theater_id := '22222222-2222-2222-2222-222222222222'; -- Theater 2
      ELSE
        theater_id := '33333333-3333-3333-3333-333333333333'; -- Theater 3
        -- Only use Theater 3 after maintenance completion (2pm)
        IF hour < 14 THEN
          CONTINUE; -- Skip this iteration - Theater 3 still in maintenance
        END IF;
      END IF;
      
      -- Randomize guest count (80-87 for peak hours)
      guest_count := 80 + floor(random() * 8)::integer;
      
      -- Adjust wait time (peak at 3-4pm, then decline)
      IF hour = 15 OR hour = 16 THEN
        wait_time := 45 + floor(random() * 10)::integer; -- 45-55 minute wait at peak
      ELSIF hour = 17 THEN
        wait_time := 30 + floor(random() * 10)::integer; -- Declining in evening
      ELSE
        -- Slight randomization
        IF random() > 0.7 THEN
          wait_time := wait_time + floor(random() * 3)::integer;
        ELSIF random() < 0.3 AND wait_time > 5 THEN
          wait_time := wait_time - floor(random() * 3)::integer;
        END IF;
      END IF;
      
      -- Small chance of an incident (excluding the already created major incident)
      incident_chance := random();
      
      -- Insert the ride cycle
      INSERT INTO ride_cycles (
        id, theater_id, operation_day_id, cycle_start_time, cycle_end_time,
        guest_count, wheelchair_count, ecv_count, load_time, unload_time,
        cycle_status, wait_time_posted, wait_time_actual, incident_occurred, notes
      ) VALUES (
        cycle_id, theater_id, '55555555-5555-5555-5555-555555555555', 
        cycle_start, cycle_end, guest_count, 
        floor(random() * 3)::integer, -- 0-2 wheelchairs
        floor(random() * 2)::integer, -- 0-1 ECVs
        60 + floor(random() * 30)::integer, -- 60-90 seconds load time
        45 + floor(random() * 20)::integer, -- 45-65 seconds unload time
        CASE 
          WHEN incident_chance < 0.01 THEN 'INTERRUPTED' -- 1% chance of interruption
          ELSE 'COMPLETED'
        END,
        wait_time, 
        wait_time + floor(random() * 10 - 5)::integer, -- Actual wait time varies more in busy periods
        incident_chance < 0.01, -- 1% chance of minor incident
        CASE 
          WHEN incident_chance < 0.01 THEN 'Minor operational delay - guest assistance required'
          ELSE NULL
        END
      );
      
      -- Create a minor incident report for interrupted cycles
      IF incident_chance < 0.01 THEN
        INSERT INTO incidents (
          id, ride_cycle_id, incident_time, incident_type, severity,
          theater_id, reported_by, description, resolution, downtime_minutes,
          guests_evacuated, incident_status, created_at, updated_at
        ) VALUES (
          uuid_generate_v4(),
          cycle_id,
          cycle_start + interval '2 minutes',
          CASE 
            WHEN random() < 0.5 THEN 'GUEST ILLNESS'
            ELSE 'OTHER'
          END,
          2, -- Minor severity
          theater_id,
          CASE 
            WHEN random() < 0.5 THEN '66666666-6666-6666-6666-666666666666' -- John Smith (Lead)
            ELSE '77777777-7777-7777-7777-777777777777' -- Sarah Johnson (Console)
          END,
          CASE 
            WHEN random() < 0.5 THEN 'Guest reported motion sickness during ride. Cycle paused for guest assistance.'
            ELSE 'Guest item dropped during ride. Brief pause required for retrieval.'
          END,
          'Issue addressed without evacuation. Normal operations resumed after minor delay.',
          5 + floor(random() * 5)::integer, -- 5-10 minutes delay
          0, -- No evacuations
          'RESOLVED',
          NOW(),
          NOW()
        );
      END IF;
    END LOOP;
  END LOOP;
END $$;

-- Add evening ride cycles (declining attendance and wait times)
DO $$
DECLARE
  cycle_id uuid;
  cycle_start timestamp;
  cycle_end timestamp;
  guest_count integer;
  wait_time integer := 25; -- Starting evening wait time
  theater_id uuid;
  theater_counter integer := 0;
BEGIN
  -- Loop through cycles from 6pm to 9pm
  FOR hour IN 18..20 LOOP
    FOR minute IN 0..55 BY 5 LOOP -- 5-minute cycle time
      -- Generate a UUID for the cycle
      cycle_id := uuid_generate_v4();
      
      -- Set the start and end times
      cycle_start := (CURRENT_DATE + make_interval(hours => hour, mins => minute))::timestamp;
      cycle_end := cycle_start + interval '5 minutes';
      
      -- Rotate through theaters
      theater_counter := theater_counter + 1;
      IF theater_counter % 3 = 1 THEN
        theater_id := '11111111-1111-1111-1111-111111111111'; -- Theater 1
      ELSIF theater_counter % 3 = 2 THEN
        theater_id := '22222222-2222-2222-2222-222222222222'; -- Theater 2
      ELSE
        theater_id := '33333333-3333-3333-3333-333333333333'; -- Theater 3
      END IF;
      
      -- Randomize guest count (declining in evening)
      guest_count := 60 + floor(random() * 20)::integer;
      
      -- Declining wait time as evening progresses
      wait_time := GREATEST(5, 25 - (hour - 18) * 10 + floor(random() * 5)::integer);
      
      -- Insert the ride cycle
      INSERT INTO ride_cycles (
        id, theater_id, operation_day_id, cycle_start_time, cycle_end_time,
        guest_count, wheelchair_count, ecv_count, load_time, unload_time,
        cycle_status, wait_time_posted, wait_time_actual, incident_occurred, notes
      ) VALUES (
        cycle_id, theater_id, '55555555-5555-5555-5555-555555555555', 
        cycle_start, cycle_end, guest_count, 
        floor(random() * 3)::integer, -- 0-2 wheelchairs
        floor(random() * 2)::integer, -- 0-1 ECVs
        60 + floor(random() * 20)::integer, -- 60-80 seconds load time (faster in evening)
        40 + floor(random() * 20)::integer, -- 40-60 seconds unload time
        'COMPLETED',
        wait_time, 
        wait_time + floor(random() * 6 - 3)::integer, -- Actual wait time varies slightly
        FALSE,
        NULL
      );
    END LOOP;
  END LOOP;
END $$;
