drop database personal_assistant;
create database personal_assistant;

use personal_assistant;

create table users (
  id int auto_increment,
  username varchar(50),
  created_at datetime,
  deleted_at datetime,
  constraint user_id primary key (id),
  constraint username unique(username)
);

create table list_types (
  id int auto_increment,
  list_name varchar(20),
  constraint id primary key (id)
);

insert into list_types (list_name) values(personal);
insert into list_types (list_name) values(work);


create table item_list (
  id int auto_increment,
  user_id int,
  item varchar(240),
  due_date datetime,
  list_type int,
  created_at datetime,
  deleted_at datetime,
  constraint id primary key (id),
  constraint foreign key(user_id) references users(id),
  constraint foreign key(list_type) references list_types(id)
);

