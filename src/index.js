const dogsURL = "http://localhost:3000/pups"

document.addEventListener('DOMContentLoaded', () => {
  fetch(dogsURL)
    .then(resp => resp.json())
    .then(data => data.forEach(renderDog))
  filterFunction()
})

function renderDog(dog) {
  const dogBar = document.getElementById("dog-bar")
  const span = document.createElement("span")
    span.innerText = dog.name
    span.className = dog.isGoodDog
    span.addEventListener('click', () => {
      showDog(dog)
    })
  dogBar.append(span)
}

function showDog(dog) {
  const dogInfo = document.getElementById("dog-info")
    dogInfo.innerHTML = ""
  const name = document.createElement("h2")
    name.innerText = dog.name
  const image = document.createElement("img")
    image.src = dog.image
  const button = document.createElement("button")
    button.innerText = dog.isGoodDog ? "Good Dog!" : "Bad Dog!"
    button.addEventListener('click', () => {
      goodBadDog(button, dog)
    })
  dogInfo.append(name, image, button)
}

function goodBadDog(button, dog) {
  let status
  if (button.innerText == "Good Dog!") {
    button.innerText = "Bad Dog!";
    status = false;
  } else {
    button.innerText = "Good Dog!";
    status = true;
  }
  dogStatus = {
    isGoodDog: status
  }
  reqPack = {
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(dogStatus)
  }
  fetch(dogsURL+`/${dog.id}`, reqPack)
}

function filterFunction() {
  const filterButton = document.getElementById("good-dog-filter")
    filterButton.addEventListener('click', () => {
      if (filterButton.innerText == "Filter good dogs: OFF") {
        filterButton.innerText = "Filter good dogs: ON"
        goodDogFilter(true)
      } else {
        filterButton.innerText = "Filter good dogs: OFF"
        goodDogFilter(false)
      }
    })
}

function goodDogFilter(status) {
  const dogs = document.getElementById("dog-bar").children
  if (status) {
    for (i = 0; i < dogs.length; i++) {
      if (dogs[i].className == "false") {
        dogs[i].style.display = 'none'
      }
    }
  } else {
    for (i = 0; i < dogs.length; i++) {
      dogs[i].style.display = ""
    }
  }
}
