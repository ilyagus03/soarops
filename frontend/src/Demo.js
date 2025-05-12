import React, { useState } from "react";

// --- Name lists ---
const FIRST_NAMES = [
  "Alex", "Taylor", "Jordan", "Morgan", "Casey", "Jamie", "Drew", "Avery", "Riley", "Parker",
  "Sydney", "Cameron", "Reese", "Quinn", "Skyler", "Rowan", "Emerson", "Harper", "Logan", "Finley",
  "Sawyer", "Dakota", "Charlie", "Elliot", "Jesse", "Robin", "Sam", "Blake", "Reagan", "Hayden", "Jules"
];
const LAST_NAMES = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Martinez", "Hernandez",
  "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Moore", "Martin", "Lee", "Perez", "Thompson",
  "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Walker", "Young", "Allen", "King"
];

// --- Position Definitions ---
const THEATER_POSITIONS = ["Tower", "Grouper", "Gate", "Assist", "Wheelchair Assist"];
const GLOBAL_POSITIONS = [
  "Standby Greeter",
  "Lightning Lane 1",
  "Lightning Lane 2",
  "Tour Desk",
  "Lost & Found",
  "Pre-Merge",
  "Merge"
];
const THEATERS = ["A", "B", "C"];
const THEATER_NAMES = { A: "A Theater", B: "B Theater", C: "C Theater" };

// --- Helper Functions ---
function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function getRandomBreakTime() {
  const hour = 10 + Math.floor(Math.random() * 7);
  const min = Math.random() < 0.5 ? "00" : "30";
  return `${hour}:${min}`;
}
function randomFullName(existingNames = []) {
  let name;
  do {
    name = `${getRandom(FIRST_NAMES)} ${getRandom(LAST_NAMES)}`;
  } while (existingNames.includes(name));
  return name;
}
function randomCastId(existingIds = []) {
  let id;
  do {
    id = String(100000 + Math.floor(Math.random() * 900000));
  } while (existingIds.includes(id));
  return id;
}

// --- Generate Initial Full Staff List ---
function generateInitialStaff() {
  let staff = [];
  let id = 1;
  let usedNames = [];
  let usedIds = [];
  // Fill all theater positions for each theater
  for (let theater of THEATERS) {
    for (let pos of THEATER_POSITIONS) {
      let position = pos === "Gate" ? `${theater} Gate` : pos;
      let name = randomFullName(usedNames);
      let castId = randomCastId(usedIds);
      usedNames.push(name);
      usedIds.push(castId);
      staff.push({
        id: id++,
        castId,
        name,
        position,
        theater,
        status: "On Duty",
        breakTime: getRandomBreakTime(),
        efficiency: 85 + Math.floor(Math.random() * 15)
      });
    }
  }
  // Fill all global positions (one each)
  for (let pos of GLOBAL_POSITIONS) {
    let name = randomFullName(usedNames);
    let castId = randomCastId(usedIds);
    usedNames.push(name);
    usedIds.push(castId);
    staff.push({
      id: id++,
      castId,
      name,
      position: pos,
      theater: null,
      status: "On Duty",
      breakTime: getRandomBreakTime(),
      efficiency: 85 + Math.floor(Math.random() * 15)
    });
  }
  // Add extra staff (on break)
  for (let i = 0; i < 6; i++) {
    let name = randomFullName(usedNames);
    let castId = randomCastId(usedIds);
    usedNames.push(name);
    usedIds.push(castId);
    staff.push({
      id: id++,
      castId,
      name,
      position: "Unassigned",
      theater: null,
      status: "On Break",
      breakTime: getRandomBreakTime(),
      efficiency: 85 + Math.floor(Math.random() * 15)
    });
  }
  return staff;
}

// --- Random Assignment Logic ---
function getRandomAssignment(staffList) {
  // 20% chance for Tower position
  if (Math.random() < 0.2) {
    for (let theater of THEATERS) {
      if (!staffList.some(s => s.position === "Tower" && s.theater === theater && s.status === "On Duty")) {
        return { position: "Tower", theater };
      }
    }
  }
  // Try other theater positions
  const otherTheaterPositions = THEATER_POSITIONS.filter(p => p !== "Tower");
  for (let pos of otherTheaterPositions) {
    for (let theater of THEATERS) {
      let position = pos === "Gate" ? `${theater} Gate` : pos;
      if (!staffList.some(s => s.position === position && s.theater === theater && s.status === "On Duty")) {
        return { position, theater };
      }
    }
  }
  // Try global positions (only one of each)
  for (let pos of GLOBAL_POSITIONS) {
    if (!staffList.some(s => s.position === pos && s.status === "On Duty")) {
      return { position: pos, theater: null };
    }
  }
  // If all filled, assign to Assist in random theater
  return { position: "Assist", theater: getRandom(THEATERS) };
}

