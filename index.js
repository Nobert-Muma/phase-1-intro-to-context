function createEmployeeRecord(emp) {
  return {
    firstName:emp[0],
    familyName:emp[1],
    title:emp[2],
    payPerHour:emp[3],
    timeInEvents:[],
    timeOutEvents:[]
  };
}

function createEmployeeRecords(emplRecds) {
  return emplRecds.map(createEmployeeRecord);
}
function createTimeInEvent(employeeRecord, dateTime) {
  let [date, hour] = dateTime.split(" ");
  employeeRecord.timeInEvents.push({
    type: "TimeIn",
    date: date,
    hour: parseInt(hour, 10)
  });
  return employeeRecord;
}
function createTimeOutEvent(employeeRecord, dateTime) {
  let [date, hour] = dateTime.split(" ");
  employeeRecord.timeOutEvents.push({
    type: "TimeOut",
    date: date,
    hour: parseInt(hour, 10)
  });
  return employeeRecord;
}
function hoursWorkedOnDate(employeeRecord, date) {
  let timeIn = employeeRecord.timeInEvents.find(event => event.date === date);
  let timeOut = employeeRecord.timeOutEvents.find(event => event.date === date);
  return (timeOut.hour - timeIn.hour) / 100;
}
function wagesEarnedOnDate(employeeRecord, date) {
  let hoursWorked=hoursWorkedOnDate(employeeRecord, date);
  return hoursWorked*employeeRecord.payPerHour;
}
function allWagesFor(employeeRecord) {
  let datesWorked = employeeRecord.timeInEvents.map(event => event.date);
  return datesWorked.reduce((totalWages, date) => totalWages + wagesEarnedOnDate(employeeRecord, date), 0);
}
function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce((totalPayroll, employeeRecord) => totalPayroll + allWagesFor(employeeRecord), 0);
}
