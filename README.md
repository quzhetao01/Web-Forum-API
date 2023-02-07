# README

This app runs on react version 18.2.0 and ruby version 3.1.3

Once downloaded, please do this pre set-up to get the project underway.

At the root directory, type "rails db:migrate" and "bundle install" and "npm i" into the terminal to initialise the migration files and install dependencies.
cd into the config folder, where you should see a credentials.yml.enc file. run "rm credentials.yml.enc" to remove the file. cd back to the root directory.

run `EDITOR="mate --wait" bin/rails credentials:edit`. Your default code editor should pop out showing a new credentials.yml.enc file. 
Add in the following line
secret_key: YOUR_OWN_SECRET
Once done, save the file and exit the file

Then, type "rails console". After the console loads, copy and paste the following command to load in categories into the database.

//Command

Category.create(name: "CS1101S") ;Category.create(name: "CS1231S") ; Category.create(name:"IS1108") ;
Category.create(name: "CS2030S") ; Category.create(name: "CS2040S") ; Category.create(name: "CS2100") ;
Category.create(name: "CS2101") ; Category.create(name: "CS2103T") ; Category.create(name: "CS2106") ;
Category.create(name: "CS2109S") ; Category.create(name: "ES2660") ; Category.create(name: "CS3230") ;
Category.create(name: "Internships") ; Category.create(name: "Co-curricular Activities and Events") ; Category.create(name: "Miscellaneous") ;

After this, exit the console by writing exit and then pressing "enter" and then run "rails server" in the terminal.
Open up a new terminal and navigate to the nuscs-forum folder. 
Run "npm i" to install the dependencies.
Run "npm start". Instructions on how to use the application is further explained in the FinalWriteUp.
