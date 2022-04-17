#E-commerce API Project

##Content 
    ###Decription
        1-set up 
        2-run project

    ###Technologies
    ###Tools 
    ###Resources 
    ###Auther

###Description 

    Create a [RESTful] full functionality API for e-commerce website to be accessible to the other developers. writing test, secured user information with encryption, and provide tokens for integration into the frontend. code contains user authentication and authorization

    -How to run the project
        
        port: 5000

    -set up
        install an ide for running node (recommended vs code) and browser (chrome)

        install node v16.13.2 and npm 8.1.2 and postgres for database

        install as Development Dependencies run script [npm i]
            

    -run the project

        create database = <as you like> and super user = <as you like> & password = <as you like> with postgres.
        create .env file and set the data above in it.
        after that run the migrations file with [db-migrate up]

        To create Database: 
                port: 5432
                create user: create user <as you like> with password <as you like>;

                create database: create database <as you like> owner <your user>;
                                 create database <test databse> owner <your user>;
                
                grant all on database <your database> to <your user>;
                grant all on database <your test database> to <your user>;


        after doing the above open the terminal and run:
            1-npm run prettier --> improve and fix the error of the style of code
            2-npm run build --> build the code
            3-npm run test --> build and test the code
            4-node build or nodemon build or npm run start --> run the project

            5-npm run dev-server --> to run ts-watch
        
        you can run this script and it will run all the scripts above:
            npm run dev

    
###Technologies 
```
nodejs 
typescript 
express 
jasmine
postgres
joi
jwt
bycrypt
```

###Tools 
```
    git
    github
    vs code 
    google chrome
```
###Resources 
```
udacity 
community slack and toturs 
npmjs.com
google
```

###Auther: Marwan Ahmed