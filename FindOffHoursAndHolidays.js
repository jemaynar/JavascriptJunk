(function () {
  // returns true between 01:00:00 UTC and 11:00:0 UTC regardless of daylight savings time.
  function isAfterHours(currentDate) {
    if (!currentDate instanceof Date) {
      currentDate = new Date(Date.now());
    }

    var offPeakBeginUtcHour = 22;
    var offPeakEndUtcHour = 14;

    return currentDate.getHours() >= offPeakBeginUtcHour || currentDate.getHours() < offPeakEndUtcHour;
  }
  
  // Offset for the timezone vs UTC.
  function getOffsetHours(currentDate) {
    if (!currentDate instanceof Date) {
      currentDate = new Date(Date.now());
    }
    
    return currentDate.getTimezoneOffset() / 60;
  }
  
  function isWeekend(currentDate) {
    if (!currentDate instanceof Date) {
      currentDate = new Date(Date.now());
    }
    
    currentDate.setHours(currentDate.getHours() - getOffsetHours(currentDate));
    var dayIndex = currentDate.getDay();
    
    if (dayIndex === 0 || dayIndex === 6) {
      return true;
    }
    return false;
  }
  
  function isDateMatch(date1, date2) {
    if (!date1 instanceof Date) {
      date1 = new Date(Date.now());
    }
    if (!date2 instanceof Date) {
      date2 = new Date(Date.now());
    }

    return (date1.getMonth() === date2.getMonth() && date1.getDate() == date2.getDate() && date1.getFullYear() == date2.getFullYear());
  }
  
  function isObservedHoliday(currentDate) {
    // These would need to be maintained if they are not fed in via endpoint.
    var observedHolidays = [
      new Date(2023, 11, 25),
      new Date(2024, 0, 1), 
      new Date(2024, 0, 15),
      new Date(2024, 1, 19),
      new Date(2024, 4, 27),
      new Date(2024, 5, 19),
      new Date(2024, 6, 4),
      new Date(2024, 8, 2),
      new Date(2024, 9, 14),
      new Date(2024, 10, 11),
      new Date(2024, 10, 28),
      new Date(2024, 11, 25),
      new Date(2025, 0, 1),
    ];

    if (!currentDate instanceof Date) {
      currentDate = new Date(Date.now());
    }
    
    
    currentDate.setHours(currentDate.getHours() - getOffsetHours(currentDate));

    return observedHolidays.filter(function(holiday) { return isDateMatch(holiday, currentDate); }).length > 0;
  }
   
  
  function isOffPeak(currentDate, includeHolidays) {
    if (!currentDate instanceof Date) {
      currentDate = new Date(Date.now());
    }
    
    if (isAfterHours(currentDate) || isWeekend(currentDate) || isObservedHoliday(currentDate)) {
      return true;
    }

    return false;
  }

  var res = "Uncomment a test to verify result.";
  
  // Proof that getOffsetHours works.
  // res = getOffsetHours(new Date(Date.now())); // 4 or 5 depending on when run.
  // res = getOffsetHours(new Date(Date.UTC(2023, 12, 16, 0, 0, 0))); // 5
  // res = getOffsetHours(new Date(Date.UTC(2023, 04, 16, 0, 0, 0))); // 4
  
  // Proof that isAfterHours works - ignores daylight savings time.
  res = isAfterHours(new Date('2023-12-16T21:59:59')); // false
  // res = isAfterHours(new Date('2023-12-16T22:00:00')); // true
  // res = isAfterHours(new Date('2023-12-16T10:59:59')); // true
  // res = isAfterHours(new Date('2023-12-16T11:00:00')); // false
  
  // Proof that isWeekend Works!
  // res = isWeekend(new Date('2023-12-16T04:59:59')); // false
  // res = isWeekend(new Date('2023-12-16T05:00:00')); // true
  // res = isWeekend(new Date('2023-12-16T23:59:59')); // true
  // res = isWeekend(new Date('2023-12-18T04:59:59')); // true
  // res = isWeekend(new Date('2023-12-18T05:00:00')); // false
  
  // Proof isObservedHoliday Works!
  // res = isObservedHoliday(new Date('2023-12-25T04:59:59')); // false
  // res = isObservedHoliday(new Date('2023-12-25T05:00:00')); // true
  // res = isObservedHoliday(new Date('2023-12-26T04:59:59')); // true
  // res = isObservedHoliday(new Date('2023-12-26T05:00:00')); // false
  
  // res = isObservedHoliday(new Date('2024-01-01T04:59:59')); // false
  // res = isObservedHoliday(new Date('2024-01-01T05:00:00')); // true
  // res = isObservedHoliday(new Date('2024-01-02T04:59:59')); // true
  // res = isObservedHoliday(new Date('2024-01-02T05:00:00')); // false
  
  // res = isObservedHoliday(new Date('2024-01-15T04:59:59')); // false
  // res = isObservedHoliday(new Date('2024-01-15T05:00:00')); // true
  // res = isObservedHoliday(new Date('2024-01-16T04:59:59')); // true
  // res = isObservedHoliday(new Date('2024-01-16T05:00:00')); // false
  
  // res = isObservedHoliday(new Date('2024-02-19T04:59:59')); // false
  // res = isObservedHoliday(new Date('2024-02-19T05:00:00')); // true
  // res = isObservedHoliday(new Date('2024-02-20T04:59:59')); // true
  // res = isObservedHoliday(new Date('2024-02-20T05:00:00')); // false
  
  // res = isObservedHoliday(new Date('2024-05-27T03:59:59')); // false
  // res = isObservedHoliday(new Date('2024-05-27T04:00:00')); // true
  // res = isObservedHoliday(new Date('2024-05-28T03:59:59')); // true
  // res = isObservedHoliday(new Date('2024-05-28T04:00:00')); // false
  
  // res = isObservedHoliday(new Date('2024-06-19T03:59:59')); // false
  // res = isObservedHoliday(new Date('2024-06-19T04:00:00')); // true
  // res = isObservedHoliday(new Date('2024-06-20T03:59:59')); // true
  // res = isObservedHoliday(new Date('2024-06-20T04:00:00')); // false
  
  // res = isObservedHoliday(new Date('2024-07-04T03:59:59')); // false
  // res = isObservedHoliday(new Date('2024-07-04T04:00:00')); // true
  // res = isObservedHoliday(new Date('2024-07-05T03:59:59')); // true
  // res = isObservedHoliday(new Date('2024-07-05T04:00:00')); // false
  
  // res = isObservedHoliday(new Date('2024-09-02T03:59:59')); // false
  // res = isObservedHoliday(new Date('2024-09-02T04:00:00')); // true
  // res = isObservedHoliday(new Date('2024-09-03T03:59:59')); // true
  // res = isObservedHoliday(new Date('2024-09-03T04:00:00')); // false
  
  // res = isObservedHoliday(new Date('2024-10-14T03:59:59')); // false
  // res = isObservedHoliday(new Date('2024-10-14T04:00:00')); // true
  // res = isObservedHoliday(new Date('2024-10-15T03:59:59')); // true
  // res = isObservedHoliday(new Date('2024-10-15T04:00:00')); // false
  
  // res = isObservedHoliday(new Date('2024-11-11T04:59:59')); // false
  // res = isObservedHoliday(new Date('2024-11-11T05:00:00')); // true
  // res = isObservedHoliday(new Date('2024-11-12T04:59:59')); // true
  // res = isObservedHoliday(new Date('2024-11-12T05:00:00')); // false
  
  // res = isObservedHoliday(new Date('2024-11-28T04:59:59')); // false
  // res = isObservedHoliday(new Date('2024-11-28T05:00:00')); // true
  // res = isObservedHoliday(new Date('2024-11-29T04:59:59')); // true
  // res = isObservedHoliday(new Date('2024-11-29T05:00:00')); // false
  
  // res = isObservedHoliday(new Date('2024-12-25T04:59:59')); // false
  // res = isObservedHoliday(new Date('2024-12-25T05:00:00')); // true
  // res = isObservedHoliday(new Date('2024-12-26T04:59:59')); // true
  // res = isObservedHoliday(new Date('2024-12-26T05:00:00')); // false
  
  // res = isObservedHoliday(new Date('2025-01-01T04:59:59')); // false
  // res = isObservedHoliday(new Date('2025-01-01T05:00:00')); // true
  // res = isObservedHoliday(new Date('2025-01-02T04:59:59')); // true
  // res = isObservedHoliday(new Date('2025-01-02T05:00:00')); // false
  
  // Proof IsOffPeak Works
  // res = isAfterHours(new Date('2023-12-16T00:59:59')); // 1 Second before after hours - false
  // res = isOffPeak(new Date('2023-12-16T00:59:59')); // Friday - 1 Second before after hours - false
  // res = isOffPeak(new Date('2023-12-16T01:00:00')); // Friday - After hours - true
  // res = isOffPeak(new Date('2023-12-16T01:00:00')); // Friday - After hours - true
  // res = isOffPeak(new Date('2023-12-16T11:00:00')); // No Longer After hours, but Saturday - true
  // res = isOffPeak(new Date('2023-12-18T00:59:59')); // Still Sunday Local - true
  // res = isOffPeak(new Date('2023-12-18T05:00:00')); // Monday - After hours - true
  // res = isOffPeak(new Date('2023-12-18T10:59:59')); // Monday - 1 second before after hours ends - true
  // res = isOffPeak(new Date('2023-12-18T11:00:00')); // Monday - Prime Time No Holiday - false
  
  // res = isOffPeak(new Date('2023-12-25T00:59:59')); // Sunday Still Wekeend before Christmas local - true
  // res = isOffPeak(new Date('2023-12-25T10:59:59')); // Monday - Christmas 1 second before after hours ends - true
  // res = isOffPeak(new Date('2023-12-25T11:00:00')); // Monday - Christmas 1 second into holiday - true
  // res = isOffPeak(new Date('2023-12-26T00:59:59')); // Monday - Still Christmas 1 second to after hours - true
  // res = isOffPeak(new Date('2023-12-26T01:00:00')); // Monday - Still Christmas 1 second into after hours - true
  // res = isOffPeak(new Date('2023-12-26T10:59:59')); // After hours ending in 1 second - true
  // res = isOffPeak(new Date('2023-12-26T11:00:00')); // After hours ended 1 second ago - false

  // res = isOffPeak(new Date('2024-01-01T00:59:59')); // Wekeend before new years almost still after hours - true
  // res = isOffPeak(new Date('2024-01-01T10:59:59')); // Wekeend before new years after hours ends in 1 second - true
  // res = isOffPeak(new Date('2024-01-01T11:00:00')); // New years holiday - after hours ended - true
  // res = isOffPeak(new Date('2024-01-02T00:59:59')); // New years holiday - 1 minute before after hours - true
  // res = isOffPeak(new Date('2024-01-02T01:00:00')); // New years holiday - after hours - true
  // res = isOffPeak(new Date('2024-01-02T10:59:59')); // New years holiday - after hours ends in 1 second - true
  // res = isOffPeak(new Date('2024-01-02T11:00:00')); // New years holiday - after hours ended - false

  // If there were a div with id 'result' this would show the result.
  // document.getElementById('result').innerHTML = res;
  // Console.Write(isOffPeak(Date.now(), false));  
})();