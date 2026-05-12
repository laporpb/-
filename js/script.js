function prosesLapor() {
  // 1. Ambil elemen input
  var isi_pembukaan = document.getElementById("pembukaan").value;
  var nama = document.getElementById("nama").value;
  var cm = document.getElementById("cm").value;
  
  // Ambil elemen tanggal lahir
  var tanggal = document.getElementById("tanggal").value;
  var bulan = document.getElementById("bulan").value;
  var tahun = document.getElementById("tahun").value;
  var tgl_lahir = tanggal + "-" + bulan + "-" + tahun;

  var jenis_kelamin = document.getElementById("jenis_kelamin").value;
  var diagnosa = document.getElementById("diagnosa").value;
  var antibiotik = document.getElementById("antibiotik").value;
  var kepesertaan = document.getElementById("kepesertaan").value;
  
  // Format angka desimal (titik ke koma untuk Spreadsheet Indonesia)
  var berat_badan = document.getElementById("berat_badan").value.toString().replace(/\./g, ',');
  var tinggi_badan = document.getElementById("tinggi_badan").value.toString().replace(/\./g, ',');
  
  var dpjp = document.getElementById("dpjp").value;
  var penutup = document.getElementById("penutup").value;

  // Data Hasil Lab
  var hb = document.getElementById("hb").value;
  var l = document.getElementById("l").value;
  var pcv = document.getElementById("pcv").value;
  var tr = document.getElementById("tr").value;
  var lain = document.getElementById("lain").value;

  // 2. Logika Pemrosesan Teks (Display ke Textarea)
  var usia = typeof calculateAge === 'function' ? calculateAge(tgl_lahir) : "---";
  var jenis_kelamin_singkat = (jenis_kelamin === "Laki-laki") ? "L" : "P";
  var tgl_sekarang = typeof hari_ini === 'function' ? hari_ini() : new Date().toLocaleDateString('id-ID');

  var hasil = "";
  hasil += isi_pembukaan + "\n-----\n";
  hasil += "Nama : " + nama + " (" + jenis_kelamin_singkat + ")\n";
  hasil += "Cm : " + cm + "\n";
  hasil += "Usia : " + usia + " (" + tgl_lahir + ")\n";
  hasil += "Diagnosa : " + diagnosa + "\n";
  hasil += "Antibiotik : " + antibiotik + "\n";
  hasil += "BB : " + berat_badan + " kg, TB : " + tinggi_badan + " cm\n";
  hasil += "Kepesertaan : " + kepesertaan + "\n";
  hasil += "DPJP : " + dpjp + "\n-----\n";
  hasil += "Hasil Lab:\nHb: " + hb + "\nL: " + l + "\nPcv: " + pcv + "\nTr: " + tr + "\n";
  hasil += lain + "\n-----\n" + penutup;

  // 3. Validasi
  var unitElement = document.querySelector('input[name="unit"]:checked');
  
  if (!unitElement) {
    alert("Silakan pilih Ruangan!");
    return;
  }
  if (tanggal === "" || bulan === "" || tahun === "" || dpjp === "") {
    alert("Lengkapi Tanggal Lahir dan DPJP!");
    return;
  }

  // Tampilkan hasil di textarea
  document.getElementById("hasil").value = hasil;

  // 4. Pengiriman Data ke Google Sheets
  var unit = unitElement.value; // Nilai: "AL-ANAK", "AL-PICU", atau "ISO"

  var data = {
    tgl_sekarang: tgl_sekarang,
    nama: nama,
    cm: cm,
    tanggal_lahir: tgl_lahir,
    jenis_kelamin: jenis_kelamin_singkat,
    diagnosa: diagnosa,
    antibiotik: antibiotik,
    kepesertaan: kepesertaan,
    berat_badan: berat_badan,
    tinggi_badan: tinggi_badan,
    dpjp: dpjp,
    unit: unit // Dikirim agar Apps Script tahu harus masuk ke tab mana
  };

  // Kirim menggunakan XMLHttpRequest
  var xhttp = new XMLHttpRequest();
  
  // GANTI URL DI BAWAH INI DENGAN URL DEPLOYMENT BARU ANDA
  var url_tunggal = "https://script.google.com/macros/s/AKfycbzckcT9Ar5MU0Ao8JNS2IsbgBSioGbdpxi9CwT0gxZnrVDfDEXucia8wDwfv3eD_Xnn2g/exec";

  xhttp.open("POST", url_tunggal, true);
  xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        //alert("Data berhasil terkirim ke Tab " + unit);
      } else {
        alert("Gagal mengirim data. Cek koneksi atau URL Script.");
      }
    }
  };

  // Menggunakan fungsi eksternal encodeFormData jika tersedia, jika tidak gunakan URLSearchParams
  var encodedData = typeof encodeFormData === 'function' ? encodeFormData(data) : new URLSearchParams(data).toString();
  xhttp.send(encodedData);
}

function focusPembukaan() {
  var el = document.getElementById("pembukaan");
  if(el) el.focus();
}
