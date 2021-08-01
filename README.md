# DigiBill

Digibill is a billing application where shop keeper can maintain all his business data at one place and generate  digital invoices for purchased products.

## Packages used
* Redux  
* React-Router-DOM  
* Formik  
* Yup  
* Axios  
* Thunk

For demo of this app https://digibill.netlify.app/

## Contents

Modules of this project are,  
1.Register  
2.Login  
3.Dashboard  
4.Products  
5.Customers  
6.Bills

## Description
### 1. Register 
* In this module user can register his details.
* User can register into the app by providing details like name, email, password, business details, address.

### 2. Login
* Once user registered his/her details successfully , user can login into the app with his/her registered email and password. 

### 3. Dashboard
* After login with correct details, page is redirected to dashboard.
* In this dashboard page user can moniter all his business data like, total customers, total products, total invoices generated, total income earned.
* Along with them user can moniter business flow of last 7 days and last 5 invoices generated.
* In the same page user can know the top 5 customers who spend more amount in purchasing and the top 5 sold products.

### 4. Products
* In this page user can registerd his business products in a provided form by providing details like product name and price of the product.
* This page shows list of all registerd products along with edit and delete options.

### 5. Customers
* In this page user can registered his customer details by providing name , mobile, email of the customers.
* This same page shows list of all customers with show button.
* By clicking show button it redirected into new page which is having of all customer details along with indivisual bills, edit and  delete option.

### 6. Bills
* This page shows information of all bills along with invoices and delete option.
* User can registered a new bill by clicking on create bill button, it redirected to billing form.
* In billing form by typing the registered mobile number, form get customer information and user can enter registered product name, with quantities and can add many products by clicking plus icon.
* The amount for the products is calculated automatically, once the form is submitted it is generating invoice of that particular purchase and user can print that invoice.


