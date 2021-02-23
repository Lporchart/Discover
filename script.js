// transactons = transaction e viser se versa no codigo do professro
// tempo 1:45:30


const Modal = {
    open(){
        document.querySelector('.modal-overlay').classList.add('active')
    },
    close(){
        document.querySelector('.modal-overlay').classList.remove('active')
    }
}

const transaction = [
    {i:1, description: 'luz', amount: -50000, date: '23/01/21'},
    {i:2, description: 'site', amount: 1000000, date: '23/01/21'},
    {i:3, description: 'empresa', amount: -500000, date: '23/01/21'}
]

const Transaction = {
    all: transaction,
    add(transaction){
        Transaction.all.push(transaction)
        App.reload()
    },


    inconmes(){
        let income = 0;
        Transaction.all.forEach(transaction =>{
            if( transaction.amount > 0){
                income += transaction.amount;
            }
        })
        return income
    },
    expenses(){
        let expense = 0;
        Transaction.all.forEach(transaction =>{
            if( transaction.amount < 0){
                expense += transaction.amount;
            }
        })
        return expense
    },
    total(){
        let expense = Transaction.expenses(); 
        let income = Transaction.inconmes();
        let total = income + expense

        return total
    }
}

const DOM = {
    transactionContainer: document.querySelector('#data-table tbody'),
    addTransaction(transaction, index){
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)

        DOM.transactionContainer.appendChild(tr)
    },
    innerHTMLTransaction(transaction){
        const CSSclass = transaction.amount > 0 ? "income" : "expense"
        
        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td><img src="./assets/minus.svg" alt="remover Transação"></td>
            `
        return html
    },
    updateBalance(){
        document.getElementById('incomedisplay').innerHTML = Utils.formatCurrency(Transaction.inconmes())
        document.getElementById('expensedisplay').innerHTML = Utils.formatCurrency(Transaction.expenses())
        document.getElementById('totaldisplay').innerHTML = Utils.formatCurrency(Transaction.total())
    },
    clearTransactions(){
        DOM.transactionContainer.innerHTML = ""
    }
}

const Utils = {
    formatCurrency(value){
        const signal = Number(value) < 0 ? "-" : ""
        value = String(value).replace(/\D/g, "")       
        value = Number(value) / 100
        value = value.toLocaleString("pt-BR",{
            style: "currency",
            currency:"BRL"
            }            
        )
       return signal + value 
    }
}


const App = {
    init(){
        Transaction.all.forEach(transaction => {
            DOM.addTransaction(transaction)
        })

        DOM.updateBalance()
    },
    reload(){
        DOM.clearTransactions()
        App.init()
    }
}

App.init()

Transaction.add({
    id : 32,
    description: 'feijao no prato',
    amount : 200,
    date : '12/12/2016'
})