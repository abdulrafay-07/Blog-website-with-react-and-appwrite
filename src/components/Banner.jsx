const Banner = (props) => {
    return (
        <div className="px-4 py-32 bg-black mx-auto">
            <div className="text-white text-center">
                <h1 className="text-5xl lg:text-7xl leading-snug font-bold mb-5">{props.title}</h1>
                <p className="text-gray-300 lg:w-3/5 mx-auto mb-5 font-primary">{props.desc}</p>
            </div>
        </div>
    )
}

export default Banner;