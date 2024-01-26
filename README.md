# Система для отслеживания рабочих процессов, клиентов, заказов.  

Целевая аудитория проекта это самозанятые, ИП, небольшой бизнес, предоставляющие услуги под заказ (дизайнеры, фотографы, визажисты, консультанты, швеи и тд). У которых работа состоит из нескольких этапов. 

Например работа по созданию бренд бука будет состоять из следующих этапов:

Подготовительный:
- подписание договора
- аванс
- ТЗ/заполнение брифа
- выдача чека (при работе с кассой) или счета
- добавление информации в бугалтерию

Рабочий:
- аудит компании
- разработка корпоративного стиля
- разработка логотипа
- разработка упаковки
- дизайн буклета, визиток, фирменного бланка
- гайдлайн

Завершающий:
- полная опдата
- передача дизайнов в электронном виде
- отзыв

Приложение позволяет создавать такие проекты под свои нужды и потом отслеживать статус каждого шага у каждого заказа.


## Демо (старая версия)
Перевожу старый пет-проект [crm.tanya-gorelova.website](http://crm.tanya-gorelova.website) на TS и FSD архитектуру

[crm.tanya-gorelova.website](http://crm.tanya-gorelova.website)

Email: test@mail.com 

password: Test1234 

## Стек
SaSS, React, Axios, MongoDb, Express, TypeScript, Storybook, Chromium, Jest, i18n, FSD

## Фичи
- Клиенты: добавление, удаление, редактирование, добавления заказа клиенту, поиск по имени, имэйлу или телефону клиента
- Заказы: добавление, удаление, редактирование, поиск по номеру или названию заказа, добавление, удаление и редактирование своих статусов заказа
- Календарь: отображение событий из раздела заказов, добавление своих личных событий, добавление, удаление и редактирование своих категорий событий
- Проекты: отображение заказов с разбивкой по проектам (пакет услуг, работа и тп), добавление, удаление и редактирование своих проектов с разбивкой по стадиям и шагам. И возможность отслеживания статуса каждого шага (в процессе, готово, пауза, проблема)

## Скрипты
Клиентская часть:

    "start": "webpack serve --env port=3000",
    "start:dev": "concurrently \"npm start\" \"npm run start:dev:server\"",
    "build:prod": "webpack --env mode=production",
    "build:dev": "webpack --env mode=development",
    "lint:ts": "eslint \"**/*.{ts,tsx}\"",
    "lint:ts:fix": "eslint \"**/*.{ts,tsx}\" --fix",
    "lint:scss": "npx stylelint \"**/*.scss\"",
    "lint:scss:fix": "npx stylelint \"**/*.scss\" --fix",
    "test:unit": "jest --config ./config/jest/jest.config.ts",
    "test:ui": "npx chromatic --project-token=chpt_46613f3ee4ef428",
    "storybook": "storybook dev -p 6006 -c ./config/storybook",
    "build-storybook": "storybook build -c ./config/storybook"

Серверная часть:

    "start": "cross-env NODE_ENV=production node app.js",
    "serve": "cross-env NODE_ENV=development nodemon app.js"

## Скриншоты

Главная страница (dashboard)

![dashboard](https://github.com/tgorella/workflow-crm-system/assets/107557323/1789d93d-20f7-4de5-b0ad-f65615670e94)

Клинты

![Clients](https://github.com/tgorella/workflow-crm-system/assets/107557323/6bb6fa13-f3b6-4c16-b6f7-d84fe0f9cf78)

Клиенты - добавить клиента

![Add client](https://github.com/tgorella/workflow-crm-system/assets/107557323/ccf3bd18-cf90-497d-b2d9-37b743ce8ea8)

Информация о клиенте

![Client details](https://github.com/tgorella/workflow-crm-system/assets/107557323/a04f5a86-5411-4794-b79b-38ec17748e0f)

Заказы

![Orders](https://github.com/tgorella/workflow-crm-system/assets/107557323/54d89391-0abd-4c83-bc7a-8ec683e9cce6)

Добавить заказ

![Orders - add order](https://github.com/tgorella/workflow-crm-system/assets/107557323/8254f723-e080-44ab-a4c9-5b756e711f8d)

Информация о заказе

![order details](https://github.com/tgorella/workflow-crm-system/assets/107557323/9fec5bdc-664e-4e71-8d59-6fc1ec4657b6)

Календарь

![Calendar](https://github.com/tgorella/workflow-crm-system/assets/107557323/a3315501-dd3d-47f0-9a4e-4f8b1a588b17)

Список событий

![Calendar - events list](https://github.com/tgorella/workflow-crm-system/assets/107557323/207f00f3-9cd4-4370-992a-c3ea831636cd)

Добавить событие

![Calendar - add event](https://github.com/tgorella/workflow-crm-system/assets/107557323/d570be78-fef1-4f26-b0a1-7ce6ed1f4ca7)

Проекты

![Projects](https://github.com/tgorella/workflow-crm-system/assets/107557323/0bc26659-cd32-4b76-b283-4d77acc1a7a5)

Настройки статусов заказа

![Settings - order statuses](https://github.com/tgorella/workflow-crm-system/assets/107557323/c9328712-bc2c-41f6-b4ae-373b6849fd28)

Настройки проектов

![Settings - projects](https://github.com/tgorella/workflow-crm-system/assets/107557323/9d489400-dade-4713-bbfd-a9430bf187cf)

Настройки категорий событий

![Settings - event types](https://github.com/tgorella/workflow-crm-system/assets/107557323/9b4a35b3-a228-45bf-8ca9-e37bb02c4dc2)

