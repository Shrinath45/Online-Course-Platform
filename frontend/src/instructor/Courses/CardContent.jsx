import React from 'react'

const CardContent = ({course}) => {




    return (
        <div className="bg-[#111] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition border border-gray-800 max-w-sm w-80">

            {/* Thumbnail */}
            <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-56 object-cover"
            />

            <div className="p-5">

                {/* Title */}
                <h2 className="text-white text-xl font-semibold mb-2">
                    {course.title}
                </h2>

                {/* Language Tag */}
                <span className="px-3 py-1 bg-gray-700 text-xs text-gray-200 rounded-lg">
                    {course.language}
                </span>

                {/* Live / Batch Tag */}
                {/* <span className="ml-2 px-3 py-1 bg-red-700 text-xs text-white rounded-lg">
                    {course.live_status}
                </span> */}

                {/* Description */}
                {/* <p className="text-gray-400 mt-3 text-sm line-clamp-2">
                    {course.description}
                </p> */}

                {/* Price Section */}
                <div className="mt-4">
                    <p className="text-green-400 text-xl font-bold">₹ {course.price}</p>

                    {/* {course.old_price && (
                        <p className="text-gray-500 line-through text-sm">₹ {course.old_price}</p>
                    )} */}
                </div>

                {/* View Details Button */}
                <button className="w-full mt-4 bg-emerald-500 hover:bg-emerald-600 text-black font-medium py-2 rounded-lg">
                    View Details
                </button>
            </div>
        </div>
    )
}

export default CardContent
