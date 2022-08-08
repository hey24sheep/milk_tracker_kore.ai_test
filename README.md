# Milk Tracker Kore.ai HackerEarth API Challenge
A milk tracker NodeJS project for Kore.ai HackerEarth interview

# What is used?
Fastify, with a in memory "mock session data" for quick and easy assesment. 


`All API changes can be seen in real time and be tested easily using "Swagger"`

# Why Fastify?
Well, it's literally faster and lightweight than most other frameworks. Also, easier to prototype these quick stuff with less overhead.

# Setup
- `cd milk-tracker
- run `npm install`

# Run
- To run the app in "Prod" use "npm run start"
- To run the app in "Dev" use "npm run dev"

# Docs
Using "Swagger" for the documentation. Link to Swagger is https://localhost:3000/docs

</br>  
</br>  

# Task
Build a pseudo backend API which will manage, add, update orders. Also enable tracking milk capacity left for a particular day.

# Minimum Requirements
### Routes
  
  - `/add` will add a new order with required values
  - `/update/:id` update order details
  - `/updateStatus/:id` update order status
    - Possible values are :
      - placed
      - packed
      - dispatched
      - delivered
  - `/delete/:id` delete order
  - `/checkCapacity/:date` will return left milk capacity as per all orders for that date 
    - NOTE : for this test, keep max_capacity fixed

# Advanced Requirements
- Host API on cloud
- Add any other new feature
  - Add description of the said features
- Document API using swagger or any other tool
  - Provide link to the said docs

# Stack
- NodeJS