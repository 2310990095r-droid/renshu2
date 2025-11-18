// Google Map 初期化
function initMap() {
  // 高屋うめの辺２付近の座標
  const location = { lat: 34.4635956, lng: 132.7815869 };

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 16,
    center: location,
  });

  const marker = new google.maps.Marker({
    position: location,
    map: map,
    title: "〒739-2116 高屋うめの辺２",
  });

  const info = new google.maps.InfoWindow({
    content: "<div style='font-size:14px;'>ジム所在地：高屋うめの辺２</div>",
  });

  marker.addListener("click", () => {
    info.open(map, marker);
  });
}

// ボタンクリックで地図へスクロール
document.getElementById("scroll-map").addEventListener("click", () => {
  document.getElementById("map-section").scrollIntoView({
    behavior: "smooth",
  });
});
