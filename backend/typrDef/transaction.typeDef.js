const transactionTypeDef = `#graphql
type Transaction {
    _id:ID!
    userId:ID!
    amount:Float!
    currency:String!
    date:String!
    description:String!
    paymentType:String!
    location: String
}

type Query{
    transactions: [Transaction!]
    transaction(transactionId:ID!): Transaction
}

type Mutation{
    createTransaction(input:CreateTransactionInput): Transaction!
    updateTransaction(input:UpdateTransactionInput):Transaction!
    deleteTransaction(transactionId:ID!) :Transaction!
}
input CreateTransactionInput {
    amount:Float!
    currency:String!
    date:String!
    description:String!
    paymentType:String!
    location: String
}
input UpdateTransactionInput{
    transactionId:ID!
    amount:Float
    currency:String
    date:String
    description:String
    paymentType:String
    location: String
}
`

export default transactionTypeDef;