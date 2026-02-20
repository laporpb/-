// Ambil elemen-elemen select
var tanggalSelect = document.getElementById('tanggal');
var bulanSelect = document.getElementById('bulan');
var tahunSelect = document.getElementById('tahun');
var prosesButton = document.getElementById('proses-button'); // Gantilah 'proses-button' dengan ID yang sesuai dengan tombol proses Anda.


// Isi dropdown tanggal (seperti yang Anda lakukan sebelumnya)
for (var i = 1; i <= 31; i++) {
  var option = document.createElement('option');
  var formattedValue = i < 10 ? '0' + i : i.toString();
  option.value = formattedValue;
  option.text = formattedValue;
  tanggalSelect.appendChild(option);
}


// Isi dropdown bulan (seperti yang Anda lakukan sebelumnya)
var namaBulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
for (var i = 0; i < namaBulan.length; i++) {
  var option = document.createElement('option');
  var formattedValue = (i + 1) < 10 ? '0' + (i + 1) : (i + 1).toString();
  option.value = formattedValue; // Bulan dimulai dari 01 (Januari)
  option.text = formattedValue + " - " + namaBulan[i];
  bulanSelect.appendChild(option);
}


// Isi dropdown tahun (seperti yang Anda lakukan sebelumnya)
var tahunSekarang = new Date().getFullYear();
for (var i = tahunSekarang; i >= 1950; i--) {
  var option = document.createElement('option');
  option.value = i;
  option.text = i;
  tahunSelect.appendChild(option);
}
