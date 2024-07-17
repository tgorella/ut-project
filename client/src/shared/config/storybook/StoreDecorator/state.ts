import { StateSchema } from '@/app/providers/StoreProvider'
import { Country } from '@/entities/Country'
import { Currency } from '@/entities/Currency'
import { ProductType } from '@/entities/Product'
import { UserRole } from '@/entities/Profile/model/types/profileSchema'
import { Project } from '@/entities/Project'

const projectsArr: Project[] = [
    {
        _id: 'jhmgjh54rhre',
        name: 'Разработка бренд бука',
        userId: 'апвапр',
        stages: [
            {
                _id: '',
                name: 'Подготовка',
                userId: '',
                projectId: '',
                index: 0,
                steps: [
                    {_id: 'skjfsh',
                        name: 'Подписать договор',
                        projectId: '',
                        userId: '',
                        stageId: '',
                        index: 1,
                    },
                    {_id: 'wrwerr453',
                        name: 'Заполнить бриф / ТЗ',
                        projectId: '',
                        userId: '',
                        stageId: '',
                        index: 2,
                    },
                    {_id: 's3443ghfhsh',
                        name: 'Аванс',
                        projectId: '',
                        userId: '',
                        stageId: '',
                        index: 3,
                    }
                ]
            }
        ]
    },
    {
        _id: 'jha8475fdsgf',
        name: 'Разработка логотипа',
        userId: 'апвапр',
        stages: []
    },
    {
        _id: 'ksjdhfhdf343',
        name: 'Разработка фирменного стиля',
        userId: 'апвапр',
        stages: []
    }]

