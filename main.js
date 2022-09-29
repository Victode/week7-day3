console.log('Hello THERE')


function apiCall(type) {
    fetch(`https://ergast.com/api/f1/2020/1/driverStandings.json`)
        .then((res) => res.json())
        .then((responseData) => racerFunc(responseData, type))
       
}

function racerFunc(data, type) {
    console.log(data.MRData.StandingsTable.StandingsLists[0].DriverStandings)
    
    for (i of data.MRData.StandingsTable.StandingsLists[0].DriverStandings) {
            if (i.type == type || type == '') {

                let racerPosition = i.position
                let racerName = i.Driver.driverId
                let racerNationality = i.Driver.nationality
                let racerSponsor = i.Constructors[0]['constructorId']
                let racerPoints = i.points

                let clone = myTemplate.content.cloneNode(true); 
                let td = clone.querySelectorAll('td') 

                td[0].textContent = racerPosition
                td[1].textContent = racerName
                td[2].textContent = racerNationality
                td[3].textContent = racerSponsor
                td[4].textContent = racerPoints

                tableBody.appendChild(clone);
            }
        } 
    }



const myForm = document.getElementById('form')

myForm.addEventListener('submit', (event) => {
    event.preventDefault()
    tableBody.innerHTML = ''
    const myForm = document.getElementById('form')
    formData = new FormData(myForm)
    let myList = []
    for (const [key, value] of formData) {
        myList.push(value)
    }
    console.log(myList)
    apiCall(myList[0])
})

apiCall()

// axios.get('https://ergast.com/api/f1/2020/2/driverStandings.json')
// .then((res) => console.log(res))
// .catch((err) => console.log(err))