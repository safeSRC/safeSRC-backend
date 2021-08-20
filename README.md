safeSRC: BACK END

---

Authors:

Ben Francka,
Brianna Bias,
Dimitra Weinstein,
Elise Muellerleile,
Maria Ortiz-Lopez,
Sofia Tejada

---

Community safety app that provides resources for 24/7 emergency services as a safer alternative to calling the police. Based on location, emergencies are filtered into selectable categories using a simple, clean UI to make navigation as accessible as possible when time is of the essence.


---

Project management board: https://miro.com/app/board/o9J_l1mE2t4=/

---

# DB ERD

## Tables

### organizations
The organizations table exists to keep track of organizations that have been added to the database by service providers, to avoid duplicate entries and employ authorization.
#### Columns
id (PK)
state_id (FK references states:id)
city_id (FK references cities:id)
#### Relationships
One to many with cities, states
(organizations LEFT JOIN states WHERE organizations.state_id = states.id LEFT JOIN cities WHERE states.city_id = cities.id)
#### Routes
POST (oauth)
PUT (oauth)
Delete (oauth)

### states
The states table provides a framework for expanding the app into a nationwide database by organizing the cities by their respective states.
#### Columns
id (PK)
state_name (TEXT NOT NULL)
city_id (FK references city:id)
#### Relationships
One to many with cities 
(states LEFT JOIN cities WHERE states.city_id = cities.id)
#### Routes
GET
GET: id
### cities
The cities table will provide the ability to search for individual services by city, and provides the key to joining the majority of the services tables.
#### Columns
id (PK)
state_id (FK references states: id)
city_name (TEXT NOT NULL)
#### Relationships
One to many with housing_services, crime_services, mental_health_services, sexual_assault_services, crime services, Lgbtq_services, domestic_violence_services,substance_abuse services, elderly_assistance_services
(cities 
LEFT JOIN housing_services WHERE cities.id = housing_services.city_id 
LEFT JOIN crime_services WHERE cities.id = crime_services.city_id 
LEFT JOIN lgbtq_services WHERE cities.id = lgbtq_services_city.id
LEFT JOIN mental_health_services WHERE cities.id = mental_health_services.city_id
LEFT JOIN sexual_assault_services WHERE cities.id = sexual_assault_services.city_id
LEFT JOIN domestic_violece_services WHERE cities.id = domestic_violence_services.city.id
LEFT JOIN elderly_assistance_services WHERE cities.id = elderly_assistnace_services.city_id
LEFT JOIN substance_abuse_services WHERE cities.id = substance_abuse_services.city_id)
#### Routes
GET 
GET: id
### housing_services
The housing_services table stores organizations that provide said service.
#### Columns
id (PK)
city_id (FK references cities: id)
organization_id (FK references organizations: id)
service_name (TEXT NOT NULL)
description (TEXT)
link (TEXT)
phone_number (TEXT NOT NULL)
#### Routes
GET 
GET: id (service)
GET: id (city)
POST (oauth)
PUT (oauth)
DELETE (oauth)

### crime_services
The crime_services table stores organizations that provide said service.
#### Columns
id (PK)
city_id (FK references cities: id)
organization_id (FK references organizations: id)
service_name (TEXT NOT NULL)
description (TEXT)
link (TEXT)
phone_number (TEXT NOT NULL)

### lgbtq_services
The lgbtq_services table stores organizations that provide said service.
#### Columns
id (PK)
city_id (FK references cities: id)
organization_id (FK references organizations: id)
service_name (TEXT NOT NULL)
description (TEXT)
link (TEXT)
phone_number (TEXT NOT NULL)
#### Routes
GET 
GET: id (service)
GET: id (city)
POST (oauth)
PUT (oauth)
DELETE (oauth)

### mental_health_services
The mental_health_services table stores organizations that provide said service.
#### Columns
id (PK)
city_id (FK references cities: id)
organization_id (FK references organizations: id)
service_name (TEXT NOT NULL)
description (TEXT)
link (TEXT)
phone_number (TEXT NOT NULL)
#### Routes
GET 
GET: id (service)
GET: id (city)
POST (oauth)
PUT (oauth)
DELETE (oauth)

### substance_abuse_services
The substance_abuse_services table stores organizations that provide said service.
#### Columns
id (PK)
city_id (FK references cities: id)
organization_id (FK references organizations: id)
service_name (TEXT NOT NULL)
description (TEXT)
link (TEXT)
phone_number (TEXT NOT NULL)
#### Routes
GET 
GET: id (service)
GET: id (city)
POST (oauth)
PUT (oauth)
DELETE (oauth)

### sexual_assault_services
The sexual_assault_services table stores organizations that provide said service.
#### Columns
id (PK)
city_id (FK references cities: id)
organization_id (FK references organizations: id)
service_name (TEXT NOT NULL)
description (TEXT)
link (TEXT)
phone_number (TEXT NOT NULL)
#### Routes
GET 
GET: id (service)
GET: id (city)
POST (oauth)
PUT (oauth)
DELETE (oauth)

### elderly_assistance_services
The elderly_assistance_services table stores organizations that provide said service.
#### Columns
id (PK)
city_id (FK references cities: id)
organization_id (FK references organizations: id)
service_name (TEXT NOT NULL)
description (TEXT)
link (TEXT)
phone_number (TEXT NOT NULL)
#### Routes
GET 
GET: id (service)
GET: id (city)
POST (oauth)
PUT (oauth)
DELETE (oauth)

### domestic_violence_services
The domestic_violence_services table stores organizations that provide said service.
#### Columns
id (PK)
city_id (FK references cities: id)
organization_id (FK references organizations: id)
service_name (TEXT NOT NULL)
description (TEXT)
link (TEXT)
phone_number (TEXT NOT NULL)
#### Routes
GET 
GET: id (service)
GET: id (city)
POST (oauth)
PUT (oauth)
DELETE (oauth)

---
