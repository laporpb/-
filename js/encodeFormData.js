function encodeFormData(data) {
  var encodedData = [];
  for (var key in data) {
    encodedData.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
  }
  return encodedData.join("&");
}