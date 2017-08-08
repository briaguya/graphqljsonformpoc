# graphqljsonformpoc
Proof of Concept GraphQL integration with Mozilla JSON schema forms

## Set up your development environment
💾 [Install yarn](https://yarnpkg.com/en/docs/install) 

👯 Clone the repo
```
git clone https://github.com/briaguya/graphqljsonformpoc
cd graphqljsonformpoc
```
## Run things
⌨️ Generate the graphql schema from the mozilla json schema
```
cd schemaToGql
yarn
yarn start
```

⌨️ Run the backend
```
cd backend
yarn
yarn start
```

⌨️ Run the frontend
```
cd frontend
yarn
yarn start
```

Once the schema is generated and everything is up and running, go to the react app and try submitting. Upon sucessful submission, a new entry should be in the (fake) GraphQL DB. Head over to the graphiql endpoint provided by the backend CLI output and try running a query.
```
{
  submissions {
    id
    string
    integer
    number
    boolean
    required
    stringarray
    object {
      string
      boolean
    }
    objectarray {
      string
      boolean
    }
  }
}
```
