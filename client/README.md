
Sample Page Data Flow => 

index.js -> App.js (contains routes) -> SamplePageContainer (Actions are dispatched to update redux store) -> SamplePageComponent

Check the routes in routes.js and redux store in store.js  



React-Redux Project (Demo) => 

└── src
    ├── api
    │   ├── apiHandler.js
    │   ├── articleApi.js
    │   ├── categoryApi.js
    │   └── userApi.js
    ├── common
    │   ├── components
    │   │   └── ArticleComponent.jsx
    │   └── containers
    │       └── ArticleContainer.js
    ├── index.js
    ├── pages
    │   ├── CategoryPage
    │   │   ├── CategoryPageContainer.js
    │   │   └── components
    │   │       └── CategoryPageComponent.jsx
    │   └── HomePage
    │       ├── components
    │       │   ├── ArticleListComponent.jsx
    │       │   ├── CategoryComponent.jsx
    │       │   └── HomePageComponent.jsx
    │       └── HomePageContainer.js
    ├── routes.js
    ├── state
    │   ├── article
    │   │   ├── articleActions.js
    │   │   └── articleReducer.js
    │   ├── category
    │   │   ├── categoryActions.js
    │   │   └── categoryReducer.js
    │   ├── middleware.js
    │   ├── store.js
    │   └── user
    │       ├── userActions.js
    │       └── userReducer.js
    └── utils
        └── authUtils.js    