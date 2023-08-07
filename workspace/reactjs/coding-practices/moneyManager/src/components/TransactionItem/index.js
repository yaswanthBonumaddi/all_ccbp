import './index.css'

const TransactionItem = props => {
  const {transactionDetails, deleteTransactionItem} = props
  const {id, title, amount, type} = transactionDetails

  const onDeleteTransaction = () => {
    deleteTransactionItem(id)
  }

  return (
    <li className="transaction-list-item">
      <p className="input">{title}</p>
      <p className="input">Rs {amount}</p>
      <p className="input">{type}</p>
      <div className="button-container">
        <button
          type="button"
          className="delete-button"
          onClick={onDeleteTransaction}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            className="delete-image"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default TransactionItem
