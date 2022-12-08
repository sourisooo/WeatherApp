const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {
  // destructure properties
  const { cityDets, weather } = data;

  // update details template
  details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
  `;

  // update the night/day & icon images
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute('src', iconSrc);
  
  const timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
  time.setAttribute('src', timeSrc);

  // remove the d-none class if present
  if(card.classList.contains('d-none')){
    card.classList.remove('d-none');
  }
};

const updateCity = async (city) => {

  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);
  return { cityDets, weather };

};

cityForm.addEventListener('submit', e => {
  // prevent default action
  e.preventDefault();
  
  // get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  // update the ui with new city
  updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

  // set local storage
  localStorage.setItem('city', city);

});

if(localStorage.getItem('city')){
  updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}

//Commentaires
//La fonctin Update UI prend pour élément d'entrée data. Les propriétés cityDets, weather 
// sont récupérés des entrées puis réinjecter dans de nouvelles variables portant le meme nom afin
//de pouvoir les réutiliser plus tard lorsque l'on aura besoin de créer une page html utilisant 
//ses datas. La zone de la page html codée "détail" va recevoir les informations des variables précédemment
//citées cityDets, weather afin d'afficher le nom de la ville et la température. On remarquera que les méthodes
//utilisées dans l'élaboration du code détail.innerHTML sont des méthodes issues et déployées par l'API developper
//accurateWeather (ex:Temperature.Metric.Value, Weathertext...).
//Les constantes iconSrc et timeSrc vont etre actualisées à travers l'intrant data, de la meme manière que la partie
//du code details.innerHTML. Ces deux variables font référence à deux parties de la page et du code HTML.
//La fonction UpdateCity est une promesse réalisée cad qu'une ou plusieurs demandes d'API vont etre realiser sur cette
//portion de code. Des variables sont définies et font références aux deux méthodes getcity et getweather qui sont
//des fonctions qui réalisent les demandes d'API et sont programmés directemet dans la feuille de programmation
//forecast.js. Cette variable prend pour entrée city et retourne cityDets et weather. Enfin, la dernière partie du
//code va réaliser la convergence entre le nom saisie dans le navigateur, à travers la constante city, et la requete qui va
// etre envoyés dans l'API, à travers la fonction updateCity. La partie de code localStorage enregistre la dernière requete
//API réalisée dans la sauvegarde locale pour qu'à la prochaine ouverture de l'application, une requete
// d'API soit automatiquement envoyée en prenant pour demande le nom de la derniène ville pourlaquelle une requete API a 
//été faite.