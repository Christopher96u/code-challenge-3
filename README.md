# FX Conversion App

Your task is to create a 2-page application

## Check the live demo here : [Clik me!](https://frontend-production-8a25.up.railway.app/)

### 📄 Currency converter page:

- display this component:

 ![image](https://github.com/forexco/code-challenge-3/assets/79146695/3caa4f94-037a-48a4-97ac-e9badbae6532)


- automatically fetch rate when both sides of currency and source amount provided
- handle FX rate API response in different states (demo API is provided below)
- calculate and display the markup rate (1% markup) and fee using the following formula:

![image (6)](https://github.com/forexco/code-challenge-3/assets/79146695/8473e91f-1c34-48ab-81ea-6a4baa99fe1d)

- when the source amount changes, recalculate the target amount
- click the icon in the middle to switch 2 currencies and re-fetch the rate
- click the "Submit" button to save the conversion data to the database

#### Bonus:
- make both amounts can be changed (automatically re-calculate another amount)
- if the target amount is provided, the fee is calculated using this formula:

![image (5)](https://github.com/forexco/code-challenge-3/assets/79146695/d359c0d9-9757-41cc-90cd-a430a677c0c0)


### 📄 Transactions page:

- display this transaction record component:

![image](https://github.com/forexco/code-challenge-3/assets/79146695/ab4959f6-3a7e-4d17-9083-4b8b9aa9c4ff)


- fetch data from the database and populate the table


## 🎯 Requirements:

- use TypeScript
- use React
- use any relational database
- use any Node.js framework to create API
- please utilize the backend to calculate the rate or fee. The frontend's role is solely to provide the symbol and amount.
- use this API to retrieve currency rates: https://openexchangerates.org/ (Note: This API provides rates with USD as the base currency, e.g., USD -> AUD. It does not allow changing the base currency. Therefore, you need to devise a solution using the available data to calculate the desired conversion rate.)
- keep the component as close to the design as possible (blue1:`#33428E`, blue2: `#012754`, button:`#002854`, background: `#F8F9FB`) (please find icons in assets folder)
- use docker to containerize the app

### ⭐Bouns:

- use MUI, Styled-components or Emotion
- use Nest.js to create your API
- use an ORM for database manipulation
- write a couple of tests

## Submission Instructions

- Forking the Repository

- Work on the code challenge

- Once you have completed the code challenge and are ready to submit, make sure to commit and push all your changes to your forked repository
- Send an email to [j.dong@forexco.com.au](mailto:j.dong@forexco.com.au) to inform us that you have completed the code challenge.
In your email, include the link to your forked repository on GitHub, allowing us to review your solution.

#### Email [j.dong@forexco.com.au](mailto:j.dong@forexco.com.au) for questions related to this code challenge
