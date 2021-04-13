# alseko_test

## Инструкция

1. Клонировать проект с гита https://github.com/KatherinePetrova/alseko_test

2. Создать нового пользователя в Mysql, либо изменить существующего пользователя, следующей коммандой:

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'

Где password, пароль пользователя базы данных. Дать привелегии на создание баз данных и внесение в измение в случае их отстутствия.

3. В проекте найти файл .env.example и копировать его, переиминовав в .env. Внутри .env ввести данные базы данных.

4. Внутри проекта ввести команду npm run first (Создает базу данных и данные внутри),
   если запускается первый раз. Далее после создание базы данных используется комманда npm run dev

5. localhost:3000 зайти.

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
