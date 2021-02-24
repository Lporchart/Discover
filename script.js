// transactons = transaction e viser se versa no codigo do professro
// tempo 2:42:00
// colocar o botao de salvar com a seleção verde 


const Modal = {
    open() {
        document.querySelector('.modal-overlay').classList.add('active')
    },
    close() {
        document.querySelector('.modal-overlay').classList.remove('active')
    }
}


const Transaction = {
    all: [
        { description: 'luz', amount: -50000, date: '23/01/21' },
        { description: 'site', amount: 1000000, date: '23/01/21' },
        { description: 'empresa', amount: -500000, date: '23/01/21' }
    ],
    add(transaction) {
        Transaction.all.push(transaction)
        App.reload()
    },

    remove(index) {
        Transaction.all.slice(index, 1)
        App.reload
    },

    inconmes() {
        let income = 0;
        Transaction.all.forEach(transaction => {
            if (transaction.amount > 0) {
                income += transaction.amount;
            }
        })
        return income
    },
    expenses() {
        let expense = 0;
        Transaction.all.forEach(transaction => {
            if (transaction.amount < 0) {
                expense += transaction.amount;
            }
        })
        return expense
    },
    total() {
        let expense = Transaction.expenses();
        let income = Transaction.inconmes();
        let total = income + expense

        return total
    }
}

const DOM = {
    transactionContainer: document.querySelector('#data-table tbody'),
    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)

        DOM.transactionContainer.appendChild(tr)
    },
    innerHTMLTransaction(transaction) {
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
    updateBalance() {
        document.getElementById('incomedisplay').innerHTML = Utils.formatCurrency(Transaction.inconmes())
        document.getElementById('expensedisplay').innerHTML = Utils.formatCurrency(Transaction.expenses())
        document.getElementById('totaldisplay').innerHTML = Utils.formatCurrency(Transaction.total())
    },
    clearTransactions() {
        DOM.transactionContainer.innerHTML = ""
    }
}

const Utils = {
    formatAmount(value){
        value = Number(value) * 100
        return value
    },
    formatDate(date) {
        console.log(date);
        const splittedDate = date.split("-")
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    },
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""
        value = String(value).replace(/\D/g, "")
        value = Number(value) / 100
        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        }
        )
        return signal + value
    }
}

const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    saveTransaction(transaction){
        Transaction.add(transaction)
    },

    clearFields(){
        this.description.value = ""
        this.amount.value = ""
        this.date.value = ""
        
    },

    getValues() {
        return {
            description: this.description.value,
            amount: this.amount.value,
            date: this.date.value
        }
    },

    validateFields() {
        const { description, amount, date } = this.getValues()
        if(description.trim() === "" || amount.trim() === "" || date.trim() === ""){
            throw new Error("Por favor, preencha toso os campos")
        }   
    },
    formatValues() {
        let = { description, amount, date } = this.getValues()
        amount = Utils.formatAmount(amount)
        date = Utils.formatDate(date)     
        return{description,amount,date}   
    },

    submit(event) {
        event.preventDefault()
        try {
          this.validateFields()
          const transaction = this.formatValues()
          this.saveTransaction(transaction)
          this.clearFields()
          Modal.close()
          
        } catch (error) {
            alert(error.message)
        }
    }
}

const App = {
    init() {
        Transaction.all.forEach(transaction => {
            DOM.addTransaction(transaction)
        })

        DOM.updateBalance()
    },
    reload() {
        DOM.clearTransactions()
        App.init()
    }
}

App.init()

