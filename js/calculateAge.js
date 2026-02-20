function calculateAge(dateString) {
  var today = new Date();
  var dateParts = dateString.split("-");
  var tanggal = parseInt(dateParts[0]);
  var bulan = parseInt(dateParts[1]) - 1; // Kurangi 1 karena bulan dimulai dari 0
  var tahun = parseInt(dateParts[2]);

  var birthDate = new Date(tahun, bulan, tanggal);

  var age = today.getFullYear() - birthDate.getFullYear();
  var monthDiff = today.getMonth() - birthDate.getMonth();
  var dayDiff = today.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
    monthDiff += 12;
  }

  var ageString = "";
  if (age > 0) {
    ageString += age + " tahun";
    if (monthDiff > 0) {
      ageString += " " + monthDiff + " bulan";
    }
  } else if (monthDiff > 0) {
    ageString += monthDiff + " bulan";
  } else {
    ageString += dayDiff + " hari";
  }

  return ageString;
}
