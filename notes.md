# GraphQL and React

## The Problem - Why does GraphQL exists?

### Old way of requesting data through API

| URL       | Method |         Operation |
| --------- | :----: | ----------------: |
| /posts    |  POST  | Create a new post |
| /posts    |  GET   |   Fetch all posts |
| /posts/25 |  GET   |     Fetch post 25 |
| /posts/7  |  PUT   |     Update post 7 |
| /posts/2  | DELETE |     Delete post 2 |

| URL          | Method |                     Operation |
| ------------ | :----: | ----------------------------: |
| /\<name>     |  POST  |              Create an entity |
| /\<name>     |  GET   |            Fetch all entities |
| /\<name>/:id |  GET   | Fetch an entity with given id |
| /\<name>/:id |  PUT   | Updatean entity with given id |
| /\<name>/:id | DELETE | Deletean entity with given id |

RESTFul routing tends to get complicated when nesting or you'd want to make more requests to get data.

A summary of the big issues encountered:

- nesting API routs
- making multiple requests
- oversending (overfetching) data

## What it GraphQL

## How do you use GraphQL

Example:

```
query: {
  person(id: 25) {
    connectedPeople {
      movies {
        title
      }
    }
  }
}
```


## Cannot find module 'graphql'

If you get an error with `Cannot find module 'graphql'` just run `npm i graphql` or `yarn add graphql` to solve it.