export const stateAllIn: StateSchema = {
    user: {
        authData: { _id: '1', email: 'user' },
        isLogged: false,
        mounted: false
    },
    profile: {
        readonly: true,
        isLoading: false,
        error: undefined,
        data: {
            firstname:'Tatiana',
            lastname:'Gorelova',
            currency:Currency.RUB,
            country:Country.Russia,
            city:'Zvenigorod',
            username:'tratata',
            avatar:'https://avatars.githubusercontent.com/u/107557323?v=4',
            roles: [UserRole.OWNER]
        },
        form: {
            firstname:'Tatiana',
            lastname:'Gorelova',
            currency:Currency.RUB,
            country:Country.Russia,
            city:'Zvenigorod',
            username:'tratata',
            avatar:'https://avatars.githubusercontent.com/u/107557323?v=4'
        }
    },
    userModules: {
        isLoading: false,
        data: {
            _id:'659abf2f8cd0d696d1e4b1a8',
            userId:'65988d28a1bc6c3d31acb718',
            clients:true,
            orders:true,
            calendar:true,
            projects: false
        }
    },
    OrderStatusEditSchema: {
        isLoading: false,
        editStatusId: '64492fd3d206f2a8b5f4298e',
        data: [{
            _id: '643e58deaba80539138865d0',
            name: 'Завершен',
            color: '#bde2a8',
            isDefault: true
        },
        {
            _id: '643e58efaba80539138865d2',
            name: 'Отменен',
            color: '#ff759f',
            isDefault: true
        },
        {
            _id: '643e5900aba80539138865d4',
            name: 'Архив',
            color: 'gray',
            isDefault: true
        },
        {
            _id: '6467834500aba6813881d4',
            name: 'Новый',
            color: 'blue',
            isDefault: true
        },
        {
            _id: '64492fd3d206f2a8b5f4298e',
            name: 'В процессе',
            color: '#d9cafe',
            userId: '643c36ad8545463c883af7a8',
            isDefault: false
        }
        ]
    },
    loginForm: {email: 'user@mail.ru', password:'pass123', isLoading: false},
    CalendarPage: {
        isLoading: false,
        events: [{
            _id:'65c0dd1ead1c83296987d952',
            title:'Movie night 123',
            userId:'65988d28a1bc6c3d31acb718',
            eventType:{
                _id: '643e58deaba80539138865d0',
                name: 'Учеба',
                color: '#bde2a8',
                isDefault: false
            },
            eventDate:'2024-02-17',
            startTime:'18:00',
            endTime:'21:00',
            place:'',
            notes:'',
        },
        {
            _id:'65c0e386ad1c83296987d96e',
            title:'Test123',
            userId:'65988d28a1bc6c3d31acb718',
            eventType:{
                _id: '6467834500aba6813881d4',
                name: 'Друзья',
                color: 'blue',
                isDefault: false
            },
            eventDate:'2024-02-16',
            startTime:'13:00',
            endTime:'15:00',
            place:'',
            notes:''
        }
        ],
    },
    EventDetailsPage: {
        isLoading: false,
        eventTypes: [{
            _id: '643e58deaba80539138865d0',
            name: 'Учеба',
            color: '#bde2a8',
            isDefault: false
        },
        {
            _id: '643e58efaba80539138865d2',
            name: 'Личное',
            color: '#ff759f',
            isDefault: false
        },
        {
            _id: '643e5900aba80539138865d4',
            name: 'Семья',
            color: 'gray',
            isDefault: false
        },
        {
            _id: '6467834500aba6813881d4',
            name: 'Друзья',
            color: 'blue',
            isDefault: false
        }
        ],
        data: {
            _id:'65c0dd1ead1c83296987d952',
            title:'Movie night 123',
            userId:'65988d28a1bc6c3d31acb718',
            eventType:{
                _id: '643e58efaba80539138865d2',
                name: 'Личное',
                color: '#ff759f',
                isDefault: false
            },
            eventDate:'2024-02-17',
            startTime:'18:00',
            endTime:'21:00',
            place:'',
            notes:'',
        },
        form: {
            _id:'65c0dd1ead1c83296987d952',
            title:'Movie night 123',
            userId:'65988d28a1bc6c3d31acb718',
            eventType:{
                _id: '643e58efaba80539138865d2',
                name: 'Личное',
                color: '#ff759f',
                isDefault: false
            },
            eventDate:'2024-02-17',
            startTime:'18:00',
            endTime:'21:00',
            place:'',
            notes:'',
        }
    },
    eventDetails: {
        isLoading: false,
        eventDetails: {
            _id:'65c0dd1ead1c83296987d952',
            title:'Movie night 123',
            userId:'65988d28a1bc6c3d31acb718',
            eventType:{
                _id: '643e58efaba80539138865d2',
                name: 'Личное',
                color: '#ff759f',
                isDefault: false
            },
            eventDate:'2024-02-17',
            startTime:'18:00',
            endTime:'21:00',
            place:'',
            notes:'',
        },
        formData: {
            _id:'65c0dd1ead1c83296987d952',
            title:'Movie night 123',
            userId:'65988d28a1bc6c3d31acb718',
            eventType:{
                _id: '643e58efaba80539138865d2',
                name: 'Личное',
                color: '#ff759f',
                isDefault: false
            },
            eventDate:'2024-02-17',
            startTime:'18:00',
            endTime:'21:00',
            place:'',
            notes:'',
        }
    },
    eventTypesEditSchema: {
        isLoading: false,
        editTypeId: '64492fd3d206f2a8b5f4298e',
        data: [{
            _id: '643e58deaba80539138865d0',
            name: 'Учеба',
            color: '#bde2a8',
            isDefault: false
        },
        {
            _id: '643e58efaba80539138865d2',
            name: 'Личное',
            color: '#ff759f',
            isDefault: false
        },
        {
            _id: '643e5900aba80539138865d4',
            name: 'Семья',
            color: 'gray',
            isDefault: false
        },
        {
            _id: '6467834500aba6813881d4',
            name: 'Друзья',
            color: 'blue',
            isDefault: false
        }
        ]
    },
    ProjectSelect: {
        isLoading: false,
        data: projectsArr
    },
    ProjectEdit: {
        isLoading: false,
        data: projectsArr
    },
    projectPage: {
        isLoading: false,
        data: projectsArr
    },
    clientDetails: {
        isLoading: false,
        data: {
            _id:'643c5fe7013e22868a6eb63c',
            avatarUrls: 'https://i1.mybook.io/p/x480/bookset/98/a5/98a52659-fbd2-4082-aada-940b7eb8ddb4.png',
            name: 'Джонни Депп',
            profession: 'актер',
            email: 'name@mydomain.com',
            phone: '89001234567',
            notes: 'американский актёр, кинорежиссёр, музыкант, сценарист и продюсер.'
        },
        form: {
            _id:'643c5fe7013e22868a6eb63c',
            avatarUrls: 'https://i1.mybook.io/p/x480/bookset/98/a5/98a52659-fbd2-4082-aada-940b7eb8ddb4.png',
            name: 'Джонни Депп',
            profession: 'актер',
            email: 'name@mydomain.com',
            phone: '89001234567',
            notes: 'американский актёр, кинорежиссёр, музыкант, сценарист и продюсер.'
        }
    },
    orderStatuses: {
        isLoading: false,
        data: [{
            _id: '643e58deaba80539138865d0',
            name: 'Завершен',
            color: '#bde2a8',
            isDefault: true
        },
        {
            _id: '643e58efaba80539138865d2',
            name: 'Отменен',
            color: '#ff759f',
            isDefault: true
        },
        {
            _id: '643e5900aba80539138865d4',
            name: 'Архив',
            color: 'gray',
            isDefault: true
        },
        {
            _id: '6467834500aba6813881d4',
            name: 'Новый',
            color: 'blue',
            isDefault: true
        },
        {
            _id: '64492fd3d206f2a8b5f4298e',
            name: 'В процессе',
            color: '#d9cafe',
            userId: '643c36ad8545463c883af7a8',
            isDefault: false
        }
        ]
    },
    orderDetails: {
        isLoading: false,
        data: {
            _id: '64469ad32e53c6aa4c0746b6',
            clientId: {
                _id:'643c5fe7013e22868a6eb63c',
                avatarUrls: 'https://i1.mybook.io/p/x480/bookset/98/a5/98a52659-fbd2-4082-aada-940b7eb8ddb4.png',
                name: 'Джонни Депп',
                profession: 'актер',
                email: 'name@mydomain.com',
                phone: '89001234567',
                notes: 'американский актёр, кинорежиссёр, музыкант, сценарист и продюсер.'
            },
            total: '35000',
            notes: '',
            eventDate: '2023-12-12',
            eventType: 'crm-work',
            orderNumber: '31',
            place: 'Лондон',
            status: {
                _id:'643e58efaba80539138865d2',
                name: '',
                color: ''
            },
            startTime: '10',
            endTime: '17',
            title: 'Первый заказ Джонни',
            userId: '643c36ad8545463c883af7a8',
            projectType: {
                _id:'6469da05312bc36f4e9ecedc',
                name: '',
                userId: '',
                stages: []}
      
        },
        form: {
            _id: '64469ad32e53c6aa4c0746b6',
            clientId: {
                _id:'643c5fe7013e22868a6eb63c',
                avatarUrls: 'https://i1.mybook.io/p/x480/bookset/98/a5/98a52659-fbd2-4082-aada-940b7eb8ddb4.png',
                name: 'Джонни Депп',
                profession: 'актер',
                email: 'name@mydomain.com',
                phone: '89001234567',
                notes: 'американский актёр, кинорежиссёр, музыкант, сценарист и продюсер.'
            },
            total: '35000',
            notes: '',
            eventDate: '2023-12-12',
            eventType: 'crm-work',
            orderNumber: '31',
            place: 'Лондон',
            status: {
                _id:'643e58efaba80539138865d2',
                name: '',
                color: ''
            },
            startTime: '10',
            endTime: '17',
            title: 'Первый заказ Дориана',
            userId: '643c36ad8545463c883af7a8',
            projectType: {
                _id:'6469da05312bc36f4e9ecedc',
                name: '',
                userId: '',
                stages: []}
        }
    },
    ordersPage: {
        isLoading: false,
        limit: 100,
        search: '',
        data: [
            {
                _id:'65c6300f1ff36e56be85ec31',
                clientId:{
                    _id: '659bb190b1e8a9de6b4e5b53'},
                userId:'65988d28a1bc6c3d31acb718',
                title:'Заказ в феврале',
                projectType: {
                    _id: '65b6b7fac7b2228b5761ab62',
                    name: '',
                    userId: '',
                    stages: []
                },
                status:{
                    _id: '6467834500aba6813881d4',
                    name: '',
                    color: '',
                    isDefault: false
                },
                notes:'',
                eventDate:'2024-02-25',
                eventType:'work',
                place:'',
                startTime:'',
                endTime:'',
                total:'56757',
                steps:[],
                createdAt:'1709192683393',
                updatedAt:'2024-02-09T14:01:13.033Z',
                orderNumber: '14'
            },
            {
                _id:'65b10d79388072a2cc87c0a2',
                clientId:{
                    _id: '65b10d78388072a2cc87c0a0'},
                userId:'65988d28a1bc6c3d31acb718',
                title:'Test1',
                projectType:{
                    _id: '65b7b18257fa328bb2d901a3',
                    name: '',
                    userId: '',
                    stages: []},
                status: {
                    _id: '659bc05bec9c6a620f683036',
                    name: '',
                    color: '',
                    isDefault: false
                },
                notes:'',
                eventDate:'2024-12-12',
                eventType:'work',
                orderNumber:'13',
                place:'',
                startTime:'12:00',
                endTime:'14:00',
                total:'100000',
                createdAt:'1709192683393',
                updatedAt:'2024-01-29T18:39:04.177Z',
            },
            {
                _id:'659c13af2021bc9855b6b6eb',
                clientId:{
                    _id: '659bb1cdb1e8a9de6b4e5b5b'},
                userId:'65988d28a1bc6c3d31acb718',
                title:'Первый заказ Томаса',
                projectType:{
                    _id: '65b6b7fac7b2228b5761ab62',
                    name: '',
                    userId: '',
                    stages: []},
                status:{
                    _id: '659bc05bec9c6a620f683035',
                    name: '',
                    color: '',
                    isDefault: false
                },
                notes:'',
                eventDate:'2024-04-11',
                eventType:'work',
                orderNumber:'12',
                place:'',
                startTime:'14:00',
                endTime:'19:00',
                total:'50000',
                createdAt:'1704726875398',
                updatedAt:'2024-02-05T21:52:00.759Z'
            }
        ]
    },
    productPage: {
        isLoading: false,
        search: '',
        limit: 100,
        data: [{
            _id: '1',
            name: 'Диффузор для дома "Дыня"',
            price: 100,
            description: 'Диффузор для дома создаст приятную атмосферу и освежит любое помещение. Соленая карамель - это отличный декор и аромат вашего дома. Диффузор Terin House — ароматизатор воздуха на селективных французских ароматических маслах со стойкостью до 1-2 месяца. Композиция ароматизатора для квартиры «Соленая карамель» с насыщенными, но не приторными нотами создаут атмосферу свежести на площади до 30 м². Парфюм Представляет собой емкость с ароматическими маслами, в которую вставляются фибровые аромапалочки, мягко распространяющие аромат по всему пространству комнаты. Ароматизатор для дома подходит для любых помещений. Может не только наполнить туалет или ванную утонченным ароматом, но и сделать другие домашние комнаты более уютными. Тщательно продуманная формула яркого и интригующего нежного аромата освежителя для комнаты поможет нейтрализовать запахи еды на кухне. ',
            discount: 10,
            count: 150,
            productType: ProductType.PRODUCT,
            img: [
                'https://basket-12.wbbasket.ru/vol1742/part174261/174261502/images/big/1.webp',
            ],
            category: 'Товары для дома',
            subcategory: '',
            userId: ''
        },
        {
            _id: '2',
            name: 'Диффузор для дома "Дыня"',
            price: 150,
            description: 'Диффузор для дома создаст приятную атмосферу и освежит любое помещение. Соленая карамель - это отличный декор и аромат вашего дома. Диффузор Terin House — ароматизатор воздуха на селективных французских ароматических маслах со стойкостью до 1-2 месяца. Композиция ароматизатора для квартиры «Соленая карамель» с насыщенными, но не приторными нотами создаут атмосферу свежести на площади до 30 м². Парфюм Представляет собой емкость с ароматическими маслами, в которую вставляются фибровые аромапалочки, мягко распространяющие аромат по всему пространству комнаты. Ароматизатор для дома подходит для любых помещений. Может не только наполнить туалет или ванную утонченным ароматом, но и сделать другие домашние комнаты более уютными. Тщательно продуманная формула яркого и интригующего нежного аромата освежителя для комнаты поможет нейтрализовать запахи еды на кухне. ',
            discount: 20,
            count: 450,
            productType: ProductType.PRODUCT,
            img: [
                'https://basket-12.wbbasket.ru/vol1695/part169548/169548656/images/big/1.webp',
            ],
            category: 'Товары для дома',
            subcategory: '',
            userId: ''
        } 
        ]      

    },
    productDetailsPage: {
        isLoading: false,
        data: {
            _id: '1',
            name: 'Product 1',
            price: 100,
            description: 'Диффузор для дома создаст приятную атмосферу и освежит любое помещение. Соленая карамель - это отличный декор и аромат вашего дома. Диффузор Terin House — ароматизатор воздуха на селективных французских ароматических маслах со стойкостью до 1-2 месяца. Композиция ароматизатора для квартиры «Соленая карамель» с насыщенными, но не приторными нотами создаут атмосферу свежести на площади до 30 м². Парфюм Представляет собой емкость с ароматическими маслами, в которую вставляются фибровые аромапалочки, мягко распространяющие аромат по всему пространству комнаты. Ароматизатор для дома подходит для любых помещений. Может не только наполнить туалет или ванную утонченным ароматом, но и сделать другие домашние комнаты более уютными. Тщательно продуманная формула яркого и интригующего нежного аромата освежителя для комнаты поможет нейтрализовать запахи еды на кухне. ',
            discount: 10,
            count: 150,
            productType: ProductType.PRODUCT,
            img: [
                'https://basket-12.wbbasket.ru/vol1742/part174261/174261502/images/big/1.webp',
                'https://basket-12.wbbasket.ru/vol1695/part169548/169548656/images/big/1.webp',
                'https://basket-12.wbbasket.ru/vol1740/part174013/174013033/images/c516x688/1.webp',
                'https://basket-13.wbbasket.ru/vol1921/part192181/192181377/images/big/1.webp',
                'https://basket-14.wbbasket.ru/vol2187/part218782/218782248/images/c516x688/1.webp'
            ],
            category: 'Товары для дома',
            subcategory: '',
            userId: ''
        },
        form: {
            _id: '1',
            name: 'Product 1',
            price: 100,
            description: 'Диффузор для дома создаст приятную атмосферу и освежит любое помещение. Соленая карамель - это отличный декор и аромат вашего дома. Диффузор Terin House — ароматизатор воздуха на селективных французских ароматических маслах со стойкостью до 1-2 месяца. Композиция ароматизатора для квартиры «Соленая карамель» с насыщенными, но не приторными нотами создаут атмосферу свежести на площади до 30 м². Парфюм Представляет собой емкость с ароматическими маслами, в которую вставляются фибровые аромапалочки, мягко распространяющие аромат по всему пространству комнаты. Ароматизатор для дома подходит для любых помещений. Может не только наполнить туалет или ванную утонченным ароматом, но и сделать другие домашние комнаты более уютными. Тщательно продуманная формула яркого и интригующего нежного аромата освежителя для комнаты поможет нейтрализовать запахи еды на кухне. ',
            discount: 10,
            count: 150,
            productType: ProductType.PRODUCT,
            img: [
                'https://basket-12.wbbasket.ru/vol1742/part174261/174261502/images/big/1.webp',
                'https://basket-12.wbbasket.ru/vol1695/part169548/169548656/images/big/1.webp',
                'https://basket-12.wbbasket.ru/vol1740/part174013/174013033/images/c516x688/1.webp',
                'https://basket-13.wbbasket.ru/vol1921/part192181/192181377/images/big/1.webp',
                'https://basket-14.wbbasket.ru/vol2187/part218782/218782248/images/c516x688/1.webp'
            ],
            category: 'Товары для дома',
            subcategory: '',
            userId: ''
        }
    }

}


