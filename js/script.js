function prosesLapor() {
  var isi_pembukaan = document.getElementById("pembukaan").value;
  var nama = document.getElementById("nama").value;
  var cm = document.getElementById("cm").value;
  // Mendapatkan elemen-elemen select
  var tanggalElement = document.getElementById("tanggal");
  var bulanElement = document.getElementById("bulan");
  var tahunElement = document.getElementById("tahun");

  // Mendapatkan nilai dari elemen-elemen select
  var tanggal = tanggalElement.value;
  var bulan = bulanElement.value;
  var tahun = tahunElement.value;

  // Kombinasikan nilai-nilai tersebut untuk mendapatkan tanggal lahir lengkap
  var tgl_lahir = tanggal + "-" + bulan + "-" + tahun;
  var jenis_kelamin = document.getElementById("jenis_kelamin").value;
  var diagnosa = document.getElementById("diagnosa").value;
  var antibiotik = document.getElementById("antibiotik").value;
  var kepesertaan = document.getElementById("kepesertaan").value;
  var berat_badan = document.getElementById("berat_badan").value.toString().replace(/\./g, ',');
  var tinggi_badan = document.getElementById("tinggi_badan").value.toString().replace(/\./g, ',');
  var dpjp = document.getElementById("dpjp").value;
  var penutup = document.getElementById("penutup").value;

  // Hasil Lab
  var hb = document.getElementById("hb").value;
  var l = document.getElementById("l").value;
  var pcv = document.getElementById("pcv").value;
  var tr = document.getElementById("tr").value;
  var lain = document.getElementById("lain").value;

  var usia = calculateAge(tgl_lahir); // Fungsi untuk menghitung usia
  var tgl_lahir_formatted = formatDate(tgl_lahir); // Fungsi untuk memformat tanggal lahir

  var jenis_kelamin_singkat = (jenis_kelamin === "Laki-laki") ? "L" : "P";
  var tgl_sekarang = hari_ini();

  var hasil = "";
  hasil += isi_pembukaan + "\n";
  hasil += "-----\n";
  hasil += "Nama : " + nama + " (" + jenis_kelamin_singkat + ")\n";
  hasil += "Cm : " + cm + "\n";
  hasil += "Usia : " + usia + " (" + tgl_lahir + ")\n"; // Menggunakan tanggal lahir yang diformat
  hasil += "Diagnosa : " + diagnosa + "\n";
  hasil += "Antibiotik : " + antibiotik + "\n";
  hasil += "BB : " + berat_badan + " kg, TB : " + tinggi_badan + " cm\n";
  hasil += "Kepesertaan : " + kepesertaan + "\n";
  hasil += "DPJP : " + dpjp + "\n";
  
  // Hasil Lab
  hasil += "-----\n";
  hasil += "Hasil Lab:\n";
  hasil += "Hb: " + hb + "\n";
  hasil += "L: " + l + "\n";
  hasil += "Pcv: " + pcv + "\n";
  hasil += "Tr: " + tr + "\n";
  hasil += lain + "\n"; // Menampilkan nilai "Lain-lain" tanpa label
  hasil += "-----\n";
  hasil += penutup;

  // Cek apakah user sudah memilih ruangan (AL-ANAK / AL-PICU / ISO)
  if (!document.querySelector('input[name="unit"]:checked')) {
    alert("Silakan isi Ruangan");
    return;
  } else if (tanggal === "" || bulan === "" || tahun === "") {
    alert("Tanggal belum di isi");
    return;
  } else if (dpjp === "") {
    alert("DPJP belum di isi");
    return;
  } else {
    document.getElementById("hasil").value = hasil;
  }

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
    dpjp: dpjp
  };

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // Aksi tambahan setelah upload berhasil (opsional)
    }
  };

  var url_anak = "https://script.google.com/macros/s/AKfycbwi44-Q6HB0KTgPnl5dbzRGogTu5MCXp6kJ-Q6RdD7Lvdt_D3WO6EROoWHd5OqiVf8s/exec";
  var url_picu = "https://script.google.com/macros/s/AKfycbxFNJLZY3KQVBeSIWmU7WNtP9bLWWfoEFRwz49TRR3Lie1WoKWeRVkES_sBWu1L68s_/exec";
  var url_iso = "https://script.google.com/macros/s/AKfycbxD690T_pdyydhCgW8gIX6AHfYkJz0K9lAe_spNrapWE3mdduR08WhGWo_UCYQoXGmZ/exec";

  // Ambil nilai dari radio button yang dipilih
  var unitElement = document.querySelector('input[name="unit"]:checked');
  var unit = unitElement.value;
  var url; // Deklarasi variabel url

  if (unit === "AL-ANAK") {
    url = url_anak;
  } else if (unit === "AL-PICU") {
    url = url_picu;
  } else if (unit === "ISO") {
    url = url_iso;
  }

  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhttp.send(encodeFormData(data));
}

function focusPembukaan() {
  document.getElementById("pembukaan").focus(); // Pastikan ID sesuai dengan input yang digunakan
}
