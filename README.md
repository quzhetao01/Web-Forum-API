# README

This app runs on react version 18.2.0 and ruby version 3.1.3

Once downloaded, please do this pre set-up to get the project underway.

At the root directory, type "rails db:migrate" into the console to initialise the migration files.
Then, type "rails console". After the console loads, copy and paste the following command to load in categories into the database.
Command: 
Category.create(name: "CS1101S") ;Category.create(name: "CS1231S") ; Category.create(name:"IS1108") ;
Category.create(name: "CS2030S") ; Category.create(name: "CS2040S") ; Category.create(name: "CS2100") ;
Category.create(name: "CS2101") ; Category.create(name: "CS2103T") ; Category.create(name: "CS2106") ;
Category.create(name: "CS2109S") ; Category.create(name: "ES2660") ; Category.create(name: "CS3230") ;
Category.create(name: "Internships") ; Category.create(name: "Co-curricular Activities and Events") ; Category.create(name: "Miscellaneous") ;

After this, exit the console by writing exit and then pressing "enter" and then run "rails server" in the terminal.
Open up a new terminal and navigate to the nuscs-frontend folder. Run "npm start". Instructions on how to use the application is further explained in the FinalWriteUp.
