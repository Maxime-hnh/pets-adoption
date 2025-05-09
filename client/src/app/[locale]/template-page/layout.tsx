
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main>
            <h1>Je suis le layout fixe, imagine que je suis un sidebar</h1>
            {children}
        </main>
    )
}