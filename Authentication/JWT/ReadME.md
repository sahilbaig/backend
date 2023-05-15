JWT (JSON Web Tokens)

## What is JWT 

JWT stands for JSON Web Token, which is a compact, digitally signed token used for securely transmitting and verifying claims between two parties.

## How to run index.js 

1. `npm install`
2. Make a get request to localhost::3000/  and get auth token
3. Use auth token to make a POST requst at localhost::3000/post
   1. req.body should contain authToken = auth token recieved from previous step
4. If auth tokens are verified a success status is sent

## Advantage of JWT

1. The same token can be used in multiple servers , user need not verify again at the next server
2. JWT is stored client side , so server dont have to make another lookup to verify sessions
