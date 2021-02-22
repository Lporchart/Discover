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
    iconmes(){

    },
    expenses(){

    },
    total(){

    }
}

const Utils = {
    formatCurrency(value){
        const signal = Number(value) < 0 ? "-" : ""
        value = String(value).replace(/\D/g, "")
        console.log(value)
        value = Number(value) / 100
        value = value.toLocaleString("pt-BR",{
            style: "currency",
            currency:"BRL"
            }            
        )
       return signal + value 
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
    }
}
transaction.forEach(function(transaction){
    DOM.addTransaction(transaction)
})