export const stateAllIsLoading: DeepPartial<StateSchema> = {
    user: undefined,
    profile: undefined,
    userModules: undefined,
    CalendarPage: {
        isLoading: true
    },
    EventDetailsPage: {
        isLoading: true
    },
    ProjectEdit: {
        isLoading: true
    },
    ProjectSelect: {
        isLoading: true
    },
    OrderStatusEditSchema: {
        isLoading: true
    },
    orderStatuses: {
        isLoading: true
    },
    orderDetails: {
        isLoading: true
    },
    clientDetails: {
        isLoading: true
    },
    loginForm: {email: 'user@mail.ru', password:'pass123', isLoading: true},
    eventTypesEditSchema: {
        isLoading: true
    },
    productPage: {
        isLoading: true
    },
    productDetailsPage: {
        isLoading: true
    }
    
}

export const stateAllErrors: DeepPartial<StateSchema> = {
    user: undefined,
    profile: undefined,
    userModules: undefined,
    CalendarPage: {
        isLoading: false,
        error: 'error'
    },
    EventDetailsPage: {
        isLoading: false,
        error: 'error'
    },
    ProjectEdit: {
        isLoading: false,
        error: 'error'
    },
    projectPage: {
        isLoading: false,
        error: 'error'
    },
    ProjectSelect: {
        isLoading: false,
        error: 'error'
    },
    OrderStatusEditSchema: {
        isLoading: false,
        error: 'error'
    },
    orderStatuses: {
        isLoading: false,
        error: 'error'
    },
    orderDetails: {
        isLoading: false,
        error: 'error'
    },
    clientDetails: {
        isLoading: false,
        error: 'error'
    },
    loginForm: {email: 'user@mail.ru', password:'pass123', isLoading: false, error: 'error'},
    eventTypesEditSchema: {
        isLoading: false,
        error: 'error'
    },
    productPage: {
        isLoading: false,
        error: 'error'
    },
    productDetailsPage: {
        isLoading: false,
        error: 'error'
    }
}