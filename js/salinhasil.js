function salinHasil() {
  var hasil = document.getElementById("hasil");
  hasil.select();
  document.execCommand("copy");
  alert("Hasil telah disalin!");
}
