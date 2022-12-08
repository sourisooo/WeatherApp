const key = '	tB5kilEStlCJdAWMwFG3P8jJtdYAlD7A';

// get weather information
const getWeather = async (id) => {
  
  const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
  const query = `${id}?apikey=${key}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data[0];

};

// get city information
const getCity = async (city) => {

  const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
  const query = `?apikey=${key}&q=${city}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data[0];

};

//Commentaires
// La fonction getweather est une promesse qui prend pour entrée un id et restitue un objet. Une demande d'API
//va etre realiser à travers la commande fetch, en précisant que l'URL de la requete est spécifié par le site web
//developper Accuweather et dépend de la nature des données à récupérer. La variable response représente la demande de requete
// tandis ce que la variable data représente la réponse à la demande. La réponse est représenter par la commande reponse.json
//puis retourner afin de pouvoir etre utiliser par la feuille de programme app.
//La fonction getcity suit la meme méthodologie de programmation que getweather sauf que cette fonction prend pour entrée city.