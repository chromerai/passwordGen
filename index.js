const letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]

const numbers = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"] 

const symbols = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"]

let passwordLength = 15
let includeNumbers = true
let includeSymbols = true

function generatePassword() {
    let chars = [...letters]
    if(includeNumbers) chars.push(...numbers);
    if(includeSymbols) chars.push(...symbols);
    
    let password = ''
    for(let i = 0; i < passwordLength; i++) {
        password += chars[Math.floor(Math.random() * chars.length)]
    }
    
    return password;
}


function generatePasswords() {
    const password1 = generatePassword()
    const password2 = generatePassword()
    
    const box1 = document.getElementById('password-1')
    const box2 = document.getElementById('password-2')
    
    box1.querySelector(".password-text").textContent = password1
    box2.querySelector(".password-text").textContent = password2
    
    box1.classList.remove("empty")
    box2.classList.remove("empty")
    
    box1.setAttribute('aria-label', "Click to copy password 1: " + password1)
    box2.setAttribute('aria-label', "Click to copy password 2: " + password2)
}

function settingsToggle() {
    const panel = document.getElementById("settings-panel")
    const toggles = document.getElementById("settings-toggle")
    
    panel.classList.toggle('open')
    toggles.classList.toggle('open')
}

function updateSettings() {
    includeNumbers = document.getElementById("include-numbers").checked
    includeSymbols = document.getElementById("include-symbols").checked
    
}

function updateLength(length) {
    passwordLength = parseInt(length)
    document.getElementById("length-display").textContent = passwordLength
}

function copyPasswords(elementId) {
    const element = document.getElementById(elementId)
    const passwordText = element.querySelector(".password-text").textContent
    
    if(element.classList.contains('empty'))
    return;
    
    navigator.clipboard.writeText(passwordText).then(() => {
        showNotification();
    }).catch(err => {
        console.log('Failed to copy: ' + err)
    });
}

function handleKeyPress(event, elementId) {
    if(event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        copyPasswords(elementId)
    }
}

function showNotification() {
    const notificationEl = document.getElementById('notification-el')
    notificationEl.classList.add('show');
    
    setTimeout(() => {
        notificationEl.classList.remove('show');
    }, 2000) 
    
}

