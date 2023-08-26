import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js"
import { getDatabase, ref, onValue } 
from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js"

const firebaseConfig = {
   databaseURL: "https://playgroundcopycat-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const passportDBRef = ref(database, "Carts")


const searchPasspordEl = document.getElementById('searchPassport')
const searchStickerEl = document.getElementById('searchSticker')
const answerEl = document.getElementById('answer')
const recordError = document.getElementById('record-error')
const recordSuccess = document.getElementById('record-success')
const resultTable = document.getElementById('result-table')
const mainTable = document.getElementById('main-table')
const capchaImageEl = document.getElementById('captcha')


const btnSearch = document.getElementById('btnSearch')
const btnReset= document.getElementById('reset')
const btnRefreshCaptche = document.getElementById('refreshCaptcha')

const listOfCapcha = [
  'images/1.png', 'images/2.jpeg', 'images/3.webp', 'images/4.png', 
  'images/5.jpeg', 'images/6.jpeg', 'images/7.webp', 'images/8.jpeg', 
  'images/9.jpg', 'images/10.jpg', 'images/11.jpg', 'images/12.jpeg'
]

let capchaImage = Math.floor(Math.random() * 12);
capchaImageEl.src = listOfCapcha[capchaImage]


btnReset.addEventListener('click', function (){
  resetButton()
});

btnRefreshCaptche.addEventListener('click', function (){
  let capchaImage = Math.floor(Math.random() * 12);
  capchaImageEl.src = listOfCapcha[capchaImage]
})


btnSearch.addEventListener('click', function(){
     resultTable.innerHTML = ``

  onValue(passportDBRef, function(snapshot) {
    if (snapshot.exists()) {
        let things = Object.entries(snapshot.val())
        
        
        for (let i = 0; i < things.length; i++) {
            
            if(searchPasspordEl.value != null){
              console.log(i)
              console.log(things[i][0])
              console.log(things[i][1]['stickerNumber'])
              console.log(searchPasspordEl.value)
              console.log(searchStickerEl.value)

              if(things[i][0] == searchPasspordEl.value && 
                things[i][1]['stickerNumber'] == searchStickerEl.value){
                recordSuccess.classList.remove('hide')
                recordError.classList.add('hide')
                resetButton()
                mainTable.classList.remove('hide')
                resultTable.innerHTML +=
                  `
                    <tr>
                      <td>${things[i][1]['referenceNumber']}</td>
                      <td>${things[i][1]['passportNumber']}</td>
                      <td style="color: green;">${things[i][1]['applicationStatus']}</td>
                      <td>${things[i][1]['placeOfIssue']}</td>
                      <td>${things[i][1]['visaValidity']}</td>
                      <td style="color: green;">${things[i][1]['visaStatus']}</td>
                    </tr> 
                  
               `
               break;
              } else {
                recordSuccess.classList.add('hide')
                recordError.classList.remove('hide')
                resultTable.classList.add('hide')
                // resetButton()
                // break;
              }
            }
            // if(things[])
        }   
    }
})
})

function resetButton() {
  searchPasspordEl.value = ""
  searchStickerEl.value = ""
  answerEl.value = ""
}
