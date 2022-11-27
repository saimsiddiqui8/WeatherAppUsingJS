// GETTING ALL VALUES FROM  HTML 
const btnSearch = document.querySelector(".btn-search");
const imgIcon = document.getElementById("imgIcon");
const userDate = document.getElementById("userDate");
const days = document.getElementById("days");

const city = document.getElementById("city");
const country = document.getElementById("country");

const temperature = document.getElementById("temperature");
const humid = document.getElementById("humidity");
const feelsLike = document.getElementById("feelsLike");
const windKmpH = document.getElementById("windKmpH");
const precip = document.getElementById("precip");
const pressures = document.getElementById("pressures");
const lastUpdated = document.getElementById("lastUpdated");
const condition = document.getElementById("condition");

const countries = document.getElementById("country");


//  Searching for values 
btnSearch.addEventListener('click', function () {
    const inputSearch = document.querySelector(".input-search").value;
    fetchData(inputSearch);
});



// conversion of current (Local user time)
const dates = new Date();
let date = dates.getDate()
let month = dates.getMonth()
let year = dates.getFullYear()

days.innerText = dates.toLocaleString('en-us', { weekday: 'long' });



// to convert month in alphabet from number 
function toMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber);

    return date.toLocaleString('en-US', {
        month: 'long',
    });
}

userDate.innerText = date + " " + toMonthName(month) + " " + year

// fetching data through API 
const fetchData = async (search) => {
    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=f2f0f937216040a8893141108222511&q=${search}`
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        const {
            current: {
                temp_c,
                humidity,
                feelslike_c,
                wind_kph,
                precip_mm,
                pressure_in,
                last_updated,

                condition: {
                    text,
                    icon,
                }
            },

            location: {
                name,
                country,
            }
        } = data;

        updateDom(temp_c, humidity, feelslike_c, wind_kph, precip_mm, pressure_in, last_updated, text, icon, name, country,)
    } catch (error) {
        if (search === "") {
            swal({
                title: "Location Error",
                text: "Please Enter Location!",
                icon: "error",
                button: "Enter",
            });
        } else {
            swal({
                title: "Error 404",
                text: "No matching location found.",
                icon: "error",
                button: "Try Again",
            });
        }

    }
}

const updateDom = (temp_c, humidity, feelslike_c, wind_kph, precip_mm, pressure_in, last_updated, text, icon, name, country,) => {

    // conversion of date and time 
    let arr = last_updated.split(" ")


    // putting values 
    temperature.innerHTML = temp_c
    humid.innerHTML = humidity
    feelsLike.innerHTML = feelslike_c
    windKmpH.innerHTML = wind_kph
    precip.innerHTML = precip_mm
    pressures.innerHTML = pressure_in
    lastUpdated.innerHTML = `${arr[0]} at ${arr[1]}`
    condition.innerHTML = text
    imgIcon.src = icon
    city.innerHTML = name.toUpperCase()
    countries.innerHTML = country.toUpperCase()
}