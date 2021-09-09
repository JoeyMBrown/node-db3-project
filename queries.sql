-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.

 SELECT
  pr.ProductName,
  ca.CategoryName
 FROM product as pr
 LEFT JOIN category as ca
   on pr.categoryId = ca.id

-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.

 SELECT
  od.id,
  sh.CompanyName
 FROM 'order' as od
 LEFT JOIN shipper as sh
   on od.ShipVia = sh.id
WHERE od.OrderDate < '2012-08-09'

-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.

SELECT
    od.Quantity,
    pr.productName
    FROM 'order' as oe
    LEFT JOIN orderdetail as od
    on oe.id = od.OrderId
    LEFT JOIN product as pr
    on od.productId = pr.id
    WHERE od.orderID = 10251
    GROUP BY pr.productName

-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.

SELECT
    ord.id,
    cus.CompanyName,
    emp.LastName
FROM 'order' as ord
    INNER JOIN customer as cus
    on ord.CustomerId = cus.id
    INNER JOIN employee as emp
    on ord.employeeId = emp.id