import { Star, Clock, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import { TCourse } from "@/types";
import Image from "next/image";

type Props = {
  course: TCourse;
};

export default function CourseCard({ course }: Props) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-slate-700/50 hover:border-blue-500/50 bg-slate-800/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10">
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={course.thumbnail}
          alt={course.title}
          width={500}
          height={300}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-600/80 text-white text-sm font-medium">
            ৳ {course.price}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
        <p className="text-slate-400 line-clamp-3 mb-4">{course.description}</p>

        <div className="flex items-center justify-between mb-6 text-sm text-slate-400">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="ml-1">4.8</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 text-blue-400" />
              <span className="ml-1">1.2k</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-purple-400" />
              <span className="ml-1">12h 30m</span>
            </div>
          </div>
        </div>

        <Link
          href={`/courses/${course._id}`}
          className="inline-flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium rounded-lg transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/20"
        >
          View Course
          <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
