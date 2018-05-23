# RSO project - orders service

Orders service.

TODO: Create real description of service.

## Getting Started

Following instructions bellow you will be able to create running version of orders backend service

### Installing

To run this project you will have to have npm installed

Visit [this](https://www.npmjs.com/package/npm) page and follow steps depending on your system

### Running

To run service you will need to run bellow commands

```
npm install
```

```
npm start
```

If you are working on this service using Visual Studio Code you may also launch this service in debug mode

## Available requests

## Menu

### POST /api/menu HTTP/1.1
```
Host: localhost:3000
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: 63f5cc19-bdaa-4754-8b9d-8df161cbcd9c
{
	"group": "Vege",
	"name": "Salad 1",
	"description": "green grass",
	"price": "30"
}
```
RESPONSE
```
{
    "id": 9,
    "group": "Vege",
    "name": "Salad 1",
    "description": "green grass",
    "price": 30,
    "updatedAt": "2018-05-23T00:20:03.376Z",
    "createdAt": "2018-05-23T00:20:03.376Z"
}
```
### GET /api/menu HTTP/1.1
```
Host: localhost:3000
Cache-Control: no-cache
Postman-Token: 4af88902-9c2c-49db-adb2-c02665c6f726
```
RESPONSE
```
[
    {
        "id": 1,
        "group": "Drinks",
        "name": "Wine 1",
        "description": "cheap wine",
        "price": 10,
        "createdAt": "2018-05-22T23:56:20.360Z",
        "updatedAt": "2018-05-22T23:56:20.360Z"
    },
    (...)
]
```
### GET /api/menu?group=Drinks HTTP/1.1
```
Host: localhost:3000
Cache-Control: no-cache
Postman-Token: a0299b3b-727e-4927-acec-8b04229e672c
```
RESPONSE
```
[
    {
        "id": 3,
        "group": "Drinks",
        "name": "Wine 3",
        "description": "cheap wine",
        "price": 10,
        "createdAt": "2018-05-22T23:56:20.363Z",
        "updatedAt": "2018-05-22T23:56:20.363Z"
    },
    (...)
]
```
### GET /api/menu/3 HTTP/1.1
```
Host: localhost:3000
Cache-Control: no-cache
Postman-Token: c023f0e1-bf7a-492f-a2df-eaf86c1981a7
```
RESPONSE
```
{
    "id": 3,
    "group": "Drinks",
    "name": "Wine 3",
    "description": "cheap wine",
    "price": 10,
    "createdAt": "2018-05-22T23:56:20.363Z",
    "updatedAt": "2018-05-22T23:56:20.363Z"
}
```
### PUT /api/menu/3 HTTP/1.1
```
Host: localhost:3000
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: 95192b7d-cf7f-4f96-8289-38f3234d6266
{
	"name": "NewName"
}
```
RESPONSE
```
{
    "id": 3,
    "group": "Drinks",
    "name": "NewName",
    "description": "cheap wine",
    "price": 10,
    "createdAt": "2018-05-22T23:56:20.363Z",
    "updatedAt": "2018-05-23T00:24:55.781Z"
}
```
### DELETE /api/menu/4 HTTP/1.1
```
Host: localhost:3000
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: 05ba3a77-29b5-4607-8fe6-21ede96e15da
```
RESPONSE
```
{
    "id": 4,
    "group": "MainCourse",
    "name": "Chicken 1",
    "description": "good after gym",
    "price": 10,
    "createdAt": "2018-05-22T23:56:20.364Z",
    "updatedAt": "2018-05-22T23:56:20.364Z"
}
```
## Orders

### POST /api/orders HTTP/1.1
```
Host: localhost:3000
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: de87a153-1aba-4ed7-b047-3364724ce8ae
{
	"table": "15",
	"waiter": "A",
	"state": "start",
	"dishes": []
}
```
RESPONSE
```
{
    "id": 6,
    "table": "15",
    "waiter": "A",
    "state": "start",
    "dishes": [],
    "updatedAt": "2018-05-23T00:27:46.481Z",
    "createdAt": "2018-05-23T00:27:46.481Z"
}
```
### GET /api/orders HTTP/1.1
```
Host: localhost:3000
Cache-Control: no-cache
Postman-Token: 6c0e9ee1-aee2-4e7b-89c4-6ce6cb756d14
```
RESPONSE
```
[
    {
        "id": 2,
        "table": "13",
        "waiter": "A",
        "state": "ordering",
        "dishes": [
            1,
            4
        ],
        "createdAt": "2018-05-22T23:56:20.636Z",
        "updatedAt": "2018-05-22T23:56:20.636Z"
    },
    (...)
]
```
### GET /api/orders?waiter=A HTTP/1.1
```
Host: localhost:3000
Cache-Control: no-cache
Postman-Token: 1f1aa416-c602-422b-bcec-8c20e7a67885
```
RESPONSE
```
[
    {
        "id": 2,
        "table": "13",
        "waiter": "A",
        "state": "ordering",
        "dishes": [
            1,
            4
        ],
        "createdAt": "2018-05-22T23:56:20.636Z",
        "updatedAt": "2018-05-22T23:56:20.636Z"
    },
    (...)
]
```
### GET /api/orders?state=kitchen HTTP/1.1
```
Host: localhost:3000
Cache-Control: no-cache
Postman-Token: 8091ecc1-9b10-4f69-bddf-d2836a2648e5
```
RESPONSE
```
[
    {
        "id": 3,
        "table": "22",
        "waiter": "B",
        "state": "kitchen",
        "dishes": [
            2,
            5
        ],
        "createdAt": "2018-05-22T23:56:20.636Z",
        "updatedAt": "2018-05-22T23:56:20.636Z"
    }
]
```
### GET /api/orders?table=11 HTTP/1.1
```
Host: localhost:3000
Cache-Control: no-cache
Postman-Token: 5ec7750c-951d-4251-ac03-42677be4e9e1
```
RESPONSE
```
[
    {
        "id": 1,
        "table": "11",
        "waiter": "A",
        "state": "start",
        "dishes": [],
        "createdAt": "2018-05-22T23:56:20.635Z",
        "updatedAt": "2018-05-22T23:57:40.247Z"
    }
]
```
### GET /api/orders/1 HTTP/1.1
```
Host: localhost:3000
Cache-Control: no-cache
Postman-Token: 04bccfb5-6409-4490-82a6-53188ac0d1d7
```
RESPONSE
```
{
    "id": 1,
    "table": "11",
    "waiter": "A",
    "state": "start",
    "dishes": [],
    "createdAt": "2018-05-22T23:56:20.635Z",
    "updatedAt": "2018-05-22T23:57:40.247Z"
}
```
### PUT /api/orders/2 HTTP/1.1
```
Host: localhost:3000
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: abd302bb-a46a-486f-8e3c-128d96f95e1c
{
	"state": "kitchen"
}
```
RESPONSE
```
{
    "id": 2,
    "table": "13",
    "waiter": "A",
    "state": "kitchen",
    "dishes": [
        1,
        4
    ],
    "createdAt": "2018-05-22T23:56:20.636Z",
    "updatedAt": "2018-05-23T00:30:28.588Z"
}
```
### POST /api/orders/1/dish HTTP/1.1
```
Host: localhost:3000
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: b1561f33-d37f-409c-8dc1-e858f742c005
{
	"dish": "3"
}
```
RESPONSE
```
{
    "id": 1,
    "table": "11",
    "waiter": "A",
    "state": "start",
    "dishes": [
        3
    ],
    "createdAt": "2018-05-22T23:56:20.635Z",
    "updatedAt": "2018-05-23T00:31:06.357Z"
}
```
### DELETE /api/orders/1/dish HTTP/1.1
```
Host: localhost:3000
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: d49ddc5f-d85a-4bf9-9af2-3d7b8c031e7e
{
	"dish": "3"
  
}
```
RESPONSE
```
{
    "id": 1,
    "table": "11",
    "waiter": "A",
    "state": "start",
    "dishes": [],
    "createdAt": "2018-05-22T23:56:20.635Z",
    "updatedAt": "2018-05-23T00:31:35.237Z"
}
```
### DELETE /api/orders/4 HTTP/1.1
```
Host: localhost:3000
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: fc671321-11ab-4529-ab68-94ce385b63dc
```
RESPONSE
```
{
    "id": 4,
    "table": "25",
    "waiter": "B",
    "state": "ready-to-deliver",
    "dishes": [
        2,
        4
    ],
    "createdAt": "2018-05-22T23:56:20.636Z",
    "updatedAt": "2018-05-22T23:56:20.636Z"
}
```
