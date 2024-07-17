import App from '@/app/App'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@/app/providers/ThemeProvider'
import '@/shared/config/i18n/i18n'
import { ErrorBoundary } from '@/app/providers/ErrorBoundary'
import '@/app/styles/index.scss'
import { StoreProvider } from '@/app/providers/StoreProvider'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'
import { createRoot } from 'react-dom/client'

const uploadLink = createUploadLink({
    uri: __API__,
})
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: uploadLink
})

const container = document.getElementById('root')

if (!container) {
    throw new Error('Контейнер root не найден')
}

const root = createRoot(container) 
root.render(
    <BrowserRouter>
        <StoreProvider>
            <ErrorBoundary>
                <ThemeProvider>
                    <ApolloProvider client={client}>
                        <App />
                    </ApolloProvider>
                </ThemeProvider>
            </ErrorBoundary>
        </StoreProvider>
    </BrowserRouter>

)
