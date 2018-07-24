# bc-playground


#To run server

>> cd server
>> yarn install
>> yarn start


#test transaction
 curl -d '{  "from": "71238uqirbfh894-random-public-key-a-alkjdflakjfewn204ij",  "to": "93j4ivnqiopvh43-random-public-key-b-qjrgvnoeirbnferinfo",  "amount": 3}'  -H "Content-Type: application/json" -X POST http://localhost:8080/txion