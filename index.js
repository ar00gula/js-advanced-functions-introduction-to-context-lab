// Your code here
function createEmployeeRecord(arr) {
    let employeeRecord = {
        firstName: `${arr[0]}`,
        familyName: `${arr[1]}`,
        title: `${arr[2]}`,
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
    return employeeRecord
}

function createEmployeeRecords(arr) {
    return arr.map(createEmployeeRecord)
}

function createTimeInEvent(employeeRecord, dateTimeString) {
    let TimeIn = {
        type: "TimeIn",
        hour: parseInt(dateTimeString.split(" ")[1]),
        date: dateTimeString.split(" ")[0]
    }
    employeeRecord.timeInEvents.push(TimeIn)
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateTimeString) {
    let TimeOut = {
        type: "TimeOut",
        hour: parseInt(dateTimeString.split(" ")[1]),
        date: dateTimeString.split(" ")[0]
    }
    employeeRecord.timeOutEvents.push(TimeOut)
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date) {
    const timeIn = employeeRecord.timeInEvents.find(function(event) {return event.date === date})
    const timeOut = employeeRecord.timeOutEvents.find(event => event.date === date)
    // const timeOut = employeeRecord.timeOutEvents.find(function(timeOut){timeOut.date == date})
    return (timeOut.hour - timeIn.hour)/100
}

function wagesEarnedOnDate(employeeRecord, date) {
    return hoursWorkedOnDate(employeeRecord, date)*employeeRecord.payPerHour
}

function allWagesFor(employeeRecord) {

    const datesWorked = employeeRecord.timeInEvents.map(element => element.date)
    const total = datesWorked.reduce(function(wageTotal, date) { 
        return wagesEarnedOnDate(employeeRecord, date) + wageTotal
        }, 0) 
        // reduce takes a reducer function and a starting value
        // here, function is an anoymous function I'm defining inline. Starting value is 0.
        // my reducer function always takes in a total and an element. In this case, wageTotal and date.
        // I'm returning the results of wagesEarnedOnDate(employeeRecord, date) + wageTotal and aggregating them
    return total

}
// BEFORE I REFACTORED 
    // let timesIn = employeeRecord.timeInEvents.map(event => event.hour)
    // let timesOut = employeeRecord.timeOutEvents.map(event => event.hour)

    // let hoursArray = timesIn.map(function(time, index) {return timesOut[index] - time})
    // let wagesArray = hoursArray.map(hours => (hours/100)*employeeRecord.payPerHour)
    
    // let total = wagesArray.reduce(function(total, element) {return element + total})

function calculatePayroll(employeeArray) {
    const wagesArray = employeeArray.map(employee => allWagesFor(employee))
    const total = wagesArray.reduce((total, element) => element + total)
    return total
}

function findEmployeeByFirstName(employeeArray, nameString) {
    return employeeArray.find(employee => employee.firstName === nameString)
}
