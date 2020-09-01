const dummyTransactions = [
  { id: 1, text: 'Flower', amount: -20 },
  { id: 2, text: 'Salary', amount: 300 },
  { id: 3, text: 'Book', amount: -10 },
  { id: 4, text: 'Camera', amount: 150 }
];

const list = document.getElementById('list');
const balance = document.getElementById('balance');
const money_pluse = document.getElementById('money-pluse');
const mony_mines = document.getElementById('mony-mines');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');


const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'))
let transactions = localStorage.getItem('transactions') !== null ?localStorageTransactions:[];

function updateDom(transaction){
    const sign = transaction.amount <0 ?'-':'+';
    const item = document.createElement('li');
    item.classList.add(transaction.amount > 0 ?'pluse':'mines');
    item.innerHTML = `
    ${transaction.text}<span>${sign} $${Math.abs(transaction.amount).toFixed(2)}</span>
    <button class="btn-delete">x</button>
    `;
   list.appendChild(item);
}

function updateValue(){
    const amounts = transactions.map(item=>item.amount);
    const total= amounts.reduce((acc,item)=>acc+=item ,0).toFixed(2);
    balance.innerText = `$${total}`;

    const income = amounts.filter(item=>item>0)
                    .reduce((acc,item)=>(acc+=item),0)
                    .toFixed(2);
    money_pluse.innerText = `$${income}`;
    const expense = (
        amounts.filter(item => item < 0)
        .reduce((acc, item) => (acc += item), 0) *
        -1
      ).toFixed(2);
    mony_mines.innerText = `$${expense}`
    
   
            
}

function addTransaction(e){
    e.preventDefault();
    if(text.value.trim()==='' || amount.value.trim()===''){
        alert('please add data');
    }else{
        console.log(amount.value)
        const transactionItem ={
            id:getGeneralId(),
            text:text.value,
            amount:+amount.value
        }
        console.log(transactionItem)
        transactions.push(transactionItem);
       
        updateDom(transactionItem);
        updateValue();
        updateLocalStorage();
        text.value = '';
        amount.value = '';
    }
}
form.addEventListener('submit', addTransaction);
function getGeneralId(){
    return Math.floor(Math.random()*100000)
}



// Update local storage transactions
function updateLocalStorage() {
    localStorage.setItem('transactions',JSON.stringify(transactions))
  }

  

function init(){
    list.innerHTML='';
    transactions.map(item=>{
        return updateDom(item)
    })
    updateValue()
}


init();