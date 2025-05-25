export default function Layout({
    children,
    }: {
    children: React.ReactNode
    }) {
    return (
        <div className="flex h-screen w-screen items-center justify-center">
        <div className="w-full max-w-md">{children}</div>
        </div>
    )
    }