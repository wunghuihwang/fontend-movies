const Skeleton = () => {
    return (
        <div className="animate-pulse max-w-5xl mx-auto p-6 grid md:grid-cols-2 gap-8">
            <div className="bg-gray-300 h-[400px] rounded-xl" />
            <div className="space-y-4">
            <div className="h-8 bg-gray-300 rounded w-2/3" />
            <div className="h-4 bg-gray-300 rounded w-full" />
            <div className="h-4 bg-gray-300 rounded w-5/6" />
            </div>
        </div>
    )
}

export default Skeleton;