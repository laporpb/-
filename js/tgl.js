function hari_ini() {
  const sekarang = new Date();
  const tanggal = sekarang.getDate();
  const bulan = sekarang.getMonth() + 1; // Ingat, bulan dimulai dari 0 (Januari adalah bulan 0)
  const tahun = sekarang.getFullYear();

  // Fungsi untuk menambahkan angka 0 di depan angka tunggal
  function tambahkanNol(angka) {
    return angka < 10 ? `0${angka}` : angka;
  }

  const tanggalFormatted = tambahkanNol(tanggal);
  const bulanFormatted = tambahkanNol(bulan);

  const sekarangString = `${tanggalFormatted}-${bulanFormatted}-${tahun}`;
  return sekarangString;
}

