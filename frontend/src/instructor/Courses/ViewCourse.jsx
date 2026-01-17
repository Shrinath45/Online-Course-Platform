

const ViewCourse = ({ course }) => {

    console.log(course.video_url);
    return (
        <>
            <div>
                <div>
                    {course.video_url ? (
                        <video
                            controls
                            poster={course.thumbnail_url}
                            className="w-full h-64 rounded-lg"
                            preload="metadata"
                        >
                            <source src={course.video_url} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>

                    ) : (
                        <p className="text-gray-500 text-sm">
                            No preview video available
                        </p>
                    )}
                </div>
                <h1><b>Title:</b> {course.title}</h1>
                <h5><b>Description:</b> {course.description}</h5>
                <h5><b>Course Language:</b> {course.language}</h5>
                <h5><b>Course Type:</b> {course.course_type}</h5>

            </div>
        </>
    )
}

export default ViewCourse