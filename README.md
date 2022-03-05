# File Storage on AWS S3
A Rest API to save, retrieve and delete files from AWS S3 cloud storage and save information on SQlite using Prisma ORM

# Environment Variables
Duplicate the .env.example and make sure the file is called .env

## Amazon AWS Settings
* Sign Up to Amazon AWS using their 1-year free tier
* On AWS, go to the IAM service 
  * Create a new user 
  * For "AWS credential type", make sure to select at least "Access key - Programmatic access"
  * In the Permissions screen, we need the "AmazonS3FullAccess" permissions. Either create a group to attach permissions and add your user or give your user this permissions directly
  * Copy both "Access key ID" and "Secret access key" to the corresponding keys in your .env file
* Go to the S3 service and click to create a bucket
  * The name must be unique in all amazon aws
  * Select the region closest to you to reduce any network delays and TAKE note of that because after 1 year you will start being charged if you did not delete your things.
  * *For this example*, uncheck the checkbox "Block all public access" to allow public access to your bucket
  * Click on "Create Bucket"
  * Save the name of the bucket and region chosen in the .env file corresponding key

## Insomnia Settings
* Import insomnia-aws-s3.json into Insomnia

## Installation
```
yarn
```

# Prisma Configuration
The file data/prisma/schema.prisma is the place where you should define your all your table schemas


# Create your tables using Prisma
Before running your app execute the following terminal command to generate your tables on SQLite. 
```
yarn prisma migrate dev
```

This should be done regardless of the DB you are using.

# Running the Application
```
yarn dev
```

# Routes

* POST http://localhost:4000/api/file -> Uploads the file to AWS S3 and creates a new record into the database
* GET http://localhost:4000/api/file/:name -> Retrieves a given s3 file record from the database
* DELETE http://localhost:4000/api/file/:name -> Remove the file from AWS S3 and deletes record from the database
