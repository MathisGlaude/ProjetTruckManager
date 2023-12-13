/*****************************************************************************///Carte et entrepot

let capitales, warehouse = [], ticket = 1;

let intervalTicket = setInterval(function() {
    if (ticket > 0) {
        document.getElementById("infoSpace").style.display = 'flex';
        document.getElementById("infoContent").innerHTML = "il vous reste " + ticket + " ticket(s) entrepôt <br>" + "Appuyez sur une villes pour acheter un entrepôt";
    } else {
        document.getElementById("infoSpace").style.display = 'none';
    }
}, 1000); // exécuter toutes les 1000 millisecondes (1 seconde)


// On charge la carte
window.onload = function() {
    let maCarte = L.map("carte").setView([50.84667, 4.3525], 5);
    L.tileLayer('https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=6799210dadae43ceaa7a899e43bef6ea', {
        attribution: 'OpenStreetMap France',
        minZoom: 1,
        maxZoom: 20
    }).addTo(maCarte);
    
    let lat1, lng1, lat2, lng2;
    // On active la gestion d'itineraire
    // Créer les waypoints
    let waypoint1 = L.latLng(lat1, lng1);
    let waypoint2 = L.latLng(lat2, lng2);

    // Stocker les waypoints dans une autre variable
    let waypoints = [waypoint1, waypoint2];

    // Utiliser les waypoints pour l'itinéraire
    let control = L.Routing.control({
        waypoints: waypoints,
        routeWhileDragging: true,
        show: true,
        addWaypoints: false,
        createMarker: function() { return null; },
        router: new L.Routing.osrmv1({
        serviceUrl: 'https://router.project-osrm.org/route/v1'
    })
    }).addTo(maCarte);

    capitales = {
        "Berlin": [52.5200, 13.4050],   
        "Vienne": [48.2082, 16.3738],
        "Bruxelles": [50.84667, 4.3525],
        "Sofia": [42.6977, 23.3219],
        "Nicosie": [35.1856, 33.3823],
        "Zagreb": [45.8150, 15.9819],
        "Copenhague": [55.6761, 12.5683],
        "Madrid": [40.4168, -3.7038],
        "Tallinn": [59.4370, 24.7536],
        "Helsinki": [60.1756, 24.9342],
        "Paris": [48.8566, 2.3522],
        "Athènes": [37.9838, 23.7275],
        "Budapest": [47.4979, 19.0402],
        "Dublin": [53.3498, -6.2603],
        "Rome": [41.9028, 12.4964],
        "Riga": [56.9496, 24.1052],
        "Vilnius": [54.6872, 25.2797],
        "Luxembourg": [49.6116, 6.1319],
        "La Valette": [35.8989, 14.5146],
        "Amsterdam": [52.3676, 4.9041],
        "Varsovie": [52.2297, 21.0122],
        "Lisbonne": [38.7223, -9.1393],
        "Prague": [50.0755, 14.4378],
        "Bucarest": [44.4268, 26.1025],
        "Bratislava": [48.1486, 17.1077],
        "Ljubljana": [46.0569, 14.5058],
        "Stockholm": [59.3293, 18.0686]
    };
    
    for (let capitale in capitales) {
        let marker = L.marker(capitales[capitale])
        .addTo(maCarte)
        .bindPopup(capitale);
        
        if (ticket > 0) {
            marker.on('click', createClickHandler(capitale));
        }
    }
    
    function createClickHandler(capitale) {
        return function() {
            if (ticket > 0) {
                this.setIcon(colorIcon(capitale)); // Change l'icône du marqueur qui a été cliqué
                ticket = ticket - 1; // Décrémente ticket à chaque itération
                console.log("Marker clické et icône changée");
            } else {
                console.log("Ticket épuisé, icône non changée");
            }
        };
    }
    
    
}
/**
     * Change la couleur d'un marker au click de celui ci.
     * @param {String} capitale 
     */
