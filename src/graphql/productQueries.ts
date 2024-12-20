import gql from 'graphql-tag'

const GET_PRODUCTS = gql`
  query GetProducts(
    $limit: Int
    $offset: Int
    $searchQuery: String
    $orderBy: order_by
  ) {
    products(
      where: { name: { _ilike: $searchQuery } }
      limit: $limit
      offset: $offset
      order_by: { price: $orderBy }
    ) {
      id
      name
      description
      category
      stock
      price
    }
    products_aggregate(where: { name: { _ilike: $searchQuery } }) {
      aggregate {
        count
      }
    }
  }
`
const GET_FILTERED_PRODUCT = gql`
  query GetFilteredProducts(
    $limit: Int
    $offset: Int
    $category: String
    $orderBy: order_by
  ) {
    products(
      where: { category: { _eq: $category } }
      limit: $limit
      offset: $offset
      order_by: { price: $orderBy }
    ) {
      id
      name
      description
      category
      stock
      price
    }

    products_aggregate(where: { category: { _eq: $category } }) {
      aggregate {
        count
      }
    }
  }
`
const GET_TOTAL_PRODUCTS = gql`
  query GET_TOTAL_PRODUCTS($searchQuery: String!) {
    products_aggregate(where: { name: { _ilike: $searchQuery } }) {
      aggregate {
        count
      }
    }
  }
`

const ADD_PRODUCT = gql`
  mutation InsertProducts(
    $category: String
    $description: String
    $name: String
    $stock: Float
    $price: Float
  ) {
    insert_products(
      objects: {
        category: $category
        description: $description
        name: $name
        stock: $stock
        price: $price
      }
    ) {
      affected_rows
      returning {
        price
        stock
        category
        description
        id
        name
      }
    }
  }
`

const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: String!) {
    delete_products(where: { id: { _eq: $id } }) {
      affected_rows
      returning {
        id
        name
      }
    }
  }
`
const GET_PRODUCT_BY_ID = gql`
  query GetProductById($id: String!) {
    products(where: { id: { _eq: $id } }) {
      id
      name
      description
      category
      stock
      price
    }
  }
`

const UPDATE_PRODUCT = gql`
  mutation UpdateProduct(
    $id: String!
    $category: String
    $description: String
    $name: String
    $stock: Float
    $price: Float
  ) {
    update_products(
      where: { id: { _eq: $id } }
      _set: {
        category: $category
        description: $description
        name: $name
        stock: $stock
        price: $price
      }
    ) {
      affected_rows
      returning {
        id
        name
        description
        category
        stock
        price
      }
    }
  }
`
const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    products {
      id
      name
      description
      category
      stock
      price
    }
  }
`
export {
  GET_PRODUCTS,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCT_BY_ID,
  UPDATE_PRODUCT,
  GET_TOTAL_PRODUCTS,
  GET_FILTERED_PRODUCT,
  GET_ALL_PRODUCTS
}
