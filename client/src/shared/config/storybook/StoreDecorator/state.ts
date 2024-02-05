import { StateSchema } from 'app/providers/StoreProvider'
import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'
import { Project } from 'entities/Project'

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
            age:38,
            currency:Currency.RUB,
            country:Country.Russia,
            city:'Zvenigorod',
            username:'tratata',
            avatar:'https://avatars.githubusercontent.com/u/107557323?v=4'
        },
        form: {
            firstname:'Tatiana',
            lastname:'Gorelova',
            age:38,
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
            eventType:'643e5900aba80539138865d4',
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
            eventType:'643e5900aba80539138865d4',
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
            name: 'Учеьба',
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
            eventType:'65a850b0a26d859d25aecaf6',
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
            eventType:'65a850b0a26d859d25aecaf6',
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
            eventType:'643e5900aba80539138865d4',
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
            eventType:'643e5900aba80539138865d4',
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
            status: '643e58efaba80539138865d2',
            startTime: '10',
            endTime: '17',
            title: 'Первый заказ Джонни',
            userId: '643c36ad8545463c883af7a8',
            projectType: '6469da05312bc36f4e9ecedc'
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
            status: '643e58efaba80539138865d2',
            startTime: '10',
            endTime: '17',
            title: 'Первый заказ Дориана',
            userId: '643c36ad8545463c883af7a8',
            projectType: '6469da05312bc36f4e9ecedc'
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
    }
}