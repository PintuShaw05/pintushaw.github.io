// WebSocket Setup
let socket;
let wsConnected = false;

function initWebSocket() {
  socket = new WebSocket("ws://" + window.location.hostname + ":81/");
  //console.log(window.location.hostname);
  socket.onopen = () => {
    wsConnected = true;
    updateConnectionStatus(true);
  };

  function setIcon(id, icon, statusText) {
  document.getElementById(id).innerHTML = `${icon} ${statusText}`;
  }

  socket.onmessage = (event) => {
  const data = event.data;
//==================================zone status================================================
   if (data.startsWith("Zone1_Status:")) {
    const val = data.split(":")[1];
    //const val =data.split(":").slice(1).join(":").trim();
    //document.getElementById("z1Status").innerText = `Status: ${val}`;
    if(val=="FIRE"){
    setIcon("z1Status", "🔥", `Status: ${val}`);
    }else if(val=="OPEN"){
    setIcon("z1Status", "🟡", `Status: ${val}`);
    }else if(val=="SHORT"){
    setIcon("z1Status", "🔴", `Status: ${val}`);
    }else if(val=="ISOLATE"){
    setIcon("z1Status", "🚫", `Status: ${val}`);
    }else{
    setIcon("z1Status", "🟢", `Status: NORMAL`);
    }
  }
  if (data.startsWith("Zone2_Status:")) {
    const val = data.split(":")[1];
    //const val =data.split(":").slice(1).join(":").trim();
    //document.getElementById("z1Status").innerText = `Status: ${val}`;
    if(val=="FIRE"){
    setIcon("z2Status", "🔥", `Status: ${val}`);
    }else if(val=="OPEN"){
    setIcon("z2Status", "🟡", `Status: ${val}`);
    }else if(val=="SHORT"){
    setIcon("z2Status", "🔴", `Status: ${val}`);
    }else if(val=="ISOLATE"){
    setIcon("z2Status", "🚫", `Status: ${val}`);
    }else{
    setIcon("z2Status", "🟢", `Status: NORMAL`);
    }
  }
  if (data.startsWith("Zone3_Status:")) {
    const val = data.split(":")[1];
    //const val =data.split(":").slice(1).join(":").trim();
    //document.getElementById("z1Status").innerText = `Status: ${val}`;
    if(val=="FIRE"){
    setIcon("z3Status", "🔥", `Status: ${val}`);
    }else if(val=="OPEN"){
    setIcon("z3Status", "🟡", `Status: ${val}`);
    }else if(val=="SHORT"){
    setIcon("z3Status", "🔴", `Status: ${val}`);
    }else if(val=="ISOLATE"){
    setIcon("z3Status", "🚫", `Status: ${val}`);
    }else{
    setIcon("z3Status", "🟢", `Status: NORMAL`);
    }
  }
  if (data.startsWith("Zone4_Status:")) {
    const val = data.split(":")[1];
    console.log(val);
    //const val =data.split(":").slice(1).join(":").trim();
    //document.getElementById("z1Status").innerText = `Status: ${val}`;
    if(val=="FIRE"){
    setIcon("z4Status", "🔥", `Status: ${val}`);
    }else if(val=="OPEN"){
    setIcon("z4Status", "🟡", `Status: ${val}`);
    }else if(val=="SHORT"){
    setIcon("z4Status", "🔴", `Status: ${val}`);
    }else if(val=="ISOLATE"){
    setIcon("z4Status", "🚫", `Status: ${val}`);
    }else{
    setIcon("z4Status", "🟢", `Status: NORMAL`);
    }
  }
//==================================upper nav bar status=======================================
  if (data.startsWith("BATTERY:")) {
    const val = data.split(":")[1];
    const icon = val === "CONNECTED" ? "🔋" : "❌";
    setIcon("batteryStatus", icon, `BATTERY: ${val}`);
  }

  if (data.startsWith("SIREN:")) {
    const val = data.split(":")[1];
    const icon = val === "CONNECTED" ? "🔊" : "🔇";
    setIcon("sirenStatus", icon, `SIREN: ${val}`);
  }

  if (data.startsWith("WIFI:")) {
    const val = data.split(":")[1];
    const icon = val === "CONNECTED" ? "📶" : "❌";
    setIcon("wifiStatus", icon, `WiFi: ${val}`);
  }

  if (data.startsWith("LAN:")) {
    const val = data.split(":")[1];
    const icon = val === "CONNECTED" ? "🔌" : "❌";
    setIcon("lanStatus", icon, `LAN: ${val}`);
  }

  if (data.startsWith("GSM:")) {
    const val = data.split(":")[1];
    const icon = val === "CONNECTED" ? "📡" : "❌";
    setIcon("gsmStatus", icon, `GSM: ${val}`);
  }

  if (data.startsWith("SYSTEM:")) {
    const val = data.split(":")[1];
    const icon = val === "ON" ? "⚙️" : "❌";
    setIcon("sysStatus", icon, `SYSTEM: ${val}`);
  }
 //===============================================System Configuration=====================================                   
  if (data.startsWith("DATETIME:")) {
    //const val = data.split(":")[1];
    const val =data.split(":").slice(1).join(":").trim();
    document.getElementById("dateTime").innerText = `DATE-TIME: ${val}`;
  }

  if (data.startsWith("PROTOCOL:")) {
  const val = data.split(":")[1].trim();
  document.getElementById("currentProtocol").innerHTML = `<b>Selected Protocol:</b> ${val}`;
  const radios = document.querySelectorAll('input[name="protocol"]');
  radios.forEach(r => r.checked = (r.value === val));
  }

  if (data.startsWith("NOTIFY:")) {
  const parts = data.split(":")[1].split(",");
  document.getElementById("notif1").checked = parts[0] === "1";
  document.getElementById("notif2").checked = parts[1] === "1";
  document.getElementById("notif3").checked = parts[2] === "1";
  }
  //===========================================Log/Contact table======================================
  if (data.startsWith("LOG:")) {
  let rows = data.substring(4); // "<tr>...</tr>..."
  let html = "<table border='1' style='width:100%; border-collapse:collapse; text-align:center;'>";
  html += "<tr>"
       + "<th style='text-align:center;'>Sl. No</th>"
       + "<th style='text-align:center;'>Date</th>"
       + "<th style='text-align:center;'>Time</th>"
       + "<th style='text-align:center;'>Event</th>"
       + "</tr>";
  html += rows;
  html += "</table>";
  document.getElementById("logTable").innerHTML = html;
}
if (data.startsWith("NUM:")) {
  let rows = data.substring(4); // "<tr>...</tr>..."
  let html = "<table border='1' style='width:100%; border-collapse:collapse; text-align:center;'>";
  // Fixed header row (bold + center by default in <th>)
  html += "<tr>"
       + "<th style='text-align:center;'>Sl. No</th>"
       + "<th style='text-align:center;'>Email</th>"
       + "<th style='text-align:center;'>Contacts</th>"
       + "</tr>";
  // Dynamic rows from ESP32
  html += rows;
  html += "</table>";
  document.getElementById("contactTable").innerHTML = html;
}
 };

  socket.onclose = () => {
    wsConnected = false;
    updateConnectionStatus(false);
    setTimeout(initWebSocket, 1000); // Retry after 5s
  };
}

