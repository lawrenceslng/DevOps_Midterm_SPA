# DevOps_Midterm_SPA

## Steps for QA-EC2

1. Use EC2 console to setup basics
2. Create RDS and connect it 
3. install mysql client in ec2 (https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/mysql-install-cli.html)
4. connect to mysql
mysql -h midterm-db.c7etq1pbw4s4.us-east-1.rds.amazonaws.com -P 3306 -u admin -p
5. run through setup.sql to set up db

## Route 53 work

https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/migrate-dns-domain-in-use.html#migrate-dns-get-zone-file
1. create hosted zone

## Nginx Config
[ec2-user@ip-10-0-3-85 ~]$ mkdir /etc/nginx/sites-available
mkdir: cannot create directory ‘/etc/nginx/sites-available’: Permission denied
[ec2-user@ip-10-0-3-85 ~]$ sudo mkdir /etc/nginx/sites-available
[ec2-user@ip-10-0-3-85 ~]$ sudo vim /etc/nginx/sites-available/app
[ec2-user@ip-10-0-3-85 ~]$ sudo mkdir /etc/nginx/sites-enabled/
[ec2-user@ip-10-0-3-85 ~]$ sudo ln -s /etc/nginx/sites-available/app /etc/nginx/sites-enabled/
[ec2-user@ip-10-0-3-85 ~]$ sudo nginx -t
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
[ec2-user@ip-10-0-3-85 ~]$ sudo systemctl restart nginx

## TO DO

1. set up nginx on QA EC2 and run a simple app
2. 