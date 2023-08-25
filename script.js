import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js"
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js"

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


const btnSearch = document.getElementById('btnSearch')
const btnReset= document.getElementById('reset')



btnReset.addEventListener('click', function (){
  resetButton()
});


btnSearch.addEventListener('click', function(){
  onValue(passportDBRef, function(snapshot) {
    if (snapshot.exists()) {
        let things = Object.entries(snapshot.val())
        
        
        for (let i = 0; i < things.length; i++) {
            
            if(searchPasspordEl.value != null){
              
              if(things[i][0] == searchPasspordEl.value && 
                things[i][1]['stickerNumber'] == searchStickerEl.value &&
                answerEl.value == '8d3wh' ){
                recordSuccess.classList.remove('hide')
                recordError.classList.add('hide')
                resetButton()
                resultTable.classList.remove('hide')
                resultTable.innerHTML +=
                  `<tbody>
                    <tr>
                      <td>${things[i][1]['referenceNumber']}</td>
                      <td>${things[i][1]['passportNumber']}</td>
                      <td>${things[i][1]['applicationStatus']}</td>
                      <td>${things[i][1]['placeOfIssue']}</td>
                      <td>${things[i][1]['visaValidity']}</td>
                      <td>${things[i][1]['visaStatus']}</td>
                    </tr> 
                  </tbody>
                  `
              } else {
                recordSuccess.classList.add('hide')
                recordError.classList.remove('hide')
                resultTable.classList.add('hide')
                resetButton()
              }
            }
            // if(things[])
        }   
    } else {
        shoppingListEl.innerHTML = "No Items Yet"
    }
})
})

function resetButton() {
  searchPasspordEl.value = ""
  searchStickerEl.value = ""
  answerEl.value = ""
}