function updateConnectionStatus(connected) {
    const text = document.getElementById("connText");
  const icon = document.getElementById("connIcon");

  if (connected) {
    text.innerText = "🟢 CONNECTED";
    icon.classList.remove("red", "blink-red");
    icon.classList.add("green", "blink-green");
  } else {
    text.innerText = "🔴 DISCONNECTED";
    icon.classList.remove("green", "blink-green");
    icon.classList.add("red", "blink-red");
  }
}

// Sidebar Toggle for mobile
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("open");
}

// Logout
function logout() {
  if (wsConnected) {
    socket.send("_Logout__");   // 👈 WebSocket pe data bhej diya
  }
  alert("Logging out...");
  window.location.href = "http://"+window.location.hostname+":8085";
}

// Tab Switching
function showSection(id) {
  document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  // 👇 This will hide the sidebar on mobile
  if (window.innerWidth <= 768) {
    document.getElementById("sidebar").classList.remove("open");
  }
  // Agar logevent section open hua
  if(id === 'logevent'){
    sendCommand('GET_LOG');
  }

  // Agar contact section open hua
  if(id === 'contact'){
    sendCommand('GET_NUM');
  }
}

// Send WebSocket Command
function sendCommand(cmd) {
  if (wsConnected) {
    socket.send(cmd);
  } else {
    alert("WebSocket not connected!");
  }
}

