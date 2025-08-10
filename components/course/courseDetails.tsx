import "@/public/css/styles.css";
import he from "he";


export default function CourseDetails({course}:{course:any}) {
  return (
    <div className="max-w-[1920px] mx-auto  pb-6 md:px-4 ">

      <div className="">
        <img
          src={course.imageUrl}
          alt={course.title}
          className="w-full  object-contain mb-6"
        />
        <div className="px-5 lg:px-10">
          <h1
            className="text-xl md:text-2xl lg:text-4xl text-primary leading-relaxed border-b mb-4 py-4"
            dangerouslySetInnerHTML={{ __html: he.decode(course.title) }}
            dir="rtl"
          />
          <div
            className="content "
            style={{
              direction: "rtl",
            }}
            dangerouslySetInnerHTML={{ __html: he.decode(course.tafseel) }}
          />
        </div>
      </div>

    </div>
  );
}
