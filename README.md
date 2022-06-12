<h1>Eth Service</h1>

<p>
Ethereum service for simple payment flow.
Ther service provides an easy way to integrate the Eth payment to the application.
</p>
===============

<h3>Example scenario</h3>
<br/><br/>
<h4>Chatbot</h4>

When the system wants to ask the customer to pay for the orders or services that the user made the following steps can be applied.

1. The chatbot calls the fulfill that connects to the eth-service to generate the payment link or payment qr code and give it to the customer.
2. The customer can click the link to open the payment form in a new window.
3. The customer confirm the address and amount the pay.
4. The customer receives the transaction receipt in hash number and qr code.
5. The customer confirms the payment to the chatbot.
6. The chatbot can use the eth-service to get the transaction receipt, transaction information and block information to validate the payment.


In-app payment

1. Provide a form for eth payment.
2. The user confirm the destination adress and amount to transfer.
3. The user can save the transaction hash or the qr code for rerences.