function colorIcon(capitale) {

    const markerHtmlStyles = `
        background-color: #e60000;
        width: 20px;
        height: 20px;
        display: block;
        right: 10px;
        position: relative;
        border: 2px solid black;
    `;

    return L.divIcon({
        className: "my-custom-pin",
        iconAnchor: [0, 24],
        labelAnchor: [-6, 0],
        popupAnchor: [0, -36],
        html: `<span style="${markerHtmlStyles}" />`
    });
}

/*****************************************************************************///Camions

// DAF
let DAF = [
    ["DAF LF", 220, 60000],
    ["DAF CF", 460, 95000],
    ["DAF XLF", 480, 100000],
    ["DAF XF", 530, 110000],
    ["DAF XG", 530, 115000]
];

// MAN
let MAN = [
    ["MAN TGL", 250, 0, 70000],
    ["MAN CLA", 320, 0, 80000],
    ["MAN TGM", 360, 0, 85000],
    ["MAN TGS", 500, 0, 105000],
    ["MAN TGX", 640, 0, 200000]
];

// Mercedes-Benz
let Mercedes = [
    ["Mercedes Econic", 299, 0, 70000],
    ["Mercedes Unimog", 300, 0, 75000],
    ["Mercedes Axor", 360, 0, 85000],
    ["Mercedes Arocs", 510, 0, 110000],
    ["Mercedes Actros", 625, 0, 190000]
];

// Renault
let Renault = [
    ["Renault D Range", 320, 80000],
    ["Renault K Range", 410, 85000],
    ["Renault C Range", 420, 90000],
    ["Renault T Range", 480, 100000],
    ["Renault T High", 520, 120000]
];

// Scania
let Scania = [
    ["Scania P410", 410, 90000],
    ["Scania G450", 450, 95000],
    ["Scania R500", 500, 105000],
    ["Scania S730", 770, 220000],
    ["Scania R730", 770, 230000]
];

// Volvo
let Volvo = [
    ["Volvo VNR", 375, 80000],
    ["Volvo VNL", 455, 100000],
    ["Volvo FH12", 460, 105000],
    ["Volvo FM", 500, 120000],
    ["Volvo FH16", 750, 200000]
];

/*****************************************************************************///Money Fuel

//init money et fuel et mise a 0
let money = 0;
document.getElementById("money").textContent = money + "$";
let fuel = 0;
document.getElementById("fuel").textContent = fuel + "L";

/*****************************************************************************///Menu


//init openmenu, closemenu et menu
let openButtonMenu = document.getElementById('openButtonMenu');
let closeButtonMenu = document.getElementById('closeButtonMenu');
let menu = document.getElementById('menu');
let openMenu = document.getElementById('openMenu');
//Ouverture du menu de gauche
openButtonMenu.addEventListener('click', () => {
    openMenu.style.display = 'none';
    closeMenu.style.display = 'block';
    menu.style.display = 'block';
});
//fermeture du menu de gauche
closeButtonMenu.addEventListener('click', () => {
    openMenu.style.display = 'block';
    menu.style.display = 'none';
});

/*****************************************************************************///Shop

//init fermeture shop et le menu shop
let closeButtonShop = document.getElementById('closeButtonShop');
let shopContent = document.getElementById('shopContent');
// fermeture du shop
closeButtonShop.addEventListener('click', () => {
    shopContent.style.display = 'none';
});

let shopButton = document.getElementById('shopButton');
shopButton.addEventListener('click', () => {
    shopContent.style.display = 'block';
});

/*****************************************************************************///TruckMenu

//init fermeture camions et le menu camions
let closeButtonTruck = document.getElementById('closeButtonTruck');
let TruckContent = document.getElementById('truckContent');
// fermeture du menu camions
closeButtonTruck.addEventListener('click', () => {
    truckContent.style.display = 'none';
});

let truckButton = document.getElementById('truckButton');
truckButton.addEventListener('click', () => {
    truckContent.style.display = 'block';
});