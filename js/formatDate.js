function formatDate(dateString) {
  var dateParts = dateString.split("-");
  var formattedDate = "";

  if (dateParts.length === 3) {
    var day = parseInt(dateParts[0]);
    var month = parseInt(dateParts[1]);
    var year = parseInt(dateParts[2]);

    // Cek apakah tanggal, bulan, dan tahun valid
    if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
      formattedDate = ("0" + day).slice(-2) + "-" + ("0" + month).slice(-2) + "-" + year;
    }
  }

  return formattedDate;
}