function efficiencyColor(eff) {
  if (eff >= 88) return "#10b981";
  if (eff >= 73) return "#f59e0b";
  return "#ef4444";
}

// --- Wait Time Color/Delta Helper ---
function waitTimeCell(hourlyWaitTimes, idx) {
  const item = hourlyWaitTimes[idx];
  const prev = idx > 0 ? hourlyWaitTimes[idx - 1].waitTime : item.waitTime;
  const delta = item.waitTime - prev;
  let color = "#10b981"; // green
  if (delta > 2) color = "#ef4444"; // red
  else if (Math.abs(delta) <= 2) color = "#f59e0b"; // yellow
  return (
    <span style={{ color, fontWeight: "bold" }}>
      {item.waitTime}{" "}
      <span style={{ fontWeight: 400, fontSize: 13 }}>
        ({delta > 0 ? "+" : ""}{delta})
      </span>
    </span>
  );
}

function SoarOps() {
  // --- State ---
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminCode, setAdminCode] = useState("");
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showCastAccess, setShowCastAccess] = useState(false);

  // Cast Access State
  const [castStatus, setCastStatus] = useState("Off Duty");
  const [castAssignment, setCastAssignment] = useState(null);
  const [castIdInput, setCastIdInput] = useState("");
  const [castSession, setCastSession] = useState(null); // stores the cast member object being controlled
  const [castError, setCastError] = useState("");

  // Staff List
  const [staffList, setStaffList] = useState(generateInitialStaff());
  const [nextStaffId, setNextStaffId] = useState(100);

  // For admin add staff
  const [newStaffName, setNewStaffName] = useState("");
  const [newStaffCastId, setNewStaffCastId] = useState("");
  const [newStaffPosition, setNewStaffPosition] = useState(THEATER_POSITIONS[0]);
  const [newStaffTheater, setNewStaffTheater] = useState(THEATERS[0]);
  const [newStaffBreakTime, setNewStaffBreakTime] = useState(getRandomBreakTime());

  // Guest/Wait/Efficiency
  const [guestCount, setGuestCount] = useState(36542);
  const [liveWaitTime, setLiveWaitTime] = useState(45);
  const [hourlyWaitTimes, setHourlyWaitTimes] = useState([
    { hour: "8 AM", waitTime: 30 },
    { hour: "9 AM", waitTime: 35 },
    { hour: "10 AM", waitTime: 50 },
    { hour: "11 AM", waitTime: 65 },
    { hour: "12 PM", waitTime: 70 },
    { hour: "1 PM", waitTime: 55 },
    { hour: "2 PM", waitTime: 45 },
    { hour: "3 PM", waitTime: 40 },
    { hour: "4 PM", waitTime: 35 },
    { hour: "5 PM", waitTime: 40 },
    { hour: "6 PM", waitTime: 30 },
    { hour: "7 PM", waitTime: 25 }
  ]);
  const [hourlyEfficiency, setHourlyEfficiency] = useState([
    { hour: "8 AM", efficiency: 91 },
    { hour: "9 AM", efficiency: 93 },
    { hour: "10 AM", efficiency: 96 },
    { hour: "11 AM", efficiency: 94 },
    { hour: "12 PM", efficiency: 89 },
    { hour: "1 PM", efficiency: 87 },
    { hour: "2 PM", efficiency: 90 },
    { hour: "3 PM", efficiency: 94 },
    { hour: "4 PM", efficiency: 96 },
    { hour: "5 PM", efficiency: 97 },
    { hour: "6 PM", efficiency: 95 },
    { hour: "7 PM", efficiency: 92 }
  ]);
  const [theaterStatus, setTheaterStatus] = useState({
    A: "Operational",
    B: "Operational",
    C: "Maintenance"
  });

  // --- Leadership/Admin Modal Logic ---
  const verifyAdminCode = () => {
    if (adminCode === "123456789") {
      setIsAdminMode(true);
      setShowAdminModal(false);
    } else {
      alert("Invalid authorization code. Please try again or contact your supervisor.");
    }
  };

  // --- Cast Access Logic ---
  function handleCastIdSubmit(e) {
    e.preventDefault();
    setCastError("");
    const found = staffList.find(s => s.castId === castIdInput);
    if (!found) {
      setCastSession(null);
      setCastError("Cast ID not found. Please try again.");
      setCastStatus("Off Duty");
      setCastAssignment(null);
      return;
    }
    setCastSession(found);
    setCastStatus(found.status);
    setCastAssignment(found.position !== "Unassigned" ? { position: found.position, theater: found.theater } : null);
    setCastError("");
  }

  function handleCastClockIn() {
    if (!castSession) return;
    setCastStatus("On Duty");
    setStaffList(list =>
      list.map(s =>
        s.castId === castSession.castId
          ? { ...s, status: "On Duty" }
          : s
      )
    );
  }

  function handleCastGetAssignment() {
    if (!castSession) return;
    const assignment = getRandomAssignment(staffList);
    setCastAssignment(assignment);
    setStaffList(list =>
      list.map(s =>
        s.castId === castSession.castId
          ? {
              ...s,
              position: assignment.position,
              theater: assignment.theater,
              status: "On Duty"
            }
          : s
      )
    );
  }

  function handleCastLunch() {
    if (!castSession) return;
    setCastStatus("On Break");
    setStaffList(list =>
      list.map(s =>
        s.castId === castSession.castId && s.status === "On Duty"
          ? { ...s, status: "On Break" }
          : s
      )
    );
  }

  function handleCastClockOut() {
    if (!castSession) return;
    setCastStatus("Off Duty");
    setCastAssignment(null);
    setStaffList(list =>
      list.map(s =>
        s.castId === castSession.castId ? { ...s, status: "Off Duty" } : s
      )
    );
  }

  // Bump Out logic: swap break status with another cast member
  function handleCastBumpOut(breakStaffId) {
    if (!castSession) return;
    setStaffList(list =>
      list.map(s => {
        if (s.id === breakStaffId) {
          return { ...s, status: "On Duty" };
        } else if (s.castId === castSession.castId) {
          return { ...s, status: "On Break" };
        } else {
          return s;
        }
      })
    );
    setCastStatus("On Break");
  }

  // --- Admin Features ---
  const handleAddStaff = () => {
    // Use a random name if none entered
    const name = newStaffName.trim() || randomFullName(staffList.map(s => s.name));
    const castId = newStaffCastId.trim() || randomCastId(staffList.map(s => s.castId));
    setStaffList([
      ...staffList,
      {
        id: nextStaffId,
        castId,
        name,
        position: newStaffPosition === "Gate" ? `${newStaffTheater} Gate` : newStaffPosition,
        theater: THEATER_POSITIONS.includes(newStaffPosition) ? newStaffTheater : null,
        status: "On Duty",
        breakTime: newStaffBreakTime,
        efficiency: 85 + Math.floor(Math.random() * 15)
      }
    ]);
    setNextStaffId(id => id + 1);
    setNewStaffName("");
    setNewStaffCastId("");
    alert("Staff member added successfully!");
  };

  // Leadership can move cast to any position/theater
  const handleMoveStaff = (id, newPosition, newTheater) => {
    setStaffList(list =>
      list.map(s =>
        s.id === id
          ? {
              ...s,
              position: newPosition === "Gate" ? `${newTheater} Gate` : newPosition,
              theater: THEATER_POSITIONS.includes(newPosition) ? newTheater : null
            }
          : s
      )
    );
  };

  const handleCastIdChange = (id, newCastId) => {
    setStaffList(list =>
      list.map(s =>
        s.id === id ? { ...s, castId: newCastId } : s
      )
    );
  };

  const handleBreakTimeChange = (id, newBreakTime) => {
    setStaffList(staffList.map(staff =>
      staff.id === id ? { ...staff, breakTime: newBreakTime } : staff
    ));
  };

  // --- Guest/Wait Time Controls ---
  const handleGuestCountChange = (amount) => {
    setGuestCount(Math.max(0, guestCount + amount));
  };

  const handleCustomGuestCountChange = (newCount) => {
    const count = parseInt(newCount);
    if (!isNaN(count) && count >= 0) {
      setGuestCount(count);
    }
  };

  const handleLiveWaitTimeChange = (amount) => {
    setLiveWaitTime(Math.max(0, liveWaitTime + amount));
    setTimeout(updateHourlyWaitTimes, 10);
  };

  const handleCustomWaitTimeChange = (newTime) => {
    const time = parseInt(newTime);
    if (!isNaN(time) && time >= 0) {
      setLiveWaitTime(time);
      setTimeout(updateHourlyWaitTimes, 10);
    }
  };

  const updateHourlyWaitTimes = () => {
    const currentHour = new Date().getHours();
    let hourString = currentHour >= 12
      ? `${currentHour > 12 ? currentHour - 12 : currentHour} PM`
      : `${currentHour === 0 ? 12 : currentHour} AM`;

    setHourlyWaitTimes(hourlyWaitTimes.map(item =>
      item.hour === hourString
        ? { ...item, waitTime: liveWaitTime }
        : item
    ));
  };

  // --- Calculations ---
  const averageWaitTime = Math.round(
    hourlyWaitTimes.reduce((sum, item) => sum + item.waitTime, 0) / hourlyWaitTimes.length
  );
  const averageEfficiency = Math.round(
    hourlyEfficiency.reduce((sum, item) => sum + item.efficiency, 0) / hourlyEfficiency.length
  );

  // --- Real-time Staffing Counts ---
  function getStaffCount(theater, position) {
    if (position === "Gate") position = `${theater} Gate`;
    return staffList.filter(
      s =>
        s.status === "On Duty" &&
        s.position === position &&
        (s.theater === theater || !s.theater)
    ).length;
  }

  // --- UI Styles ---
  const buttonStyle = {
    padding: "8px 14px",
    backgroundColor: "#0066b2",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    margin: "0 8px 8px 0"
  };
  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#10b981"
  };
  const navButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#f1f5fb",
    color: "#0066b2",
    border: "1px solid #e0e8f5"
  };
  const statusThStyle = {
    padding: "8px",
    border: "1px solid #e0e8f5",
    backgroundColor: "#f1f5fb",
    fontWeight: "600",
    color: "#0066b2",
    fontSize: "13px"
  };
  const statusTdStyle = {
    padding: "8px",
    border: "1px solid #e0e8f5",
    textAlign: "center",
    fontSize: "13px"
  };

  // --- Main Render ---
  return (
    <div
      style={{
        padding: "32px",
        backgroundColor: "#f5f9ff",
        fontFamily: '"Avenir Next", "Segoe UI", Arial, sans-serif',
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        maxWidth: "1100px",
        margin: "40px auto",
        border: "1px solid #e0e8f5"
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "24px",
          borderBottom: "2px solid #e0e8f5",
          paddingBottom: "18px",
          flexWrap: "wrap"
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              backgroundColor: "#0066b2",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: "bold",
              fontSize: "24px",
              marginRight: "16px"
            }}
          >
            <span role="img" aria-label="castle">
              🏰
            </span>
          </div>
          <div>
            <h1
              style={{
                color: "#0066b2",
                fontSize: "28px",
                margin: "0 0 4px 0",
                fontWeight: "700",
                letterSpacing: "-0.5px"
              }}
            >
              SoarOps Command Center
            </h1>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              color: '#637385',
              fontSize: '15px',
              gap: '20px'
            }}>
              <p style={{ margin: 0 }}>Attraction Operations Management</p>
            </div>
          </div>
        </div>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px"
        }}>
          <button
            style={navButtonStyle}
            onClick={() => {
              setShowCastAccess(false);
              setIsAdminMode(false);
              setCastSession(null);
              setCastIdInput("");
            }}
          >
            Home
          </button>
          <button
            style={navButtonStyle}
            onClick={() => {
              setShowCastAccess(false);
              setShowAdminModal(true);
              setCastSession(null);
              setCastIdInput("");
            }}
          >
            Leadership Access
          </button>
          <button
            style={secondaryButtonStyle}
            onClick={() => {
              setShowCastAccess(true);
              setIsAdminMode(false);
              setShowAdminModal(false);
              setCastSession(null);
              setCastIdInput("");
            }}
          >
            Cast Access
          </button>
        </div>
      </div>

      {/* Admin Modal */}
      {showAdminModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "32px",
              borderRadius: "12px",
              width: "350px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)"
            }}
          >
            <h2
              style={{
                margin: "0 0 20px 0",
                color: "#0066b2",
                fontSize: "22px"
              }}
            >
              Leadership Authentication
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: "#637385",
                marginBottom: "15px"
              }}
            >
              Enter leadership code to access admin features:
            </p>
            <input
              type="password"
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value)}
              placeholder="Enter code"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "6px",
                border: "1px solid #ddd",
                marginBottom: "20px",
                fontSize: "15px"
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  verifyAdminCode();
                }
              }}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button
                style={navButtonStyle}
                onClick={() => setShowAdminModal(false)}
              >
                Cancel
              </button>
              <button style={buttonStyle} onClick={verifyAdminCode}>
                Login
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cast Access Page */}
      {showCastAccess && (
        <div
          style={{
            background: "white",
            borderRadius: "12px",
            padding: "36px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
            border: "1px solid #eef2f8",
            maxWidth: "500px",
            margin: "0 auto"
          }}
        >
          <h2 style={{ color: "#0066b2", fontWeight: 700, marginBottom: 12 }}>
            Cast Member Portal
          </h2>
          {!castSession && (
            <form onSubmit={handleCastIdSubmit}>
              <input
                type="text"
                placeholder="Enter your Cast ID"
                value={castIdInput}
                onChange={e => setCastIdInput(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #ddd",
                  marginBottom: "16px",
                  fontSize: "15px"
                }}
              />
              <button style={buttonStyle} type="submit">
                Access
              </button>
              {castError && (
                <div style={{ color: "#ef4444", marginTop: 10 }}>{castError}</div>
              )}
            </form>
          )}
          {castSession && (
            <>
              <div style={{ marginBottom: 8, fontSize: 16 }}>
                <b>Name:</b> {castSession.name} <br />
                <b>Cast ID:</b> {castSession.castId}
              </div>
              <div style={{ marginBottom: 22 }}>
                <div style={{ fontSize: 18, marginBottom: 4 }}>
                  <b>Status:</b>{" "}
                  <span
                    style={{
                      color:
                        castStatus === "On Duty"
                          ? "#10b981"
                          : castStatus === "On Break"
                          ? "#f59e0b"
                          : "#637385"
                    }}
                  >
                    {castStatus}
                  </span>
                </div>
                <div style={{ fontSize: 16, marginBottom: 8 }}>
                  <b>Assignment:</b>{" "}
                  {castAssignment ? (
                    <span>
                      {castAssignment.position}
                      {castAssignment.theater
                        ? ` - ${THEATER_NAMES[castAssignment.theater]}`
                        : ""}
                    </span>
                  ) : (
                    <span style={{ color: "#999" }}>None</span>
                  )}
                </div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
                <button
                  style={buttonStyle}
                  onClick={handleCastClockIn}
                  disabled={castStatus === "On Duty"}
                >
                  Clock-In
                </button>
                <button
                  style={buttonStyle}
                  onClick={handleCastGetAssignment}
                  disabled={castStatus !== "On Duty"}
                >
                  Get Assignment
                </button>
                <button
                  style={buttonStyle}
                  onClick={handleCastLunch}
                  disabled={castStatus !== "On Duty"}
                >
                  Lunch
                </button>
                <button
                  style={buttonStyle}
                  onClick={handleCastClockOut}
                  disabled={castStatus === "Off Duty"}
                >
                  Clock Out
                </button>
                <button
                  style={navButtonStyle}
                  onClick={() => {
                    setCastSession(null);
                    setCastIdInput("");
                    setCastStatus("Off Duty");
                    setCastAssignment(null);
                  }}
                >
                  Log Out
                </button>
              </div>
              <div style={{ marginBottom: 18, overflowX: "auto" }}>
                <h4 style={{ margin: "0 0 8px 0", color: "#0066b2" }}>All Cast Breaks</h4>
                <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse", minWidth: 380 }}>
                  <thead>
                    <tr>
                      <th style={statusThStyle}>Name</th>
                      <th style={statusThStyle}>Break Time</th>
                      <th style={statusThStyle}>Status</th>
                      <th style={statusThStyle}>Bump Out</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staffList.filter(s => s.status === "On Break").map(s => (
                      <tr key={s.id}>
                        <td style={statusTdStyle}>{s.name}</td>
                        <td style={statusTdStyle}>{s.breakTime}</td>
                        <td style={statusTdStyle}>{s.status}</td>
                        <td style={statusTdStyle}>
                          {castStatus === "On Duty" && (
                            <button
                              style={{
                                ...buttonStyle,
                                padding: "4px 10px",
                                fontSize: 13,
                                background: "#f59e0b"
                              }}
                              onClick={() => handleCastBumpOut(s.id)}
                            >
                              Bump Out
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ marginTop: 24 }}>
                <h4 style={{ margin: "0 0 8px 0", color: "#0066b2" }}>Hourly Wait Times</h4>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 300 }}>
                    <thead>
                      <tr>
                        <th style={statusThStyle}>Hour</th>
                        <th style={statusThStyle}>Wait Time (min)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hourlyWaitTimes.map((item, idx) => (
                        <tr key={idx}>
                          <td style={statusTdStyle}>{item.hour}</td>
                          <td style={statusTdStyle}>{waitTimeCell(hourlyWaitTimes, idx)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Leadership/Admin Mode */}
      {isAdminMode && !showCastAccess && (
        <div>
          {/* Button group */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginBottom: "25px"
            }}
          >
            <button
              style={buttonStyle}
              onClick={() => setIsAdminMode(false)}
            >
              Exit Leadership Mode
            </button>
          </div>

          {/* Staff Management Panel */}
          <div style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            border: '1px solid #eef2f8',
            marginBottom: '25px'
          }}>
            <h3 style={{
              color: '#0066b2',
              margin: '0 0 20px 0',
              fontSize: '18px',
              fontWeight: '600'
            }}>
              Staff Management
            </h3>
            {/* Add Staff Form */}
            <div style={{
              backgroundColor: '#f8fbff',
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid #eef2f8',
              marginBottom: '20px'
            }}>
              <h4 style={{
                margin: '0 0 15px 0',
                color: '#0066b2',
                fontSize: '16px',
                fontWeight: '600'
              }}>Add New Staff Member</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '5px',
                    fontSize: '14px',
                    color: '#637385'
                  }}>
                    Full Name:
                  </label>
                  <input
                    type="text"
                    value={newStaffName}
                    onChange={(e) => setNewStaffName(e.target.value)}
                    placeholder="Enter staff name"
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '4px',
                      border: '1px solid #ddd',
                      fontSize: '14px'
                    }}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '5px',
                    fontSize: '14px',
                    color: '#637385'
                  }}>
                    Cast ID:
                  </label>
                  <input
                    type="text"
                    value={newStaffCastId}
                    onChange={e => setNewStaffCastId(e.target.value)}
                    placeholder="e.g. 123456"
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '4px',
                      border: '1px solid #ddd',
                      fontSize: '14px'
                    }}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '5px',
                    fontSize: '14px',
                    color: '#637385'
                  }}>
                    Position:
                  </label>
                  <select
                    value={newStaffPosition}
                    onChange={(e) => setNewStaffPosition(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '4px',
                      border: '1px solid #ddd',
                      fontSize: '14px'
                    }}
                  >
                    {THEATER_POSITIONS.concat(GLOBAL_POSITIONS).map((position, index) => (
                      <option key={index} value={position}>{position}</option>
                    ))}
                  </select>
                </div>
                {THEATER_POSITIONS.includes(newStaffPosition) && (
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '5px',
                      fontSize: '14px',
                      color: '#637385'
                    }}>
                      Theater:
                    </label>
                    <select
                      value={newStaffTheater}
                      onChange={(e) => setNewStaffTheater(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '4px',
                        border: '1px solid #ddd',
                        fontSize: '14px'
                      }}
                    >
                      {THEATERS.map(theater => (
                        <option key={theater} value={theater}>{theater}</option>
                      ))}
                    </select>
                  </div>
                )}
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '5px',
                    fontSize: '14px',
                    color: '#637385'
                  }}>
                    Break Time:
                  </label>
                  <input
                    type="text"
                    value={newStaffBreakTime}
                    onChange={(e) => setNewStaffBreakTime(e.target.value)}
                    placeholder="e.g. 13:30"
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '4px',
                      border: '1px solid #ddd',
                      fontSize: '14px'
                    }}
                  />
                </div>
              </div>
              <button
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  fontSize: '15px'
                }}
                onClick={handleAddStaff}
              >
                Add Staff
              </button>
            </div>
            {/* Staff Table */}
            <div style={{
              overflowX: "auto",
              maxWidth: "100%",
              maxHeight: 340,
              marginBottom: 20,
              borderRadius: 8,
              border: "1px solid #eef2f8",
              background: "#fff"
            }}>
              <table style={{ minWidth: 700, fontSize: 13, borderCollapse: "collapse", width: "100%" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f1f5fb" }}>
                    <th style={statusThStyle}>Name</th>
                    <th style={statusThStyle}>Cast ID</th>
                    <th style={statusThStyle}>Position</th>
                    <th style={statusThStyle}>Theater</th>
                    <th style={statusThStyle}>Break</th>
                    <th style={statusThStyle}>Status</th>
                    <th style={statusThStyle}>Efficiency</th>
                  </tr>
                </thead>
                <tbody>
                  {staffList.map(staff => (
                    <tr key={staff.id}>
                      <td style={statusTdStyle}>{staff.name}</td>
                      <td style={statusTdStyle}>
                        <input
                          type="text"
                          value={staff.castId}
                          onChange={e => handleCastIdChange(staff.id, e.target.value)}
                          style={{
                            width: 80,
                            padding: "4px",
                            borderRadius: "4px",
                            border: "1px solid #ddd",
                            fontSize: 13
                          }}
                        />
                      </td>
                      <td style={statusTdStyle}>
                        <select
                          value={
                            staff.position.endsWith("Gate") && THEATER_POSITIONS.includes("Gate")
                              ? "Gate"
                              : staff.position
                          }
                          onChange={e => {
                            const newPosition = e.target.value;
                            let newPos = newPosition === "Gate" && staff.theater ? `${staff.theater} Gate` : newPosition;
                            handleMoveStaff(staff.id, newPosition, staff.theater);
                          }}
                          style={{
                            padding: "5px",
                            borderRadius: "4px",
                            border: "1px solid #ddd",
                            fontSize: 13
                          }}
                        >
                          {[...THEATER_POSITIONS, ...GLOBAL_POSITIONS].map((position, idx) => (
                            <option key={idx} value={position}>{position}</option>
                          ))}
                        </select>
                      </td>
                      <td style={statusTdStyle}>
                        <select
                          value={staff.theater || ""}
                          onChange={e => {
                            const newTheater = e.target.value;
                            handleMoveStaff(staff.id, staff.position, newTheater);
                          }}
                          style={{
                            padding: "5px",
                            borderRadius: "4px",
                            border: "1px solid #ddd",
                            fontSize: 13
                          }}
                          disabled={!THEATER_POSITIONS.includes(staff.position) && !staff.position.endsWith("Gate")}
                        >
                          <option value="">-</option>
                          {THEATERS.map(theater => (
                            <option key={theater} value={theater}>{theater}</option>
                          ))}
                        </select>
                      </td>
                      <td style={statusTdStyle}>
                        <input
                          type="text"
                          value={staff.breakTime}
                          onChange={e => handleBreakTimeChange(staff.id, e.target.value)}
                          style={{
                            width: 60,
                            padding: "4px",
                            borderRadius: "4px",
                            border: "1px solid #ddd",
                            fontSize: 13
                          }}
                        />
                      </td>
                      <td style={statusTdStyle}>{staff.status}</td>
                      <td style={statusTdStyle}>{staff.efficiency}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Main Admin Dashboard */}
          <div style={{
            display: 'flex',
            gap: '30px',
            flexWrap: 'wrap'
          }}>
            {/* Left Column */}
            <div style={{ flex: 1, minWidth: '320px' }}>
              {/* Guest Count */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '10px',
                padding: '24px',
                marginBottom: '20px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                border: '1px solid #eef2f8'
              }}>
                <h3 style={{ color: '#0066b2', fontSize: '18px', margin: '0 0 10px 0' }}>Current Guest Count</h3>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#10b981', marginBottom: '10px' }}>
                  {guestCount.toLocaleString()}
                </div>
                <div style={{ display: 'flex', flexWrap: "wrap", gap: '8px', marginBottom: '10px' }}>
                  <button onClick={() => handleGuestCountChange(100)} style={buttonStyle}>+100</button>
                  <button onClick={() => handleGuestCountChange(-100)} style={buttonStyle}>-100</button>
                  <button onClick={() => handleGuestCountChange(1000)} style={buttonStyle}>+1000</button>
                  <button onClick={() => handleGuestCountChange(-1000)} style={buttonStyle}>-1000</button>
                </div>
                <input
                  type="number"
                  min="0"
                  value={guestCount}
                  onChange={e => handleCustomGuestCountChange(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '5px',
                    border: '1px solid #ddd',
                    fontSize: '15px'
                  }}
                />
              </div>

              {/* Theater Status & Staffing */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '10px',
                padding: '24px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                border: '1px solid #eef2f8'
              }}>
                <h3 style={{ color: '#0066b2', fontSize: '18px', margin: '0 0 10px 0' }}>Theater Status</h3>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 12, minWidth: 400 }}>
                    <thead>
                      <tr>
                        <th style={statusThStyle}>Theater</th>
                        <th style={statusThStyle}>Status</th>
                        <th style={statusThStyle}>Change</th>
                      </tr>
                    </thead>
                    <tbody>
                      {THEATERS.map(theater => (
                        <tr key={theater}>
                          <td style={statusTdStyle}>{theater}</td>
                          <td style={{
                            ...statusTdStyle,
                            color:
                              theaterStatus[theater] === "Operational"
                                ? "#10b981"
                                : theaterStatus[theater] === "Maintenance"
                                ? "#f59e0b"
                                : "#ef4444",
                            fontWeight: "bold"
                          }}>
                            {theaterStatus[theater]}
                          </td>
                          <td style={statusTdStyle}>
                            <select
                              value={theaterStatus[theater]}
                              onChange={e =>
                                setTheaterStatus({
                                  ...theaterStatus,
                                  [theater]: e.target.value
                                })
                              }
                              style={{
                                padding: "5px",
                                borderRadius: "4px",
                                border: "1px solid #ddd",
                                fontSize: "13px"
                              }}
                            >
                              <option value="Operational">Operational</option>
                              <option value="Maintenance">Maintenance</option>
                              <option value="Down">Down</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <h3 style={{ color: '#0066b2', fontSize: '18px', margin: '18px 0 10px 0' }}>Theater Staffing</h3>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 400 }}>
                    <thead>
                      <tr>
                        <th style={statusThStyle}>Theater</th>
                        {THEATER_POSITIONS.map(pos =>
                          <th key={pos} style={statusThStyle}>{pos === "Gate" ? "Gate" : pos}</th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {THEATERS.map(theater => (
                        <tr key={theater}>
                          <td style={statusTdStyle}>{theater}</td>
                          {THEATER_POSITIONS.map(pos =>
                            <td key={pos} style={statusTdStyle}>
                              {getStaffCount(theater, pos) > 0 ? "✔️" : "❌"}
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div style={{ marginTop: "10px", color: "#637385", fontSize: "15px" }}>
                  <b>✔️ = Position filled, ❌ = Open</b>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div style={{ flex: 2, minWidth: '340px' }}>
              {/* Efficiency Graph (Color Bar) */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '10px',
                padding: '24px',
                marginBottom: '20px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                border: '1px solid #eef2f8'
              }}>
                <h3 style={{ color: '#0066b2', fontSize: '18px', margin: '0 0 10px 0' }}>Hourly Efficiency</h3>
                <div style={{ overflowX: "auto" }}>
                  <div style={{ display: 'flex', alignItems: 'flex-end', height: '120px', gap: '5px', marginBottom: '10px', minWidth: 400 }}>
                    {hourlyEfficiency.map((item, idx) => (
                      <div key={idx} style={{ flex: 1, textAlign: 'center' }}>
                        <div style={{
                          background: efficiencyColor(item.efficiency),
                          height: `${item.efficiency}px`,
                          width: '20px',
                          margin: '0 auto',
                          borderRadius: '4px'
                        }} />
                        <div style={{ fontSize: '12px', color: '#637385', marginTop: '4px' }}>{item.hour}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ marginTop: '10px', color: '#637385', fontSize: '15px' }}>
                  <b>Average Efficiency:</b> {averageEfficiency}%
                  <span style={{ marginLeft: 24 }}>
                    <span style={{ color: "#10b981" }}>■</span> Good (≥88%){" "}
                    <span style={{ color: "#f59e0b" }}>■</span> Fair (73–87%){" "}
                    <span style={{ color: "#ef4444" }}>■</span> Low (&lt;73%)
                  </span>
                </div>
              </div>
              {/* Live Wait Time */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '10px',
                padding: '24px',
                marginBottom: '20px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                border: '1px solid #eef2f8'
              }}>
                <h3 style={{ color: '#0066b2', fontSize: '18px', margin: '0 0 10px 0' }}>Live Wait Time</h3>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#f59e0b', marginBottom: '10px' }}>
                  {liveWaitTime} min
                </div>
                <div style={{ display: 'flex', flexWrap: "wrap", gap: '8px', marginBottom: '10px' }}>
                  <button onClick={() => handleLiveWaitTimeChange(1)} style={buttonStyle}>+1</button>
                  <button onClick={() => handleLiveWaitTimeChange(-1)} style={buttonStyle}>-1</button>
                  <button onClick={() => handleLiveWaitTimeChange(5)} style={buttonStyle}>+5</button>
                  <button onClick={() => handleLiveWaitTimeChange(-5)} style={buttonStyle}>-5</button>
                </div>
                <input
                  type="number"
                  min="0"
                  value={liveWaitTime}
                  onChange={e => handleCustomWaitTimeChange(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '5px',
                    border: '1px solid #ddd',
                    fontSize: '15px'
                  }}
                />
              </div>
              {/* Wait Time History */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '10px',
                padding: '24px',
                marginBottom: '20px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                border: '1px solid #eef2f8'
              }}>
                <h3 style={{ color: '#0066b2', fontSize: '18px', margin: '0 0 10px 0' }}>Hourly Wait Times</h3>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 300 }}>
                    <thead>
                      <tr>
                        <th style={statusThStyle}>Hour</th>
                        <th style={statusThStyle}>Wait Time (min)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hourlyWaitTimes.map((item, idx) => (
                        <tr key={idx}>
                          <td style={statusTdStyle}>{item.hour}</td>
                          <td style={statusTdStyle}>{waitTimeCell(hourlyWaitTimes, idx)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div style={{ marginTop: '10px', color: '#637385', fontSize: '15px' }}>
                  <b>Average Wait Time:</b> {averageWaitTime} min
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Dashboard (Home) */}
      {!showCastAccess && !isAdminMode && (
        <div style={{ marginTop: 32 }}>
          <div
            style={{
              display: "flex",
              gap: "32px",
              flexWrap: "wrap",
              justifyContent: "space-between"
            }}
          >
            <div
              style={{
                flex: 1,
                minWidth: "260px",
                background: "white",
                borderRadius: "10px",
                padding: "28px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                border: "1px solid #eef2f8"
              }}
            >
              <h3 style={{ color: "#0066b2", fontSize: "19px", margin: "0 0 10px 0" }}>
                Current Guest Count
              </h3>
              <div
                style={{
                  fontSize: "34px",
                  fontWeight: "bold",
                  color: "#10b981",
                  marginBottom: "10px"
                }}
              >
                {guestCount.toLocaleString()}
              </div>
            </div>
            <div
              style={{
                flex: 1,
                minWidth: "260px",
                background: "white",
                borderRadius: "10px",
                padding: "28px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                border: "1px solid #eef2f8"
              }}
            >
              <h3 style={{ color: "#0066b2", fontSize: "19px", margin: "0 0 10px 0" }}>
                Live Wait Time
              </h3>
              <div
                style={{
                  fontSize: "34px",
                  fontWeight: "bold",
                  color: "#f59e0b",
                  marginBottom: "10px"
                }}
              >
                {liveWaitTime} min
              </div>
            </div>
          </div>
          <div style={{ marginTop: 32, color: "#637385", fontSize: "15px" }}>
            <b>Welcome to SoarOps!</b> For Cast features, use the <b>Cast Access</b> button above.
          </div>
        </div>
      )}
    </div>
  );
}

export default SoarOps;