// Submit Notification Settings
function submitNotification() {
  const v1 = document.getElementById("notif1").checked ? 1 : 0;
  const v2 = document.getElementById("notif2").checked ? 1 : 0;
  const v3 = document.getElementById("notif3").checked ? 1 : 0;
  sendCommand(`NOTIFIES_${v1},${v2},${v3}`);
}

// Submit Date-Time
function submitDateTime() {
  const datetime = document.getElementById("datetimeInput").value;
  if (datetime) {
    sendCommand(`DATETIME_${datetime}`);
  } else {
    alert("Please enter date & time");
  }
}

// Submit Contact
function submitContact() {
  const slno = document.getElementById("slno").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const mail = document.getElementById("email").value.trim();
  if (!slno || !phone || !mail) {
    alert("All fields are required");
    return;
  }
  if (slno.length > 15 || phone.length > 16 || mail.length > 16) {
    alert("Character limit exceeded");
    return;
  }
  sendCommand(`CONTACTS_${slno},${phone},${mail}`);
  //Reset fields
  document.getElementById("slno").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("email").value = "";
}

// Submit Branch Details
function submitBranch() {
  const name = document.getElementById("branchName").value.trim().toUpperCase();
  const addr = document.getElementById("branchAddr").value.trim().toUpperCase();
  if (!name || !addr || name.length > 16 || addr.length > 16) {
    alert("Invalid Branch Name or Address");
    return;
  }
  sendCommand(`BRANCH___${name},${addr}`);
  //Reset fields
  document.getElementById("branchName").value = "";
  document.getElementById("branchAddr").value = "";
}

// Log / Contact Toggle
let showingLog = true;
function toggleLogContact() {
  const div = document.getElementById("logTable");
  showingLog = !showingLog;
  sendCommand(showingLog ? "GET_LOG" : "GET_NUM");
  div.innerHTML = showingLog ? "<b>Loading Log...</b>" : "<b>Loading Contact...</b>";
}

// Submit MQTT Credentials
function submitMQTT() {
  const auth = document.getElementById("mqttAuth").value.trim();
  const user = document.getElementById("mqttUser").value.trim();
  const pass = document.getElementById("mqttPass").value.trim();
  if (!user || !auth || !pass) {

    return;
  }
  sendCommand(`MQTTINFO_${auth},${user},${pass}`);
  //Reset fields
  document.getElementById("mqttAuth").value = "";
  document.getElementById("mqttUser").value = "";
  document.getElementById("mqttPass").value = "";
}

// Submit WiFi Credentials
function submitWiFi() {
  const ssid = document.getElementById("wifiSSID").value.trim();
  const pass = document.getElementById("wifiPass").value.trim();
  if (!ssid || !pass) {
    alert("WiFi SSID and Password required");
    return;
  }
  sendCommand(`WIFIINFO_${ssid},${pass}`);
  //Reset fields
  document.getElementById("wifiSSID").value = "";
  document.getElementById("wifiPass").value = "";
}
//submitProtocol 
function submitProtocol() {
  const selected = document.querySelector('input[name="protocol"]:checked');
  if (selected) {
    sendCommand(`PROTOCOL_${selected.value}`);
  }
}

// Initialize WebSocket
window.onload = () => {
  initWebSocket();
  showSection("status");
};