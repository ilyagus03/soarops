-- SoarOps Database Schema
-- This schema defines the tables needed for the Soarin' Operations Management System

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop tables if they exist
DROP TABLE IF EXISTS maintenance_logs;
DROP TABLE IF EXISTS incidents;
DROP TABLE IF EXISTS staff_assignments;
DROP TABLE IF EXISTS staff_members;
DROP TABLE IF EXISTS ride_cycles;
DROP TABLE IF EXISTS operation_days;
DROP TABLE IF EXISTS theaters;
DROP TABLE IF EXISTS weather_conditions;

-- Weather conditions for the day
CREATE TABLE weather_conditions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE NOT NULL,
    temperature_high NUMERIC(4,1) NOT NULL,
    temperature_low NUMERIC(4,1) NOT NULL,
    precipitation NUMERIC(4,2),  -- inches
    humidity NUMERIC(5,2),       -- percentage
    wind_speed NUMERIC(4,1),     -- mph
    weather_condition VARCHAR(50) NOT NULL, -- e.g., 'Sunny', 'Rainy', 'Partly Cloudy'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(date)
);

-- Theaters (Soarin' has multiple identical theaters)
CREATE TABLE theaters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    theater_number INTEGER NOT NULL,
    capacity INTEGER NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'OPERATIONAL', -- OPERATIONAL, MAINTENANCE, DOWN
    last_maintenance_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(theater_number)
);

-- Operation days - daily statistics and parameters
CREATE TABLE operation_days (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE NOT NULL,
    park_opening_time TIME NOT NULL,
    park_closing_time TIME NOT NULL,
    expected_attendance INTEGER NOT NULL,  -- expected park attendance
    actual_attendance INTEGER,             -- actual park attendance (filled at end of day)
    special_event BOOLEAN DEFAULT FALSE,
    weather_id UUID REFERENCES weather_conditions(id),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(date)
);

-- Ride cycles - each cycle of the ride
CREATE TABLE ride_cycles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    theater_id UUID REFERENCES theaters(id),
    operation_day_id UUID REFERENCES operation_days(id),
    cycle_start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    cycle_end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    guest_count INTEGER NOT NULL,         -- number of guests on this cycle
    wheelchair_count INTEGER DEFAULT 0,   -- number of wheelchairs on this cycle
    ecv_count INTEGER DEFAULT 0,          -- number of ECVs on this cycle
    load_time INTEGER NOT NULL,           -- seconds to load
    unload_time INTEGER NOT NULL,         -- seconds to unload
    cycle_status VARCHAR(20) NOT NULL DEFAULT 'COMPLETED', -- COMPLETED, INTERRUPTED, ABORTED
    wait_time_posted INTEGER,             -- wait time posted at start of cycle (minutes)
    wait_time_actual INTEGER,             -- actual wait time at start of cycle (minutes)
    incident_occurred BOOLEAN DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Staff members
CREATE TABLE staff_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id VARCHAR(20) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    position VARCHAR(50) NOT NULL,         -- Greeter, Grouper, Loader, Unloader, Console, Lead, Coordinator
    hire_date DATE NOT NULL,
    certification_level INTEGER NOT NULL,  -- 1-5 skill level
    is_trainer BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Staff assignments for each day
CREATE TABLE staff_assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    operation_day_id UUID REFERENCES operation_days(id),
    staff_id UUID REFERENCES staff_members(id),
    position VARCHAR(50) NOT NULL,         -- Position assigned for this day
    theater_id UUID REFERENCES theaters(id),
    shift_start_time TIME NOT NULL,
    shift_end_time TIME NOT NULL,
    break_start_time TIME,
    break_end_time TIME,
    rotation_group INTEGER,               -- Rotation group number
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(operation_day_id, staff_id, shift_start_time)
);

-- Incidents logged during operation
CREATE TABLE incidents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ride_cycle_id UUID REFERENCES ride_cycles(id),
    incident_time TIMESTAMP WITH TIME ZONE NOT NULL,
    incident_type VARCHAR(50) NOT NULL,   -- E-STOP, GUEST ILLNESS, MECHANICAL, OTHER
    severity INTEGER NOT NULL,            -- 1-5 (5 being most severe)
    theater_id UUID REFERENCES theaters(id),
    reported_by UUID REFERENCES staff_members(id),
    description TEXT NOT NULL,
    resolution TEXT,
    downtime_minutes INTEGER,             -- how long the ride was down
    guests_evacuated INTEGER DEFAULT 0,   -- number of guests evacuated if any
    incident_status VARCHAR(20) DEFAULT 'OPEN', -- OPEN, RESOLVED, INVESTIGATING
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Maintenance logs
CREATE TABLE maintenance_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    theater_id UUID REFERENCES theaters(id),
    maintenance_type VARCHAR(50) NOT NULL, -- PREVENTATIVE, CORRECTIVE, EMERGENCY
    technician_name VARCHAR(100) NOT NULL,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE,
    description TEXT NOT NULL,
    parts_replaced TEXT,
    maintenance_result VARCHAR(50) NOT NULL, -- COMPLETED, PARTIAL, DEFERRED
    next_maintenance_due DATE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_ride_cycles_operation_day ON ride_cycles(operation_day_id);
CREATE INDEX idx_ride_cycles_theater ON ride_cycles(theater_id);
CREATE INDEX idx_staff_assignments_operation_day ON staff_assignments(operation_day_id);
CREATE INDEX idx_incidents_ride_cycle ON incidents(ride_cycle_id);
CREATE INDEX idx_maintenance_logs_theater ON maintenance_logs(theater_id);