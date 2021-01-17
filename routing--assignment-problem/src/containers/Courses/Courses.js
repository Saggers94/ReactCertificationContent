import React, { Component } from "react";

import "./Courses.css";
import { Link, Route } from "react-router-dom";
import Course from "../Course/Course";

class Courses extends Component {
  state = {
    courses: [
      { id: 1, title: "Angular - The Complete Guide" },
      { id: 2, title: "Vue - The Complete Guide" },
      { id: 3, title: "PWA - The Complete Guide" },
    ],
    openCourseId: 0,
  };

  render() {
    return (
      <div>
        {/* <Route to="/courses/course" exact component={Course} /> */}
        <h1>Amazing Udemy Courses</h1>
        <section className="Courses">
          {this.state.courses.map((course) => {
            return (
              <article className="Course" key={course.id}>
                <Link
                  to={"/courses/" + course.id + "?title=" + course.title}
                  onClick={() => this.setState({ openCourseId: course.id })}
                >
                  {course.title}
                </Link>
                {this.state.openCourseId == course.id ? (
                  <Route path="/courses/:id" component={Course} />
                ) : null}
                {/* <Link to="/courses/course">{course.title}</Link>
                <Route to="/courses/course" exact component={Course} /> */}
              </article>
            );
          })}
        </section>
      </div>
    );
  }
}

export default Courses;
