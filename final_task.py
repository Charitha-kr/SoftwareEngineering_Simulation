import pandas as pd
import sqlite3

# Connect to SQLite database
conn = sqlite3.connect('shipment_database-1.db')
cursor = conn.cursor()

# Load spreadsheets
spreadsheet_0 = pd.read_excel('spreadsheet_0.xlsx')
spreadsheet_1 = pd.read_excel('spreadsheet_1.xlsx')
spreadsheet_2 = pd.read_excel('spreadsheet_2.xlsx')

# Insert data from spreadsheet 0 directly
for index, row in spreadsheet_0.iterrows():
    cursor.execute('INSERT INTO Product (ProductName, Category, Price) VALUES (?, ?, ?)', 
                   (row['ProductName'], row['Category'], row['Price']))

# Process spreadsheet 1 and 2
shipment_map = {}
for index, row in spreadsheet_1.iterrows():
    shipment_id = row['ShippingIdentifier']
    if shipment_id not in shipment_map:
        shipment_map[shipment_id] = []
    shipment_map[shipment_id].append(row)

for shipment_id, products in shipment_map.items():
    # Assuming we have a function to get origin and destination from spreadsheet 2
    origin_id, destination_id = get_origin_destination(shipment_id, spreadsheet_2)
    
    # Insert shipment record
    cursor.execute('INSERT INTO Shipment (ShippingIdentifier, ShipmentDate, OriginID, DestinationID) VALUES (?, ?, ?, ?)', 
                   (shipment_id, '2025-01-10', origin_id, destination_id))
    
    # Get last inserted shipment ID
    shipment_db_id = cursor.lastrowid
    
    # Insert shipment details
    for product in products:
        cursor.execute('INSERT INTO ShipmentDetail (ShipmentID, ProductID, Quantity) VALUES (?, ?, ?)', 
                       (shipment_db_id, product['ProductID'], product['Quantity']))

# Commit changes and close connection
conn.commit()
conn.close()
