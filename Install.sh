#!/bin/bash
#####################################################
#       {AlgorithmA}; 2010 Setup
#       Project Manager: Patrick O'Connor
#       Server Team: Neil Banerjee, Marlo Aragon
#       OS: CentOS 5.4
#       Created by Patrick O'Connor and Neil Banerjee
#
#       This script will install the AlgorithmA 
#        package onto a new CentOS machine
#
#       
#####################################################

echo -e "\n\tSetting up Necessary Packages\n"
sleep 2
yum -y update
yum -y install httpd php php-mysql php-xml mysql mysql-server mod_ssl mod_perl


echo -e "\n\tStarting Services\n"
sleep 2
chkconfig httpd on
chkconfig mysqld on
service mysqld restart
service httpd restart

#test to verify an algo database exists already
echo -e "\nYou must already have a database called 'algo' in MySQL\n in order to continue."
sleep 1
echo -e "\n\tDo you have a database called 'algo' in MySQL [y = yes, n = no]"
read answer

if [ "$answer" = "y" ]; then echo -e "\n\tDatabase exists. Moving forward.\n"
sleep 2
#end if
elif [ "$answer" = "Y" ]; then echo -e "\n\tDatabase exists. Moving forward.\n"
sleep 2

#end elif1
elif [ "$answer" = "n" ]; then echo -e "\n\tPlease make 'algo' database with necessary permissions before continuing. Now exiting.\n"
sleep 2
exit
#end elif2
elif [ "$answer" = "N" ]; then echo -e "\n\tPlease make 'algo' database with necessary permissions before continuing. Now exiting.\n"
sleep 2
exit
#end elif3
else
echo -e "\n\tYou have entered an invalid command.  Only use 'y' or 'n.' Exiting now.  You must restart.\n"
sleep 2
exit
#end else

fi

#unpack the tar file
echo -e "\tMaking /var/www/html/algo folder"
sleep 2
mkdir /var/www/html/algo
echo -e "\tNow copying the exported web files to /var/www/html/algo"
sleep 2
cp -r export/* export/.[a-zA-Z0-9]* /var/www/html/algo/
echo -e "\tChanging ownership on web files to apache:root"
sleep 2
chown -R apache:root /var/www/html/algo


#Ask user for MySQL username and password and input into session variable.  Then use those variables in place of algo and algo_db_password below and you will have to create database algo.
#load the sqldump into the database called algo
echo -e "\tYour MySQL information is needed to import the database data /
	\n\n\tPlease a MySQL username with full access to the algo database: "
read uname
echo -e "\n\tPlease enter your MySQL password: "
read pass

echo -e "\n\tImport MySQL Data\n"
sleep 2

#import
mysqlfile=$(echo $(ls files/algo_mysql_*.sql))
mysql -u$uname -p$pass  algo < $mysqlfile


#echo -e "\tSetting database info in 
#	\vvar/www/html/algo/app/config/database.php"
#sed -i 's/\'login\' \=\>\ \'algo\' /\'login\' \=\> \'$uname\'/\' /var/www/html/algo/app/config/database.php
#sed -i 's/'\password\' \=\> \'algo_db_password\'/\'password\' \=\> \'$pass\'/' /var/www/html/algo/app/config/database.php

echo -e "\tYou will have to edit the 'database.php' file in the \n{webroot}/algo/app/config to edit your mysql username and password are in the appropriate areas.\nAlso, you must set AllowOverrides to All in your Apache config"
sleep 1

echo -e "\t\e[1;34m{AlgorithmA}; 2010\e[m has been installed
	Please open a browser and go to \e[1;31mhttp://localhost/algo/\e[m
	to view the \e[1;34m{AlgorithmA}; 2010\e[m project\n\n"

echo -e "\tIf you are able to load the site but none of the algorithms, you may want to put the CakePHP app
	into debug mode in /var/www/html/algo/app/config/core.php to force Cake to refresh it's cache."
sleep 2








































                                                                                                        
