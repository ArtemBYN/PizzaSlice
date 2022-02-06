const app = document.getElementById("app");
const btn = document.getElementById("load-btn");

btn.addEventListener("click", () => {
  btn.className = "loading";
  btn.setAttribute("disabled", "true");
  app.innerHTML = "<p>Waiting...</p>";
  fetch("https://gp-js-test.herokuapp.com/pizza")
    .then(response => response.json())
    .then(data => {
      btn.className = "";
      btn.removeAttribute("disabled");
      if ("party" in data) {
        const eatsPizza = data.party.filter(i => i.eatsPizza).map(i => i.name);
        const numEaters = eatsPizza.length;
        app.innerHTML = `<h2>Pizza for ${numToWord(numEaters)}</h2>`;
        app.appendChild(createPizza(numEaters));
        app.appendChild(createInfo(eatsPizza, data.party.map(i => i.name)));
      } else {
        app.innerHTML = "<h2>Something went wrong:(</h2>";
      }
    })
    .catch(error => {
      btn.className = "";
      btn.removeAttribute("disabled");
      app.innerHTML = "<h2>Something went wrong:(</h2>";
      console.log(
        "There has been a problem with your fetch operation: " + error.message
      );
    });
});

//function converts numbers to words
const numToWord = num => {
  const ones = [
    "zero", "one", "two", "three", "four", "five", "six", "seven",
    "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen",
    "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"
  ];
  if (num >= 0 && num <= 19) {
    return ones[num];
  }
  const tens = [
    "", "", "twenty", "thirty", "forty", "fifty", "sixty",
    "seventy", "eighty", "ninety"
  ];
  if (num >= 20 && num < 100) {
    let str = tens[Math.floor(num / 10)];
    if (num % 10 != 0) str += ` ${ones[num % 10]}`;
    return str;
  }
  return num;
};

//pizza drawing function
const createPizza = num => {
  const pizza = document.createElement("div");
  pizza.className = "pizza";
  const cheese = document.createElement("div");
  cheese.className = "cheese";
  pizza.appendChild(cheese);

  for (let i = 0; i < 8; i++) {
    const tomato = document.createElement("div");
    tomato.className = "tomato"; // what kind of pizza without tomatoes?
    tomato.style.transform = `rotate(${(360 / 8) * i}deg)`;
    pizza.appendChild(tomato);
  }

  for (let i = 0; i < 8; i++) {
    const olives = document.createElement("div");
    olives.className = "olives"; // not everyone likes olives, but that's how I am a gourmet
    olives.style.transform = `rotate(${(360 / 8) * i}deg)`;
    pizza.appendChild(olives);
  }

  const angle = 360 / num; //here we decide how many people to divide the pizza into
  for (let i = 1; i <= num; i += 1) {
    const inner = document.createElement("div");
    inner.className = "cut";
    const deg = angle * i;
    inner.style.transform = `rotate(${deg}deg)`;
    pizza.appendChild(inner);
  }
  return pizza;
};

//function for creating information under pizza
const createInfo = (arr, arrFull) => {
  const info = document.createElement("div");
  info.className = "info";
  info.innerHTML = `<h3>${arrFull.length} people will come to the Party!</h3>`;
  info.innerHTML += `<h3>And ${arr.length} of them will eat the Pizza!</h3>`;
  return info;
};