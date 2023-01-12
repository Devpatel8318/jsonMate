var map = L.map("map").setView([23.234724, 72.642108], 14);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);
// let marker = L.marker([51.505, -0.09]).addTo(map);
// function onMapClick(e) {
//     // console.log(e.latlng);
//     // map.removeLayer(marker);
//     var marker = L.marker(e.latlng).addTo(map);
// }
// function remover(e) {
//     if (map.hasLayer(marker)) {
//         marker.remove();
//     }
//     else {
//         console.log("nathi");
//     }
//     onMapClick(e);
// }
// map.on('click', remover);
let x;
let y;

function onMapClick(e) {
    // user clicked on a map
    fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${e.latlng.lat}&lon=${e.latlng.lng}&apiKey=bed8b866464f4b369ab39767ba49258d`)
        .then(response => response.json())
        .then(result => {
            if (result.features.length) {
                const address = result.features[0].properties.formatted;

                x = e.latlng.lat;
                y = e.latlng.lng;
                L.popup().setLatLng(e.latlng).setContent(address).openOn(map);
            } else {
                L.popup().setLatLng(e.latlng).setContent("No address found").openOn(mymap);
                x = e.latlng.latitude;
                y = e.latlng.longitude;
            }
        });
}
map.on('click', onMapClick);

function markerSetter() {
    console.log(x, y);
    let marker = L.marker([x, y]).addTo(map);
    map.closePopup();
    document.getElementById("Location").remove();

}


document.getElementById("sub").style.display = 'none';
let otp;
function otpGenerator() {
    otp = Math.floor(Math.random() * 1000000) + 1;
    return otp;
}



function sendMail() {
    var params = {
        name: document.getElementById("name").value,
        email_id: document.getElementById("mail").value,
        message: otpGenerator(),
    };
    emailjs
        .send("service_cyxbt0d", "template_plwjtef", params)
        .then(function (res) {
            alert(`Mail sent to ${document.getElementById("mail").value}`);
        });
    document.getElementById("verify").style.display = "none"
}

function otpChecker() {
    let k = document.getElementById("otp").value;
    if (k == otp) {
        document.getElementById("sub").style.display = "";
        console.log("Right OTP");
        document.getElementById("otpCheck").style.display = "none";
    }
    else {
        alert("Wrong Otp, Try Again");
        // document.getElementById("sub").style.display = "";
        // console.log("Right OTP");
        // document.getElementById("otpCheck").style.display = "none";
    }
}



const formEl = document.querySelector(".form1");

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(formEl);
    const data = Object.fromEntries(formData);
    console.log(data);
    delete data["otp"];
    data["xcoo"] = x.toString();
    data["ycoo"] = y.toString();
    var extra = {
    }
    fetch("http://localhost:3000/items", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then(fetch("http://localhost:3000/stock", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "available": 0,
            "id": Number(data.id)
        }),
    }));
    openNewURLInTheSameWindow("http://127.0.0.1:5500/Intenship/jsonMate/login.html");
});


function fireClickEvent(element) {
    var evt = new window.MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
    });
    element.dispatchEvent(evt);
}


function openNewURLInTheSameWindow(targetURL) {
    var a = document.createElement('a');
    a.href = targetURL;
    fireClickEvent(a);
}